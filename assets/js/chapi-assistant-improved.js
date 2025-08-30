/**
 * 🤖 CHAPI Assistant Widget - Versión Persuasiva PRO
 * Asistente inteligente especializado en conversión y ventas
 * @version 3.1
 * @author CHAPI Team
 */

class ChapiAssistant {
    constructor(config = {}) {
        this.config = {
            apiKey: config.apiKey || '',
            botName: config.botName || 'CHAPI',
            enableAI: config.enableAI || false,
            welcomeMessage: config.welcomeMessage || '¡Hola! 👋 ¡Perfecto que llegaste hasta aquí! Soy CHAPI y en los próximos minutos te voy a mostrar cómo puedes <strong>AUTOMATIZAR tus ventas</strong> y facturar más sin trabajar 24/7. ¿Tienes un negocio o emprendimiento?',
            companyName: config.companyName || 'CHAPI',
            whatsappNumber: config.whatsappNumber || '+52 222 858 8674',
            email: config.email || 'jovany2224@gmail.com',
            enableAnalytics: config.enableAnalytics !== false,
            enableLeadCapture: config.enableLeadCapture !== false,
            ...config
        };

        this.isOpen = false;
        this.messages = [];
        this.currentFlow = null;
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.userProfile = {
            name: null,
            email: null,
            phone: null,
            business: null,
            interests: [],
            urgencyLevel: 0,
            objections: [],
            engagementScore: 0
        };

        // Analytics avanzadas
        this.analytics = {
            messagesCount: 0,
            timeSpent: 0,
            interactions: [],
            conversion: false,
            leadCaptured: false,
            objectionsSolved: 0,
            urgencyTriggered: false,
            socialProofShown: false
        };

        // Intents persuasivos mejorados para MÁXIMA CONVERSIÓN
        this.intents = {
            saludo: {
                keywords: ['hola', 'buenos', 'buenas', 'hi', 'hello', 'hey', 'saludos'],
                responses: [
                    '¡Hola! 👋 ¡Perfecto que llegaste hasta aquí! Soy CHAPI y en los próximos minutos te voy a mostrar cómo puedes <strong>AUTOMATIZAR tus ventas</strong> y facturar más sin trabajar 24/7. ¿Tienes un negocio o emprendimiento?',
                    '¡Hey! 🚀 Soy CHAPI, tu nuevo aliado para <strong>MULTIPLICAR ventas</strong>. Justo ahora estoy ayudando a +150 empresas a automatizar y <strong>aumentar sus ingresos un 40% promedio</strong>. ¿Qué tipo de negocio tienes?'
                ]
            },
            precios: {
                keywords: ['precio', 'costo', 'cuánto', 'cuanto', 'plan', 'pagar', 'tarifa', 'inversión'],
                responses: [
                    '💰 <strong>¡Excelente pregunta!</strong> La inversión en CHAPI se recupera en las primeras 2 semanas. Te explico:<br><br>🥉 <strong>BÁSICO $990/mes</strong> - Se paga solo con 2 ventas extra<br>🥈 <strong>PRO $1,990/mes</strong> ⭐ Más popular - ROI 300%<br>🥇 <strong>EMPRESARIAL $3,990/mes</strong> - Para dominar el mercado<br><br>💡 <strong>¿Cuántas ventas pierdes cada mes por NO tener automatización?</strong><br><br>📱 <a href="https://wa.me/522228588674?text=Jovany%2C%20quiero%20saber%20más%20sobre%20los%20planes%20de%20CHAPI" target="_blank">Hablemos de números reales</a>'
                ],
                followUp: '🎯 Cuéntame sobre tu negocio y te digo exactamente cuánto podrías ganar extra cada mes con CHAPI'
            },
            demo: {
                keywords: ['demo', 'prueba', 'ver', 'mostrar', 'ejemplo', 'funcionamiento'],
                responses: [
                    '🎬 <strong>¡PERFECTO!</strong> La demo de CHAPI es impresionante. En 15 minutos te muestro:<br><br>✅ Tu chatbot vendiendo mientras duermes<br>✅ Leads capturados automáticamente<br>✅ Ventas cerrándose 24/7<br>✅ Tu competencia quedándose atrás<br><br>🔥 <strong>BONUS:</strong> Si te gusta (y te va a gustar), implemento tu primer chatbot GRATIS<br><br>📱 <a href="https://wa.me/522228588674?text=Jovany%2C%20quiero%20ver%20la%20demo%20personalizada%20de%20CHAPI" target="_blank">Ver demo personalizada AHORA</a>'
                ],
                followUp: '⚡ ¿Qué tipo de negocio tienes? Así personalizo la demo para mostrarte exactamente cómo CHAPI multiplicaría tus ventas'
            },
            urgente: {
                keywords: ['urgente', 'rápido', 'ya', 'ahora', 'inmediato', 'cuanto antes'],
                responses: [
                    '⚡ <strong>¡PERFECTO TIMING!</strong> Justo tengo algo especial para ti:<br><br>🎯 <strong>IMPLEMENTACIÓN EXPRESS (24 HORAS):</strong><br>✅ Setup completo GRATIS ($5,000 valor)<br>✅ Primera semana sin costo<br>✅ Tu primer chatbot funcionando mañana<br><br>🔥 <strong>Solo para las primeras 3 empresas HOY</strong><br><br>📱 <a href="https://wa.me/522228588674?text=Jovany%2C%20NECESITO%20la%20implementación%20express%20de%20CHAPI" target="_blank">🚀 ¡LO QUIERO YA!</a>'
                ]
            },
            objeciones: {
                keywords: ['caro', 'costoso', 'no tengo', 'pensarlo', 'después', 'más tarde'],
                responses: [
                    '😊 Te entiendo perfectamente. Déjame ponerte esto en perspectiva:<br><br>💡 <strong>¿Sabes cuánto pierdes cada mes sin automatización?</strong><br>📊 Promedio: $15,000-30,000 MXN en ventas perdidas<br>⚡ CHAPI se paga solo con 2 ventas extra<br><br>🎯 <strong>Pregunta clave:</strong> ¿Cuánto vale para ti recuperar 10 horas semanales y duplicar ventas?<br><br>📱 <a href="https://wa.me/522228588674?text=Jovany%2C%20necesito%20entender%20mejor%20el%20ROI%20de%20CHAPI" target="_blank">Hablemos de números reales</a>'
                ]
            },
            competencia: {
                keywords: ['competencia', 'otros', 'diferencia', 'mejor', 'comparar'],
                responses: [
                    '🏆 <strong>¡Excelente pregunta!</strong> Esto es lo que nos hace ÚNICOS:<br><br>✅ <strong>Implementación 24h</strong> (otros: semanas)<br>✅ <strong>IA mexicana</strong> entrenada para latinos<br>✅ <strong>Soporte 24/7</strong> en español<br>✅ <strong>ROI garantizado</strong> o dinero de vuelta<br>✅ <strong>Sin dependencias</strong> de plataformas extranjeras<br><br>💰 <strong>Resultado:</strong> 40% más conversión que la competencia<br><br>📱 <a href="https://wa.me/522228588674?text=Jovany%2C%20quiero%20ver%20por%20qué%20CHAPI%20es%20mejor%20que%20la%20competencia" target="_blank">Ver comparativa completa</a>'
                ]
            },
            caracteristicas: {
                keywords: ['qué hace', 'funciones', 'características', 'como funciona'],
                responses: [
                    '🤖 <strong>CHAPI hace MAGIA para tu negocio:</strong><br><br>🎯 <strong>VENDE 24/7:</strong> Atiende, cotiza y cierra ventas<br>📊 <strong>CAPTURA LEADS:</strong> Convierte visitantes en clientes<br>🔗 <strong>SE INTEGRA:</strong> CRM, pago, inventario, todo<br>📱 <strong>MULTICANAL:</strong> WhatsApp, Web, Telegram<br>🧠 <strong>IA AVANZADA:</strong> Aprende de cada conversación<br><br>💎 <strong>RESULTADO:</strong> +40% ventas, -60% tiempo atención<br><br>📱 <a href="https://wa.me/522228588674?text=Jovany%2C%20quiero%20ver%20CHAPI%20en%20acción%20para%20mi%20negocio" target="_blank">Ver en acción</a>'
                ]
            },
            contacto: {
                keywords: ['contacto', 'llamar', 'teléfono', 'whatsapp', 'email', 'correo'],
                responses: [
                    '📞 <strong>¡Perfecto!</strong> Te dejo mis datos para que hablemos directamente:<br><br>📱 <strong>WhatsApp:</strong> +52 222 858 8674<br>📧 <strong>Email:</strong> jovany2224@gmail.com<br><br>💡 <strong>TIP:</strong> Por WhatsApp me toma 5 minutos explicarte cómo CHAPI puede duplicar tus ventas.<br><br>🎯 <strong>¿Prefieres que te llame yo?</strong> Solo dime tu número y en 2 minutos te contacto.'
                ]
            }
        };

        // Flujos de conversación avanzados para captura de leads
        this.conversationFlows = {
            leadCapture: {
                steps: [
                    {
                        message: '🎯 Para darte el mejor consejo personalizado, ¿cómo te llamas?',
                        field: 'name',
                        validation: (input) => input.length > 1
                    },
                    {
                        message: '📧 ¿Cuál es tu email? (Para enviarte la propuesta personalizada)',
                        field: 'email',
                        validation: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
                    },
                    {
                        message: '🏢 ¿Qué tipo de negocio tienes? (Para calcularte el ROI exacto)',
                        field: 'business',
                        validation: (input) => input.length > 2
                    }
                ],
                completion: (data) => {
                    return `🎉 <strong>¡Perfecto ${data.name}!</strong><br><br>Ya tengo tu info para preparar una propuesta personalizada para tu ${data.business}.<br><br>📊 <strong>Análisis rápido:</strong> Con CHAPI podrías aumentar tus ventas entre 25-50% en el primer mes.<br><br>💰 <strong>ROI estimado:</strong> 300-500%<br><br>📱 <strong>¿Hablamos por WhatsApp para mostrarte exactamente cómo?</strong><br><a href="https://wa.me/522228588674?text=Hola%20Jovany%2C%20soy%20${data.name}%20de%20${data.business}%2C%20quiero%20la%20propuesta%20personalizada%20de%20CHAPI" target="_blank">🚀 Hablar con Jovany AHORA</a>`;
                }
            }
        };

        // Mensajes de seguimiento inteligentes
        this.followUpMessages = {
            afterPricing: [
                '💡 <strong>Dato importante:</strong> Mis clientes facturan en promedio $50,000 MXN extra el primer mes.',
                '🎯 <strong>¿Sabías que</strong> el 73% de empresas sin chatbot pierden ventas mientras duermen?',
                '⚡ <strong>Tip:</strong> El plan PRO se paga solo con 1 venta semanal adicional.'
            ],
            afterDemo: [
                '🔥 <strong>Bonus exclusivo:</strong> Si decides hoy, incluyo 3 meses de soporte premium GRATIS.',
                '💎 <strong>Garantía:</strong> Si en 30 días no aumentas ventas, te devuelvo el 100%.',
                '🚀 <strong>Implementación express:</strong> Tu chatbot funcionando en 24 horas o menos.'
            ],
            objectionHandling: [
                '😊 Lo entiendo. ¿Te parece si te muestro exactamente cuánto dinero podrías estar perdiendo cada día sin automatización?',
                '💭 Es normal tener dudas. ¿Qué te preocupa más: la inversión o la implementación?',
                '🎯 Te propongo algo: ¿Qué tal si haces una prueba de 7 días GRATIS para ver los resultados?'
            ]
        };

        // Respuestas por defecto mejoradas
        this.defaultResponses = [
            'Interesante pregunta. 🤔 <strong>¿Tienes un negocio?</strong> Te explico exactamente cómo CHAPI puede ayudarte a automatizar y aumentar ventas.',
            '💡 <strong>Gran punto.</strong> Déjame preguntarte: ¿Cuántas horas dedicas semanalmente a atender clientes? Con CHAPI puedes recuperar esas horas y vender más.',
            '🎯 <strong>Te entiendo.</strong> ¿Qué te gustaría saber específicamente sobre cómo CHAPI puede transformar tu negocio?',
            '🚀 <strong>Excelente.</strong> ¿Tu negocio ya tiene presencia digital o estás empezando? Te muestro la estrategia perfecta para ti.'
        ];

        this.init();
    }

    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createWidget();
                this.bindEvents();
                this.initAnalytics();
            });
        } else {
            this.createWidget();
            this.bindEvents();
            this.initAnalytics();
        }
    }

    initAnalytics() {
        // Configurar analytics si está habilitado
        if (this.config.enableAnalytics) {
            this.analytics.sessionStart = Date.now();

            // Tracking de tiempo en página
            this.trackTimeSpent();

            // Eventos de página
            this.trackPageEvents();
        }
    }

    trackTimeSpent() {
        setInterval(() => {
            this.analytics.timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
        }, 5000);
    }

    trackPageEvents() {
        // Tracking de scroll
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.floor((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                this.analytics.maxScroll = maxScroll;
            }
        });

        // Tracking de clics en enlaces externos
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.href.includes('wa.me')) {
                this.analytics.whatsappClicks = (this.analytics.whatsappClicks || 0) + 1;
                this.trackInteraction('whatsapp_click', { url: e.target.href });
            }
        });
    }

    saveAnalytics() {
        if (this.config.enableAnalytics) {
            localStorage.setItem('chapi_analytics_' + this.sessionId, JSON.stringify(this.analytics));
        }
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    ensureVisibility() {
        const widget = document.getElementById('chapi-widget');
        if (widget) {
            // Asegurar que el widget esté visible y accesible
            widget.style.position = 'fixed';
            widget.style.zIndex = '10000';
            widget.style.bottom = '20px';
            widget.style.right = '20px';

            // En móviles, ajustar posición
            if (window.innerWidth <= 768) {
                widget.style.bottom = '10px';
                widget.style.right = '10px';
                widget.style.left = '10px';
                widget.style.width = 'calc(100% - 20px)';
                widget.style.maxWidth = '400px';
            }
        }
    }

    createWidget() {
        // Eliminar widget existente si existe
        const existingWidget = document.getElementById('chapi-widget');
        if (existingWidget) {
            existingWidget.remove();
        }

        // Crear el HTML del widget
        const widgetHTML = `
            <div id="chapi-widget" class="chapi-widget">
                <!-- Botón flotante -->
                <div id="chapi-trigger" class="chapi-trigger">
                    <div class="chapi-trigger-icon">💬</div>
                    <div class="chapi-notification-badge" id="chapi-notification">1</div>
                </div>

                <!-- Ventana del chat -->
                <div id="chapi-chat" class="chapi-chat">
                    <!-- Header -->
                    <div class="chapi-header">
                        <div class="chapi-header-content">
                            <div class="chapi-avatar">🤖</div>
                            <div class="chapi-header-text">
                                <div class="chapi-header-title">${this.config.botName}</div>
                                <div class="chapi-header-subtitle">🟢 En línea - Especialista en ventas</div>
                            </div>
                        </div>
                        <button id="chapi-close" class="chapi-close">✕</button>
                    </div>

                    <!-- Mensajes -->
                    <div id="chapi-messages" class="chapi-messages">
                        <div class="chapi-typing-indicator" id="chapi-typing" style="display: none;">
                            <div class="chapi-typing-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>

                    <!-- Acciones rápidas -->
                    <div id="chapi-quick-actions" class="chapi-quick-actions">
                        <button class="chapi-quick-btn" data-action="precios">💰 Ver Precios</button>
                        <button class="chapi-quick-btn" data-action="demo">🎬 Ver Demo</button>
                        <button class="chapi-quick-btn" data-action="contacto">📱 Contacto</button>
                    </div>

                    <!-- Input -->
                    <div class="chapi-input-container">
                        <textarea
                            id="chapi-input"
                            class="chapi-input"
                            placeholder="Escribe tu mensaje..."
                            rows="1"
                        ></textarea>
                        <button id="chapi-send" class="chapi-send-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Footer promocional -->
                    <div class="chapi-footer">
                        <div class="chapi-promo">🔥 <strong>Oferta especial:</strong> Setup GRATIS este mes</div>
                    </div>
                </div>
            </div>
        `;

        // Insertar en el DOM
        document.body.insertAdjacentHTML('beforeend', widgetHTML);

        // Asegurar visibilidad después de un breve delay
        setTimeout(() => {
            this.ensureVisibility();
        }, 100);
    }

    bindEvents() {
        const trigger = document.getElementById('chapi-trigger');
        const closeBtn = document.getElementById('chapi-close');
        const sendBtn = document.getElementById('chapi-send');
        const input = document.getElementById('chapi-input');
        const quickActions = document.querySelectorAll('.chapi-quick-btn');

        // Eventos del trigger
        if (trigger) {
            trigger.addEventListener('click', () => this.toggle());
        }

        // Evento de cerrar
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        // Evento de enviar
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // Evento de Enter en input
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Auto-resize del textarea
            input.addEventListener('input', () => this.autoResize(input));
        }

        // Acciones rápidas
        quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });
    }

    trackInteraction(type, data = {}) {
        this.analytics.interactions.push({
            type,
            timestamp: Date.now(),
            ...data
        });

        this.analytics.messagesCount++;
        this.saveAnalytics();
    }

    handleQuickAction(action) {
        this.hideQuickActions();
        this.processMessage(action);
        this.trackInteraction('quick_action', { action });
    }

    showTypingIndicator() {
        const typing = document.getElementById('chapi-typing');
        if (typing) {
            typing.style.display = 'block';
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        const typing = document.getElementById('chapi-typing');
        if (typing) {
            typing.style.display = 'none';
        }
    }

    autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        const chat = document.getElementById('chapi-chat');
        const notification = document.getElementById('chapi-notification');

        if (chat) {
            chat.classList.add('chapi-chat-open');
            this.isOpen = true;

            // Ocultar notificación
            if (notification) {
                notification.style.display = 'none';
            }

            // Cargar mensaje de bienvenida si es la primera vez
            if (this.messages.length === 0) {
                this.loadWelcomeMessage();
            }

            this.trackInteraction('chat_opened');
        }
    }

    close() {
        const chat = document.getElementById('chapi-chat');

        if (chat) {
            chat.classList.remove('chapi-chat-open');
            this.isOpen = false;
            this.trackInteraction('chat_closed');
        }
    }

    loadWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('bot', this.config.welcomeMessage);
            this.showQuickActions();
        }, 1000);
    }

    showQuickActions() {
        const quickActions = document.getElementById('chapi-quick-actions');
        if (quickActions) {
            quickActions.style.display = 'flex';
        }
    }

    hideQuickActions() {
        const quickActions = document.getElementById('chapi-quick-actions');
        if (quickActions) {
            quickActions.style.display = 'none';
        }
    }

    sendMessage() {
        const input = document.getElementById('chapi-input');
        if (!input || !input.value.trim()) return;

        const message = input.value.trim();
        input.value = '';
        this.autoResize(input);

        // Agregar mensaje del usuario
        this.addMessage('user', message);

        // Ocultar acciones rápidas
        this.hideQuickActions();

        // Procesar respuesta
        this.processMessage(message);

        this.trackInteraction('message_sent', { message });
    }

    addMessage(sender, text, options = {}) {
        const messagesContainer = document.getElementById('chapi-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chapi-message chapi-message-${sender}`;

        const avatar = sender === 'bot' ? '🤖' : '👤';
        const formattedText = this.formatMessage(text);

        messageDiv.innerHTML = `
            <div class="chapi-message-avatar">${avatar}</div>
            <div class="chapi-message-content">
                <div class="chapi-message-text">${formattedText}</div>
                <div class="chapi-message-time">${new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</div>
                ${options.actions ? this.createMessageActions(options.actions) : ''}
            </div>
        `;

        // Insertar antes del typing indicator
        const typingIndicator = document.getElementById('chapi-typing');
        messagesContainer.insertBefore(messageDiv, typingIndicator);

        this.messages.push({ sender, text, timestamp: Date.now() });
        this.scrollToBottom();
    }

    formatMessage(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }

    createMessageActions(actions) {
        const actionsHTML = actions.map(action =>
            `<button class="chapi-message-action" data-action-type="${action.type}" data-action-value="${action.value}">
                ${action.label}
            </button>`
        ).join('');

        return `<div class="chapi-message-actions">${actionsHTML}</div>`;
    }

    handleMessageAction(type, value) {
        if (type === 'url') {
            window.open(value, '_blank');
        } else if (type === 'flow') {
            this.startFlow(value);
        } else if (type === 'message') {
            this.processMessage(value);
        }

        this.trackInteraction('action_clicked', { type, value });
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chapi-messages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    processMessage(message) {
        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();

            const intent = this.detectIntent(message.toLowerCase());
            let response;

            if (intent) {
                response = this.getRandomResponse(intent.responses);

                // Agregar seguimiento si existe
                if (intent.followUp) {
                    setTimeout(() => {
                        this.addMessage('bot', intent.followUp);
                    }, 2000);
                }
            } else {
                response = this.getRandomResponse(this.defaultResponses);
            }

            this.addMessage('bot', response);

            // Iniciar flujo de captura de leads si es apropiado
            if (this.shouldStartLeadCapture(message, intent)) {
                setTimeout(() => {
                    this.startFlow('leadCapture');
                }, 3000);
            }

            // Mostrar mensaje de seguimiento contextual
            this.showFollowUpMessage(intent);

        }, 1000 + Math.random() * 1000); // Tiempo de escritura realista
    }

    detectIntent(message) {
        for (const [intentName, intent] of Object.entries(this.intents)) {
            for (const keyword of intent.keywords) {
                if (message.includes(keyword)) {
                    this.analytics[intentName + 'Triggered'] = true;
                    return intent;
                }
            }
        }
        return null;
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    shouldStartLeadCapture(message, intent) {
        // Iniciar captura de leads si el usuario muestra interés real
        const interestKeywords = ['me interesa', 'quiero', 'necesito', 'como funciona', 'precios'];
        return interestKeywords.some(keyword => message.toLowerCase().includes(keyword))
               && !this.userProfile.email
               && !this.currentFlow;
    }

    showFollowUpMessage(intent) {
        if (!intent) return;

        let followUpCategory = null;
        if (intent === this.intents.precios) followUpCategory = 'afterPricing';
        if (intent === this.intents.demo) followUpCategory = 'afterDemo';
        if (intent === this.intents.objeciones) followUpCategory = 'objectionHandling';

        if (followUpCategory && this.followUpMessages[followUpCategory]) {
            setTimeout(() => {
                const followUp = this.getRandomResponse(this.followUpMessages[followUpCategory]);
                this.addMessage('bot', followUp);
            }, 5000);
        }
    }

    startFlow(flowName) {
        if (!this.conversationFlows[flowName]) return;

        this.currentFlow = {
            name: flowName,
            step: 0,
            data: {}
        };

        this.processFlow();
    }

    processFlow() {
        const flow = this.conversationFlows[this.currentFlow.name];
        const currentStep = flow.steps[this.currentFlow.step];

        if (currentStep) {
            this.addMessage('bot', currentStep.message);
            this.waitingForInput = true;
        } else {
            // Flujo completado
            const completionMessage = flow.completion(this.currentFlow.data);
            this.addMessage('bot', completionMessage);

            // Guardar datos del usuario
            Object.assign(this.userProfile, this.currentFlow.data);
            this.analytics.leadCaptured = true;

            this.currentFlow = null;
            this.waitingForInput = false;
        }
    }

    handleFlowInput(input) {
        const flow = this.conversationFlows[this.currentFlow.name];
        const currentStep = flow.steps[this.currentFlow.step];

        if (currentStep.validation(input)) {
            this.currentFlow.data[currentStep.field] = input;
            this.currentFlow.step++;

            setTimeout(() => {
                this.processFlow();
            }, 1000);
        } else {
            this.addMessage('bot', '❌ Por favor, introduce un valor válido.');
        }
    }

    // Sobrescribir processMessage para manejar flujos
    processMessage(message) {
        if (this.waitingForInput && this.currentFlow) {
            this.handleFlowInput(message.trim());
            return;
        }

        // Lógica normal de procesamiento
        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();

            const intent = this.detectIntent(message.toLowerCase());
            let response;

            if (intent) {
                response = this.getRandomResponse(intent.responses);

                if (intent.followUp) {
                    setTimeout(() => {
                        this.addMessage('bot', intent.followUp);
                    }, 2000);
                }
            } else {
                response = this.getRandomResponse(this.defaultResponses);
            }

            this.addMessage('bot', response);

            if (this.shouldStartLeadCapture(message, intent)) {
                setTimeout(() => {
                    this.startFlow('leadCapture');
                }, 3000);
            }

            this.showFollowUpMessage(intent);

        }, 1000 + Math.random() * 1000);
    }
}

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya existe una instancia
    if (!window.chapiAssistant) {
        window.chapiAssistant = new ChapiAssistant({
            enableAnalytics: true,
            enableLeadCapture: true
        });
    }
});

// Exportar para uso manual si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChapiAssistant;
}
