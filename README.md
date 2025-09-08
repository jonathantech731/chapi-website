# 🤖 CHAPI Website

<div align="center">

  ![CHAPI Banner](https://img.shields.io/badge/CHAPI-Chatbots_Inteligentes-2f7afe?style=for-the-badge&logo=robot&logoColor=white)
  ![Version](https://img.shields.io/badge/Version-2.0-00d4a6?style=for-the-badge)
  ![Status](https://img.shields.io/badge/Status-Activo-success?style=for-the-badge)
  ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployment-222?style=for-the-badge&logo=github&logoColor=white)

  **[🌐 Sitio en Vivo](https://chapibot.pro)** · **[📧 Contacto](mailto:soporte@chapibot.pro)**

</div>

---

## 📋 Descripción del Proyecto

**Landing page profesional para CHAPI** - La solución definitiva de chatbots inteligentes que automatiza ventas y soporte con IA conversacional avanzada, disponible 24/7.

Este repositorio contiene el código fuente del sitio web oficial de CHAPI, diseñado para convertir visitantes en clientes y mostrar todas las capacidades de nuestro sistema de chatbots.

## ✨ Características

### 🎨 **Diseño & UX**

- ✅ Diseño moderno y profesional
- ✅ Totalmente responsivo (mobile-first)
- ✅ Animaciones fluidas y transiciones suaves
- ✅ Optimizado para conversión
- ✅ Carga ultra-rápida

### 🔧 **Funcionalidades**

- ✅ Demo interactiva en tiempo real
- ✅ Formularios de contacto integrados
- ✅ Sistema de analytics avanzado
- ✅ Chat widget embebido
- ✅ Testimonios y casos de éxito
- ✅ **🤖 Asistente Virtual CHAPI completamente integrado**
- ✅ **🔄 Flujos conversacionales personalizados por sector**
- ✅ **🗄️ Gestión automática de leads**
- ✅ **📧 Notificaciones por email**
- ✅ **🔒 Backend FastAPI seguro con Azure OpenAI**

### 📊 **SEO & Performance**

- ✅ Optimizado para motores de búsqueda
- ✅ Meta tags dinámicos
- ✅ Schema markup
- ✅ Lighthouse Score 95+
- ✅ Core Web Vitals optimizados

## 🛠️ Stack Tecnológico

| Frontend | Herramientas | Deployment |
|----------|--------------|------------|
| HTML5 | VS Code | GitHub Pages |
| CSS3 (Variables nativas) | Git | Cloudflare CDN |
| JavaScript ES6+ | GitHub Actions | Custom Domain |

## 🚀 Instalación y Desarrollo

### **Prerequisitos**

- Git instalado
- **Python 3.8+ (para backend FastAPI)**
- Navegador web moderno
- Editor de código (VS Code recomendado)
- **Cuenta de Azure OpenAI activa**

### **🎯 Inicio Rápido - Integrado**

```powershell
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/chapi-website.git
cd chapi-website

# 2. Configurar el asistente automáticamente
.\configurar-seguridad.ps1

# 3. Iniciar todo el sistema integrado
.\start-chapi-integrated.ps1
```

**¡Eso es todo!** El script automático:


- ✅ Instala dependencias Python
- ✅ Configura variables de entorno
- ✅ Inicia backend FastAPI (puerto 8000)
- ✅ Inicia servidor web (puerto 3000)
- ✅ Abre automáticamente la landing page con asistente funcionando

### **🔧 Desarrollo Manual**

```bash
# Instalar dependencias Python
pip install -r requirements.txt

# Configurar .env
cp .env.example .env
# Editar .env con tus credenciales

# Iniciar backend
python chapi_proxy.py

# En otra terminal, iniciar frontend
python -m http.server 3000
```

## 🤖 Integración Azure OpenAI (Backend Seguro)

### **🔒 Arquitectura de Seguridad**

Este proyecto implementa una integración segura con Azure OpenAI que **NO expone claves API en el frontend**.

```
Frontend (JS) ──➤ Proxy Seguro (Python) ──➤ Azure OpenAI
     ❌ Sin API keys        ✅ API keys seguras
```

### **📁 Archivos Backend**

| Archivo | Descripción | Uso |
|---------|-------------|-----|
| `chapi_proxy.py` | Servidor FastAPI proxy seguro | Producción |
| `chapi_azure_openai.py` | Función centralizada Azure OpenAI | Shared library |
| `telegram_chapi_bot.py` | Bot de Telegram | Opcional |
| `assets/js/chat-api.js` | Cliente frontend para proxy | Frontend |
| `requirements.txt` | Dependencias Python | Instalación |
| `.env.example` | Variables de entorno template | Configuración |

### **⚙️ Configuración Rápida**


1. **Instalar dependencias Python:**

```bash
pip install -r requirements.txt
```


2. **Configurar variables de entorno:**

```bash
cp .env.example .env
# Editar .env con tus credenciales reales

```

3. **Iniciar el proxy seguro:**

```bash

python chapi_proxy.py
```

4. **Habilitar IA en frontend:**

```javascript
// En chapi-config.js
enableAI: true  // Ya no necesita API key aquí
```

### **🔐 Variables de Entorno Requeridas**

```bash
# Azure OpenAI (OBLIGATORIO)
AZURE_OPENAI_ENDPOINT=https://tu-recurso.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=gpt35-chapi
AZURE_OPENAI_KEY=tu-clave-azure-aqui

# CORS (OPCIONAL - por defecto chapibot.pro)
ALLOWED_ORIGINS=https://chapibot.pro,http://localhost:8000

# Bot Telegram (OPCIONAL)
TELEGRAM_BOT_TOKEN=tu-bot-token-aqui
```

### **🛡️ Características de Seguridad**

- ✅ **API keys solo en servidor** - Nunca en frontend
- ✅ **Rate limiting** - 60 requests/minuto por IP
- ✅ **CORS configurado** - Solo orígenes permitidos
- ✅ **Validación de entrada** - Previene inyecciones
- ✅ **Manejo de errores** - Sin exposición de datos internos
- ✅ **Timeouts configurables** - Previene hang requests
- ✅ **Logs detallados** - Para monitoring y debugging

### **🔄 Endpoints API Proxy**

| Endpoint | Método | Descripción |
|----------|--------|-------------|

| `/` | GET | Health check básico |
| `/health` | GET | Estado detallado del servicio |
| `/api/chat` | POST | Chat completions via Azure OpenAI |

**Ejemplo de request:**

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [
      {role: 'user', content: '¿Qué es CHAPI?'}
    ],
    max_tokens: 500,
    temperature: 0.2
  })

});
```

### **🔧 Desarrollo vs Producción**

**Desarrollo:**

```bash

