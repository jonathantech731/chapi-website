#!/usr/bin/env powershell

# 🚀 CHAPI Ultra Comercial - Script de Prueba Rápida
# Inicia el servidor y abre la página de prueba automáticamente

Write-Host "🚀 INICIANDO CHAPI ULTRA COMERCIAL..." -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Yellow

# Verificar si Node.js está instalado
try {
  $nodeVersion = node --version
  Write-Host "✅ Node.js detectado: $nodeVersion" -ForegroundColor Green
}
catch {
  Write-Host "❌ Node.js no encontrado. Instalando con Chocolatey..." -ForegroundColor Red
  choco install nodejs -y
}

# Verificar si live-server está instalado
try {
  $liveServer = npm list -g live-server --depth=0 2>$null
  if ($liveServer -match "live-server") {
    Write-Host "✅ live-server ya está instalado" -ForegroundColor Green
  }
  else {
    throw "No instalado"
  }
}
catch {
  Write-Host "📦 Instalando live-server..." -ForegroundColor Yellow
  npm install -g live-server
}

# Verificar archivos principales
$archivosRequeridos = @(
  "assets/js/chapi-config-ultra-comercial.js",
  "assets/js/chapi-assistant-ultra-comercial.js",
  "test-chapi-ultra-comercial.html",
  "assets/css/chapi-assistant-pro.css"
)

Write-Host "`n🔍 Verificando archivos del sistema..." -ForegroundColor Cyan

foreach ($archivo in $archivosRequeridos) {
  if (Test-Path $archivo) {
    Write-Host "✅ $archivo" -ForegroundColor Green
  }
  else {
    Write-Host "❌ $archivo - FALTANTE" -ForegroundColor Red
  }
}

# Verificar CSS si no existe
if (!(Test-Path "assets/css/chapi-assistant-pro.css")) {
  Write-Host "📝 Creando CSS básico..." -ForegroundColor Yellow

  if (!(Test-Path "assets/css")) {
    New-Item -ItemType Directory -Path "assets/css" -Force
  }

  @"
/* CHAPI Ultra Comercial CSS */
#chapiWidget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    font-family: 'Segoe UI', Arial, sans-serif;
}

.chapi-chat-button {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    border-radius: 50px;
    padding: 15px 20px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(238, 90, 36, 0.3);
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.chapi-chat-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(238, 90, 36, 0.4);
}

.chapi-chat-window {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 400px;
    height: 600px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    display: none;
    flex-direction: column;
    overflow: hidden;
}

.chapi-chat-window.active {
    display: flex;
}

.chapi-header {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chapi-chat-body {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.chapi-message {
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
}

.chapi-message.user {
    flex-direction: row-reverse;
}

.chapi-message-content {
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 18px;
    position: relative;
}

.chapi-message.bot .chapi-message-content {
    background: #f0f0f0;
    color: #333;
}

.chapi-message.user .chapi-message-content {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
}

.chapi-input-area {
    padding: 15px;
    border-top: 1px solid #eee;
}

.chapi-input-container {
    display: flex;
    gap: 10px;
    align-items: flex-end;
}

.chapi-input {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 10px 15px;
    resize: none;
    outline: none;
}

.chapi-send-btn {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.chapi-quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 15px;
    border-top: 1px solid #eee;
}

.chapi-quick-action {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 20px;
    padding: 8px 12px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.chapi-quick-action:hover {
    background: #e9ecef;
}

.chapi-quick-action.priority {
    background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
}

.chapi-typing {
    padding: 10px 0;
}

.chapi-typing-dots {
    display: flex;
    gap: 4px;
}

.chapi-typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #999;
    animation: typing 1.4s infinite ease-in-out;
}

.chapi-typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.chapi-typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
    0%, 80%, 100% {
        transform: scale(0);
        opacity: 0.5;
    }
    40% {
        transform: scale(1);
        opacity: 1;
    }
}

@media (max-width: 480px) {
    .chapi-chat-window {
        width: calc(100vw - 40px);
        height: calc(100vh - 40px);
        bottom: 20px;
        right: 20px;
    }
}
"@ | Out-File -FilePath "assets/css/chapi-assistant-pro.css" -Encoding UTF8

  Write-Host "✅ CSS creado exitosamente" -ForegroundColor Green
}

Write-Host "`n🚀 INICIANDO SERVIDOR..." -ForegroundColor Cyan
Write-Host "Puerto: 3000" -ForegroundColor Yellow
Write-Host "URL: http://localhost:3000/test-chapi-ultra-comercial.html" -ForegroundColor Yellow

# Función para abrir navegador después de delay
$openBrowser = {
  Start-Sleep -Seconds 3
  Write-Host "`n🌐 Abriendo navegador..." -ForegroundColor Green
  Start-Process "http://localhost:3000/test-chapi-ultra-comercial.html"
}

# Ejecutar apertura de navegador en background
Start-Job -ScriptBlock $openBrowser | Out-Null

Write-Host "`n🎯 INSTRUCCIONES DE PRUEBA:" -ForegroundColor Magenta
Write-Host "1. El navegador se abrirá automáticamente en 3 segundos" -ForegroundColor White
Write-Host "2. Clic en 'Iniciar Consulta de Ventas'" -ForegroundColor White
Write-Host "3. Prueba estos escenarios:" -ForegroundColor White
Write-Host "   - Selecciona 'Tengo un restaurante'" -ForegroundColor Gray
Write-Host "   - Pregunta '¿Cuánto cuesta?'" -ForegroundColor Gray
Write-Host "   - Di 'Está muy caro'" -ForegroundColor Gray
Write-Host "   - Responde 'Lo voy a pensar'" -ForegroundColor Gray
Write-Host "4. Observa las respuestas ultra-comerciales" -ForegroundColor White

Write-Host "`n💡 PARA DETENER: Presiona Ctrl+C" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

# Iniciar live-server
try {
  live-server --port=3000 --open=/test-chapi-ultra-comercial.html --ignore=node_modules
}
catch {
  Write-Host "`n❌ Error iniciando live-server" -ForegroundColor Red
  Write-Host "Intentando con Python como alternativa..." -ForegroundColor Yellow

  if (Test-Path "simple-server.py") {
    python simple-server.py
  }
  else {
    Write-Host "❌ No se encontró servidor alternativo" -ForegroundColor Red
    Write-Host "Instala live-server con: npm install -g live-server" -ForegroundColor Yellow
  }
}
