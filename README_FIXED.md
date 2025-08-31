# 🤖 CHAPI Website

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
- ✅ **🤖 Asistente Virtual CHAPI integrado**

### 📊 **SEO & Performance**

- ✅ Optimizado para motores de búsqueda
- ✅ Meta tags dinámicos
- ✅ Schema markup
- ✅ Lighthouse Score 95+
- ✅ Core Web Vitals optimizados

## 🛠️ Stack Tecnológico

```javascript
{
  "frontend": ["HTML5", "CSS3", "JavaScript ES6+"],
  "frameworks": ["Bootstrap 5", "AOS Animations"],
  "tools": ["VS Code", "Git", "GitHub Pages"],
  "apis": ["OpenAI", "WhatsApp Business", "Telegram"],
  "analytics": ["Google Analytics", "Google Tag Manager"]
}
```

## 🚀 Inicio Rápido

### **Opción 1: Desarrollo Local**

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/chapi-website.git

# Navegar al directorio
Set-Location chapi-website

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### **Opción 2: GitHub Pages**

```bash
# Fork del repositorio
# Habilitar GitHub Pages en Settings
# Tu sitio estará disponible en: https://tu-usuario.github.io/chapi-website
```

### **Opción 3: Servidor Local Python**

```bash
# Usando Python 3.x
python -m http.server 8000

# Usando Python 2.x
python -m SimpleHTTPServer 8000
```

## 📁 Estructura del Proyecto

```text
chapi-website/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   ├── chapi-assistant.css
│   │   └── chapi-assistant-pro.css
│   ├── js/
│   │   ├── chapi-assistant.js
│   │   ├── chapi-config.js
│   │   └── chapi-persuasion-engine.js
│   ├── images/
│   └── data/
│       └── casos-exito.js
├── components/
├── docs/
├── test-assistant.html        # Página de prueba del asistente
└── package.json
```

## 🔧 Configuración

### **Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
OPENAI_API_KEY=tu_api_key_aqui
WHATSAPP_TOKEN=tu_token_whatsapp
TELEGRAM_BOT_TOKEN=tu_token_telegram
GOOGLE_ANALYTICS_ID=tu_ga_id
```

### **Personalización del Asistente**

Edita `assets/js/chapi-config.js`:

```javascript
const chapiConfig = {
  apiKey: 'tu-api-key',
  botName: 'CHAPI Assistant',
  language: 'es',
  personality: 'profesional-mexicano',
  features: {
    voice: true,
    images: true,
    documents: true
  }
};
```

## 🧪 Testing

### **Pruebas Locales**

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas específicas
npm run test:assistant
npm run test:integration
```

### **Validación HTML/CSS**

```bash
# Validar HTML
npx html-validate index.html

# Validar CSS
npx stylelint "assets/css/*.css"
```

## 📱 Demo en Vivo

### **Asistente Virtual**

1. **Visita**: [https://chapibot.pro/test-assistant.html](https://chapibot.pro/test-assistant.html)
2. **Prueba comandos**:
   - "Hola" - Saludo inicial
   - "¿Qué es CHAPI?" - Información del producto
   - "Precios" - Planes y precios
   - "Demo" - Solicitar demostración

### **Funciones Avanzadas**

- 🗣️ **Comando de voz**: "Activar voz"
- 📊 **Analytics**: "Ver estadísticas"
- 🛒 **E-commerce**: "Integrar tienda"
- 📅 **Calendario**: "Agendar reunión"

## 🌟 Casos de Uso

### **Restaurantes**

- Automatización de pedidos
- Menú digital interactivo
- Reservas automáticas
- Promociones personalizadas

### **E-commerce**

- Asistente de compras
- Recuperación de carritos abandonados
- Recomendaciones personalizadas
- Soporte 24/7

### **Servicios Profesionales**

- Calificación de leads
- Agendamiento automático
- Seguimiento de clientes
- Automatización de propuestas

### **Inmobiliarias**

- Filtrado de propiedades
- Tours virtuales
- Calificación financiera
- Seguimiento de interesados

## 🤝 Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. **Commit** tus cambios (`git commit -am 'Agregar nueva característica'`)
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`)
5. **Abre** un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte y Contacto

### **Soporte Técnico**

- **Email**: [soporte@chapibot.pro](mailto:soporte@chapibot.pro)
- **WhatsApp**: +52 222 858 8674
- **Telegram**: @Womiie_bot

### **Ventas**

- **Email**: [ventas@chapibot.pro](mailto:ventas@chapibot.pro)
- **WhatsApp Business**: +52 222 858 8674

### **Redes Sociales**

- **LinkedIn**: [linkedin.com/company/chapibot](https://linkedin.com/company/chapibot)
- **Twitter**: [@chapibot_pro](https://twitter.com/chapibot_pro)
- **YouTube**: [youtube.com/chapibot](https://youtube.com/chapibot)

---

**Desarrollado con ❤️ por el equipo de CHAPI**

*Transformando la comunicación empresarial con inteligencia artificial*
