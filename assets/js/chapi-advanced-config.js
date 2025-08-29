/**
 * 🔧 CHAPI Assistant Advanced Configuration
 * Configuración mejorada para optimizar el desempeño del asistente
 * @version 2.1
 */

const CHAPI_ADVANCED_CONFIG = {
  // ========================================
  // 🎨 CONFIGURACIÓN BÁSICA
  // ========================================

  botName: 'CHAPI',
  companyName: 'CHAPI',

  // Mensaje de bienvenida (puedes usar HTML básico)
  welcomeMessage: `
        ¡Hola! 👋 Soy <strong>CHAPI</strong>, tu asistente virtual especializado en chatbots inteligentes.
        <br><br>
        Estoy aquí para ayudarte a:
        <br>• Crear flujos de ventas automáticos
        <br>• Resolver dudas sobre nuestros productos
        <br>• Mostrarte planes y precios
        <br>• Conectarte con nuestro equipo
        <br><br>
        ¿En qué puedo ayudarte hoy? 🚀
    `,

  // ========================================
  // 🤖 INTELIGENCIA ARTIFICIAL (MEJORADA)
  // ========================================

  enableAI: true, // Habilitado para mejorar respuestas
  apiKey: '', // Tu API key de OpenAI (ej: 'sk-...')
  aiModel: 'gpt-4', // Actualizado a GPT-4 para mejor calidad
  temperature: 0.7, // Control de creatividad (0.0-1.0)
  maxTokens: 250, // Respuestas más completas

  // ========================================
  // 💬 RESPUESTAS PERSONALIZADAS (AMPLIADAS)
  // ========================================

  customResponses: {
    // Palabras clave y sus respuestas
    'precio|costo|plan|cuanto|valor': `
            💰 <strong>Nuestros planes 2025:</strong>
            <br><br>
            🥉 <strong>BÁSICO - $49 USD/mes</strong>
            <br>• 1 canal • 50 leads/mes • Plantillas básicas
            <br><br>
            🥈 <strong>PROFESIONAL - $99 USD/mes</strong> ⭐ Más popular
            <br>• 2 canales • 500 leads/mes • IA avanzada • CRM
            <br><br>
            🥇 <strong>EMPRESARIAL - $199 USD/mes</strong>
            <br>• Todo ilimitado • Machine Learning • API custom
            <br><br>
            🎁 <strong>30 días gratis + ROI garantizado</strong>
            <br><br>
            ¿Te gustaría una demo personalizada?
        `,

    'demo|prueba|test|probar|demostración': `
            🚀 <strong>¡Perfecto! Te ayudo con tu demo gratuita.</strong>
            <br><br>
            <strong>Opciones disponibles:</strong>
            <br>• WhatsApp: <a href="https://wa.me/525500000000?text=Hola%20quiero%20una%20demo" target="_blank">+52 55 0000 0000</a>
            <br>• Telegram: <a href="https://t.me/Womiie_bot" target="_blank">@Womiie_bot</a>
            <br>• Agendar llamada: <a href="https://chapibot.pro/demo" target="_blank">chapibot.pro/demo</a>
            <br><br>
            ¿Cuál prefieres? Configuramos tu chatbot en 24 horas 📅
        `,

    'whatsapp|telegram|canal|facebook|instagram|web|chat': `
            📱 <strong>CHAPI funciona en múltiples canales:</strong>
            <br><br>
            ✅ <strong>WhatsApp Business API</strong> - Canal principal de ventas
            <br>✅ <strong>Telegram Bot</strong> - Soporte técnico instantáneo
            <br>✅ <strong>Web Chat Widget</strong> - Integrado en tu sitio
            <br>✅ <strong>Facebook Messenger</strong> - Redes sociales
            <br>✅ <strong>Instagram DM</strong> - Generación Z
            <br>✅ <strong>Email</strong> - Seguimiento automático
            <br><br>
            ¿Qué canal te interesa más? Te ayudo a configurarlo 🔧
        `,

    'ia|inteligencia|gpt|ai|artificial|machine learning|ml': `
            🧠 <strong>Nuestra IA es de última generación:</strong>
            <br><br>
            🚀 <strong>GPT-4 Turbo</strong> - Conversaciones naturales
            <br>⚡ <strong>Groq Llama 3</strong> - Respuestas ultra-rápidas
            <br>🎯 <strong>Análisis de sentimiento</strong> - Detecta emociones
            <br>🧩 <strong>Detección de intención</strong> - Entiende necesidades
            <br>📚 <strong>Memoria contextual</strong> - Recuerda conversaciones
            <br><br>
            Nuestros bots aprenden automáticamente y mejoran con cada interacción.
            <br><br>
            ¿Te interesa alguna funcionalidad específica? 🤔
        `,

    'integra|crm|api|conectar|hubspot|salesforce|zapier|webhook': `
            🔗 <strong>CHAPI se integra con +50 sistemas:</strong>
            <br><br>
            <strong>💼 CRMs:</strong> HubSpot, Salesforce, Pipedrive, Zoho
            <br><strong>💳 Pagos:</strong> Stripe, MercadoPago, PayPal, OpenPay
            <br><strong>📅 Calendarios:</strong> Google Calendar, Calendly, Outlook
            <br><strong>📧 Email:</strong> Mailchimp, SendGrid, ActiveCampaign
            <br><strong>📊 Analytics:</strong> Google Analytics, Mixpanel, Hotjar
            <br><br>
            También ofrecemos API REST personalizada y webhooks en tiempo real.
            <br><br>
            ¿Con qué sistema necesitas integrar? 🔧
        `,

    'flujo|venta|automatizar|workflow|proceso|funnel': `
            🎯 <strong>Creamos flujos que venden automáticamente:</strong>
            <br><br>
            <strong>📈 Resultados comprobados:</strong>
            <br>• +300% leads capturados
            <br>• +45% conversión de ventas
            <br>• -80% costos de atención
            <br>• ROI promedio: 400-800%
            <br><br>
            <strong>🏭 Tipos de flujo disponibles:</strong>
            <br>🛍️ E-commerce (carrito, pagos, seguimiento)
            <br>🍽️ Restaurante (reservas, menú, delivery)
            <br>🏢 Servicios (leads, citas, propuestas)
            <br>🎯 Personalizado (tu industria específica)
            <br><br>
            ¿Para qué tipo de negocio necesitas el flujo? 🚀
        `,

    'soporte|ayuda|problema|contacto|humano|persona': `
            🆘 <strong>Nuestro equipo está aquí para ayudarte:</strong>
            <br><br>
            <strong>📞 Contacto directo:</strong>
            <br>• WhatsApp: <a href="https://wa.me/525500000000" target="_blank">+52 55 0000 0000</a>
            <br>• Email: <a href="mailto:soporte@chapibot.pro">soporte@chapibot.pro</a>
            <br>• Horario: Lun-Vie 9:00-18:00 (México)
            <br><br>
            <strong>🚀 Soporte premium 24/7:</strong>
            <br>Disponible en planes Profesional y Empresarial
            <br><br>
            <strong>📚 Centro de ayuda:</strong>
            <br><a href="https://help.chapibot.pro" target="_blank">help.chapibot.pro</a>
            <br><br>
            ¿Cuál es tu consulta específica? Te conecto con el especialista adecuado 👨‍💻
        `,

    'gracias|perfecto|excelente|genial|bien|ok|bueno': `
            🎉 ¡De nada! Me alegra mucho poder ayudarte.
            <br><br>
            Recuerda que estoy aquí 24/7 para resolver tus dudas sobre:
            <br>• Chatbots inteligentes
            <br>• Automatización de ventas
            <br>• Integración con sistemas
            <br>• Planes y precios
            <br><br>
            ¿Hay algo más en lo que pueda asistirte hoy? 😊
        `,

    'industria|sector|nicho|negocio': `
            🏭 <strong>CHAPI se adapta a múltiples industrias:</strong>
            <br><br>
            <strong>🛍️ E-commerce:</strong> Atención 24/7, recomendaciones personalizadas, recuperación de carritos
            <br><br>
            <strong>🏢 B2B:</strong> Calificación de leads, agendamiento de demos, nurturing automatizado
            <br><br>
            <strong>🍽️ Restaurantes:</strong> Reservas, pedidos online, fidelización de clientes
            <br><br>
            <strong>🏥 Salud:</strong> Agendamiento de citas, seguimiento de pacientes, consultas frecuentes
            <br><br>
            <strong>🏫 Educación:</strong> Admisiones, información de cursos, soporte a estudiantes
            <br><br>
            ¿En qué industria te encuentras? Te mostraré casos de éxito específicos.
        `,

    'competencia|diferencia|mejor|ventaja': `
            🏆 <strong>Lo que hace único a CHAPI:</strong>
            <br><br>
            <strong>⚡ Velocidad:</strong> Implementación en 24 horas vs semanas de la competencia
            <br><br>
            <strong>💰 ROI:</strong> Garantizamos retorno de inversión o devolvemos tu dinero
            <br><br>
            <strong>🧠 IA avanzada:</strong> Modelos entrenados específicamente para ventas
            <br><br>
            <strong>🔄 Omnicanalidad:</strong> Misma conversación en todos los canales
            <br><br>
            <strong>🛠️ Sin código:</strong> Interfaces visuales para crear flujos sin programación
            <br><br>
            ¿Qué aspecto te interesa más para profundizar?
        `
  },

  // ========================================
  // 🎨 PERSONALIZACIÓN VISUAL (OPTIMIZADA)
  // ========================================

  styling: {
    // Colores (usa los valores CSS de tu sitio)
    primaryColor: '#2f7afe',    // Azul CHAPI
    secondaryColor: '#00d4a6',  // Verde Accent
    backgroundColor: '#161c27', // Fondo del chat
    textColor: '#e8eef8',      // Color del texto

    // Nuevos colores para estados
    successColor: '#00d4a6',   // Verde para éxito
    errorColor: '#ff5a5f',     // Rojo para errores
    warningColor: '#ffb100',   // Amarillo para advertencias

    // Posición del widget
    position: 'bottom-right',   // bottom-right, bottom-left, top-right, top-left

    // Tamaños responsivos
    mobileBreakpoint: '768px',  // Punto de quiebre para móviles
    buttonSize: '60px',         // Tamaño del botón
    mobileButtonSize: '50px',   // Tamaño del botón en móvil

    // Fuentes
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',           // Tamaño base de fuente

    // Avatar del bot (emoji o URL de imagen)
    botAvatar: '🤖',
    userAvatar: '👤',

    // Efectos
    showNotificationDot: true,  // Punto rojo de notificación
    enableAnimations: true,     // Animaciones suaves
    autoOpen: false,            // Abrir automáticamente al cargar

    // Nuevos efectos
    useSmoothScrolling: true,   // Scroll suave
    useTypingIndicator: true,   // Indicador de escritura
    useMessageSound: true,      // Sonido al recibir mensajes

    // Accesibilidad
    highContrastMode: false,    // Modo alto contraste
    largeText: false            // Texto grande
  },

  // ========================================
  // 📱 ACCIONES RÁPIDAS PERSONALIZABLES (AMPLIADAS)
  // ========================================

  quickActions: {
    welcome: [
      {
        icon: '🚀',
        text: 'Crear flujo de ventas',
        action: 'start_sales_flow'
      },
      {
        icon: '💰',
        text: 'Ver precios y planes',
        action: 'show_pricing'
      },
      {
        icon: '📱',
        text: 'Demo en WhatsApp',
        action: 'demo_whatsapp'
      },
      {
        icon: '📞',
        text: 'Hablar con humano',
        action: 'contact_human'
      }
    ],

    pricing: [
      {
        icon: '🎁',
        text: 'Empezar prueba gratis',
        action: 'start_trial'
      },
      {
        icon: '📞',
        text: 'Agendar demo',
        action: 'schedule_demo'
      },
      {
        icon: '📋',
        text: 'Ver comparativa',
        action: 'show_comparison'
      }
    ],

    demo: [
      {
        icon: '📱',
        text: 'WhatsApp',
        action: 'whatsapp_demo'
      },
      {
        icon: '📅',
        text: 'Agendar llamada',
        action: 'schedule_call'
      },
      {
        icon: '💻',
        text: 'Demo en vivo',
        action: 'live_demo'
      }
    ],

    sales_flow: [
      {
        icon: '🛍️',
        text: 'E-commerce',
        action: 'create_flow',
        data: { template: 'ecommerce' }
      },
      {
        icon: '🍽️',
        text: 'Restaurante',
        action: 'create_flow',
        data: { template: 'restaurant' }
      },
      {
        icon: '🏢',
        text: 'Servicios',
        action: 'create_flow',
        data: { template: 'services' }
      },
      {
        icon: '🎯',
        text: 'Personalizado',
        action: 'create_flow',
        data: { template: 'custom' }
      }
    ],

    industries: [
      {
        icon: '🛍️',
        text: 'E-commerce',
        action: 'show_industry',
        data: { industry: 'ecommerce' }
      },
      {
        icon: '🏢',
        text: 'B2B',
        action: 'show_industry',
        data: { industry: 'b2b' }
      },
      {
        icon: '🍽️',
        text: 'Restaurantes',
        action: 'show_industry',
        data: { industry: 'restaurant' }
      },
      {
        icon: '🏥',
        text: 'Salud',
        action: 'show_industry',
        data: { industry: 'health' }
      }
    ]
  },

  // ========================================
  // 🔗 ENLACES IMPORTANTES
  // ========================================

  links: {
    website: 'https://chapibot.pro',
    demo: 'https://chapibot.pro/demo',
    whatsapp: 'https://wa.me/525500000000',
    telegram: 'https://t.me/Womiie_bot',
    support_email: 'soporte@chapibot.pro',
    sales_email: 'ventas@chapibot.pro',
    phone: '+52 55 0000 0000',
    help_center: 'https://help.chapibot.pro',
    blog: 'https://chapibot.pro/blog',
    pricing: 'https://chapibot.pro/pricing',
    case_studies: 'https://chapibot.pro/casos'
  },

  // ========================================
  // ⚙️ CONFIGURACIÓN AVANZADA (OPTIMIZADA)
  // ========================================

  advanced: {
    // Tiempo de respuesta simulado (milisegundos) - OPTIMIZADO
    responseDelay: {
      min: 300,  // Reducido para mayor velocidad
      max: 1000  // Reducido para mayor velocidad
    },

    // Máximo de mensajes en historial
    maxMessages: 100, // Aumentado para mejor contexto

    // Habilitar logs para debugging
    enableLogs: true, // Activado para monitoreo

    // Personalizar horario de atención
    businessHours: {
      enabled: true, // Activado
      timezone: 'America/Mexico_City',
      schedule: {
        monday: { start: '09:00', end: '18:00' },
        tuesday: { start: '09:00', end: '18:00' },
        wednesday: { start: '09:00', end: '18:00' },
        thursday: { start: '09:00', end: '18:00' },
        friday: { start: '09:00', end: '18:00' },
        saturday: { start: '10:00', end: '14:00' },
        sunday: { closed: true }
      },
      outOfHoursMessage: `
                🕐 <strong>Fuera de horario de atención</strong>
                <br><br>
                Nuestro equipo está disponible:
                <br>Lun-Vie: 9:00-18:00
                <br>Sáb: 10:00-14:00
                <br><br>
                Pero yo estoy aquí 24/7 para ayudarte.
                <br>¿En qué puedo asistirte? 😊
            `
    },

    // Nuevas configuraciones avanzadas
    analytics: {
      enabled: true,
      trackEvents: true,
      sessionTimeout: 30, // minutos
      trackUserData: false // Por privacidad
    },

    cache: {
      enabled: true,
      ttl: 3600, // segundos (1 hora)
      maxSize: 100 // entradas
    },

    security: {
      filterSensitiveData: true,
      maxAttemptsPerMinute: 10,
      blockIpOnAbuse: false
    },

    performance: {
      lazyLoadResources: true,
      compressResponses: true,
      useWebWorkers: true
    },

    // Análisis de sentimiento
    sentimentAnalysis: {
      enabled: true,
      threshold: 0.3, // sensibilidad
      negativeResponseTemplate: `
                Lamento que no estés satisfecho con la respuesta.
                ¿Puedo ayudarte de otra manera o conectarte con un agente humano?
            `
    }
  }
};

// Exportar la configuración
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CHAPI_ADVANCED_CONFIG;
}
