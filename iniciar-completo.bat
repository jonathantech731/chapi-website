@echo off
echo ======================================
echo    CHAPI Assistant - Inicio OpenAI
echo ======================================
echo.

echo [1/3] Verificando entorno Python...
if not exist ".venv\Scripts\python.exe" (
    echo ERROR: Entorno virtual no encontrado
    echo Ejecuta: python -m venv .venv
    pause
    exit /b 1
)

echo [2/3] Iniciando servidor backend en puerto 8000...
start "CHAPI Backend" cmd /k ".venv\Scripts\python.exe simple_openai_server.py"

timeout /t 3

echo [3/3] Iniciando servidor frontend en puerto 3000...
if exist "node_modules" (
    start "CHAPI Frontend" cmd /k "npm start"
) else (
    echo Iniciando servidor simple...
    start "CHAPI Frontend" cmd /k "python -m http.server 3000"
)

echo.
echo ======================================
echo   CHAPI Assistant iniciado correctamente
echo ======================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Presiona cualquier tecla para salir...
pause > nul
