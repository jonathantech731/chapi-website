# CHAPI Assistant - Inicializador PowerShell
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "        CHAPI Assistant - Inicializador" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si el entorno virtual existe
if (!(Test-Path ".venv\Scripts\python.exe")) {
    Write-Host "❌ ERROR: Entorno virtual no encontrado" -ForegroundColor Red
    Write-Host "   Ejecuta: python -m venv .venv" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "🚀 Paso 1: Iniciando servidor backend (puerto 8000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .venv\Scripts\python.exe simple_openai_server.py"

Write-Host "⏳ Esperando 3 segundos..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "🌐 Paso 2: Iniciando servidor frontend (puerto 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; .venv\Scripts\python.exe frontend_server.py"

Write-Host ""
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "   ✅ Servidores iniciados correctamente" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "🔧 Backend:  http://localhost:8000" -ForegroundColor White
Write-Host "📚 API Docs: http://localhost:8000/docs" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Espera unos segundos y luego abre:" -ForegroundColor Yellow
Write-Host "   http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Presiona cualquier tecla para salir..." -ForegroundColor Gray
pause
