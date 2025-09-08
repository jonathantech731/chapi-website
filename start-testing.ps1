# 🧪 CHAPI TESTING - Solo página de pruebas
# Abre únicamente la página de testing del asistente comercial

Write-Host "🧪 INICIANDO PÁGINA DE TESTING..." -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Yellow

# Cerrar servidores existentes
Write-Host "🧹 Cerrando servidores existentes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Verificar Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js no encontrado" -ForegroundColor Red
    pause
    exit 1
}

# Información del testing
Write-Host "`n🎯 PÁGINA DE TESTING:" -ForegroundColor Cyan
Write-Host "• Archivo: test-chapi-ultra-comercial.html" -ForegroundColor White
Write-Host "• Puerto: 3003" -ForegroundColor White
Write-Host "• URL: http://localhost:3003/test-chapi-ultra-comercial.html" -ForegroundColor White

Write-Host "`n📋 ESCENARIOS DE PRUEBA:" -ForegroundColor Cyan
Write-Host "1. Clic en '🍕 Tengo un restaurante'" -ForegroundColor White
Write-Host "2. Clic en '💰 Ver Precios YA'" -ForegroundColor White
Write-Host "3. Escribir 'Está muy caro'" -ForegroundColor White
Write-Host "4. Escribir 'No funciona'" -ForegroundColor White

Write-Host "`n🚀 Iniciando servidor de testing..." -ForegroundColor Green
Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Yellow

# Lanzar página de testing
npx live-server --port=3003 --host=localhost --open=/test-chapi-ultra-comercial.html --cors
