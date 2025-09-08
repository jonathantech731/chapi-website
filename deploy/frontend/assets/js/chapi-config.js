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
