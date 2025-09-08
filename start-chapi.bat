@echo off
:: CHAPI Assistant - Script de inicio automático
:: Este script resuelve todos los problemas comunes y inicia el servidor

echo.
echo ===================================================================
echo                    CHAPI ASSISTANT - AUTO SETUP
echo ===================================================================
echo.

:: Cambiar al directorio del proyecto
cd /d "d:\chapi-website"
echo [1/6] Cambiando al directorio del proyecto...
echo        Directorio actual: %CD%
echo.

:: Verificar Node.js
echo [2/6] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo        ❌ ERROR: Node.js no está instalado o no está en PATH
    echo        💡 Descarga Node.js desde: https://nodejs.org/
    echo        📌 Necesitas Node.js v14 o superior
    pause
    exit /b 1
) else (
    for /f %%i in ('node --version') do echo        ✅ Node.js: %%i
)

for /f %%i in ('npm --version') do echo        ✅ npm: %%i
echo.

:: Verificar archivos principales
echo [3/6] Verificando archivos del proyecto...
if exist "package.json" (
    echo        ✅ package.json encontrado
) else (
    echo        ❌ package.json NO encontrado
    pause
    exit /b 1
)

if exist "index.html" (
    echo        ✅ index.html encontrado
) else (
    echo        ❌ index.html NO encontrado
    pause
    exit /b 1
)

if exist "assets\js\chapi-assistant.js" (
    echo        ✅ chapi-assistant.js encontrado
) else (
    echo        ❌ chapi-assistant.js NO encontrado
)
echo.

:: Instalar dependencias
echo [4/6] Instalando dependencias...
echo        Ejecutando: npm install
npm install
if %errorlevel% neq 0 (
    echo        ❌ Error al instalar dependencias
    echo        💡 Intentando con cache limpio...
    npm cache clean --force
    npm install
)
echo        ✅ Dependencias instaladas
echo.

:: Verificar live-server
echo [5/6] Verificando live-server...
npm list live-server >nul 2>&1
if %errorlevel% neq 0 (
    echo        ⚠️ live-server no encontrado, instalando...
    npm install live-server --save-dev
)
echo        ✅ live-server está disponible
echo.

:: Iniciar servidor
echo [6/6] Iniciando servidor de desarrollo...
echo        🚀 Iniciando en http://localhost:3000
echo        📁 Sirviendo archivos desde: %CD%
echo        🌐 El navegador se abrirá automáticamente
echo        🛑 Para detener: Ctrl+C
echo.
echo ===================================================================
echo                        SERVIDOR INICIADO
echo ===================================================================
echo.

:: Intentar diferentes métodos de servidor
echo Intentando live-server...
timeout /t 2 /nobreak >nul
start "" http://localhost:3000
npx live-server --port=3000 --host=localhost --open=/index.html --cors --no-browser

:: Si live-server falla, usar Python como backup
echo.
echo Si live-server no funciona, iniciando servidor Python...
python simple-server.py

pause
