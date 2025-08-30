"""
FastAPI Proxy para Azure OpenAI
Proporciona un endpoint seguro para el frontend sin exponer claves API
"""

from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, validator
from typing import List, Dict, Optional
import os
import time
import logging
from collections import defaultdict, deque
import asyncio
from datetime import datetime, timedelta

from chapi_azure_openai import get_azure_answer, AzureOpenAIConfig, AzureOpenAIError

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar FastAPI
app = FastAPI(
    title="CHAPI Azure OpenAI Proxy",
    description="Proxy seguro para Azure OpenAI sin exponer API keys",
    version="1.0.0"
)

# Configuración CORS
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'https://chapibot.pro,http://localhost:8000').split(',')

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# Rate Limiter en memoria
class RateLimiter:
    def __init__(self, max_requests: int = 60, window_minutes: int = 1):
        self.max_requests = max_requests
        self.window_minutes = window_minutes
        self.requests = defaultdict(deque)
    
    def is_allowed(self, client_ip: str) -> bool:
        """Verifica si la IP puede hacer más requests"""
        now = datetime.now()
        cutoff = now - timedelta(minutes=self.window_minutes)
        
        # Limpiar requests antiguos
        client_requests = self.requests[client_ip]
        while client_requests and client_requests[0] < cutoff:
            client_requests.popleft()
        
        # Verificar límite
        if len(client_requests) >= self.max_requests:
            return False
        
        # Agregar request actual
        client_requests.append(now)
        return True
    
    def get_remaining(self, client_ip: str) -> int:
        """Obtiene requests restantes para la IP"""
        now = datetime.now()
        cutoff = now - timedelta(minutes=self.window_minutes)
        
        client_requests = self.requests[client_ip]
        # Contar requests válidos
        valid_requests = sum(1 for req_time in client_requests if req_time > cutoff)
        return max(0, self.max_requests - valid_requests)

# Instancia global del rate limiter
rate_limiter = RateLimiter(max_requests=60, window_minutes=1)

# Modelos Pydantic
class Message(BaseModel):
    role: str = Field(..., description="Rol del mensaje: 'user', 'assistant', o 'system'")
    content: str = Field(..., description="Contenido del mensaje")
    
    @validator('role')
    def validate_role(cls, v):
        allowed_roles = ['user', 'assistant', 'system']
        if v not in allowed_roles:
            raise ValueError(f'role debe ser uno de: {allowed_roles}')
        return v
    
    @validator('content')
    def validate_content(cls, v):
        if not v or not v.strip():
            raise ValueError('content no puede estar vacío')
        if len(v) > 4000:
            raise ValueError('content no puede exceder 4000 caracteres')
        return v.strip()

class ChatRequest(BaseModel):
    messages: List[Message] = Field(..., description="Lista de mensajes de la conversación")
    max_tokens: Optional[int] = Field(500, ge=1, le=1000, description="Máximo tokens en respuesta")
    temperature: Optional[float] = Field(0.2, ge=0.0, le=1.0, description="Creatividad de respuesta")
    
    @validator('messages')
    def validate_messages(cls, v):
        if not v:
            raise ValueError('messages no puede estar vacío')
        if len(v) > 20:
            raise ValueError('Máximo 20 mensajes por request')
        
        # Verificar que hay al menos un mensaje de usuario
        user_messages = [msg for msg in v if msg.role == 'user']
        if not user_messages:
            raise ValueError('Debe haber al menos un mensaje de usuario')
        
        return v

class ChatResponse(BaseModel):
    content: str
    usage: Dict[str, int] = {}
    model: str = "azure-openai"
    timestamp: str = ""

# Dependency para verificar rate limiting
async def check_rate_limit(request: Request):
    """Verifica rate limiting por IP"""
    client_ip = request.client.host
    
    if not rate_limiter.is_allowed(client_ip):
        remaining = rate_limiter.get_remaining(client_ip)
        logger.warning(f"Rate limit excedido para IP: {client_ip}")
        raise HTTPException(
            status_code=429, 
            detail={
                "error": "Rate limit excedido",
                "message": "Demasiadas peticiones. Intenta de nuevo en un minuto.",
                "remaining": remaining,
                "reset_time": 60
            }
        )
    
    return client_ip

