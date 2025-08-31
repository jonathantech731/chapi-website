# ======================================================
# CONFIGURACIÓN SEGURA - CHAPI ASSISTANT
# ======================================================
# Script para configurar variables de entorno de forma segura
# Ejecutar después de crear nueva clave API

Write-Host "🔐 CONFIGURACIÓN SEGURA DE CHAPI ASSISTANT" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""

# Verificar si existe .env
if (Test-Path ".env") {
  Write-Host "⚠️  Archivo .env existente encontrado" -ForegroundColor Yellow
  $respuesta = Read-Host "¿Desea sobrescribirlo? (s/N)"
  if ($respuesta -ne "s" -and $respuesta -ne "S") {
    Write-Host "❌ Configuración cancelada" -ForegroundColor Red
    exit
  }
}

Write-Host "📝 Ingrese la información de su clave API NUEVA:" -ForegroundColor Cyan
Write-Host ""

# Solicitar datos de Azure OpenAI
$endpoint = Read-Host "Azure OpenAI Endpoint (ej: https://tu-recurso.openai.azure.com/)"
$deployment = Read-Host "Deployment Name (ej: gpt-4o)"
Write-Host ""
Write-Host "🔑 IMPORTANTE: Ingrese su NUEVA clave API (la anterior fue revocada)" -ForegroundColor Red
$apiKey = Read-Host "Azure OpenAI API Key (sk-proj-...)" -AsSecureString
$apiKeyPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($apiKey))

# Validar inputs
if (-not $endpoint -or -not $deployment -or -not $apiKeyPlain) {
  Write-Host "❌ Error: Todos los campos son obligatorios" -ForegroundColor Red
  exit 1
}

# Crear archivo .env
$envContent = @"
# ======================================================
# CHAPI - Variables de Entorno SEGURAS
# ======================================================
# 🔒 CONFIGURADO: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# ⚠️  NUNCA compartir este archivo
# ======================================================

# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=$endpoint
AZURE_OPENAI_DEPLOYMENT=$deployment
AZURE_OPENAI_KEY=$apiKeyPlain
AZURE_OPENAI_API_VERSION=2023-05-15

# Configuración del Proxy
ALLOWED_ORIGINS=https://chapibot.pro,http://localhost:8000,http://127.0.0.1:8000
PROXY_PORT=8001

# Rate Limiting
MAX_REQUESTS_PER_MINUTE=60
MAX_TOKENS_PER_REQUEST=1000

# Logging
LOG_LEVEL=INFO
LOG_FILE=chapi_assistant.log

# Bot de Telegram (Opcional)
# TELEGRAM_BOT_TOKEN=tu_token_aqui
# TELEGRAM_ADMIN_USER_ID=tu_user_id_aqui
"@

# Escribir archivo .env
$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host ""
Write-Host "✅ Archivo .env creado exitosamente" -ForegroundColor Green
Write-Host ""

# Configurar permisos restrictivos
Write-Host "🔒 Configurando permisos de seguridad..." -ForegroundColor Cyan
icacls ".env" /inheritance:r /grant:r "$env:USERNAME:(R)" > $null 2>&1

# Verificar configuración
Write-Host "🔍 Verificando configuración..." -ForegroundColor Cyan
if (Test-Path ".env") {
  Write-Host "✅ Archivo .env: OK" -ForegroundColor Green
}
else {
  Write-Host "❌ Error creando .env" -ForegroundColor Red
  exit 1
}

Write-Host ""
Write-Host "🎉 CONFIGURACIÓN COMPLETADA" -ForegroundColor Green
Write-Host "============================" -ForegroundColor Green
Write-Host "✅ Variables de entorno configuradas"
Write-Host "✅ Permisos de seguridad aplicados"
Write-Host "✅ Clave API protegida"
Write-Host ""
Write-Host "📋 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "1. Verifique que la clave anterior fue REVOCADA en OpenAI"
Write-Host "2. Ejecute: .\start-comercial-simple.ps1"
Write-Host "3. Pruebe el asistente en http://localhost:8000"
Write-Host ""
Write-Host "⚠️  RECORDATORIO DE SEGURIDAD:" -ForegroundColor Red
Write-Host "• NUNCA comparta el archivo .env"
Write-Host "• NUNCA suba .env al repositorio"
Write-Host "• Rote las claves cada 3 meses"
Write-Host ""

pause
