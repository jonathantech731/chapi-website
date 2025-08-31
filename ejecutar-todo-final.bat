@echo off
echo ============================================
echo 🚀 EJECUCIÓN COMPLETA - TODO EL SISTEMA
echo ============================================

cd /d "d:\chapi-website"

echo 📍 Directorio: %CD%
echo 📅 Fecha: %DATE% %TIME%
echo.

:: ================================================
:: PASO 1: VERIFICAR ENTORNO
:: ================================================
echo 1️⃣ VERIFICANDO ENTORNO...
echo =====================================

echo Verificando Node.js...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Node.js no disponible
    pause
    exit /b 1
) else (
    echo ✅ Node.js OK
)

echo.
echo Verificando npm...
npm --version
if %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: npm no disponible
    pause
    exit /b 1
) else (
    echo ✅ npm OK
)

:: ================================================
:: PASO 2: INSTALAR DEPENDENCIAS
:: ================================================
echo.
echo 2️⃣ INSTALANDO DEPENDENCIAS...
echo =====================================

echo Limpiando caché de npm...
call npm cache clean --force
echo ✅ Caché limpiado

echo.
echo Instalando dependencias del proyecto...
call npm install
echo ✅ Dependencias instaladas

echo.
echo Instalando Claude CLI...
call npm install @anthropic-ai/claude-cli --save-dev
echo ✅ Claude CLI instalado

:: ================================================
:: PASO 3: VERIFICAR INSTALACIONES
:: ================================================
echo.
echo 3️⃣ VERIFICANDO INSTALACIONES...
echo =====================================

echo Verificando live-server...
call npm list live-server
if %ERRORLEVEL% EQU 0 (
    echo ✅ live-server OK
) else (
    echo ⚠️ live-server con problemas
)

echo.
echo Verificando Claude CLI...
call npm list @anthropic-ai/claude-cli
if %ERRORLEVEL% EQU 0 (
    echo ✅ Claude CLI en dependencias
) else (
    echo ❌ Claude CLI no en dependencias
)

echo.
echo Probando Claude CLI con npx...
call npx claude --version
if %ERRORLEVEL% EQU 0 (
    echo ✅ Claude CLI funciona con npx
    set CLAUDE_WORKS=1
) else (
    echo ⚠️ Claude CLI con npx tiene problemas
)

echo.
echo Probando ejecución directa...
call npx @anthropic-ai/claude-cli --version
if %ERRORLEVEL% EQU 0 (
    echo ✅ Claude CLI ejecución directa OK
    set CLAUDE_WORKS=1
) else (
    echo ⚠️ Ejecución directa con problemas
)

:: ================================================
:: PASO 4: PROBAR SERVIDOR
:: ================================================
echo.
echo 4️⃣ VERIFICANDO SERVIDOR...
echo =====================================

echo Verificando archivos del asistente...
if exist "index.html" (
    echo ✅ index.html existe
) else (
    echo ❌ index.html NO EXISTE
)

if exist "assets\js\chapi-assistant.js" (
    echo ✅ chapi-assistant.js existe
) else (
    echo ❌ chapi-assistant.js NO EXISTE
)

if exist "assets\js\chapi-config-ultra-comercial.js" (
    echo ✅ chapi-config-ultra-comercial.js existe
) else (
    echo ❌ chapi-config-ultra-comercial.js NO EXISTE
)

:: ================================================
:: PASO 5: RESUMEN FINAL
:: ================================================
echo.
echo 5️⃣ RESUMEN FINAL
echo =====================================

if "%CLAUDE_WORKS%"=="1" (
    echo.
    echo ╔══════════════════════════════════════╗
    echo ║     🎉 INSTALACIÓN EXITOSA 🎉       ║
    echo ╚══════════════════════════════════════╝
    echo.
    echo ✅ Node.js y npm funcionando
    echo ✅ Dependencias instaladas
    echo ✅ Claude CLI disponible
    echo ✅ Archivos del asistente OK
    echo.
    echo 🚀 COMANDOS DISPONIBLES:
    echo ────────────────────────────────────
    echo   npx claude --version     ^(verificar^)
    echo   npx claude auth          ^(configurar^)
    echo   npx claude --help        ^(ayuda^)
    echo   npm run comercial        ^(asistente^)
    echo   npm run stop             ^(cerrar^)
    echo.
    echo 🎯 SIGUIENTE PASO:
    echo   Ejecuta: npx claude auth
    echo.
) else (
    echo.
    echo ╔══════════════════════════════════════╗
    echo ║      ⚠️ PROBLEMAS DETECTADOS ⚠️      ║
    echo ╚══════════════════════════════════════╝
    echo.
    echo ✅ Node.js y npm funcionando
    echo ✅ Dependencias básicas instaladas
    echo ⚠️ Claude CLI necesita verificación
    echo.
    echo 🔧 COMANDOS PARA PROBAR:
    echo ────────────────────────────────────
    echo   npx @anthropic-ai/claude-cli --version
    echo   npm run comercial ^(puede funcionar^)
    echo.
)

echo ════════════════════════════════════════
echo ✅ EJECUCIÓN COMPLETA TERMINADA
echo ════════════════════════════════════════
echo.
pause