# Dependency para verificar configuración de Azure
async def get_azure_config():
    """Verifica que la configuración de Azure esté disponible"""
    try:
        config = AzureOpenAIConfig.from_env()
        return config
    except ValueError as e:
        logger.error(f"Error de configuración Azure OpenAI: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Configuración incorrecta",
                "message": "Servicio temporalmente no disponible"
            }
        )

# Endpoints
@app.get("/")
async def root():
    """Endpoint de salud"""
    return {
        "service": "CHAPI Azure OpenAI Proxy",
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    """Health check detallado"""
    try:
        # Verificar configuración
        config = AzureOpenAIConfig.from_env()
        config_status = "ok"
    except Exception as e:
        config_status = f"error: {e}"
    
    return {
        "status": "healthy" if config_status == "ok" else "degraded",
        "azure_config": config_status,
        "rate_limiter": "active",
        "cors_origins": ALLOWED_ORIGINS,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_completion(
    request: ChatRequest,
    client_ip: str = Depends(check_rate_limit),
    config: AzureOpenAIConfig = Depends(get_azure_config)
):
    """
    Endpoint principal para chat completions con Azure OpenAI
    """
    start_time = time.time()
    
    try:
        logger.info(f"Request de chat desde {client_ip}, {len(request.messages)} mensajes")
        
        # Convertir mensajes a formato dict
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        
        # Llamar a Azure OpenAI
        response_content = await get_azure_answer(
            messages=messages,
            max_tokens=request.max_tokens,
            temperature=request.temperature,
            config=config
        )
        
        response_time = time.time() - start_time
        logger.info(f"Respuesta exitosa en {response_time:.2f}s para IP {client_ip}")
        
        return ChatResponse(
            content=response_content,
            usage={"response_time_ms": int(response_time * 1000)},
            timestamp=datetime.now().isoformat()
        )
        
    except AzureOpenAIError as e:
        logger.error(f"Error Azure OpenAI para IP {client_ip}: {e}")
        raise HTTPException(
            status_code=502,
            detail={
                "error": "Error del servicio AI",
                "message": "No se pudo procesar tu solicitud. Intenta de nuevo.",
                "timestamp": datetime.now().isoformat()
            }
        )
    except Exception as e:
        logger.error(f"Error inesperado para IP {client_ip}: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Error interno",
                "message": "Error interno del servidor",
                "timestamp": datetime.now().isoformat()
            }
        )

@app.get("/api/rate-limit/{ip}")
async def get_rate_limit_status(ip: str, client_ip: str = Depends(check_rate_limit)):
    """Obtiene estado del rate limiting para debugging (solo para admins)"""
    # Solo permitir consulta de propia IP
    if ip != client_ip:
        raise HTTPException(status_code=403, detail="Solo puedes consultar tu propia IP")
    
    remaining = rate_limiter.get_remaining(ip)
    
    return {
        "ip": ip,
        "remaining_requests": remaining,
        "max_requests": rate_limiter.max_requests,
        "window_minutes": rate_limiter.window_minutes,
        "timestamp": datetime.now().isoformat()
    }

# Error handlers
@app.exception_handler(422)
async def validation_exception_handler(request: Request, exc):
    """Handler para errores de validación"""
    logger.warning(f"Error de validación desde {request.client.host}: {exc}")
    return JSONResponse(
        status_code=422,
        content={
            "error": "Datos inválidos",
            "message": "Por favor verifica los datos enviados",
            "details": exc.errors() if hasattr(exc, 'errors') else str(exc),
            "timestamp": datetime.now().isoformat()
        }
    )

@app.exception_handler(500)
async def internal_server_error_handler(request: Request, exc):
    """Handler para errores internos"""
    logger.error(f"Error interno desde {request.client.host}: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Error interno",
            "message": "Error interno del servidor",
            "timestamp": datetime.now().isoformat()
        }
    )

# Configuración para desarrollo
if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv('PORT', 8000))
    host = os.getenv('HOST', '0.0.0.0')
    
    logger.info(f"Iniciando CHAPI Proxy en {host}:{port}")
    logger.info(f"CORS origins: {ALLOWED_ORIGINS}")
    
    uvicorn.run(
        "chapi_proxy:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )