@echo off
cls
echo ==========================================
echo        CHAPI Assistant - Inicializador
echo ==========================================
echo.

echo Paso 1: Iniciando servidor backend (puerto 8000)...
echo.
start "CHAPI Backend" cmd /k "cd /d %~dp0 && .venv\Scripts\python.exe simple_openai_server.py"

echo Esperando 3 segundos...
timeout /t 3 /nobreak > nul

echo.
echo Paso 2: Iniciando servidor frontend (puerto 3000)...
echo.
start "CHAPI Frontend" cmd /k "cd /d %~dp0 && .venv\Scripts\python.exe frontend_server.py"

echo.
echo ==========================================
echo   ✅ Servidores iniciados correctamente
echo ==========================================
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo ⚠️  Espera unos segundos y luego abre:
echo    http://localhost:3000
echo.
echo Presiona cualquier tecla para salir...
pause > nul
