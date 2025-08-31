@echo off
echo ============================================
echo 🔍 VERIFICACIÓN RÁPIDA - CLAUDE CLI
echo ============================================

cd /d "d:\chapi-website"

echo.
echo 📍 Directorio: %CD%
echo 📍 Fecha/Hora: %DATE% %TIME%
echo.

echo 🔍 Verificando estado actual...
echo.

echo 1. Node.js:
node --version 2>nul && echo ✅ Node.js OK || echo ❌ Node.js NO DISPONIBLE

echo.
echo 2. npm:
npm --version 2>nul && echo ✅ npm OK || echo ❌ npm NO DISPONIBLE

echo.
echo 3. Claude CLI (global):
claude --version 2>nul && echo ✅ Claude global OK || echo ❌ Claude global NO DISPONIBLE

echo.
echo 4. Claude CLI (npx):
npx claude --version 2>nul && echo ✅ Claude npx OK || echo ❌ Claude npx NO DISPONIBLE

echo.
echo 5. Claude CLI (directo):
npx @anthropic-ai/claude-cli --version 2>nul && echo ✅ Claude directo OK || echo ❌ Claude directo NO DISPONIBLE

echo.
echo 6. Dependencias:
if exist "node_modules" (echo ✅ node_modules existe) else (echo ❌ node_modules NO EXISTE)
if exist "package.json" (echo ✅ package.json existe) else (echo ❌ package.json NO EXISTE)

echo.
echo ============================================
echo 🚀 EJECUTANDO INSTALACIÓN AUTOMÁTICA...
echo ============================================
echo.

echo Instalando Claude CLI...
npm install @anthropic-ai/claude-cli --save-dev

echo.
echo Verificando instalación...
npx claude --version

echo.
echo ============================================
echo ✅ PROCESO COMPLETADO
echo ============================================
echo.
echo 🎯 Para usar Claude CLI:
echo    npx claude --help
echo    npx claude auth
echo    npx claude chat
echo.
echo 🎯 Para iniciar el asistente:
echo    npm run comercial
echo.
pause
