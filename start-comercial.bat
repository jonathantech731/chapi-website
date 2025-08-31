@echo off
echo 🚀 INICIANDO CHAPI ULTRA COMERCIAL...
echo =====================================

REM Verificar si Node.js esta instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no encontrado. Por favor instala Node.js primero.
    pause
    exit /b 1
)

echo ✅ Node.js detectado
echo 📦 Verificando live-server...

REM Instalar live-server si no existe
npm list -g live-server >nul 2>&1
if errorlevel 1 (
    echo 📦 Instalando live-server...
    npm install -g live-server
)

echo ✅ live-server disponible
echo 🚀 Iniciando servidor en puerto 3003...
echo.
echo 🎯 URL: http://localhost:3003/test-chapi-ultra-comercial.html
echo 💡 Presiona Ctrl+C para detener
echo =====================================

REM Iniciar servidor
npx live-server --port=3003 --open=/test-chapi-ultra-comercial.html --cors
