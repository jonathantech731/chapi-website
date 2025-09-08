"""
🤖 CHAPI OpenAI Assistant - Servidor de Producción
Servidor FastAPI optimizado para despliegue en la nube
"""

import os
import sys
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import uvicorn
import requests
import json
import time
from datetime import datetime
import logging

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Cargar variables de entorno
def load_env():
    """Carga variables del archivo .env si existe"""
    env_files = ['.env.production', '.env']
    for env_file in env_files:
        if os.path.exists(env_file):
            with open(env_file, 'r', encoding='utf-8') as f:
                for line in f:
                    if '=' in line and not line.startswith('#'):
                        key, value = line.strip().split('=', 1)
                        os.environ[key] = value.strip('"\'')
            logger.info(f"Variables cargadas desde {env_file}")
            break

load_env()

# Configuración
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
ENVIRONMENT = os.getenv("ENVIRONMENT", "production")
DEBUG = os.getenv("DEBUG", "false").lower() == "true"

# Verificar configuración
if not OPENAI_API_KEY:
    logger.error("❌ OPENAI_API_KEY no configurada")
    if ENVIRONMENT == "production":
        sys.exit(1)

# Crear aplicación FastAPI
app = FastAPI(
    title="CHAPI Assistant API",
    description="API para asistente conversacional con OpenAI",
    version="2.0.0",
    docs_url="/docs" if DEBUG else None,
    redoc_url="/redoc" if DEBUG else None
)

# CORS para producción
allowed_origins = [
    "https://chapibot.pro",
    "https://www.chapibot.pro",
    "http://chapibot.pro",
    "http://www.chapibot.pro"
]

if DEBUG:
    allowed_origins.extend([
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8080",
        "http://127.0.0.1:8080"
    ])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Modelos de datos
class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    user_id: Optional[str] = None
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    timestamp: str
    model_used: str
    processing_time: float

# Sistema de prompts mejorado
SYSTEM_PROMPT = """Eres CHAPI, un asistente especializado en automatización empresarial y chatbots para negocios.

PERSONALIDAD:
- Profesional pero cercano y amigable
- Entusiasta por la tecnología y automatización
- Enfocado en resultados y ROI para los clientes
- Experto en diferentes sectores empresariales

ESPECIALIDADES:
- Chatbots para restaurantes, e-commerce, salud, inmobiliarias, educación
- Automatización de atención al cliente
- Integración con WhatsApp, Instagram, sitios web
- Métricas y analytics de conversaciones
- Generación de leads automatizada

INSTRUCCIONES:
1. Siempre identifica el sector del cliente para personalizar la respuesta
2. Menciona casos de éxito específicos y métricas reales
3. Ofrece demos personalizadas cuando sea apropiado
4. Mantén un tono profesional pero accesible
5. Usa emojis estratégicamente para hacer el contenido más visual
6. Incluye CTAs claros al final de respuestas importantes

FORMATO DE RESPUESTAS:
- Usa HTML básico: <strong>, <br>, listas con •
- Estructura clara con títulos y secciones
- Métricas específicas cuando sea relevante
- Siempre incluir siguiente paso o pregunta

DATOS DE CONTACTO:
- WhatsApp: +56 9 xxxx xxxx
- Email: info@chapibot.pro
- Web: chapibot.pro
- Horarios: Lun-Vie 9-19h, Sáb 10-14h

PRECIOS ACTUALES 2025:
- STARTER: $97/mes (1K conversaciones, 1 asistente)
- PROFESSIONAL: $197/mes (5K conversaciones, 3 asistentes, WhatsApp)
- ENTERPRISE: $397/mes (ilimitado, API, account manager)
- Promoción: 50% OFF primer mes para nuevos clientes

Responde siempre en español, de manera útil y orientada a generar interés en nuestros servicios."""

# Cache para conversaciones
conversations_cache = {}

# Funciones auxiliares
def generate_conversation_id():
    """Genera un ID único para la conversación"""
    return f"conv_{int(time.time())}_{hash(str(time.time())) % 10000}"

