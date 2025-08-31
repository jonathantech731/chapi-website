# 🤖 CHAPI Assistant - Guía de Integración Completa

## 📋 Resumen de Implementación

Tu asistente conversacional **CHAPI** está **completamente implementado** e integrado en la landing page. Aquí tienes la guía completa para entender y personalizar el sistema.

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────┐    WebSocket/HTTPS    ┌─────────────────────┐    Secure API    ┌──────────────────┐
│                     │◄────────────────────►│                     │◄─────────────────►│                  │
│   LANDING PAGE      │                       │   CHAPI PROXY       │                   │  AZURE OPENAI    │
│                     │                       │   (FastAPI)         │                   │                  │
│ • Widget Flotante   │                       │                     │                   │ • GPT-4o         │
│ • CSS Integrado     │                       │ • Flujos YAML       │                   │ • Embeddings     │
│ • JavaScript        │                       │ • SQLite Storage    │                   │ • Moderation     │
│ • Responsive        │                       │ • Email Notif.      │                   │                  │
└─────────────────────┘                       └─────────────────────┘                   └──────────────────┘
                                                        │
                                                        ▼
                                              ┌─────────────────────┐
                                              │   LEAD MANAGEMENT   │
                                              │                     │
                                              │ • SQLite Database   │
                                              │ • Email Alerts      │
                                              │ • Analytics         │
                                              │ • Export Data       │
                                              └─────────────────────┘
```

---

## 🚀 Cómo Iniciar el Sistema

### Opción 1: Inicio Automático (Recomendado)

```powershell
# Ejecuta este comando en PowerShell
.\start-chapi-integrated.ps1
```

**¿Qué hace este script?**
- ✅ Verifica dependencias (Python, librerías)
- ✅ Carga configuración desde `.env`
- ✅ Inicia backend FastAPI en puerto 8000
- ✅ Inicia servidor web en puerto 3000
- ✅ Verifica conectividad con Azure OpenAI
- ✅ Abre automáticamente la landing page

### Opción 2: Inicio Manual

```powershell
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Configurar variables de entorno
.\configurar-seguridad.ps1

# 3. Iniciar backend
python chapi_proxy.py

# 4. En otra terminal, iniciar frontend
python -m http.server 3000
```

---

## 🔧 Configuración del Asistente

### 📁 Archivos Principales

| Archivo | Función | Ubicación |
|---------|---------|-----------|
| `index.html` | Landing page con widget integrado | Raíz |
| `chapi-assistant.js` | Lógica del widget frontend | `assets/js/` |
| `chapi-config.js` | Configuración y respuestas | `assets/js/` |
| `chapi-assistant-integrated.css` | Estilos del widget | `assets/css/` |
| `chapi_proxy.py` | Backend FastAPI con flujos | Raíz |
| `flows.yaml` | Flujos conversacionales | Raíz |
| `.env` | Variables de entorno seguras | Raíz |

### 🎨 Personalización del Widget

**Editar `assets/js/chapi-assistant.js`:**

```javascript
// Configuración del asistente
const config = {
    botName: 'Tu Asistente',
    companyName: 'Tu Empresa',
    welcomeMessage: '¡Hola! ¿Cómo puedo ayudarte?',
    theme: 'dark', // 'dark' o 'light'
    language: 'es', // 'es' o 'en'
    apiUrl: '/api/chat'
};
```

**Personalizar colores en `assets/css/chapi-assistant-integrated.css`:**

```css
:root {
  --chapi-primary: #2f7afe;      /* Color principal */
  --chapi-secondary: #00d4a6;    /* Color secundario */
  --chapi-bg-dark: #0a0d14;      /* Fondo oscuro */
  --chapi-text-primary: #e8eef8; /* Texto principal */
}
```

---

## 📋 Flujos Conversacionales

### 🔄 Estructura de `flows.yaml`

```yaml
flows:
  main_flow:
    steps:
      - id: "welcome"
        message: "¡Hola! 👋 Soy CHAPI..."
        options:
          - text: "🍕 Restaurante"
            next: "sector_restaurant"
          - text: "🛒 E-commerce"
            next: "sector_ecommerce"
```

### ✏️ Personalizar por Sector

**Para agregar un nuevo sector:**

1. **Edita `flows.yaml`:**

```yaml
- id: "sector_tecnologia"
  sector: "tecnologia"
  message: "💻 **¡Perfecto! Especialista en tech.**\n\nAutomatizamos:\n• Soporte técnico 24/7\n• Onboarding de usuarios\n• Demos de productos\n\n**📊 ¿Cuántos tickets de soporte reciben al día?**"
  input_type: "number"
  next: "daily_queries"
```

2. **Agrega la opción en welcome:**

```yaml
- text: "💻 Tecnología/Software"
  next: "sector_tecnologia"
```

### 🎯 Personalizar Respuestas por Industria

**Edita `assets/js/chapi-config.js`:**

```javascript
customResponses: {
    'tecnologia|software|saas|desarrollo': `
        💻 <strong>¡Excelente! Especialista en tech.</strong>
        <br><br>
        Automatizo:
        <br>• Soporte técnico inteligente
        <br>• Onboarding de usuarios
        <br>• Demos personalizadas
        <br><br>
        📊 <strong>Cuéntame sobre tu producto:</strong>
        <br>1️⃣ <strong>¿Qué tipo de software/servicio desarrollan?</strong>
        <br>2️⃣ <strong>¿Cuántos usuarios/clientes atienden?</strong>
    `
}
```

---

## 🗄️ Gestión de Leads

### 📊 Base de Datos SQLite

**Ubicación:** `chapi_leads.db` (se crea automáticamente)

**Tablas principales:**
- `conversations` - Historial de conversaciones
- `leads` - Información de leads calificados
- `analytics` - Métricas de uso

### 📧 Notificaciones por Email

**Configurar en `.env`:**

```bash
# Email para notificaciones de leads
NOTIFICATION_EMAIL=admin@tuempresa.com
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tubot@tuempresa.com
SMTP_PASSWORD=tu_password_app
```

### 📈 Exportar Datos de Leads

```python
# Script para exportar leads
python -c "
import sqlite3
import csv

conn = sqlite3.connect('chapi_leads.db')
cursor = conn.cursor()
cursor.execute('SELECT * FROM leads')

