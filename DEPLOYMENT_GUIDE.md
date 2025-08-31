# 🚀 CHAPI Assistant - Archivos de Producción

## 📁 Estructura para Despliegue

### Frontend (Subir a Hostinger):
```
📂 public_html/
├── index.html (usar index-production.html)
├── assets/
│   ├── css/
│   │   └── chapi-assistant-pro.css
│   └── js/
│       ├── chapi-config-production.js (renombrar a chapi-config.js)
│       └── chapi-assistant.js
└── CNAME (si usas GitHub Pages)
```

### Backend (Desplegar en la nube):
- `production_server.py` - Servidor optimizado
- `.env.production` - Variables de entorno
- `requirements-production.txt` - Dependencias

## 🌐 Opciones de Despliegue Backend

### 1️⃣ Railway (Recomendado - Gratis)
- Conecta tu GitHub
- Auto-deploy desde repo
- URL automática: `https://tu-app.railway.app`

### 2️⃣ Render (Gratis)
- Conecta GitHub
- Plan gratuito disponible
- SSL automático

### 3️⃣ Vercel (Para Node.js/Python)
- Despliegue automático
- Excelente para APIs

### 4️⃣ Azure/AWS (Profesional)
- Mayor control y escalabilidad
- Costos variables

## ⚙️ Configuración DNS

En tu panel de Hostinger, agregar:

```
Tipo: CNAME
Nombre: api
Apunta a: tu-backend-url.railway.app
TTL: 300
```

Esto creará: `https://api.chapibot.pro`

## 🔧 Variables de Entorno Backend

```env
OPENAI_API_KEY=tu_api_key_real
OPENAI_MODEL=gpt-4o-mini
ENVIRONMENT=production
DEBUG=false
PORT=8000
HOST=0.0.0.0
```

## 📋 Pasos de Despliegue

### Paso 1: Preparar Frontend
1. Subir archivos a Hostinger via FileManager
2. Usar `index-production.html` como `index.html`
3. Usar `chapi-config-production.js` como `chapi-config.js`

### Paso 2: Desplegar Backend
1. Crear cuenta en Railway/Render
2. Conectar repositorio GitHub
3. Configurar variables de entorno
4. Deploy automático

### Paso 3: Configurar DNS
1. En Hostinger DNS Manager
2. Agregar CNAME para `api` → backend URL
3. Esperar propagación (5-30 min)

### Paso 4: Verificar
1. Frontend: `https://chapibot.pro`
2. Backend: `https://api.chapibot.pro/health`
3. Chat funcionando end-to-end

## 🎯 URLs Finales

- **Website**: https://chapibot.pro
- **API**: https://api.chapibot.pro
- **Docs**: https://api.chapibot.pro/docs
- **Health**: https://api.chapibot.pro/health

## 🔍 Testing

```bash
# Verificar frontend
curl https://chapibot.pro

# Verificar backend
curl https://api.chapibot.pro/health

# Test de chat
curl -X POST https://api.chapibot.pro/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola, ¿cómo funcionan?"}'
```

## 📞 Soporte

Si necesitas ayuda con el despliegue:
- Revisar logs en la plataforma cloud
- Verificar variables de entorno
- Confirmar DNS propagation
- Verificar CORS origins

---

**¡Todo listo para producción! 🎉**
