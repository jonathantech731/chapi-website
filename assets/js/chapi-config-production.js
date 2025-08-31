/**
 * 🤖 CHAPI Assistant - Configuración de Producción
 * Configuración optimizada para chapibot.pro
 */

window.CHAPI_CONFIG = {
  // Configuración del asistente
  botName: 'CHAPI - Asistente IA',
  botAvatar: '🤖',

  // URLs de producción
  apiUrl: 'https://api.chapibot.pro', // Backend API
  websiteUrl: 'https://chapibot.pro',

  // Configuración de la interfaz
  theme: {
    primaryColor: '#2f7afe',
    secondaryColor: '#00d4a6',
    backgroundColor: '#0a0d14',
    textColor: '#e8eef8',
    borderRadius: '16px'
  },

  // Configuración de comportamiento
  autoOpen: false,
  showNotification: true,
  typingDelay: 1000,
  maxMessages: 50,

  // Mensajes del sistema
  messages: {
    welcome: `
            ¡Hola! 👋 Soy <strong>CHAPI</strong>, tu asistente de IA especializado en automatización empresarial.
            <br><br>
            🎯 <strong>¿En qué puedo ayudarte hoy?</strong>
            <br><br>
            • Información sobre chatbots para tu negocio
            <br>• Demostración de nuestros asistentes
            <br>• Precios y planes disponibles
            <br>• Casos de éxito de nuestros clientes
        `,

    offline: `
            ⚠️ <strong>Estoy en modo demo.</strong>
            <br><br>
            Puedo responder preguntas básicas sobre CHAPI, pero para una experiencia completa con IA,
            nuestros servidores necesitan estar activos.
            <br><br>
            <strong>¿Te gustaría agendar una demo personalizada?</strong>
        `,

    error: `
            😅 <strong>Ups, algo salió mal.</strong>
            <br><br>
            No te preocupes, puedes:
            <br>• Intentar reenviar el mensaje
            <br>• Contactarnos directamente
            <br>• Agendar una llamada personalizada
        `,

    connecting: '🔗 Conectando con la IA...',
    typing: '✍️ CHAPI está escribiendo...'
  },

  // Acciones rápidas actualizadas para producción
  quickActions: [
    {
      text: '🏢 Para mi negocio',
      action: 'sendMessage',
      payload: 'Necesito un chatbot para mi negocio'
    },
    {
      text: '💰 Ver precios',
      action: 'sendMessage',
      payload: '¿Cuáles son sus precios y planes?'
    },
    {
      text: '📞 Agendar demo',
      action: 'sendMessage',
      payload: 'Me gustaría agendar una demostración personalizada'
    },
    {
      text: '📊 Casos de éxito',
      action: 'sendMessage',
      payload: 'Muéstrame casos de éxito de sus clientes'
    }
  ],

  // Respuestas automáticas mejoradas
  customResponses: {
    // Respuestas especializadas por sector
    'restaurante|comida|delivery|cocina|menu|pedidos': `
            🍕 <strong>¡Perfecto! Especialista en chatbots para restaurantes.</strong>
            <br><br>
            Nuestros asistentes automatizan:
            <br>• 📱 Toma de pedidos 24/7 vía WhatsApp/Web
            <br>• 🍽️ Menú interactivo con fotos y precios
            <br>• 🚚 Cálculo automático de delivery
            <br>• ✅ Confirmación y seguimiento de órdenes
            <br><br>
            📊 <strong>Resultados típicos:</strong>
            <br>• +40% en pedidos automatizados
            <br>• -70% en tiempo de respuesta
            <br>• +30% en ticket promedio
            <br><br>
            <strong>¿Te gustaría ver una demo personalizada para restaurantes?</strong>
        `,

    'ecommerce|tienda|online|venta|productos|negocio': `
            🛒 <strong>¡Excelente! Experto en chatbots para e-commerce.</strong>
            <br><br>
            Automatizamos:
            <br>• 🔍 Catálogo con búsqueda inteligente
            <br>• 🛍️ Proceso de compra guiado
            <br>• 📦 Seguimiento automático de pedidos
            <br>• 💬 Soporte post-venta 24/7
            <br><br>
            📊 <strong>Resultados promedio:</strong>
            <br>• +50% en conversión
            <br>• +35% en ventas automáticas
            <br>• -80% en consultas manuales
            <br><br>
            <strong>¿Qué tipo de productos vendes? Te muestro ejemplos específicos.</strong>
        `,

    'salud|medico|clinica|consultorio|pacientes': `
            🏥 <strong>¡Ideal! Especializados en chatbots para el sector salud.</strong>
            <br><br>
            Automatizamos:
            <br>• 📅 Agendamiento de citas 24/7
            <br>• 📋 Recordatorios automáticos
            <br>• ❓ Triaje inicial de síntomas
            <br>• 📱 Seguimiento post-consulta
            <br><br>
            📊 <strong>Beneficios comprobados:</strong>
            <br>• +60% en citas agendadas automáticamente
            <br>• -90% en llamadas de agendamiento
            <br>• +25% en adherencia a tratamientos
            <br><br>
            <strong>¿Es clínica, consultorio o centro médico? Te muestro la demo específica.</strong>
        `,

    'inmobiliaria|propiedades|casas|departamentos|bienes': `
            🏠 <strong>¡Genial! Expertos en chatbots inmobiliarios.</strong>
            <br><br>
            Automatizamos:
            <br>• 🔍 Búsqueda de propiedades por filtros
            <br>• 📸 Tours virtuales automáticos
            <br>• 📅 Agendamiento de visitas
            <br>• 💰 Cálculos de financiamiento
            <br><br>
            📊 <strong>Resultados del sector:</strong>
            <br>• +70% más leads calificados
            <br>• +45% en visitas programadas
            <br>• -85% tiempo en consultas básicas
            <br><br>
            <strong>¿Vendes o arriendas? ¿Residencial o comercial? Te personalizo la demo.</strong>
        `,

    'educacion|curso|capacitacion|academia|estudiantes': `
            📚 <strong>¡Perfecto! Especializados en chatbots educativos.</strong>
            <br><br>
            Automatizamos:
            <br>• 📝 Información de cursos y programas
            <br>• 💳 Proceso de inscripción
            <br>• 📅 Horarios y disponibilidad
            <br>• 🎓 Seguimiento académico
            <br><br>
            📊 <strong>Resultados en educación:</strong>
            <br>• +55% en inscripciones automáticas
            <br>• +40% en satisfacción estudiantil
            <br>• -75% en consultas administrativas
            <br><br>
            <strong>¿Qué tipo de educación ofreces? Te muestro casos similares.</strong>
        `,

    'precio|costo|cuanto|plan|pago': `
            💰 <strong>Planes CHAPI 2025 - Precios transparentes</strong>
            <br><br>
            🌟 <strong>STARTER</strong> - $97/mes
            <br>• Hasta 1,000 conversaciones
            <br>• 1 asistente personalizado
            <br>• Integración web básica
            <br>• Soporte por email
            <br><br>
            🚀 <strong>PROFESSIONAL</strong> - $197/mes
            <br>• Hasta 5,000 conversaciones
            <br>• 3 asistentes especializados
            <br>• WhatsApp + Instagram + Web
            <br>• Analytics avanzados
            <br>• Soporte prioritario
            <br><br>
            ⭐ <strong>ENTERPRISE</strong> - $397/mes
            <br>• Conversaciones ilimitadas
            <br>• Asistentes ilimitados
            <br>• Todas las integraciones
            <br>• API personalizada
            <br>• Account manager dedicado
            <br><br>
            <strong>🎁 ¡Primer mes 50% OFF para nuevos clientes!</strong>
            <br><br>
            ¿Qué plan se ajusta mejor a tu negocio?
        `,

    'demo|demostracion|ver|ejemplo|prueba': `
            🎮 <strong>¡Demos personalizadas disponibles!</strong>
            <br><br>
            📅 <strong>Opciones de demostración:</strong>
            <br><br>
            🖥️ <strong>Demo Online (15 min)</strong>
            <br>• Via Zoom/Meet
            <br>• Revisión de tu caso específico
            <br>• Propuesta personalizada
            <br><br>
            📱 <strong>Demo WhatsApp (5 min)</strong>
            <br>• Prueba inmediata
            <br>• Con tus productos/servicios
            <br>• Sin compromiso
            <br><br>
            🏢 <strong>Demo Presencial</strong>
            <br>• En tu oficina
            <br>• Implementación en vivo
            <br>• Capacitación incluida
            <br><br>
            <strong>¿Cuál prefieres? Te programo para hoy mismo.</strong>
        `,

    'contacto|telefono|email|whatsapp|llamar': `
            📞 <strong>¡Conectemos directamente!</strong>
            <br><br>
            🟢 <strong>WhatsApp Business:</strong> +56 9 xxxx xxxx
            <br>📧 <strong>Email:</strong> info@chapibot.pro
            <br>📱 <strong>Teléfono:</strong> +56 2 xxxx xxxx
            <br>🌐 <strong>Web:</strong> chapibot.pro
            <br><br>
            ⏰ <strong>Horarios de atención:</strong>
            <br>• Lun-Vie: 9:00 - 19:00
            <br>• Sábados: 10:00 - 14:00
            <br>• Chat online: 24/7
            <br><br>
            📍 <strong>Oficina:</strong> Santiago, Chile
            <br><br>
            <strong>¿Prefieres que te llamemos o agendamos una videollamada?</strong>
        `,

    'como|funciona|proceso|implementacion': `
            ⚙️ <strong>¿Cómo funciona CHAPI? Proceso súper simple:</strong>
            <br><br>
            📋 <strong>PASO 1: Análisis (1 día)</strong>
            <br>• Entendemos tu negocio
            <br>• Identificamos casos de uso
            <br>• Definimos objetivos
            <br><br>
            🔧 <strong>PASO 2: Configuración (2-3 días)</strong>
            <br>• Entrenamos la IA con tu info
            <br>• Personalizamos respuestas
            <br>• Creamos flujos específicos
            <br><br>
            🚀 <strong>PASO 3: Lanzamiento (1 día)</strong>
            <br>• Integración en tus canales
            <br>• Pruebas finales
            <br>• Capacitación a tu equipo
            <br><br>
            📊 <strong>PASO 4: Optimización (continua)</strong>
            <br>• Monitoreo de métricas
            <br>• Ajustes basados en datos
            <br>• Nuevas funcionalidades
            <br><br>
            <strong>⏱️ Total: Funcionando en 5-7 días máximo</strong>
            <br><br>
            ¿Te gustaría empezar el análisis de tu negocio?
        `
  },

  // Configuración de analíticas
  analytics: {
    enabled: true,
    trackEvents: ['message_sent', 'message_received', 'widget_opened', 'widget_closed'],
    provider: 'custom' // Se puede cambiar a 'google' para GA4
  },

  // Configuración de debugging
  debug: false, // Cambiar a true para desarrollo

  // Fallback para cuando el backend no esté disponible
  offlineMode: {
    enabled: true,
    responses: {
      default: "💬 <strong>Estoy en modo demo.</strong><br><br>Para una experiencia completa con IA, contacta directamente:<br>📱 WhatsApp: +56 9 xxxx xxxx<br>📧 info@chapibot.pro"
    }
  }
};

// Configuración específica para producción
if (window.location.hostname === 'chapibot.pro' || window.location.hostname === 'www.chapibot.pro') {
  // Configuraciones específicas de producción
  window.CHAPI_CONFIG.debug = false;
  window.CHAPI_CONFIG.analytics.enabled = true;

  // URLs de producción
  window.CHAPI_CONFIG.apiUrl = 'https://api.chapibot.pro';

  console.log('🤖 CHAPI Assistant - Modo Producción Activado');
} else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  // Configuraciones para desarrollo local
  window.CHAPI_CONFIG.debug = true;
  window.CHAPI_CONFIG.analytics.enabled = false;
  window.CHAPI_CONFIG.apiUrl = 'http://localhost:8000';

  console.log('🛠️ CHAPI Assistant - Modo Desarrollo Activado');
}
