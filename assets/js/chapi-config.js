/**
 * 🔧    botName: 'CHAPI - Chatbot Asistente Programa    customResponses: {
        // Respuestas especializadas por tipo de negocio siguiendo el Prompt Master
        'restaurante|comida|delivery|cocina|menu|pedidos': `
            🍕 <strong>¡Perfecto! Especialista en chatbots para restaurantes aquí.</strong>
            <br><br>
            Ayudo a automatizar:
            <br>• Toma de pedidos 24/7 (incluso cuando están cerrados)
            <br>• Menú interactivo con fotos y precios
            <br>• Cálculo de entrega automático
            <br>• Confirmación de órdenes
            <br><br>
            📊 <strong>Cuéntame sobre tu restaurante:</strong>
            <br>1️⃣ <strong>¿Cómo se llama tu restaurante y qué tipo de comida sirven?</strong>
            <br>2️⃣ <strong>¿Cuántos clientes atienden al día aproximadamente?</strong>
            <br>3️⃣ <strong>¿Usan WhatsApp, Instagram, llamadas para pedidos?</strong>
            <br><br>
            <strong>Mis clientes restauranteros aumentan pedidos 40-60% con automatización 📈</strong>
        `,

        'ecommerce|tienda|online|venta|productos|negocio': `
            🛒 <strong>¡Excelente! Experto en chatbots para tiendas online.</strong>
            <br><br>
            Automatizo:
            <br>• Catálogo completo con búsqueda inteligente
            <br>• Proceso de compra paso a paso
            <br>• Seguimiento de pedidos automático
            <br>• Soporte post-venta 24/7
            <br><br>
            📊 <strong>Háblame de tu e-commerce:</strong>
            <br>1️⃣ <strong>¿Cómo se llama tu tienda y qué vendes?</strong>
            <br>2️⃣ <strong>¿Cuántos clientes atienden al día?</strong>
            <br>3️⃣ <strong>¿Qué plataformas usan? (WhatsApp, web, redes sociales)</strong>
            <br><br>
            <strong>Mis clientes capturan leads 24/7, incluso durmiendo 💰</strong>
        `,

        'servicio|profesional|consultor|doctor|abogado|contador': `
            👔 <strong>¡Perfecto! Especialista en chatbots para servicios profesionales.</strong>
            <br><br>
            Ayudo con:
            <br>• Agendado de citas automático
            <br>• Información de servicios 24/7
            <br>• Calificación de leads inteligente
            <br>• Seguimiento de clientes potenciales
            <br><br>
            📊 <strong>Cuéntame sobre tu servicio:</strong>
            <br>1️⃣ <strong>¿Cómo se llama tu empresa y qué servicio profesional ofreces?</strong>
            <br>2️⃣ <strong>¿Cuántos clientes potenciales contactan al día?</strong>
            <br>3️⃣ <strong>¿Cómo se comunican contigo? (WhatsApp, llamadas, web)</strong>
            <br><br>
            <strong>Reducen tiempo de respuesta de horas a segundos ⚡</strong>
        `,

        // Flujo de descubrimiento - Paso 2: Situación comercial actual
        'preguntas|frecuentes|repetitivas|dudas|consultas': `
            💡 <strong>¡Exacto! Las preguntas repetitivas son perfectas para automatizar.</strong>
            <br><br>
            📋 <strong>Dime específicamente:</strong>
            <br>4️⃣ <strong>¿Cuáles son las 3 preguntas que MÁS te hacen tus clientes?</strong>
            <br>5️⃣ <strong>¿Tienen horarios de atención limitados? ¿Pierden clientes fuera del horario?</strong>
            <br>6️⃣ <strong>¿Cuánto tiempo dedican al día respondiendo mensajes repetitivos?</strong>
            <br><br>
            <strong>Mi objetivo:</strong> Que tu bot responda el 80% automáticamente y solo te lleguen clientes listos para comprar 🎯
        `,

        'horario|24|7|noche|madrugada|fuera|tiempo': `
            🌙 <strong>¡Ahí está el oro perdido! Muchas ventas se pierden fuera de horario.</strong>
            <br><br>
            <strong>Mis clientes recuperan el 80% de clientes que abandonan</strong> con atención 24/7.
            <br><br>
            📊 <strong>Sigamos con el análisis:</strong>
            <br>7️⃣ <strong>¿Qué te gustaría que hiciera automáticamente tu chatbot?</strong>
            <br>• Tomar pedidos completos
            <br>• Dar información y precios
            <br>• Agendar citas
            <br>• Todo lo anterior
            <br><br>
            8️⃣ <strong>¿Tienen catálogo de productos/servicios que mostrar?</strong>
            <br>9️⃣ <strong>¿Necesitan cobrar por el bot o solo información?</strong>
        `,

        // Propuesta de paquetes siguiendo el Prompt Master
        'precio|costo|cuanto|paquete|inversion|presupuesto': `
            💰 <strong>¡Excelente pregunta! Te explico mis 3 paquetes diseñados para México:</strong>
            <br><br>
            🥉 <strong>PAQUETE BÁSICO - $300 MXN</strong>
            <br>• Bot para info básica y FAQ automático
            <br>• Horario automático personalizado
            <br>• 3 flujos principales de conversación
            <br>• <strong>Ideal para:</strong> Negocios pequeños, consultorios, servicios locales
            <br><br>
            🥈 <strong>PAQUETE PREMIUM - $600 MXN</strong> ⭐ Más popular
            <br>• Todo lo básico +
            <br>• Catálogo de productos interactivo
            <br>• Toma de pedidos básica
            <br>• Integración WhatsApp Business
            <br>• <strong>Ideal para:</strong> Restaurantes, e-commerce pequeño, tiendas
            <br><br>
            🥇 <strong>PAQUETE ULTRA - $1,000 MXN</strong>
            <br>• Todo lo premium +
            <br>• Sistema de pagos integrado
            <br>• CRM básico incluido
            <br>• Múltiples plataformas (WhatsApp, Telegram, Web)
            <br>• Reportes de ventas automáticos
            <br>• <strong>Ideal para:</strong> E-commerce establecido, servicios profesionales
            <br><br>
            🎯 <strong>Basándome en lo que me contaste, el paquete [PERSONALIZAR] sería perfecto para tu negocio.</strong>
            <br><br>
            💡 <strong>¿Te gustaría que te muestre exactamente cómo funcionaría tu bot? Puedo hacer una DEMO personalizada en 5 minutos.</strong>
        `,

        // Manejo de objeciones del Prompt Master
        'caro|costoso|mucho|dinero|no tengo': `
            💭 <strong>Entiendo perfectamente. Piénsalo así:</strong>
            <br><br>
            🧮 <strong>Si tu bot captura solo 1 cliente extra al mes, ya se pagó solo.</strong>
            <br><br>
            📊 <strong>¿Cuánto vale un cliente para ti?</strong>
            <br>• Si vale $500+ → El bot se paga en menos de 1 mes
            <br>• Si vale $1000+ → ROI del 300% desde el primer mes
            <br><br>
            💡 <strong>Además piensa en:</strong>
            <br>• Tiempo que ahorras (horas diarias)
            <br>• Clientes que capturas durmiendo
            <br>• Ventas fuera de horario que recuperas
            <br><br>
            <strong>¿Hacemos una DEMO para que veas el valor real?</strong>
        `,

        'no se|duda|funciona|mi negocio|seguro': `
            🤔 <strong>¡Por eso hago la demo personalizada!</strong>
            <br><br>
            <strong>Verás exactamente cómo respondería a TUS clientes con TUS productos.</strong>
            <br><br>
            📱 <strong>En la demo te muestro:</strong>
            <br>• Conversación real con tu tipo de cliente
            <br>• Cómo manejaría tus productos/servicios
            <br>• Flujo completo desde saludo hasta venta
            <br>• Integración con tus plataformas actuales
            <br><br>
            ⏰ <strong>Solo toma 5 minutos y es gratis.</strong>
            <br><br>
            <strong>¿Hacemos la prueba? Te garantizo que será revelador 🚀</strong>
        `,

        'whatsapp|business|ya tengo|tenemos': `
            ✅ <strong>¡Perfecto! El bot se integra con tu WhatsApp actual.</strong>
            <br><br>
            <strong>Imagínate esto:</strong>
            <br>• Tus clientes escriben a tu número actual
            <br>• El bot responde al instante (automático)
            <br>• Solo te notifica cuando necesitan atención humana
            <br>• Tu WhatsApp sigue igual, pero súper potenciado
            <br><br>
            🎯 <strong>Es como tener un empleado perfecto 24/7 que nunca se cansa.</strong>
            <br><br>
            <strong>¿Te muestro cómo funcionaría con TU WhatsApp actual?</strong>
        `,

        'pensarlo|despues|tiempo|ver|analizar': `
            👍 <strong>Claro, es normal. Las mejores decisiones se toman con calma.</strong>
            <br><br>
            📧 <strong>Te dejo mi contacto y mientras tanto:</strong>
            <br>• Desarrollador: Johnny/Jovas - jovany2224@gmail.com
            <br>• Bot demo: @Womiie_bot en Telegram
            <br>• Ubicación: México 🇲🇽
            <br><br>
            💡 <strong>¿Te mando ejemplos de cómo funciona para negocios como el tuyo?</strong>
            <br><br>
            📱 <strong>Cuando estés listo:</strong>
            <br>Escríbeme "LISTO" y comenzamos con tu automatización.
        `,

        // Demo y cierre
        'demo|muestra|ejemplo|ver|funcionando': `
            🚀 <strong>¡Increíble! La demo será reveladora.</strong>
            <br><br>
            📋 <strong>Para preparar TU demo personalizada necesito:</strong>
            <br><br>
            <strong>✅ INFORMACIÓN TÉCNICA (Solo si preguntan):</strong>
            <br>• <strong>Tecnología:</strong> Azure OpenAI (Microsoft)
            <br>• <strong>Plataformas:</strong> WhatsApp, Telegram, Facebook, Web
            <br>• <strong>Tiempo de desarrollo:</strong> 3-5 días hábiles
            <br>• <strong>Soporte:</strong> 30 días incluido
            <br>• <strong>Actualizaciones:</strong> Incluidas primer mes
            <br><br>
            📞 <strong>CONTACTO DIRECTO:</strong>
            <br>• <strong>Desarrollador:</strong> Johnny/Jovas - jovany2224@gmail.com
            <br>• <strong>Bot demo:</strong> @Womiie_bot en Telegram
            <br>• <strong>WhatsApp:</strong> [Tu número]
            <br><br>
            <strong>¿Comenzamos con el análisis detallado de tu negocio? 🎯</strong>
        `,

        'si|listo|empezar|adelante|quiero|comenzar': `
            🚀 <strong>¡EXCELENTE! Me emociona automatizar tu negocio.</strong>
            <br><br>
            📋 <strong>PRÓXIMOS PASOS:</strong>
            <br><br>
            1️⃣ <strong>Contacto inmediato:</strong>
            <br>• Email: jovany2224@gmail.com
            <br>• Telegram: @Womiie_bot
            <br>• Menciona que vienes de CHAPI web
            <br><br>
            2️⃣ <strong>Información que necesito:</strong>
            <br>• Nombre de tu negocio
            <br>• Plataforma preferida (WhatsApp/Telegram)
            <br>• Paquete de interés (Básico/Premium/Ultra)
            <br><br>
            3️⃣ <strong>Tiempo de entrega:</strong>
            <br>• Demo en 24 horas
            <br>• Bot funcionando en 3-5 días
            <br><br>
            🎁 <strong>BONUS por decidir hoy:</strong>
            <br>• Setup gratuito (valor $200 MXN)
            <br>• 30 días de soporte incluido
            <br><br>
            <strong>¡Nos vemos del otro lado! 🤝</strong>
        `,

        // Saludos siguiendo el flujo
        'hola|buenas|buen|dia|tarde|saludos': `
            ¡Hola! 👋 ¡Qué gusto verte por aquí!
            <br><br>
            Soy <strong>CHAPI</strong> (Chatbot Asistente Programador Inteligente), tu especialista en chatbots comerciales para México 🇲🇽
            <br><br>
            Ayudo a negocios como el tuyo a:
            <br>✅ Automatizar atención 24/7
            <br>✅ Aumentar ventas con IA
            <br>✅ Reducir costos hasta 70%
            <br>✅ Capturar leads automáticamente
            <br><br>
            <strong>🏢 ¿Me cuentas qué tipo de negocio tienes para crear tu solución perfecta?</strong>
        `,

        // ...existing code...
    companyName: 'CHAPI Mexico',

    // Mensaje de bienvenida siguiendo el Prompt Master
    welcomeMessage: `
        ¡Hola! 🤖 Soy <strong>CHAPI</strong> (Chatbot Asistente Programador Inteligente), tu especialista en chatbots comerciales.
        <br><br>
        Ayudo a negocios mexicanos como el tuyo a:
        <br>✅ Automatizar atención al cliente 24/7
        <br>✅ Aumentar ventas con asistentes inteligentes
        <br>✅ Reducir costos operativos hasta 70%
        <br>✅ Capturar leads automáticamente
        <br><br>
        <strong>🏢 ¿Me puedes contar sobre tu negocio para crear la solución perfecta?</strong>
        <br><br>
        Selecciona tu tipo de negocio o cuéntamelo directamente 👇
    `,figuration
 * Archivo de configuración fácil de editar para personalizar el asistente
 */