# Iniciar proxy en puerto 8000
python chapi_proxy.py

# Frontend usa window.location.origin automaticamente
```

**Producción:**

```bash
# Variables de entorno en sistema/Docker
export AZURE_OPENAI_KEY="clave-real-aqui"
export ALLOWED_ORIGINS="https://chapibot.pro"
>

# Iniciar con gunicorn o similar
gunicorn chapi_proxy:app --host 0.0.0.0 --port 8000
```

### **⚠️ Seguridad Crítica**


> **🚨 IMPORTANTE:** Si alguna vez se expuso una API key en código público:
>
> 1. **Rotar la clave INMEDIATAMENTE** en Azure
> 2. Actualizar variables de entorno
> 3. Reiniciar servicios
> 4. Monitorear uso anómalo


**Nunca hagas esto:**

```javascript
❌ const apiKey = "sk-1234567890abcdef..."; // NUNCA en frontend
❌ fetch('https://api.openai.com/v1/...', {
     headers: { 'Authorization': `Bearer ${apiKey}` } // INSEGURO
   });
```

**Haz esto:**

```javascript
✅ const response = await fetch('/api/chat', { // Usar proxy local
     method: 'POST',
     body: JSON.stringify({messages: [...]})
   });
```


### **🤖 Bot de Telegram**

```bash
# Configurar bot token en .env
TELEGRAM_BOT_TOKEN=123456789:ABCDEF...

# Iniciar bot
python telegram_chapi_bot.py
```

**Comandos disponibles:**

- `/start` - Iniciar conversación
- `/planes` - Ver precios
- `/demo` - Solicitar demostración
- `/contacto` - Información de contacto

### **Deploy Automático**

El sitio se despliega automáticamente a través de GitHub Pages cuando se hace push a la rama `main`.

## 📁 Estructura del Proyecto

```
chapi-website/
├── 📄 index.html          # Página principal
├── 🎨 assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── icons/
├── 📚 docs/               # Documentación adicional
├── 🔧 .github/
│   └── workflows/         # GitHub Actions
├── 📋 README.md           # Este archivo

