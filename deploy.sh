#!/bin/bash

# 🚀 CHAPI Assistant - Script de Despliegue Automatizado
# Este script prepara todos los archivos para producción

echo "🤖 ======================================"
echo "   CHAPI Assistant - Deployment Script"
echo "======================================"
echo ""

# Crear directorio de despliegue
echo "📁 Creando estructura de archivos..."
mkdir -p deploy/frontend
mkdir -p deploy/backend

# Preparar Frontend
echo "🌐 Preparando archivos frontend..."
cp index-production.html deploy/frontend/index.html
cp -r assets deploy/frontend/
cp assets/js/chapi-config-production.js deploy/frontend/assets/js/chapi-config.js

# Preparar Backend
echo "🔧 Preparando archivos backend..."
cp production_server.py deploy/backend/
cp .env.production deploy/backend/.env
cp requirements-production.txt deploy/backend/requirements.txt
cp Procfile deploy/backend/
cp runtime.txt deploy/backend/

echo ""
echo "✅ ======================================"
echo "   Archivos listos para despliegue"
echo "======================================"
echo ""
echo "📂 Frontend files: ./deploy/frontend/"
echo "   → Subir a Hostinger public_html/"
echo ""
echo "📂 Backend files: ./deploy/backend/"
echo "   → Desplegar en Railway/Render/Vercel"
echo ""
echo "🌐 URLs esperadas:"
echo "   Frontend: https://chapibot.pro"
echo "   Backend:  https://api.chapibot.pro"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Subir frontend a Hostinger"
echo "   2. Crear repo GitHub para backend"
echo "   3. Conectar Railway/Render al repo"
echo "   4. Configurar variables de entorno"
echo "   5. Configurar DNS CNAME para api.chapibot.pro"
echo ""
echo "🎉 ¡Listo para producción!"
