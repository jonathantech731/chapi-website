@echo off
echo.
echo 🤖 CHAPI OpenAI Assistant - Inicio Rapido
echo ==========================================
echo.

REM Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python no encontrado
    echo    Instala Python desde: https://python.org
    pause
    exit /b 1
)

echo ✅ Python encontrado

REM Instalar dependencias básicas
echo 📦 Instalando dependencias...
python -m pip install fastapi uvicorn requests >nul 2>&1

REM Verificar .env
if not exist .env (
    echo.
    echo ⚠️  Archivo .env no encontrado
    echo.
    set /p api_key="🔑 Ingresa tu OpenAI API Key (sk-...): "

    if "!api_key!"=="" (
        echo ❌ API Key requerida
        pause
        exit /b 1
    )

    echo # OpenAI Configuration > .env
    echo OPENAI_API_KEY=!api_key! >> .env
    echo OPENAI_MODEL=gpt-3.5-turbo >> .env
    echo OPENAI_MAX_TOKENS=2000 >> .env
    echo OPENAI_TEMPERATURE=0.7 >> .env
    echo API_PORT=8000 >> .env

    echo ✅ Archivo .env creado
)

echo.
echo 🚀 INICIANDO SERVIDOR OPENAI...
echo    Backend: http://localhost:8000
echo    Test: http://localhost:8000/test
echo.

REM Iniciar backend en nueva ventana
start "CHAPI Backend" cmd /k "python simple_openai_server.py"

REM Esperar un poco
timeout /t 3 /nobreak >nul

echo 🌐 INICIANDO FRONTEND...
echo    Website: http://localhost:3000
echo.

REM Iniciar frontend en nueva ventana
start "CHAPI Frontend" cmd /k "python -m http.server 3000"

REM Esperar y abrir navegador
timeout /t 2 /nobreak >nul
start http://localhost:3000

echo.
echo ✅ CHAPI OpenAI Assistant iniciado!
echo.
echo 🎯 Abre http://localhost:3000 y busca el widget de chat
echo    en la esquina inferior derecha
echo.
echo Presiona cualquier tecla para continuar...
pause >nul
