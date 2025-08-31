/**
 * 🔥 CHAPI COMERCIAL - VENDEDOR AUTOMÁTICO DE CHATBOTS
 * Configuración optimizada para conversión y ventas
 * Desarrollador: Johnny/Jovas - jovany2224@gmail.com
 */

const CHAPI_CONFIG = {
  // ========================================
  // 🎯 IDENTIDAD COMERCIAL AGRESIVA
  // ========================================

  botName: 'CHAPI - Vendedor Automático de Chatbots',
  companyName: 'CHAPI México - Automatización Comercial',

  // Apertura comercial agresiva (primeros 30 segundos críticos)
  welcomeMessage: `
        ¡Hola! Soy <strong>CHAPI</strong> 🤖
        <br><br>
        Ayudo a negocios mexicanos a <strong>VENDER MÁS</strong> con chatbots inteligentes que:
        <br>✅ Atienden clientes 24/7 (incluso mientras duermes)
        <br>✅ Aumentan ventas 40-70% el primer mes
        <br>✅ Eliminan 80% de mensajes repetitivos
        <br>✅ Nunca pierden un lead
        <br><br>
        🔥 <strong>MIS CLIENTES RECUPERAN LA INVERSIÓN EN 2-4 SEMANAS</strong>
        <br><br>
        <strong>¿Me das 2 minutos para conocer tu negocio y mostrarte EXACTAMENTE cómo te ayudaría?</strong>
    `,

  // ========================================
  // 🤖 CONFIGURACIÓN TÉCNICA
  // ========================================

  enableAI: false, // Cambiar a true para habilitar OpenAI
  apiKey: '', // Tu API key de OpenAI (ej: 'sk-...')

  // ========================================
  // 💰 FLUJO DE VENTA ESTRUCTURADO
  // ========================================

  customResponses: {
    // Descubrimiento estratégico - Las 8 preguntas clave
    'si|dale|ok|acepto|2 minutos|adelante': `
            🎯 <strong>¡Perfecto! Empecemos el análisis de tu negocio.</strong>
            <br><br>
            <strong>PREGUNTA 1 DE 8:</strong>
            <br>📊 <strong>¿A qué se dedica tu negocio y cuál es tu nombre comercial?</strong>
            <br><br>
            💡 <strong>Mientras me respondes, te adelanto:</strong>
            <br>Mis bots manejan desde restaurantes hasta consultorios médicos.
            <br>Cada uno personalizado para maximizar TUS ventas específicas.
        `,

    // Respuestas específicas por tipo de negocio con enfoque comercial
    'restaurante|comida|delivery|cocina|menu|pedidos|pizza|tacos': `
            🍕 <strong>¡EXCELENTE! Los restaurantes son mis clientes más exitosos.</strong>
            <br><br>
            💰 <strong>CASOS DE ÉXITO REALES:</strong>
            <br>• Pizzería en Guadalajara: +180% pedidos en 30 días
            <br>• Taquería CDMX: De 50 a 300 pedidos diarios
            <br>• Restaurante Puebla: Recuperó inversión en 18 días
            <br><br>
            📊 <strong>PREGUNTA 2 DE 8:</strong>
            <br><strong>¿Cuántos mensajes/llamadas de pedidos reciben al día? ¿Se saturan en horarios pico?</strong>
            <br><br>
            🎯 <strong>Mi bot para restaurantes automatiza:</strong>
            <br>• Toma pedidos completos 24/7
            <br>• Menú interactivo con fotos y combos
            <br>• Cálculo automático de envío y tiempo
            <br>• Confirmación y seguimiento de órdenes
        `,

    'ecommerce|tienda|online|venta|productos|negocio|ropa|accesorios': `
            🛒 <strong>¡INCREÍBLE! E-commerce es donde veo los ROI más altos.</strong>
            <br><br>
            💰 <strong>CASOS DE ÉXITO REALES:</strong>
            <br>• Tienda de ropa: +250% conversión en carritos abandonados
            <br>• Accesorios tech: De $10K a $45K mensuales en 60 días
            <br>• Suplementos: 400% ROI primer mes
            <br><br>
            📊 <strong>PREGUNTA 2 DE 8:</strong>
            <br><strong>¿Cuántas visitas reciben al día? ¿Cuántas compran realmente?</strong>
            <br><br>
            🎯 <strong>Mi bot para e-commerce automatiza:</strong>
            <br>• Catálogo inteligente con búsqueda
            <br>• Recuperación de carritos abandonados
            <br>• Upselling y cross-selling automático
            <br>• Seguimiento post-venta y recompras
        `,

    'servicio|profesional|consultor|doctor|abogado|contador|dentista': `
            👔 <strong>¡PERFECTO! Servicios profesionales son mina de oro con automatización.</strong>
            <br><br>
            💰 <strong>CASOS DE ÉXITO REALES:</strong>
            <br>• Consultorio dental: +300% citas agendadas
            <br>• Despacho contable: De 20 a 150 clientes en 90 días
            <br>• Consultor: Automatizó 90% de su prospección
            <br><br>
            📊 <strong>PREGUNTA 2 DE 8:</strong>
            <br><strong>¿Cuántos clientes potenciales los contactan al día? ¿Cuántos se convierten en citas?</strong>
            <br><br>
            🎯 <strong>Mi bot para servicios automatiza:</strong>
            <br>• Calificación inteligente de leads
            <br>• Agendado automático de citas
            <br>• Envío de cotizaciones personalizadas
            <br>• Seguimiento de prospectos fríos
        `,

    // Análisis de volumen y pérdidas
    'pocos|10|15|20|25|30|saturan|mucho|bastante': `
            📊 <strong>Entiendo el volumen. Ahora lo CRÍTICO:</strong>
            <br><br>
            <strong>PREGUNTA 3 DE 8:</strong>
            <br>💸 <strong>¿Calculaste cuántos clientes pierdes por no responder rápido o fuera de horario?</strong>
            <br><br>
            <strong>🔥 DATO IMPACTANTE:</strong>
            <br>• 73% de clientes se van si no respondes en 5 minutos
            <br>• 67% de ventas se pierden fuera de horario laboral
            <br>• Un cliente perdido = $500-2000 MXN promedio
            <br><br>
            💡 <strong>Mi bot responde en 3 segundos, 24/7, 365 días.</strong>
            <br>¿Cuánto dinero recuperarías solo con eso?
        `,

    // Manejo de procesos actuales
    'manual|whatsapp|llamadas|todo|nosotros|personal': `
            ⚡ <strong>¡AHÍ está el problema! Lo manual es el enemigo de las ventas.</strong>
            <br><br>
            <strong>PREGUNTA 4 DE 8:</strong>
            <br>🔄 <strong>¿Cómo manejan consultas, cotizaciones y ventas ahora? ¿Es manual todo?</strong>
            <br><br>
            <strong>PREGUNTA 5 DE 8:</strong>
            <br>😤 <strong>¿Cuáles son las 3 preguntas que MÁS les hacen? ¿Las repiten todo el día?</strong>
            <br><br>
            💰 <strong>CÁLCULO REAL:</strong>
            <br>Si respondes 50 consultas diarias = 3 horas perdidas
            <br>3 horas × $200/hora = $600 diarios = $18,000 al mes
            <br><br>
            🎯 <strong>Mi bot maneja el 85% automáticamente.</strong>
            <br>¿Te imaginas recuperar esas 3 horas para VENDER?
        `,

    // Preguntas frecuentes y automatización
    'precios|horarios|ubicacion|catalogo|disponibilidad': `
            🎯 <strong>¡Esas son PERFECTAS para automatizar!</strong>
            <br><br>
            <strong>PREGUNTA 6 DE 8:</strong>
            <br>🚀 <strong>Si pudieras automatizar UNA cosa de tu negocio, ¿qué sería?</strong>
            <br><br>
            <strong>PREGUNTA 7 DE 8:</strong>
            <br>📱 <strong>¿Usan WhatsApp Business, Instagram, Facebook? ¿Dónde están sus clientes?</strong>
            <br><br>
            💡 <strong>El bot que te haré responderá AUTOMÁTICAMENTE:</strong>
            <br>• Precios y catálogos completos
            <br>• Horarios y disponibilidad en tiempo real
            <br>• Ubicación con mapas integrados
            <br>• Cotizaciones personalizadas
            <br>• Y todo lo que tus clientes preguntan
        `,

    // Análisis de inversión y cierre
    'marketing|publicidad|1000|500|2000|inversion': `
            💰 <strong>¡PERFECTO! Última pregunta y vamos al cierre.</strong>
            <br><br>
            <strong>PREGUNTA 8 DE 8:</strong>
            <br>💳 <strong>¿Qué presupuesto mensual destinas a marketing/publicidad actualmente?</strong>
            <br><br>
            🔥 <strong>AQUÍ VIENE LO BUENO:</strong>
            <br>Mi chatbot es marketing 24/7 que NUNCA para de vender.
            <br>Mientras tu competencia duerme, tú vendes.
            <br><br>
            ⏰ <strong>¿Listo para ver tus 3 opciones de inversión?</strong>
            <br>Cada una diseñada para diferentes niveles de crecimiento.
        `,

    // PRESENTACIÓN DE PAQUETES AGRESIVA
    'listo|opciones|precios|paquetes|cuanto|cuesta': `
            💰 <strong>¡AQUÍ ESTÁN TUS 3 PAQUETES PARA DOMINAR TU MERCADO!</strong>
            <br><br>
            🥉 <strong>BÁSICO - $300 MXN</strong>
            <br>✅ Bot inteligente con tus 10 preguntas más frecuentes
            <br>✅ Horarios automáticos y mensaje fuera de servicio
            <br>✅ Captura de datos: nombre, teléfono, consulta
            <br>✅ Envío automático de precios/catálogo básico
            <br>✅ 3 flujos principales personalizados
            <br>💡 <strong>PERFECTO PARA:</strong> Consultorios, servicios locales, negocios pequeños
            <br>⏰ <strong>LISTO EN:</strong> 3 días hábiles
            <br>🎯 <strong>ROI ESPERADO:</strong> 300-800% primer mes
            <br><br>
            🥈 <strong>PREMIUM - $600 MXN</strong> ⭐ MÁS POPULAR
            <br>✅ Todo lo básico +
            <br>✅ Catálogo completo con fotos y precios
            <br>✅ Toma de pedidos automatizada
            <br>✅ Calculadora de envíos/costos
            <br>✅ Integración WhatsApp Business
            <br>✅ Sistema de seguimiento de leads
            <br>✅ 7 flujos inteligentes personalizados
            <br>💡 <strong>PERFECTO PARA:</strong> Restaurantes, tiendas online, e-commerce
            <br>⏰ <strong>LISTO EN:</strong> 5 días hábiles
            <br>🎯 <strong>ROI ESPERADO:</strong> 500-1200% primer mes
            <br><br>
            🥇 <strong>ULTRA - $1,000 MXN</strong>
            <br>✅ Todo lo premium +
            <br>✅ Sistema de pagos integrado (Stripe/PayPal)
            <br>✅ CRM básico con base de datos
            <br>✅ Reportes de ventas automáticos
            <br>✅ Múltiples plataformas simultáneas
            <br>✅ Bot de remarketing automático
            <br>✅ Flujos ilimitados personalizados
            <br>✅ Soporte prioritario
            <br>💡 <strong>PERFECTO PARA:</strong> E-commerce establecido, servicios profesionales
            <br>⏰ <strong>LISTO EN:</strong> 7 días hábiles
            <br>🎯 <strong>ROI ESPERADO:</strong> 800-2000% primer mes
            <br><br>
            🔥 <strong>¿Cuál necesitas para EXPLOTAR tus ventas?</strong>
        `,

    // CIERRE AGRESIVO
    'basico|premium|ultra|300|600|1000': `
            🚀 <strong>¡EXCELENTE DECISIÓN! Vamos al cierre.</strong>
            <br><br>
            Mira, hoy es ${new Date().toLocaleDateString('es-MX')}. Si empezamos HOY:
            <br>📅 Tu bot estará listo el ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX')}
            <br>💰 Para el ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX')} ya habrás recuperado la inversión
            <br>🚀 Para el ${new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX')} estarás ganando 3-5x más por automatización
            <br><br>
            🎯 <strong>DEMO PERSONALIZADA AHORA:</strong>
            <br>Te voy a mostrar EXACTAMENTE cómo respondería tu bot a TUS clientes con TUS productos.
            <br><br>
            📞 <strong>CONTACTO DIRECTO:</strong>
            <br>• Desarrollador: Johnny/Jovas - jovany2224@gmail.com
            <br>• Bot demo: @Womiie_bot en Telegram
            <br>• WhatsApp: [Agregar número]
            <br><br>
            <strong>¿Hacemos la demo de 5 minutos o prefieres que te mande el contrato directo?</strong>
        `,

    // MANEJO DE OBJECIONES AGRESIVO
    'caro|costoso|mucho|dinero|no tengo|presupuesto': `
            💭 <strong>Entiendo. Déjame preguntarte:</strong>
            <br><br>
            💰 <strong>¿Cuánto vale UN cliente para ti? ¿$100? ¿$500? ¿$1000?</strong>
            <br><br>
            Mi bot BÁSICO de $300 captura mínimo 3-5 clientes nuevos al mes.
            <br>Eso son $1,500-5,000 de ganancia VS $300 de inversión.
            <br><br>
            🧮 <strong>MATEMÁTICAS SIMPLES:</strong>
            <br>• $300 invertidos = $1,500+ ganados = 400% ROI
            <br>• En 30 días recuperas inversión + ganancias
            <br>• Resto del año = PURA GANANCIA
            <br><br>
            🎯 <strong>¿Ves la diferencia? No es un gasto, es la mejor inversión que harás este año.</strong>
            <br><br>
            <strong>¿Empezamos con el BÁSICO para que compruebes los resultados?</strong>
        `,

    'pensarlo|despues|ver|analizar|tiempo': `
            ⏰ <strong>Perfecto, es normal en decisiones inteligentes.</strong>
            <br><br>
            <strong>Pero déjame preguntarte:</strong>
            <br>📱 ¿Cuántos clientes perdiste esta semana por no responder rápido?
            <br>💸 ¿Cuánto dinero representa eso?
            <br><br>
            🔥 <strong>REALIDAD BRUTAL:</strong>
            <br>Mientras 'lo piensas', tus competidores están automatizando y quitándote clientes.
            <br><br>
            🎁 <strong>Te hago la demo GRATIS ahora, sin compromiso.</strong>
            <br>Si no te convence, no pasa nada.
            <br><br>
            ⏰ <strong>¿Qué tienes que perder con 5 minutos de demo?</strong>
            <br>VS lo que PIERDES cada día sin automatizar.
            <br><br>
            📞 <strong>jovany2224@gmail.com - @Womiie_bot</strong>
        `,

    'whatsapp|business|ya tengo|tenemos|usamos': `
            ✅ <strong>¡Excelente! Eso me facilita el trabajo.</strong>
            <br><br>
            <strong>WhatsApp Business es bueno, pero imagínate:</strong>
            <br>• Cliente escribe a las 2 AM → Bot responde AL INSTANTE
            <br>• Pregunta precios → Bot manda catálogo completo
            <br>• Quiere pedido → Bot toma orden completa
            <br>• Tú solo recibes notificación cuando necesitan humano
            <br><br>
            💰 <strong>Tu WhatsApp + Mi bot = Máquina de dinero 24/7</strong>
            <br><br>
            🚀 <strong>¿Vemos cómo se integran?</strong>
            <br>Demo en vivo: jovany2224@gmail.com - @Womiie_bot
        `,

    // Respuestas de contacto y demo
    'demo|muestra|ejemplo|ver|contacto': `
            🚀 <strong>¡DEMO PERSONALIZADA INMEDIATA!</strong>
            <br><br>
            📞 <strong>CONTACTO DIRECTO AHORA:</strong>
            <br>• <strong>Desarrollador:</strong> Johnny/Jovas
            <br>• <strong>Email:</strong> jovany2224@gmail.com
            <br>• <strong>Bot demo:</strong> @Womiie_bot en Telegram
            <br>• <strong>Ubicación:</strong> México 🇲🇽
            <br><br>
            ⚡ <strong>TECNOLOGÍA ENTERPRISE:</strong>
            <br>• Azure OpenAI (Microsoft)
            <br>• Python + Telegram/WhatsApp
            <br>• Desarrollo en 3-7 días
            <br>• Soporte 30 días incluido
            <br><br>
            🎯 <strong>En la demo verás:</strong>
            <br>• Tu bot respondiendo como experto en TU negocio
            <br>• Simulación real de ventas automatizadas
            <br>• ROI proyectado personalizado
            <br><br>
            <strong>¡Contacta AHORA para empezar a vender mientras duermes! 💰</strong>
        `,

    // Saludos y respuestas generales
    'hola|buenas|buen|dia|tarde': `
            ¡Hola! 👋 ¡Perfecto timing para automatizar tu negocio!
            <br><br>
            Soy <strong>CHAPI</strong>, el vendedor automático de chatbots que está revolucionando negocios mexicanos.
            <br><br>
            🔥 <strong>MIS CLIENTES AUMENTAN VENTAS 40-70% EL PRIMER MES</strong>
            <br><br>
            <strong>¿Me das 2 minutos para mostrarte cómo multiplicar tus ingresos con automatización?</strong>
        `,

    'ayuda|help|que puedes': `
            💰 <strong>¡Puedo hacer que tu negocio venda MIENTRAS DUERMES!</strong>
            <br><br>
            🤖 <strong>Creo chatbots que:</strong>
            <br>• Atienden clientes 24/7 sin descanso
            <br>• Toman pedidos automáticamente
            <br>• Envían catálogos y precios al instante
            <br>• Agendan citas sin intervención humana
            <br>• Capturan leads y los califican
            <br>• Procesan pagos automáticamente
            <br><br>
            🎯 <strong>Resultados garantizados en 30 días o dinero devuelto.</strong>
            <br><br>
            <strong>¿Empezamos el análisis de tu negocio AHORA?</strong>
        `
  },

  // ========================================
  // ⚡ BOTONES DE ACCIÓN COMERCIAL
  // ========================================

  quickActions: {
    welcome: [
      {
        icon: '🍕',
        text: 'Tengo restaurante',
        action: 'restaurante'
      },
      {
        icon: '🛒',
        text: 'Tengo e-commerce',
        action: 'ecommerce'
      },
      {
        icon: '👔',
        text: 'Ofrezco servicios',
        action: 'servicio'
      },
      {
        icon: '💰',
        text: 'Ver precios YA',
        action: 'listo'
      },
      {
        icon: '🚀',
        text: 'Demo GRATIS',
        action: 'demo'
      },
      {
        icon: '⚡',
        text: '¡EMPEZAR AHORA!',
        action: 'si'
      }
    ],

    after_pricing: [
      {
        icon: '🥉',
        text: 'BÁSICO $300',
        action: 'basico'
      },
      {
        icon: '🥈',
        text: 'PREMIUM $600',
        action: 'premium'
      },
      {
        icon: '🥇',
        text: 'ULTRA $1000',
        action: 'ultra'
      },
      {
        icon: '🔥',
        text: 'Demo personalizada',
        action: 'demo'
      }
    ]
  },

  // ========================================
  // 🔗 INFORMACIÓN DE CONTACTO
  // ========================================

  links: {
    website: 'https://chapibot.pro',
    developer_email: 'jovany2224@gmail.com',
    telegram: 'https://t.me/Womiie_bot',
    whatsapp: 'https://wa.me/525500000000', // Actualizar con número real
    support_email: 'jovany2224@gmail.com'
  },

  // ========================================
  // ⚙️ CONFIGURACIÓN AVANZADA
  // ========================================

  advanced: {
    responseDelay: {
      min: 500,
      max: 1200
    },
    maxMessages: 100,
    enableLogs: true,
    businessHours: {
      enabled: false // Bot comercial 24/7
    }
  }
};

// ========================================
// 🎯 NOTAS DE IMPLEMENTACIÓN
// ========================================

/*
PROMPT COMERCIAL IMPLEMENTADO ✅

🔥 ENFOQUE AGRESIVO DE VENTAS:
- Apertura impactante en 30 segundos
- 8 preguntas de descubrimiento estructurado
- 3 paquetes específicos mexicanos
- Manejo profesional de objeciones
- Cierre directo con urgencia

📧 CONTACTO CONFIGURADO:
- Desarrollador: Johnny/Jovas
- Email: jovany2224@gmail.com
- Bot demo: @Womiie_bot
- Tecnología: Azure OpenAI + Python

🎯 OBJETIVO: Convertir cada conversación en venta
💰 PAQUETES: $300, $600, $1000 MXN
⏰ TIEMPO: 3-7 días desarrollo

Para activar en Telegram bot, integrar con telegram_chapi_bot.py
*/
