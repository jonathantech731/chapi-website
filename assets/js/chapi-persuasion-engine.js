// 🔥 CHAPI PERSUASION ENGINE - Motor de Conversión Avanzado
// Este módulo hace que tu chatbot sea más persuasivo y convenza mejor

class ChapiPersuasionEngine {
    constructor() {
        this.userProfile = {
            timeOnSite: 0,
            pagesVisited: 1,
            interests: [],
            urgencyLevel: 'low',
            priceReaction: null,
            objections: []
        };

        this.persuasionTechniques = {
            scarcity: "⚡ Solo quedan 3 implementaciones disponibles este mes",
            social_proof: "🎉 +150 empresas ya confían en CHAPI",
            urgency: "🔥 Oferta especial termina en 24 horas",
            authority: "👨‍💼 Recomendado por expertos en automatización",
            reciprocity: "🎁 Setup GRATIS si decides hoy",
            commitment: "📝 ¿Te gustaría que te reserve un slot?"
        };

        this.objectionHandlers = {
            precio: this.handlePriceObjection,
            tiempo: this.handleTimeObjection,
            complejidad: this.handleComplexityObjection,
            confianza: this.handleTrustObjection,
            necesidad: this.handleNeedObjection
        };

        this.initTracking();
    }

    // 🎯 Detecta el perfil del usuario automáticamente
    initTracking() {
        this.userProfile.timeOnSite = Date.now();

        // Detectar comportamiento del usuario
        this.trackEngagement();
        this.detectUrgency();
        this.analyzeInterests();
    }

    // 📊 Analiza el comportamiento para personalizar mensajes
    trackEngagement() {
        let scrollDepth = 0;
        let timeSpent = 0;

        window.addEventListener('scroll', () => {
            scrollDepth = Math.max(scrollDepth, window.scrollY);
            this.userProfile.engagement = this.calculateEngagement(scrollDepth, timeSpent);
        });

        setInterval(() => {
            timeSpent += 1;
            this.userProfile.timeOnSite = timeSpent;
        }, 1000);
    }

    // 🔥 Genera respuestas persuasivas basadas en el contexto
    getPersuasiveResponse(userMessage, context) {
        const lowerMessage = userMessage.toLowerCase();

        // Detectar intención y objecciones
        const intent = this.detectIntent(lowerMessage);
        const objection = this.detectObjection(lowerMessage);

        let response = '';

        if (objection) {
            response = this.handleObjection(objection, context);
        } else {
            response = this.generateContextualResponse(intent, context);
        }

        // Añadir técnicas de persuasión
        response = this.addPersuasionElements(response, intent);

        return response;
    }

    // 🛡️ Manejo inteligente de objeciones
    handleObjection(objection, context) {
        const responses = {
            precio: [
                "💰 Entiendo tu preocupación sobre la inversión. Déjame ponerte esto en perspectiva:",
                "📈 El plan BÁSICO ($990/mes) se paga solo con 2 ventas extra al mes",
                "🎯 Nuestros clientes recuperan la inversión en las primeras 2 semanas",
                "💡 ¿Cuánto pierdes cada mes por NO tener automatización?"
            ],
            tiempo: [
                "⚡ ¡Excelente pregunta! La implementación es súper rápida:",
                "✅ Configuración básica: 24 horas",
                "🚀 Primera venta automatizada: Día 2",
                "📊 ROI positivo: Primera semana"
            ],
            complejidad: [
                "😊 Te entiendo perfectamente. Por eso hicimos CHAPI súper simple:",
                "🎮 Funciona solo - sin programación",
                "📱 Se conecta automáticamente a WhatsApp",
                "👨‍💻 Mi equipo se encarga de TODO el setup"
            ]
        };

        return responses[objection] ? responses[objection].join('<br><br>') + '<br><br>🤔 ¿Qué más te gustaría saber?' : '';
    }

    // 🎯 Detección automática de intenciones
    detectIntent(message) {
        const intents = {
            pricing: ['precio', 'costo', 'cuanto', 'plan', 'pagar'],
            demo: ['demo', 'prueba', 'ver', 'mostrar', 'ejemplo'],
            features: ['que hace', 'funciones', 'caracteristicas'],
            comparison: ['competencia', 'mejor', 'diferencia'],
            urgency: ['urgente', 'rapido', 'ya', 'ahora'],
            contact: ['contacto', 'llamar', 'hablar']
        };

        for (const [intent, keywords] of Object.entries(intents)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                return intent;
            }
        }