def call_openai_api(messages: List[Dict[str, str]]) -> tuple:
    """Llama a la API de OpenAI"""
    start_time = time.time()

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": OPENAI_MODEL,
        "messages": messages,
        "max_tokens": 2000,
        "temperature": 0.7,
        "top_p": 1,
        "frequency_penalty": 0.1,
        "presence_penalty": 0.1
    }

    try:
        response = requests.post(
            f"{OPENAI_BASE_URL}/chat/completions",
            headers=headers,
            json=payload,
            timeout=30
        )

        processing_time = time.time() - start_time

        if response.status_code == 200:
            data = response.json()
            content = data['choices'][0]['message']['content']
            logger.info(f"✅ OpenAI response: {len(content)} chars in {processing_time:.2f}s")
            return content, processing_time
        else:
            logger.error(f"❌ OpenAI error {response.status_code}: {response.text}")
            raise HTTPException(status_code=500, detail=f"OpenAI API error: {response.status_code}")

    except requests.RequestException as e:
        logger.error(f"❌ Request error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Connection error: {str(e)}")

def get_fallback_response(message: str) -> str:
    """Respuesta de fallback cuando OpenAI no está disponible"""
    message_lower = message.lower()

    # Respuestas básicas por categoría
    if any(word in message_lower for word in ['precio', 'costo', 'plan', 'pago']):
        return """
        💰 <strong>Planes CHAPI 2025</strong>
        <br><br>
        🌟 <strong>STARTER:</strong> $97/mes
        <br>• 1,000 conversaciones mensuales
        <br>• 1 asistente personalizado
        <br><br>
        🚀 <strong>PROFESSIONAL:</strong> $197/mes
        <br>• 5,000 conversaciones mensuales
        <br>• 3 asistentes + WhatsApp
        <br><br>
        ⭐ <strong>ENTERPRISE:</strong> $397/mes
        <br>• Conversaciones ilimitadas
        <br>• API personalizada
        <br><br>
        🎁 <strong>¡50% OFF primer mes!</strong>
        <br><br>
        Para más detalles contacta: 📱 +56 9 xxxx xxxx
        """

    elif any(word in message_lower for word in ['demo', 'prueba', 'ejemplo']):
        return """
        🎮 <strong>¡Demos disponibles!</strong>
        <br><br>
        📅 <strong>Demo Online:</strong> 15 min vía Zoom
        <br>📱 <strong>Demo WhatsApp:</strong> Prueba inmediata
        <br>🏢 <strong>Demo Presencial:</strong> En tu oficina
        <br><br>
        <strong>Agenda ahora:</strong>
        <br>📧 info@chapibot.pro
        <br>📱 +56 9 xxxx xxxx
        """

    elif any(word in message_lower for word in ['contacto', 'telefono', 'whatsapp']):
        return """
        📞 <strong>Contacto directo:</strong>
        <br><br>
        📱 <strong>WhatsApp:</strong> +56 9 xxxx xxxx
        <br>📧 <strong>Email:</strong> info@chapibot.pro
        <br>🌐 <strong>Web:</strong> chapibot.pro
        <br><br>
        ⏰ <strong>Horarios:</strong> Lun-Vie 9-19h
        """

    else:
        return """
        👋 <strong>¡Hola! Soy CHAPI, tu asistente IA.</strong>
        <br><br>
        🤖 Especialista en automatización empresarial:
        <br>• Chatbots para restaurantes, e-commerce, salud
        <br>• Automatización de WhatsApp e Instagram
        <br>• Generación de leads 24/7
        <br><br>
        📊 <strong>Resultados típicos:</strong>
        <br>• +40% más leads automáticos
        <br>• -70% tiempo de respuesta
        <br>• +30% satisfacción del cliente
        <br><br>
        ¿Qué tipo de negocio tienes? Te muestro casos específicos.
        <br><br>
        📱 <strong>Contacto:</strong> +56 9 xxxx xxxx
        """

# Endpoints de la API

@app.get("/")
async def root():
    """Endpoint raíz con información del servicio"""
    return {
        "service": "CHAPI Assistant API",
        "version": "2.0.0",
        "status": "online",
        "timestamp": datetime.now().isoformat(),
        "environment": ENVIRONMENT,
        "openai_configured": bool(OPENAI_API_KEY),
        "model": OPENAI_MODEL
    }

