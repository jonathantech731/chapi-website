@echo off
echo 🤖 ======================================
echo    CHAPI Assistant - Deployment Script
echo ======================================
echo.

REM Crear directorios de despliegue
echo 📁 Creando estructura de archivos...
if not exist deploy mkdir deploy
if not exist deploy\frontend mkdir deploy\frontend
if not exist deploy\backend mkdir deploy\backend

REM Preparar Frontend
echo 🌐 Preparando archivos frontend...
copy index-production.html deploy\frontend\index.html
xcopy assets deploy\frontend\assets\ /s /e /y
copy assets\js\chapi-config-production.js deploy\frontend\assets\js\chapi-config.js

REM Preparar Backend
echo 🔧 Preparando archivos backend...
copy production_server.py deploy\backend\
copy .env.production deploy\backend\.env
copy requirements-production.txt deploy\backend\requirements.txt
copy Procfile deploy\backend\
copy runtime.txt deploy\backend\

echo.
echo ✅ ======================================
echo    Archivos listos para despliegue
echo ======================================
echo.
echo 📂 Frontend files: .\deploy\frontend\
echo    → Subir a Hostinger public_html/
echo.
echo 📂 Backend files: .\deploy\backend\
echo    → Desplegar en Railway/Render/Vercel
echo.
echo 🌐 URLs esperadas:
echo    Frontend: https://chapibot.pro
echo    Backend:  https://api.chapibot.pro
echo.
echo 📋 Próximos pasos:
echo    1. Subir frontend a Hostinger
echo    2. Crear repo GitHub para backend
echo    3. Conectar Railway/Render al repo
echo    4. Configurar variables de entorno
echo    5. Configurar DNS CNAME para api.chapibot.pro
echo.
echo 🎉 ¡Listo para producción!
echo.
pause