        return 'general';
    }

    // 🔥 Genera respuestas que VENDEN
    generateContextualResponse(intent, context) {
        const responses = {
            pricing: this.getPricingResponse(context),
            demo: this.getDemoResponse(context),
            features: this.getFeaturesResponse(context),
            urgency: this.getUrgencyResponse(context),
            general: this.getGeneralResponse(context)
        };

        return responses[intent] || responses.general;
    }

    // 💰 Respuesta de precios optimizada para conversión
    getPricingResponse(context) {
        const baseResponse = `
        💎 <strong>Inversión en CHAPI (Vale cada peso):</strong><br><br>

        🥉 <strong>BÁSICO - $990 MXN/mes</strong><br>
        💡 Se paga solo con 2 ventas extra<br>
        ✅ Perfecto para empezar a automatizar<br><br>

        🥈 <strong>PRO - $1,990 MXN/mes</strong> ⭐ <em>MÁS POPULAR</em><br>
        🚀 ROI promedio: 300% en primer mes<br>
        💰 Nuestros clientes facturan +$30k extra/mes<br><br>

        🥇 <strong>EMPRESARIAL - $3,990 MXN/mes</strong><br>
        🏆 Para empresas serias que quieren DOMINAR<br>
        📈 Clientes reportan +500% en ventas<br><br>
        `;

        // Añadir urgencia y scarcity
        const urgency = this.userProfile.timeOnSite > 180 ?
            `🔥 <strong>OFERTA ESPECIAL:</strong> Setup GRATIS si decides hoy<br>⚡ Solo quedan 2 slots para implementación inmediata<br><br>` : '';

        const cta = `📱 <strong>¿Hablamos por WhatsApp para ver cuál te conviene?</strong><br>
        👉 <a href="https://wa.me/522228588674?text=Hola%20Jovany%2C%20me%20interesa%20CHAPI%20y%20quiero%20conocer%20más%20sobre%20los%20planes" target="_blank">Chatear ahora</a>`;

        return baseResponse + urgency + cta;
    }

    // 🚀 Respuesta de demo que genera deseo
    getDemoResponse(context) {
        return `
        🎬 <strong>¡Perfecto! Te va a ENCANTAR ver CHAPI en acción:</strong><br><br>

        🎯 En la demo te muestro:<br>
        ✅ Tu chatbot vendiendo 24/7 (sin descanso)<br>
        ✅ Leads capturados automáticamente<br>
        ✅ Ventas cerrándose mientras duermes<br>
        ✅ Tu competencia quedándose atrás<br><br>

        💡 <strong>Demo personalizada para TU negocio</strong><br>
        ⏰ 15 minutos que van a cambiar tu empresa<br><br>

        🔥 <strong>BONUS:</strong> Si te gusta (y te va a gustar), implemento tu primer chatbot GRATIS<br><br>

        📱 <a href="https://wa.me/522228588674?text=Jovany%2C%20quiero%20ver%20la%20demo%20de%20CHAPI%20para%20mi%20negocio" target="_blank">📞 Agendar demo AHORA</a>
        `;
    }

    // ⚡ Añade elementos de persuasión basados en psicología
    addPersuasionElements(response, intent) {
        const timeOnSite = (Date.now() - this.userProfile.timeOnSite) / 1000;

        // Añadir prueba social después de 30 segundos
        if (timeOnSite > 30) {
            response += '<br><br>👥 <em>En este momento hay 23 personas viendo CHAPI</em>';
        }

        // Añadir escasez después de 60 segundos
        if (timeOnSite > 60) {
            response += '<br>⚡ <strong>Solo 3 implementaciones disponibles esta semana</strong>';
        }

        // Añadir urgencia después de 2 minutos
        if (timeOnSite > 120) {
            response += '<br>🔥 <em>¿Cuántas ventas estás perdiendo cada minuto sin automatización?</em>';
        }

        return response;
    }

    // 🎯 Calcula nivel de engagement
    calculateEngagement(scrollDepth, timeSpent) {
        const engagementScore = (scrollDepth / 1000) + (timeSpent / 60);

        if (engagementScore > 5) return 'high';
        if (engagementScore > 2) return 'medium';
        return 'low';
    }

    // 🔥 Respuesta de urgencia para cerrar venta
    getUrgencyResponse(context) {
        return `
        ⚡ <strong>¡PERFECTO timing!</strong> Justo ahora tengo algo especial:<br><br>

        🎯 <strong>OFERTA RELÁMPAGO (Solo hoy):</strong><br>
        ✅ Setup completamente GRATIS ($5,000 valor)<br>
        ✅ Primera semana sin costo<br>
        ✅ Garantía de resultados o dinero de vuelta<br><br>

        ⏰ <strong>Esta oferta expira en 2 horas</strong><br>
        🔥 Solo para las primeras 3 empresas que respondan<br><br>

        💰 <strong>¿Listo para automatizar y multiplicar ventas?</strong><br>
        📱 <a href="https://wa.me/522228588674?text=Jovany%2C%20quiero%20la%20oferta%20especial%20de%20CHAPI%20AHORA" target="_blank">🚀 ¡QUIERO LA OFERTA!</a>
        `;
    }
}

// 🚀 Inicializar el motor de persuasión
window.ChapiPersuasionEngine = ChapiPersuasionEngine;