@app.get("/health")
async def health_check():
    """Health check para verificar el estado del servicio"""
    health_status = {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "uptime": time.time(),
        "environment": ENVIRONMENT,
        "openai_available": bool(OPENAI_API_KEY)
    }

    # Verificar conectividad con OpenAI si está configurado
    if OPENAI_API_KEY:
        try:
            headers = {"Authorization": f"Bearer {OPENAI_API_KEY}"}
            response = requests.get(f"{OPENAI_BASE_URL}/models", headers=headers, timeout=5)
            health_status["openai_status"] = "connected" if response.status_code == 200 else "error"
        except:
            health_status["openai_status"] = "disconnected"

    return health_status

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """Endpoint principal para el chat"""
    start_time = time.time()

    try:
        # Generar o usar conversation_id existente
        conversation_id = request.conversation_id or generate_conversation_id()

        # Obtener historial de conversación
        if conversation_id not in conversations_cache:
            conversations_cache[conversation_id] = []

        conversation_history = conversations_cache[conversation_id]

        # Preparar mensajes para OpenAI
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # Agregar historial (últimos 10 mensajes para no exceder límites)
        messages.extend(conversation_history[-10:])

        # Agregar mensaje actual del usuario
        user_message = {"role": "user", "content": request.message}
        messages.append(user_message)

        # Intentar llamar a OpenAI
        try:
            if OPENAI_API_KEY:
                ai_response, processing_time = call_openai_api(messages)
                model_used = OPENAI_MODEL
            else:
                ai_response = get_fallback_response(request.message)
                processing_time = time.time() - start_time
                model_used = "fallback"

        except Exception as e:
            logger.warning(f"OpenAI falló, usando fallback: {str(e)}")
            ai_response = get_fallback_response(request.message)
            processing_time = time.time() - start_time
            model_used = "fallback"

        # Guardar en historial
        conversation_history.append(user_message)
        conversation_history.append({"role": "assistant", "content": ai_response})

        # Limpiar historial muy largo
        if len(conversation_history) > 20:
            conversation_history = conversation_history[-20:]

        conversations_cache[conversation_id] = conversation_history

        # Preparar respuesta
        response = ChatResponse(
            response=ai_response,
            conversation_id=conversation_id,
            timestamp=datetime.now().isoformat(),
            model_used=model_used,
            processing_time=round(processing_time, 3)
        )

        logger.info(f"💬 Chat response sent: {len(ai_response)} chars, {processing_time:.2f}s")
        return response

    except Exception as e:
        logger.error(f"❌ Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/status")
async def api_status():
    """Status de la API con métricas"""
    return {
        "api_version": "2.0.0",
        "openai_model": OPENAI_MODEL,
        "active_conversations": len(conversations_cache),
        "environment": ENVIRONMENT,
        "debug_mode": DEBUG,
        "timestamp": datetime.now().isoformat()
    }

@app.options("/api/chat")
async def chat_options():
    """Manejo de preflight CORS para el endpoint de chat"""
    return JSONResponse(content={}, headers={
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
    })

# Middleware para logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time

    logger.info(
        f"{request.method} {request.url.path} - "
        f"Status: {response.status_code} - "
        f"Time: {process_time:.3f}s"
    )

    return response

# Función principal
def main():
    """Función principal para ejecutar el servidor"""
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")

    logger.info(f"🚀 Iniciando CHAPI Assistant API")
    logger.info(f"🌐 Host: {host}:{port}")
    logger.info(f"🔧 Environment: {ENVIRONMENT}")
    logger.info(f"🤖 OpenAI Model: {OPENAI_MODEL}")
    logger.info(f"🔑 API Key configured: {'✅' if OPENAI_API_KEY else '❌'}")

    uvicorn.run(
        "production_server:app" if __name__ != "__main__" else app,
        host=host,
        port=port,
        reload=DEBUG,
        log_level="info" if not DEBUG else "debug",
        access_log=DEBUG
    )

if __name__ == "__main__":
    main()