with open('leads_export.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['ID', 'Sector', 'Consultas', 'Objetivo', 'Fecha'])
    writer.writerows(cursor.fetchall())

print('✅ Leads exportados a leads_export.csv')
"
```

---

## 🔒 Seguridad y Variables de Entorno

### 📝 Configuración de `.env`

```bash
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://tu-recurso.openai.azure.com/
AZURE_OPENAI_API_KEY=tu_clave_super_secreta
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o
AZURE_OPENAI_API_VERSION=2024-02-15-preview

# Server Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=false

# Security
ALLOWED_ORIGINS=https://chapibot.pro,http://localhost:3000
RATE_LIMIT_REQUESTS=60
RATE_LIMIT_WINDOW=1

# Email Notifications
NOTIFICATION_EMAIL=admin@tuempresa.com
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tubot@tuempresa.com
SMTP_PASSWORD=tu_password_app
```

### 🔄 Rotación de Claves de Seguridad

```powershell
# Script de emergencia para rotar claves
.\emergencia-rotar-clave.bat
```

**¿Cuándo rotar?**
- ✅ Cada 90 días (rutina)
- ⚠️ Si sospechas compromiso
- 🔧 Cambio de equipo de desarrollo
- 🔍 Antes de auditorías

---

## 🌐 Integración Multi-Canal

### 📱 Bot de Telegram

**Archivo:** `telegram_chapi_bot.py`

```python
# Configurar webhook de Telegram
TOKEN = "tu_token_de_bot"
WEBHOOK_URL = "https://tu-dominio.com/telegram/webhook"
```

### 💬 WhatsApp Business API

**Próximamente:** Integración con Twilio/Meta Business API

---

## 📊 Analytics y Métricas

### 🔍 Endpoints de Monitoreo

| Endpoint | Función |
|----------|---------|
| `/health` | Estado del sistema |
| `/stats` | Métricas de uso |
| `/api/analytics` | Datos de conversaciones |

### 📈 Métricas Disponibles

- **Conversaciones por día**
- **Sectores más consultados**
- **Rate de conversión por flujo**
- **Tiempo promedio de respuesta**
- **Leads calificados**

---

## 🛠️ Troubleshooting Común

### ❌ Error: "No se puede conectar al backend"

```bash
# Verificar que el backend esté corriendo
curl http://localhost:8000/health

# Si no responde, iniciar manualmente:
python chapi_proxy.py
```

### ❌ Error: "OpenAI API Key inválida"

```powershell
# Ejecutar configurador de seguridad
.\configurar-seguridad.ps1
```

### ❌ Widget no aparece en la landing

```javascript
// Verificar en DevTools Console
console.log('CHAPI Assistant loaded:', typeof ChapiAssistant);

// Forzar reinicialización
new ChapiAssistant({
    botName: 'CHAPI Test'
});
```

### ❌ Flujos no se cargan correctamente

```yaml
# Verificar sintaxis YAML
python -c "import yaml; print('✅ flows.yaml es válido' if yaml.safe_load(open('flows.yaml')) else '❌ Error en YAML')"
```

---

## 🚀 Despliegue en Producción

### 🌐 Servidor Web (Apache/Nginx)

```nginx
# Configuración Nginx
server {
    listen 80;
    server_name chapibot.pro;

    location / {
        root /var/www/chapi-website;
        index index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 🐳 Docker (Opcional)

```dockerfile
# Dockerfile para producción
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "chapi_proxy:app", "--host", "0.0.0.0", "--port", "8000"]
```

### ☁️ Azure App Service

```bash
# Desplegar a Azure
az webapp up --name chapi-assistant --resource-group mi-grupo
```

---

## 📞 Soporte y Recursos

### 🎯 Comunidad CHAPI

- 📧 **Email:** soporte@chapibot.pro
- 💬 **Chat:** Widget en [chapibot.pro](https://chapibot.pro)
- 📱 **WhatsApp:** +52 123 456 7890
- 📚 **Docs:** [docs.chapibot.pro](https://docs.chapibot.pro)

### 🔗 Enlaces Útiles

- [📖 API Reference](https://api.chapibot.pro)
- [🛠️ GitHub Repository](https://github.com/chapi-team)
- [📺 Video Tutorials](https://youtube.com/c/ChapiBotPro)
- [💬 Discord Community](https://discord.gg/chapi)

---

## ✅ Checklist de Verificación

### 🔧 Desarrollo Local

- [ ] ✅ Python 3.8+ instalado
- [ ] ✅ Dependencias instaladas (`pip install -r requirements.txt`)
- [ ] ✅ Archivo `.env` configurado
- [ ] ✅ Azure OpenAI funcionando
- [ ] ✅ Backend corriendo en puerto 8000
- [ ] ✅ Frontend corriendo en puerto 3000
- [ ] ✅ Widget visible en landing page
- [ ] ✅ Flujos conversacionales funcionando
- [ ] ✅ Almacenamiento de leads activo

### 🌐 Producción

- [ ] ✅ Dominio configurado
- [ ] ✅ Certificado SSL activo
- [ ] ✅ Backend en servidor seguro
- [ ] ✅ Base de datos con backup
- [ ] ✅ Monitoreo configurado
- [ ] ✅ Logs de error activos
- [ ] ✅ Rate limiting configurado
- [ ] ✅ Notificaciones email funcionando

---

## 🎉 ¡Tu CHAPI Assistant Está Listo!

**Tu asistente conversacional está completamente implementado y funcionando.**

### 🚀 Próximos Pasos Recomendados:

1. **Personaliza los flujos** según tu industria específica
2. **Agrega más sectores** en `flows.yaml`
3. **Configura las notificaciones** por email
4. **Prueba el sistema** con diferentes escenarios
5. **Despliega en producción** cuando esté listo

### 💡 Funcionalidades Avanzadas Disponibles:

- ✅ **Multi-idioma** (ES/EN)
- ✅ **Dark/Light mode**
- ✅ **Respuestas offline** si backend no disponible
- ✅ **Analytics detallados**
- ✅ **Integración con CRM** via API
- ✅ **Escalamiento automático**

---

*¿Necesitas ayuda con la personalización? Contacta al equipo CHAPI para soporte especializado.*

**© 2025 CHAPI Team - Tu Asistente Inteligente está listo para revolucionar tu negocio** 🚀
