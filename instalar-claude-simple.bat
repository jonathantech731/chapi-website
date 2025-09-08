@echo off
echo ============================================
echo 🔧 INSTALACIÓN SIMPLE - CLAUDE CLI
echo ============================================

cd /d "d:\chapi-website"

echo 📍 Directorio: %CD%
echo.

echo 1️⃣ Instalando Claude CLI localmente...
npm install @anthropic-ai/claude-cli --save-dev

echo.
echo 2️⃣ Verificando instalación...
npx claude --version

echo.
echo 3️⃣ Probando ejecución directa...
npx @anthropic-ai/claude-cli --version

echo.
echo ============================================
echo ✅ INSTALACIÓN COMPLETADA
echo ============================================
echo.
echo 🚀 Para usar Claude CLI:
echo    npx claude --version
echo    npx claude auth
echo    npx claude --help
echo.
echo 🎯 Para el asistente comercial:
echo    npm run comercial
echo.
pause