const CHAPI_CONFIG = {
    // ========================================
    // 🎨 CONFIGURACIÓN BÁSICA
    // ========================================

    botName: 'CHAPI',
    companyName: 'CHAPI',

    // Mensaje de bienvenida más conversacional
    welcomeMessage: `
        ¡Hola! 👋 Soy <strong>CHAPI</strong>, tu consultor especializado en automatización de ventas con chatbots inteligentes.
        <br><br>
        Me da mucho gusto conocerte. Para poder ayudarte de la mejor manera, me gustaría conocer un poco sobre ti:
        <br><br>
        🏢 <strong>¿Qué tipo de negocio tienes?</strong>
        <br>• E-commerce / Tienda online
        <br>• Servicios profesionales
        <br>• Restaurante / Alimentación
        <br>• Inmobiliaria
        <br>• Salud / Medicina
        <br>• Educación
        <br>• Otro tipo de negocio
        <br><br>
        Mientras me cuentas, puedo explicarte cómo un chatbot podría revolucionar tus ventas 🚀
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
        // Respuestas a tipos de negocio específicos
        'ecommerce|tienda|online|venta|producto': `
            ¡Excelente! 🛒 Los e-commerce son perfectos para chatbots de ventas.
            <br><br>
            <strong>Te cuento qué podemos hacer por tu tienda:</strong>
            <br>• Recuperar carritos abandonados (hasta +35% más ventas)
            <br>• Recomendar productos personalizados
            <br>• Atender consultas 24/7
            <br>• Procesar pedidos automáticamente
            <br>• Seguimiento post-venta
            <br><br>
            🤔 <strong>¿Cuál es tu mayor dolor de cabeza en ventas ahora?</strong>
            <br>• Muchas consultas sin convertir
            <br>• Carritos abandonados
            <br>• Atención fuera de horario
            <br>• Seguimiento manual de clientes
        `,

        'servicio|profesional|consultor|asesor|doctor|abogado': `
            ¡Perfecto! 👔 Los servicios profesionales generan excelentes resultados con chatbots.
            <br><br>
            <strong>Lo que podemos automatizar para ti:</strong>
            <br>• Calificar leads automáticamente
            <br>• Agendar citas sin intervención humana
            <br>• Enviar formularios de pre-consulta
            <br>• Seguimiento de prospectos
            <br>• Recordatorios de citas
            <br><br>
            📋 <strong>¿Cómo manejas actualmente tus leads?</strong>
            <br>• Llamadas telefónicas manuales
            <br>• WhatsApp personal
            <br>• Formularios web básicos
            <br>• Email marketing
            <br>• No tengo sistema definido
        `,

        'restaurante|comida|delivery|comedor': `
            ¡Increíble! 🍕 Los restaurantes ven resultados inmediatos con chatbots.
            <br><br>
            <strong>Podemos automatizar:</strong>
            <br>• Tomar pedidos 24/7 (incluso cuando estés cerrado)
            <br>• Mostrar menú interactivo con fotos
            <br>• Calcular delivery automáticamente
            <br>• Procesar pagos online
            <br>• Promociones personalizadas
            <br><br>
            🍔 <strong>¿Cómo tomas pedidos actualmente?</strong>
            <br>• WhatsApp manual (muchos mensajes perdidos)
            <br>• Llamadas telefónicas
            <br>• App de delivery (altas comisiones)
            <br>• Solo presencial
        `,

        'inmobiliaria|bienes|raices|propiedades|casa|departamento': `
            ¡Excelente sector! 🏠 Las inmobiliarias multiplican sus leads con chatbots.
            <br><br>
            <strong>Automatizamos tu proceso completo:</strong>
            <br>• Calificar interesados por presupuesto/zona
            <br>• Agendar visitas automáticamente
            <br>• Enviar catálogo de propiedades
            <br>• Seguimiento de prospectos calientes
            <br>• Recordatorios de pagos/citas
            <br><br>
            🏡 <strong>¿Cuál es tu mayor reto ahora?</strong>
            <br>• Muchas consultas "curiosos" que no compran
            <br>• Seguimiento manual de cada lead
            <br>• Agendar visitas consume mucho tiempo
            <br>• Perderse leads por respuesta tardía
        `,

        'salud|medicina|doctor|clinica|consultorio|medico': `
            ¡Sector vital! 🏥 Los consultorios médicos optimizan muchísimo con chatbots.
            <br><br>
            <strong>Servicios que automatizamos:</strong>
            <br>• Agendar citas por especialidad
            <br>• Triaje inicial de síntomas
            <br>• Recordatorios de citas/medicamentos
            <br>• Formularios médicos pre-consulta
            <br>• Solicitar estudios/resultados
            <br><br>
            🩺 <strong>¿Cómo es tu proceso actual de citas?</strong>
            <br>• Recepcionista telefónica (se satura)
            <br>• WhatsApp de la clínica
            <br>• Sistema web básico
            <br>• Solo presencial/llamadas
        `,

        'educacion|escuela|curso|capacitacion|universidad': `
            ¡Sector en crecimiento! 🎓 Las instituciones educativas se benefician enormemente.
            <br><br>
            <strong>Automatizamos tu admisión y soporte:</strong>
            <br>• Inscripciones y pagos automáticos
            <br>• Información de programas/horarios
            <br>• Seguimiento de aspirantes
            <br>• Soporte a estudiantes 24/7
            <br>• Recordatorios de clases/exámenes
            <br><br>
            📚 <strong>¿Qué tipo de educación ofreces?</strong>
            <br>• Cursos online/capacitaciones
            <br>• Universidad/instituto
            <br>• Escuela tradicional
            <br>• Coaching/consultoría educativa
        `,

        'otro|diferente|especial|no se|distinto': `
            ¡No hay problema! 🌟 Trabajamos con todo tipo de negocios.
            <br><br>
            Para entender mejor cómo ayudarte, cuéntame:
            <br><br>
            💼 <strong>¿A qué se dedica tu negocio específicamente?</strong>
            <br><br>
            🎯 <strong>¿Cuál es tu mayor reto en ventas/atención?</strong>
            <br>• Muchas consultas repetitivas
            <br>• Perder clientes fuera de horario
            <br>• Seguimiento manual de leads
            <br>• Proceso de ventas muy lento
            <br>• Competencia muy agresiva
            <br><br>
            Con esa información te puedo armar una propuesta específica 💡
        `,

        // Respuestas sobre problemas/dolores específicos
        'consultas|repetitivas|mensajes|whatsapp|saturado': `
            ¡Exactamente! 😤 Ese es el dolor #1 de la mayoría de negocios.
            <br><br>
            <strong>Te cuento qué logramos con nuestros clientes:</strong>
            <br>✅ 85% menos consultas repetitivas
            <br>✅ Respuesta inmediata 24/7
            <br>✅ Solo te llegan leads calificados
            <br>✅ Tu equipo se enfoca en cerrar ventas
            <br><br>
            El chatbot responde automáticamente preguntas como:
            <br>• Precios, horarios, ubicación
            <br>• Disponibilidad de productos/servicios
            <br>• Formas de pago y envío
            <br>• Información básica
            <br><br>
            🤔 <strong>¿Cuántas consultas recibes al día aproximadamente?</strong>
        `,

        'carrito|abandonado|no|compran|leads|frios': `
            ¡Ese problema tiene solución! 🎯 Los carritos abandonados son oro perdido.
            <br><br>
            <strong>Con nuestro sistema de recuperación:</strong>
            <br>🚀 +35% de recuperación promedio
            <br>⏰ Mensajes automáticos en el momento perfecto
            <br>💝 Ofertas personalizadas para cada caso
            <br>🔄 Seguimiento inteligente sin ser invasivo
            <br><br>
            <strong>El proceso:</strong>
            <br>1. Cliente abandona carrito → Bot detecta
            <br>2. Espera tiempo óptimo (2-4 horas)
            <br>3. Envía mensaje personalizado con incentivo
            <br>4. Si no responde, reenvía con mejor oferta
            <br><br>
            💰 <strong>¿Qué % de tus visitantes compra actualmente?</strong>
        `,

        'horario|24|7|noche|madrugada|fuera': `
            ¡Súper importante! 🌙 Muchas ventas se pierden fuera de horario.
            <br><br>
            <strong>Nuestros clientes reportan:</strong>
            <br>📈 30-40% más ventas por atención 24/7
            <br>🌍 Clientes de diferentes zonas horarias
            <br>⚡ Respuesta inmediata vs esperar al día siguiente
            <br>💤 Tu equipo descansa, el bot trabaja
            <br><br>
            <strong>El bot maneja de noche:</strong>
            <br>• Toma pedidos completos
            <br>• Califica leads y los categoriza
            <br>• Agenda citas para el día siguiente
            <br>• Procesa pagos automáticamente
            <br><br>
            🕐 <strong>¿A qué hora recibes más consultas perdidas?</strong>
        `,

        // Preguntas sobre volumen y métricas
        '10|15|20|25|30|pocas': `
            Perfecto, con ese volumen es ideal empezar 📊
            <br><br>
            <strong>Con 10-30 consultas diarias puedes:</strong>
            <br>• Automatizar 70-80% de respuestas básicas
            <br>• Calificar leads automáticamente
            <br>• Generar 5-10 leads extras por mes
            <br>• Ahorrar 2-3 horas diarias de tu tiempo
            <br><br>
            💡 <strong>Imagina si pudieras duplicar ese volumen:</strong>
            <br>¿Tu negocio está preparado para atender 50-60 consultas diarias?
            <br><br>
            El chatbot crece contigo, sin costo extra por mensaje 📈
            <br><br>
            🎯 <strong>¿Te gustaría ver cómo funcionaría en tu negocio específico?</strong>
        `,

        '50|60|70|80|90|100|muchas|bastantes': `
            ¡Wow! 🚀 Con ese volumen definitivamente necesitas automatización.
            <br><br>
            <strong>Con 50+ consultas diarias:</strong>
            <br>⚡ Bot maneja 80-90% automáticamente
            <br>💰 ROI del 300-500% en el primer mes
            <br>⏰ Tu equipo ahorra 4-6 horas diarias
            <br>📈 Puedes escalar sin contratar más personal
            <br><br>
            <strong>Casos de éxito similares:</strong>
            <br>• Restaurante: De 60 a 180 pedidos/día
            <br>• E-commerce: +120% conversión en 90 días
            <br>• Servicios: De 2 a 15 empleados sin cambiar atención
            <br><br>
            🎯 <strong>¿Cuánto tiempo dedica tu equipo a responder lo mismo todos los días?</strong>
        `,

        // Preguntas sobre conversión y ROI
        '1|2|3|4|5|conversion|bajo|poco': `
            ¡Ahí está la oportunidad de oro! 💎
            <br><br>
            <strong>Con 1-5% de conversión actual:</strong>
            <br>🎯 Podemos llevarte a 8-15% fácilmente
            <br>📊 Solo con mejor calificación de leads
            <br>⚡ Respuesta inmediata = +60% más ventas
            <br>🎁 Ofertas personalizadas en momento perfecto
            <br><br>
            <strong>¿Te imaginas qué pasaría si duplicaras tu conversión?</strong>
            <br><br>
            Con tus mismos visitantes, pero vendiendo el doble 🚀
            <br><br>
            🤔 <strong>¿Qué crees que pierdes más?</strong>
            <br>• Leads que no responden rápido
            <br>• Consultas que no sabes cómo manejar
            <br>• Competencia que responde antes
        `,

        // Palabras clave originales mejoradas
        'precio|costo|plan|cuanto|inversion': `
            💰 <strong>Excelente pregunta. Te explico nuestras opciones:</strong>
            <br><br>
            🥉 <strong>BÁSICO - $990 MXN/mes</strong>
            <br>• 1 canal • 50 leads/mes • Plantillas básicas
            <br>• Perfecto para empezar y probar
            <br><br>
            🥈 <strong>PROFESIONAL - $1,990 MXN/mes</strong> ⭐ Más popular
            <br>• 2 canales • 500 leads/mes • IA avanzada • CRM
            <br>• 90% de nuestros clientes están aquí
            <br><br>
            🥇 <strong>EMPRESARIAL - $3,990 MXN/mes</strong>
            <br>• Todo ilimitado • Machine Learning • API custom
            <br>• Para empresas que manejan 1000+ leads/mes
            <br><br>
            🎁 <strong>30 días gratis + ROI garantizado o devolvemos tu dinero</strong>
            <br><br>
            💡 <strong>Basado en lo que me contaste, te recomendaría...</strong>
            <br>¿Te gustaría una demo personalizada para ver cómo funcionaría en tu caso específico?
        `,

        // Respuestas de seguimiento y cierre conversacional
        'demo|prueba|test|ver|mostrar|ejemplo': `
            🚀 <strong>¡Excelente decisión! Una demo vale más que mil palabras.</strong>
            <br><br>
            Para preparar la demo perfecta para ti, necesito conocer:
            <br><br>
            📋 <strong>¿Cuál sería el resultado ideal del chatbot para tu negocio?</strong>
            <br>• Más ventas automáticas
            <br>• Menos tiempo respondiendo consultas
            <br>• Mejor atención 24/7
            <br>• Organizar mejor mis leads
            <br>• Todo lo anterior 😎
            <br><br>
            <strong>Opciones para tu demo:</strong>
            <br>📱 WhatsApp: <a href="https://wa.me/525500000000?text=Hola%20quiero%20demo%20personalizada" target="_blank">+52 55 0000 0000</a>
            <br>💬 Telegram: <a href="https://t.me/Womiie_bot" target="_blank">@Womiie_bot</a>
            <br>📅 Agendar llamada: <a href="https://chapibot.pro/demo" target="_blank">chapibot.pro/demo</a>
            <br><br>
            ⏰ <strong>Demo express: 15 minutos</strong> | <strong>Demo completa: 30 minutos</strong>
        `,

        'contacto|hablar|equipo|asesor|humano|persona': `
            👨‍💼 <strong>¡Perfecto! Te conecto con nuestro equipo de especialistas.</strong>
            <br><br>
            Antes de conectarte, compárteme:
            <br><br>
            💡 <strong>¿Qué te emocionó más de lo que conversamos?</strong>
            <br>• La automatización de ventas
            <br>• La atención 24/7
            <br>• El ROI garantizado
            <br>• Las integraciones con sistemas
            <br>• Los casos de éxito
            <br><br>
            🎯 <strong>¿Cuándo te gustaría empezar?</strong>
            <br>• Esta misma semana
            <br>• En las próximas 2 semanas
            <br>• El próximo mes
            <br>• Solo estoy investigando por ahora
            <br><br>
            📞 <strong>Contacto directo:</strong>
            <br>• WhatsApp: <a href="https://wa.me/525500000000?text=Hola%20hablé%20con%20CHAPI%20y%20quiero%20hablar%20con%20el%20equipo" target="_blank">+52 55 0000 0000</a>
            <br>• Email: <a href="mailto:ventas@chapibot.pro?subject=Contacto desde CHAPI Assistant">ventas@chapibot.pro</a>
        `,

        'gracias|perfecto|excelente|genial|me gusta|interesante': `
            😊 <strong>¡Me da mucho gusto que te haya sido útil!</strong>
            <br><br>
            Para no perder el hilo de nuestra conversación:
            <br><br>
            🎯 <strong>¿Cuál sería tu siguiente paso ideal?</strong>
            <br>• Ver una demo personalizada
            <br>• Hablar con un especialista
            <br>• Recibir una propuesta por email
            <br>• Agendar para la próxima semana
            <br>• Necesito pensarlo un poco más
            <br><br>
            💡 <strong>Mientras decides, te dejo algo valuable:</strong>
            <br>📊 <a href="https://chapibot.pro/roi-calculator" target="_blank">Calculadora de ROI</a> - Ve tu potencial de ganancia
            <br>📚 <a href="https://chapibot.pro/casos-exito" target="_blank">Casos de éxito</a> - Resultados reales de clientes
            <br><br>
            ¿Te gustaría que te envíe información adicional por WhatsApp?
        `,

        'no|tal vez|despues|luego|pensarlo|tiempo': `
            👍 <strong>¡Totalmente entendible! Las mejores decisiones se toman con calma.</strong>
            <br><br>
            📧 <strong>¿Te parece si te envío información sin compromiso?</strong>
            <br>• Casos de éxito de tu industria
            <br>• Calculadora de ROI personalizada
            <br>• Checklist: "¿Necesito un chatbot?"
            <br>• Guía de implementación paso a paso
            <br><br>
            🤔 <strong>¿Hay algo específico que te preocupa o te frena?</strong>
            <br>• Precio/inversión
            <br>• Complejidad técnica
            <br>• Tiempo de implementación
            <br>• Si realmente funciona
            <br>• Otro tema
            <br><br>
            Sin presión, solo quiero asegurarme de que tengas toda la información 😊
            <br><br>
            📱 Cuando estés listo: <a href="https://wa.me/525500000000?text=Hola%20CHAPI,%20estoy%20listo%20para%20platicar" target="_blank">+52 55 0000 0000</a>
        `,

        'si|listo|adelante|empezar|cuando|como': `
            🚀 <strong>¡Increíble! Me emociona mucho trabajar contigo.</strong>
            <br><br>
            📋 <strong>Para empezar necesito confirmar algunos detalles:</strong>
            <br><br>
            1️⃣ <strong>¿Cuál es tu nombre y el de tu empresa?</strong>
            <br><br>
            2️⃣ <strong>¿Cuándo te gustaría tener tu chatbot funcionando?</strong>
            <br>• Lo antes posible (esta semana)
            <br>• En 2-3 semanas está perfecto
            <br>• No hay prisa, cuando sea mejor para ustedes
            <br><br>
            3️⃣ <strong>¿Prefieres WhatsApp o llamada para afinar detalles?</strong>
            <br><br>
            🎁 <strong>Regalo por decidirte hoy:</strong>
            <br>• 60 días gratis en lugar de 30
            <br>• Setup gratuito (valor $5,000 MXN)
            <br>• 3 meses de soporte premium
            <br><br>
            📞 <strong>Contacto inmediato:</strong>
            <br>WhatsApp: <a href="https://wa.me/525500000000?text=¡Hola!%20Soy%20[TU_NOMBRE]%20de%20[TU_EMPRESA]%20y%20quiero%20empezar%20con%20mi%20chatbot" target="_blank">+52 55 0000 0000</a>
        `,

        // Respuestas a saludos más conversacionales
        'hola|buenas|buen|dia|tarde|noche|saludos': `
            ¡Hola! 👋 ¡Qué gusto verte por aquí!
            <br><br>
            Soy <strong>CHAPI</strong>, especialista en automatización de ventas con chatbots inteligentes.
            <br><br>
            Me da muchísima curiosidad conocerte 😊
            <br><br>
            🏢 <strong>¿Qué tipo de negocio tienes?</strong>
            <br>• E-commerce / Tienda online
            <br>• Servicios profesionales (médico, abogado, consultor)
            <br>• Restaurante / Comida
            <br>• Inmobiliaria
            <br>• Educación / Cursos
            <br>• Otro tipo de negocio
            <br><br>
            Mientras me cuentas, te voy explicando cómo un chatbot podría transformar tu manera de vender 🚀
        `,

        // Respuestas por defecto más inteligentes
        'ayuda|help|que|puedes|hacer|funciones': `
            ¡Excelente pregunta! 💡 Estoy diseñado para ser tu consultor personal en automatización.
            <br><br>
            <strong>Puedo ayudarte a:</strong>
            <br>🔍 Analizar tu tipo de negocio y necesidades
            <br>💰 Calcular el ROI potencial de un chatbot
            <br>📊 Mostrarte casos de éxito similares al tuyo
            <br>⚡ Explicarte cómo automatizar tus ventas
            <br>🎯 Diseñar una estrategia personalizada
            <br>📞 Conectarte con nuestro equipo cuando estés listo
            <br><br>
            Lo mejor es que conversemos como personas reales 😊
            <br><br>
            🤔 <strong>¿Por dónde te gustaría empezar?</strong>
            <br>• Cuéntame sobre tu negocio
            <br>• Ver casos de éxito
            <br>• Conocer precios y planes
            <br>• Agendar una demo
        `,

        // ...existing code...
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
                icon: '🏢',
                text: 'Tengo un e-commerce',
                action: 'ecommerce'
            },
            {
                icon: '�',
                text: 'Ofrezco servicios profesionales',
                action: 'servicio'
            },
            {
                icon: '🍕',
                text: 'Tengo un restaurante',
                action: 'restaurante'
            },
            {
                icon: '🏠',
                text: 'Trabajo en inmobiliaria',
                action: 'inmobiliaria'
            },
            {
                icon: '🎓',
                text: 'Mi negocio es educación',
                action: 'educacion'
            },
            {
                icon: '🌟',
                text: 'Otro tipo de negocio',
                action: 'otro'
            }
        ],

        // Botones después de mostrar precios
        after_pricing: [
            {
                icon: '🎁',
                text: '¡Quiero empezar!',
                action: 'si'
            },
            {
                icon: '📞',
                text: 'Agendar demo personalizada',
                action: 'demo'
            },
            {
                icon: '🤔',
                text: 'Necesito pensarlo',
                action: 'pensarlo'
            },
            {
                icon: '💡',
                text: 'Hablar con especialista',
                action: 'contacto'
            }
        ]
    },

    // ========================================
    // 🔗 ENLACES IMPORTANTES
    // ========================================

    links: {
        website: 'https://chapibot.pro',
        demo: 'https://chapibot.pro/demo',
        whatsapp: 'https://wa.me/525500000000', // Actualizar con número real
        telegram: 'https://t.me/Womiie_bot',
        developer_email: 'jovany2224@gmail.com',
        support_email: 'jovany2224@gmail.com',
        sales_email: 'jovany2224@gmail.com',
        phone: '+52 55 0000 0000' // Actualizar con número real
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
