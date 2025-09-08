@echo off
setlocal enabledelayedexpansion

echo ==================================echo ❌ Todos los métodos fallaron
echo ERROR: Todos los métodos fallaron >> %LOGFILE%
echo 📝 Revisa el archivo: %LOGFILE%
echo 🔧 Ejecuta como Administrador y reinicia la terminal
pause
goto :EOF====
echo 🚀 EJECUTOR AUTOMÁTICO - CLAUDE CLI SETUP
echo ============================================

cd /d "d:\chapi-website"

echo.
echo 📍 Directorio actual: %CD%
echo.

:: Crear archivo de log
set LOGFILE=installation-log.txt
echo Instalación iniciada el %DATE% %TIME% > %LOGFILE%

echo 1️⃣ Verificando Node.js...
node --version >> %LOGFILE% 2>&1
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js no encontrado. Descargando...
    echo ERROR: Node.js no encontrado >> %LOGFILE%
    echo Visitando https://nodejs.org para descargar Node.js...
    start https://nodejs.org
    pause
    goto :EOF
)

echo 2️⃣ Verificando npm...
npm --version >> %LOGFILE% 2>&1
npm --version
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm no encontrado
    echo ERROR: npm no encontrado >> %LOGFILE%
    pause
    goto :EOF
)

echo 3️⃣ Limpiando cache de npm...
echo Ejecutando: npm cache clean --force >> %LOGFILE%
call npm cache clean --force >> %LOGFILE% 2>&1

echo 4️⃣ Instalando dependencias del proyecto...
echo Ejecutando: npm install >> %LOGFILE%
call npm install >> %LOGFILE% 2>&1

echo 5️⃣ Instalando Claude CLI globalmente...
echo Ejecutando: npm install -g @anthropic-ai/claude-cli >> %LOGFILE%
call npm install -g @anthropic-ai/claude-cli >> %LOGFILE% 2>&1

echo 6️⃣ Verificando Claude CLI global...
echo Ejecutando: claude --version >> %LOGFILE%
call claude --version >> %LOGFILE% 2>&1
call claude --version
if %ERRORLEVEL% EQU 0 (
    echo ✅ Claude CLI instalado globalmente!
    echo SUCCESS: Claude CLI global funciona >> %LOGFILE%
    goto :success
)

echo 7️⃣ Instalando Claude CLI localmente...
echo Ejecutando: npm install @anthropic-ai/claude-cli --save-dev >> %LOGFILE%
call npm install @anthropic-ai/claude-cli --save-dev >> %LOGFILE% 2>&1

echo 8️⃣ Verificando Claude CLI con npx...
echo Ejecutando: npx claude --version >> %LOGFILE%
call npx claude --version >> %LOGFILE% 2>&1
call npx claude --version
if %ERRORLEVEL% EQU 0 (
    echo ✅ Claude CLI disponible con npx!
    echo SUCCESS: Claude CLI npx funciona >> %LOGFILE%
    goto :success
)

echo 9️⃣ Probando ejecución directa...
echo Ejecutando: npx @anthropic-ai/claude-cli --version >> %LOGFILE%
call npx @anthropic-ai/claude-cli --version >> %LOGFILE% 2>&1
call npx @anthropic-ai/claude-cli --version
if %ERRORLEVEL% EQU 0 (
    echo ✅ Claude CLI funciona con ejecución directa!
    echo SUCCESS: Claude CLI directo funciona >> %LOGFILE%
    goto :success
)

echo ❌ Todos los métodos fallaron
echo ERROR: Todos los métodos fallaron >> %LOGFILE%
echo � Revisa el archivo: %LOGFILE%
echo �🔧 Ejecuta como Administrador y reinicia la terminal
pause
goto :EOF

:success
echo.
echo ============================================
echo 🎉 CLAUDE CLI INSTALADO EXITOSAMENTE
echo ============================================
echo.
echo 🚀 Comandos disponibles:
echo    claude --help
echo    claude auth
echo    claude chat
echo.
echo 📝 O usa con npx:
echo    npx claude --help
echo    npx claude auth
echo    npx claude chat
echo.
echo 🔧 Configuración siguiente:
echo    Ejecuta: claude auth (o npx claude auth)
echo.
echo SUCCESS: Instalación completada exitosamente >> %LOGFILE%
echo 📝 Log guardado en: %LOGFILE%
pause
