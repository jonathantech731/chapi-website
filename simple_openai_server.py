"""
🤖 CHAPI OpenAI Assistant - Servidor Simplificado
Servidor FastAPI optimizado para OpenAI API
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import requests
import json
from datetime import datetime

# Cargar variables de entorno manualmente si no hay python-dotenv
def load_env():
    """Carga variables del archivo .env"""
    if os.path.exists('.env'):
        with open('.env', 'r') as f:
            for line in f:
                if '=' in line and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    os.environ[key] = value

load_env()

app = FastAPI(
    title="CHAPI OpenAI Assistant",
    description="Asistente conversacional con OpenAI",
    version="1.0.0"
)

# CORS para permitir el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuración OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
OPENAI_MAX_TOKENS = int(os.getenv("OPENAI_MAX_TOKENS", "2000"))
OPENAI_TEMPERATURE = float(os.getenv("OPENAI_TEMPERATURE", "0.7"))

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    user_input: Optional[str] = ""
    session_id: Optional[str] = None

@app.get("/")
async def root():
    return {
        "message": "🤖 CHAPI OpenAI Assistant está funcionando!",
        "status": "online",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "CHAPI OpenAI",
        "model": OPENAI_MODEL,
        "api_configured": bool(OPENAI_API_KEY)
    }

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Endpoint principal del chat con OpenAI"""
    try:
        # Verificar API key
        if not OPENAI_API_KEY:
            raise HTTPException(status_code=500, detail="OpenAI API key no configurada")

        # Preparar mensajes
        messages = []

        # Agregar contexto del sistema si no existe
        has_system = any(msg.role == "system" for msg in request.messages)
        if not has_system:
            system_prompt = """Eres CHAPI, un asistente inteligente especializado en chatbots para negocios.

Tu objetivo es ayudar a empresas a automatizar su atención al cliente. Eres:
- Amigable y profesional
- Experto en soluciones de chatbots
- Enfocado en resultados de negocio
- Directo y práctico

Cuando alguien pregunte sobre sectores de negocio, pregunta:
1. ¿En qué sector trabaja su negocio?
2. ¿Cuántas consultas reciben al día?
3. ¿Cuál es su objetivo principal?

Luego ofrece soluciones específicas y propón agendar una demo."""

            messages.append({"role": "system", "content": system_prompt})

        # Agregar mensajes del historial
        for msg in request.messages:
            messages.append({"role": msg.role, "content": msg.content})

        # Agregar mensaje actual si viene separado
        if request.user_input:
            messages.append({"role": "user", "content": request.user_input})

        # Llamar a OpenAI API directamente
        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": OPENAI_MODEL,
            "messages": messages,
            "max_tokens": OPENAI_MAX_TOKENS,
            "temperature": OPENAI_TEMPERATURE
        }

        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=30
        )

        if response.status_code != 200:
            error_detail = response.json().get("error", {}).get("message", "Error desconocido")
            raise HTTPException(status_code=response.status_code, detail=f"OpenAI Error: {error_detail}")

        result = response.json()
        assistant_message = result["choices"][0]["message"]["content"]

        return {
            "response": assistant_message,
            "status": "success",
            "model": OPENAI_MODEL,
            "timestamp": datetime.now().isoformat()
        }

    except requests.exceptions.Timeout:
        raise HTTPException(status_code=504, detail="Timeout: OpenAI API no respondió")
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"Error de conexión: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno: {str(e)}")

@app.get("/test")
async def test_openai():
    """Endpoint para probar la conexión con OpenAI"""
    try:
        if not OPENAI_API_KEY:
            return {"status": "error", "message": "API key no configurada"}

        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": OPENAI_MODEL,
            "messages": [{"role": "user", "content": "Hola, responde solo 'Test exitoso'"}],
            "max_tokens": 50
        }

        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=10
        )

        if response.status_code == 200:
            return {"status": "success", "message": "OpenAI API funcionando correctamente"}
        else:
            return {"status": "error", "message": f"Error {response.status_code}"}

    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    print("🚀 Iniciando CHAPI OpenAI Assistant...")
    print(f"🔑 API Key configurada: {'✅' if OPENAI_API_KEY else '❌'}")
    print(f"🤖 Modelo: {OPENAI_MODEL}")
    print(f"🌐 Servidor: http://localhost:8000")
    print(f"📚 Documentación: http://localhost:8000/docs")
    print(f"🔍 Health check: http://localhost:8000/health")
    print("=" * 50)

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.getenv("API_PORT", 8000)),
        log_level="info"
    )
