/**
 * 🔧 CHAPI Assistant Configuration
 * Archivo de configuración fácil de editar para personalizar el asistente
 */

const CHAPI_CONFIG = {
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
    // 🤖 INTELIGENCIA ARTIFICIAL (SEGURA)
    // ========================================

    enableAI: false, // Cambiar a true para habilitar IA via proxy seguro
    // NOTA: Ya no necesitas API key aquí - el proxy maneja la seguridad

    // ========================================
    // 💬 RESPUESTAS PERSONALIZADAS
    // ========================================

    customResponses: {
        // Palabras clave y sus respuestas
        'precio|costo|plan|cuanto': `
            💰 <strong>Nuestros planes 2025 (Pesos Mexicanos):</strong>
            <br><br>
            🥉 <strong>BÁSICO - $300 MXN/mes</strong>
            <br>• WhatsApp Business • Gestión de reservas • 100 conversaciones/mes
            <br><br>
            🥈 <strong>PREMIUM - $600 MXN/mes</strong> ⭐ Más popular
            <br>• WhatsApp + Telegram + Web • Sistema delivery • 500 conversaciones/mes
            <br><br>
            🥇 <strong>ULTRA - $1,000 MXN/mes</strong>
            <br>• Múltiples sucursales • IA avanzada • Conversaciones ilimitadas
            <br><br>
            🎁 <strong>Prueba gratis por 7 días</strong>
            <br><br>
            ¿Te gustaría una demo personalizada para tu restaurante?
        `,

        'demo|prueba|test': `
            🚀 <strong>¡Perfecto! Te ayudo con tu demo gratuita.</strong>
            <br><br>
            <strong>Opciones disponibles:</strong>
            <br>• WhatsApp: <a href="https://wa.me/525500000000?text=Hola%20quiero%20una%20demo" target="_blank">+52 55 0000 0000</a>
            <br>• Telegram: <a href="https://t.me/Womiie_bot" target="_blank">@Womiie_bot</a>
            <br>• Agendar llamada: <a href="https://chapibot.pro/demo" target="_blank">chapibot.pro/demo</a>
            <br><br>
            ¿Cuál prefieres? Configuramos tu chatbot para restaurante en 24 horas 📅
        `,

        'whatsapp|telegram|canal': `
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

        'ia|inteligencia|gpt|ai': `
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

        'integra|crm|api|conectar': `
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

        'flujo|venta|automatizar|workflow': `
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

        'soporte|ayuda|problema|contacto': `
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

        'gracias|perfecto|excelente|genial': `
            🎉 ¡De nada! Me alegra mucho poder ayudarte.
            <br><br>
            Recuerda que estoy aquí 24/7 para resolver tus dudas sobre:
            <br>• Chatbots inteligentes
            <br>• Automatización de ventas
            <br>• Integración con sistemas
            <br>• Planes y precios
            <br><br>
            ¿Hay algo más en lo que pueda asistirte hoy? 😊
        `
    },

    // ========================================
    // 🎨 PERSONALIZACIÓN VISUAL
    // ========================================

    styling: {
        // Colores (usa los valores CSS de tu sitio)
        primaryColor: '#2f7afe',    // Azul CHAPI
        secondaryColor: '#00d4a6',  // Verde Accent
        backgroundColor: '#161c27', // Fondo del chat
        textColor: '#e8eef8',      // Color del texto

        // Posición del widget
        position: 'bottom-right',   // bottom-right, bottom-left, top-right, top-left

        // Avatar del bot (emoji o URL de imagen)
        botAvatar: '🤖',
        userAvatar: '👤',

        // Efectos
        showNotificationDot: true,  // Punto rojo de notificación
        enableAnimations: true,     // Animaciones suaves
        autoOpen: false            // Abrir automáticamente al cargar
    },

    // ========================================
    // 📱 ACCIONES RÁPIDAS PERSONALIZABLES
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

        // Puedes agregar más categorías de acciones aquí
        after_pricing: [
            {
                icon: '🎁',
                text: 'Empezar prueba gratis',
                action: 'start_trial'
            },
            {
                icon: '📞',
                text: 'Agendar demo',
                action: 'schedule_demo'
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
        phone: '+52 55 0000 0000'
    },

    // ========================================
    // ⚙️ CONFIGURACIÓN AVANZADA
    // ========================================

    advanced: {
        // Tiempo de respuesta simulado (milisegundos)
        responseDelay: {
            min: 800,
            max: 2000
        },

        // Máximo de mensajes en historial
        maxMessages: 50,

        // Habilitar logs para debugging
        enableLogs: false,

        // Personalizar horario de atención
        businessHours: {
            enabled: false,
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
        }
    }
};

// ========================================
// 🎯 INSTRUCCIONES DE PERSONALIZACIÓN
// ========================================

/*

📝 CÓMO PERSONALIZAR EL ASISTENTE:

1. 💬 CAMBIAR MENSAJES:
   - Edita 'welcomeMessage' para el saludo inicial
   - Modifica 'customResponses' para respuestas específicas
   - Usa HTML básico para formato: <strong>, <br>, <a>

2. 🎨 CAMBIAR COLORES:
   - Edita valores en 'styling'
   - Usa los mismos colores de tu sitio web

3. ⚡ AGREGAR ACCIONES RÁPIDAS:
   - Modifica 'quickActions.welcome'
   - Agrega nuevas categorías según necesites

4. 🔗 ACTUALIZAR ENLACES:
   - Cambia URLs en 'links'
   - Actualiza números de teléfono y emails

5. 🤖 HABILITAR IA:
   - Cambia 'enableAI' a true
   - Agrega tu API key de OpenAI en 'apiKey'

6. 📱 POSICIÓN DEL WIDGET:
   - Cambia 'styling.position' para mover el chat

💡 TIPS:
- Prueba cambios en un navegador local primero
- Usa DevTools para ver errores en consola
- Mantén respaldos antes de cambios grandes

*/
