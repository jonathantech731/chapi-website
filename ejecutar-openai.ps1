# 🤖 EJECUTAR CHAPI CON OPENAI - SCRIPT SIMPLIFICADO
# Enfoque: Solo el asistente funcionando con OpenAI

Write-Host "🚀 INICIANDO CHAPI CON OPENAI" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green
Write-Host ""

# Verificar Python
Write-Host "🐍 Verificando Python..." -ForegroundColor Cyan
try {
  $pythonCmd = "python"
  $pythonTest = & $pythonCmd --version 2>&1
  if ($pythonTest -match "Python") {
    Write-Host "✅ Python encontrado: $pythonTest" -ForegroundColor Green
  }
  else {
    # Intentar con 'py'
    $pythonCmd = "py"
    $pythonTest = & $pythonCmd --version 2>&1
    if ($pythonTest -match "Python") {
      Write-Host "✅ Python encontrado: $pythonTest" -ForegroundColor Green
    }
    else {
      Write-Host "❌ Python no encontrado. Instalando..." -ForegroundColor Red
      Write-Host "   Descarga Python desde: https://python.org" -ForegroundColor Yellow
      pause
      exit 1
    }
  }
}
catch {
  Write-Host "❌ Error ejecutando Python" -ForegroundColor Red
  Write-Host "   Asegúrate que Python esté instalado" -ForegroundColor Yellow
  pause
  exit 1
}

# Verificar/Instalar dependencias básicas
Write-Host ""
Write-Host "📦 Verificando dependencias..." -ForegroundColor Cyan

$requiredPackages = @("fastapi", "uvicorn", "requests", "openai")

foreach ($package in $requiredPackages) {
  Write-Host "Verificando $package..." -ForegroundColor Gray
  try {
    $result = & $pythonCmd -c "import $package; print('OK')" 2>&1
    if ($result -match "OK") {
      Write-Host "✅ $package ya instalado" -ForegroundColor Green
    }
    else {
      Write-Host "📥 Instalando $package..." -ForegroundColor Yellow
      & $pythonCmd -m pip install $package --quiet
      Write-Host "✅ $package instalado" -ForegroundColor Green
    }
  }
  catch {
    Write-Host "📥 Instalando $package..." -ForegroundColor Yellow
    & $pythonCmd -m pip install $package --quiet
  }
}

# Verificar archivo .env
Write-Host ""
Write-Host "🔐 Verificando configuración OpenAI..." -ForegroundColor Cyan

if (-not (Test-Path ".env")) {
  Write-Host "⚠️  Archivo .env no encontrado" -ForegroundColor Yellow
  Write-Host ""
  Write-Host "🔑 NECESITAS CONFIGURAR TU API KEY DE OPENAI" -ForegroundColor Red
  Write-Host "============================================" -ForegroundColor Red
  Write-Host ""

  $apiKey = Read-Host "Ingresa tu OpenAI API Key (sk-...)"

  if ($apiKey -and $apiKey.StartsWith("sk-")) {
    Write-Host "✅ Creando archivo .env..." -ForegroundColor Green

    $envContent = @"
# OpenAI Configuration
OPENAI_API_KEY=$apiKey
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7

# Server Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=false

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Email (opcional)
NOTIFICATION_EMAIL=admin@tuempresa.com
"@

    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Archivo .env creado correctamente" -ForegroundColor Green
  }
  else {
    Write-Host "❌ API Key inválida. Debe empezar con 'sk-'" -ForegroundColor Red
    Write-Host "   Consigue tu API key en: https://platform.openai.com/account/api-keys" -ForegroundColor Yellow
    pause
    exit 1
  }
}
else {
  Write-Host "✅ Archivo .env encontrado" -ForegroundColor Green
}

# Crear archivo de servidor simplificado si no existe
if (-not (Test-Path "simple_openai_server.py")) {
  Write-Host "📝 Creando servidor OpenAI simplificado..." -ForegroundColor Cyan

  $serverContent = @'
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import openai
from typing import List
import uvicorn
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

app = FastAPI(title="CHAPI OpenAI Assistant")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    user_input: str = ""

@app.get("/")
async def root():
    return {"message": "CHAPI OpenAI Assistant está funcionando!"}

@app.get("/health")
async def health():
    return {"status": "ok", "service": "CHAPI OpenAI"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Preparar mensajes para OpenAI
        messages = []
        for msg in request.messages:
            messages.append({"role": msg.role, "content": msg.content})

        # Agregar mensaje del usuario si viene separado
        if request.user_input:
            messages.append({"role": "user", "content": request.user_input})

        # Agregar contexto de CHAPI si no hay sistema
        if not any(msg["role"] == "system" for msg in messages):
            system_msg = {
                "role": "system",
                "content": "Eres CHAPI, un asistente inteligente especializado en chatbots para negocios. Ayudas a empresas a automatizar su atención al cliente. Eres amigable, profesional y siempre ofreces soluciones prácticas."
            }
            messages.insert(0, system_msg)

        # Llamar a OpenAI
        response = openai.ChatCompletion.create(
            model=os.getenv("OPENAI_MODEL", "gpt-3.5-turbo"),
            messages=messages,
            max_tokens=int(os.getenv("OPENAI_MAX_TOKENS", "2000")),
            temperature=float(os.getenv("OPENAI_TEMPERATURE", "0.7"))
        )

        assistant_message = response.choices[0].message.content

        return {
            "response": assistant_message,
            "status": "success"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

if __name__ == "__main__":
    port = int(os.getenv("API_PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
'@

  $serverContent | Out-File -FilePath "simple_openai_server.py" -Encoding UTF8
  Write-Host "✅ Servidor OpenAI creado" -ForegroundColor Green
}

# Iniciar el servidor
Write-Host ""
Write-Host "🚀 INICIANDO SERVIDOR OPENAI..." -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend corriendo en: http://localhost:8000" -ForegroundColor Yellow
Write-Host "Health check: http://localhost:8000/health" -ForegroundColor Yellow
Write-Host "API Chat: http://localhost:8000/api/chat" -ForegroundColor Yellow
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Gray
Write-Host ""

Start-Process powershell -ArgumentList "-NoExit", "-Command", "& '$pythonCmd' simple_openai_server.py"

# Esperar un momento y abrir el frontend
Start-Sleep -Seconds 3

Write-Host "🌐 INICIANDO FRONTEND..." -ForegroundColor Green
Write-Host "Frontend corriendo en: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""

# Iniciar servidor web simple
if (Test-Path "index.html") {
  Start-Process powershell -ArgumentList "-NoExit", "-Command", "& '$pythonCmd' -m http.server 3000"
  Start-Sleep -Seconds 2
  Start-Process "http://localhost:3000"
  Write-Host "✅ Sistema CHAPI con OpenAI iniciado correctamente!" -ForegroundColor Green
}
else {
  Write-Host "⚠️  index.html no encontrado. Solo backend iniciado." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 PRÓXIMOS PASOS:" -ForegroundColor Cyan
Write-Host "1. Abre http://localhost:3000 en tu navegador" -ForegroundColor White
Write-Host "2. Busca el widget de chat en la esquina inferior derecha" -ForegroundColor White
Write-Host "3. Haz clic para probar el asistente con OpenAI" -ForegroundColor White
Write-Host ""
Write-Host "Presiona cualquier tecla para continuar..." -ForegroundColor Gray
pause