└── 📄 CNAME              # Configuración dominio personalizado
```

## 🎯 Roadmap

### **🚧 En Desarrollo**

- [ ] Sistema de blog integrado
- [ ] A/B testing para CTAs
- [ ] Calculadora de ROI interactiva
- [ ] Chat en vivo con IA

### **📅 Próximas Versiones**

- [ ] PWA (Progressive Web App)
- [ ] Modo oscuro/claro
- [ ] Multiidioma (EN/ES)
- [ ] Panel de administración

## 📈 Analytics y Métricas

| Métrica | Actual | Objetivo |
|---------|--------|----------|

| **Page Speed** | 95/100 | 98/100 |
| **Conversión** | 3.2% | 5% |
| **Bounce Rate** | 45% | <40% |
| **Mobile Score** | 92/100 | 95/100 |

## 🤝 Contribución

### **Para el equipo CHAPI:**

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-seccion`)
3. Commit cambios (`git commit -m 'Agregar nueva sección'`)
4. Push a la rama (`git push origin feature/nueva-seccion`)
5. Crear Pull Request

### **Estándares de código:**

<dev@chapibot.pro>

- Usar nomenclatura en e<soporte@chapibot.pro>SS
- Mantener estructura semántica HTML5
- Optimizar imágenes antes de subir
- Probar en múltiples dispositivos

## 📞 Contacto y Soporte

<div align="center">

**📧 Email Técnico:** <dev@chapibot.pro>
**📧 Email Comercial:** <soporte@chapibot.pro>
**🌐 Sitio Web:** [chapibot.pro](https://chapibot.pro)
**📍 Ubicación:** México 🇲🇽

</div>

## 📄 Licencia

Este proyecto está bajo Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

  **Desarrollado con ❤️ por el equipo CHAPI**

  <sub>© 2025 CHAPI - Todos los derechos reservados</sub>

</div>

## 🤖 Asistente Virtual CHAPI

### **✨ Nuevo: Widget de Chat Inteligente**

- ✅ **Asistente personalizado** integrado en la página
- ✅ **Respuestas inteligentes** basadas en IA y palabras clave
- ✅ **Diseño profesional** con colores corporativos CHAPI
- ✅ **Totalmente personalizable** desde archivos de configuración
- ✅ **Soporte OpenAI** opcional para respuestas avanzadas

### **📁 Archivos del Asistente**

```
assets/
├── css/chapi-assistant.css     # Estilos del widget
└── js/
    ├── chapi-config.js         # Configuración personalizable
    └── chapi-assistant.js      # Lógica principal
```

### **🎯 Funcionalidades del Asistente**

- 💬 Respuestas automáticas a preguntas frecuentes
- 🚀 Guía para creación de flujos de ventas
- 💰 Información de planes y precios
- 📱 Enlaces directos a demos
- 📞 Conexión con soporte humano
- 🎨 Interfaz adaptada a tu marca

**📖 Documentación completa:** [docs/CHAPI_ASSISTANT_GUIDE.md](docs/CHAPI_ASSISTANT_GUIDE.md)

## 🎬 Video Demo Integrado

> **¡NUEVO!** Ahora puedes ver el asistente CHAPI en acción directamente en la página principal.

- ✅ Video de demostración embebido en la sección "Demo"
- ✅ Diseño responsivo y profesional
- ✅ Ubicación estratégica junto a los botones de prueba
- ✅ URL del video: [https://youtu.be/kxe0WOkGOvE?si=W9t77Xo9e6tjJBJB](https://youtu.be/kxe0WOkGOvE?si=W9t77Xo9e6tjJBJB)
- ✅ Archivo de prueba: `test-video-demo.html`

### ¿Cómo probar el video demo?

1. Abre `test-video-demo.html` en tu navegador para verificar la integración local
2. Sube los archivos a Hostinger y Railway siguiendo la guía de deployment
3. Verifica que el video aparece correctamente en chapibot.pro

---
