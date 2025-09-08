# 🚀 CHAPI ULTRA COMERCIAL - Script Simplificado
# Solo abre UNA ventana con TU página principal (index.html)

Write-Host "🚀 INICIANDO CHAPI ULTRA COMERCIAL..." -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Yellow

# Matar cualquier proceso de live-server existente
Write-Host "🧹 Cerrando servidores existentes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.ProcessName -eq "node" } | Stop-Process -Force -ErrorAction SilentlyContinue

# Esperar un momento para que se liberen los puertos
Start-Sleep -Seconds 2

# Verificar que node está instalado
try {
  $nodeVersion = node --version
  Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
}
catch {
  Write-Host "❌ Error: Node.js no encontrado" -ForegroundColor Red
  Write-Host "Instalar desde: https://nodejs.org" -ForegroundColor Yellow
  pause
  exit 1
}

# Verificar que live-server está disponible
Write-Host "📦 Verificando live-server..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules\.bin\live-server.cmd")) {
  Write-Host "⚠️  Instalando live-server..." -ForegroundColor Yellow
  npm install live-server --save-dev --silent
}

# Verificar que la página principal existe
if (-not (Test-Path "index.html")) {
  Write-Host "❌ Error: index.html no encontrado en el directorio actual" -ForegroundColor Red
  Write-Host "📁 Directorio actual: $PWD" -ForegroundColor Yellow
  pause
  exit 1
}
else {
  Write-Host "✅ Página principal encontrada: index.html" -ForegroundColor Green
}

# Mostrar información importante
Write-Host "`n🎯 INFORMACIÓN DEL SISTEMA:" -ForegroundColor Cyan
Write-Host "• Página: index.html (Tu página principal)" -ForegroundColor White
Write-Host "• Puerto: 3000" -ForegroundColor White
Write-Host "• URL: http://localhost:3000/index.html" -ForegroundColor White

Write-Host "`n📋 FUNCIONALIDADES DISPONIBLES:" -ForegroundColor Cyan
Write-Host "1. Chat widget integrado con CHAPI" -ForegroundColor White
Write-Host "2. Asistente comercial ultra-agresivo" -ForegroundColor White
Write-Host "3. Demo interactiva en tiempo real" -ForegroundColor White
Write-Host "4. Formularios de contacto" -ForegroundColor White

Write-Host "`n🚀 Iniciando tu sitio web en puerto 3000..." -ForegroundColor Green
Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

# Lanzar TU página principal
npx live-server --port=3000 --host=localhost --open=./index.html --cors --no-browser-output
