/**
 * 🤖 CHAPI Assistant Widget
 * Asistente inteligente para sitio web CHAPI
 * @version 3.0
 * @author CHAPI Team
 */

class ChapiAssistant {
    constructor(config = {}) {
        this.config = {
            apiKey: config.apiKey || '', // Para OpenAI (opcional)
            botName: config.botName || 'CHAPI',
            enableAI: config.enableAI || false,
            welcomeMessage: config.welcomeMessage || '¡Hola! 👋 Soy CHAPI, tu asistente virtual especializado en chatbots inteligentes. ¿En qué puedo ayudarte hoy?',
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
            interests: [],
            urgencyLevel: 0
        };

        // Analytics
        this.analytics = {
            messagesCount: 0,
            timeSpent: 0,
            interactions: [],
            conversion: false,
            leadCaptured: false
        };

        // Intents y respuestas inteligentes
        this.intents = {
            saludo: {
                keywords: ['hola', 'buenos', 'buenas', 'hi', 'hello', 'hey', 'saludos'],
                responses: [
                    '¡Hola! 👋 ¡Qué gusto tenerte aquí! Soy CHAPI y estoy aquí para ayudarte con cualquier duda sobre nuestros chatbots inteligentes.',
                    '¡Buenos días/tardes! 😊 Soy tu asistente virtual CHAPI. ¿Te interesa conocer cómo podemos automatizar tu atención al cliente?',
                    '¡Saludos! 🤖 Soy CHAPI, experto en soluciones de chatbots. ¿En qué puedo asistirte hoy?'
                ]
            },
            precios: {
                keywords: ['precio', 'costo', 'cuanto', 'cuánto', 'tarifa', 'plan', 'paquete', 'oferta'],
                responses: [
                    '💰 **Nuestros planes están diseñados para cada necesidad:**\n\n🟢 **Básico**: $990 MXN/mes\n- Hasta 1,000 conversaciones\n- Integración WhatsApp\n- Soporte por email\n\n🔵 **Pro**: $1,990 MXN/mes\n- Hasta 5,000 conversaciones\n- IA avanzada\n- Soporte prioritario\n\n🟣 **Empresarial**: $3,990 MXN/mes\n- Conversaciones ilimitadas\n- Personalización completa\n- Soporte 24/7\n\n¿Te interesa algún plan en particular?'
                ]
            },
            demo: {
                keywords: ['demo', 'prueba', 'demostración', 'ejemplo', 'ver', 'mostrar', 'probar'],
                responses: [
                    '🎯 ¡Perfecto! Tenemos varias opciones para que conozcas CHAPI:\n\n1️⃣ **Demo en vivo**: Te muestro el sistema funcionando ahora mismo\n2️⃣ **Prueba gratuita**: 14 días sin compromiso\n3️⃣ **Sesión personalizada**: Adaptamos la demo a tu negocio\n\n¿Qué prefieres? También puedes escribirme a ' + this.config.whatsappNumber + ' para agendar una llamada.'
                ]
            },
            contacto: {
                keywords: ['contacto', 'llamar', 'teléfono', 'whatsapp', 'email', 'correo'],
                responses: [
                    '📞 **¡Excelente! Te dejo mis datos de contacto:**\n\n📱 **WhatsApp**: ' + this.config.whatsappNumber + '\n📧 **Email**: ' + this.config.email + '\n\n¿Prefieres que te envíe la información por WhatsApp o tienes alguna pregunta específica que pueda resolver ahora?'
                ]
            },
            caracteristicas: {
                keywords: ['características', 'funciones', 'qué hace', 'como funciona', 'capacidades'],
                responses: [
                    '🚀 **CHAPI tiene increíbles características:**\n\n🤖 **IA Conversacional**: Entiende lenguaje natural\n📱 **Multi-plataforma**: WhatsApp, web, Facebook\n📊 **Analytics**: Métricas en tiempo real\n🔗 **Integraciones**: CRM, APIs, webhooks\n🎨 **Personalizable**: Tu marca, tu estilo\n🌍 **Multi-idioma**: Soporte global\n⚡ **24/7**: Atención sin pausas\n\n¿Te interesa alguna característica en particular?'
                ]
            },
            urgente: {
                keywords: ['urgente', 'rápido', 'ya', 'ahora', 'inmediato', 'pronto'],
                urgencyOffer: true,
                responses: [
                    '🚨 **¡Entiendo que es urgente!** No te preocupes, estoy aquí para ayudarte.\n\n⚡ **Oferta especial por urgencia**: 20% de descuento si decides hoy\n🎯 **Setup express**: Configuración en 24 horas\n📞 **Línea directa**: ' + this.config.whatsappNumber + '\n\n¿Cuál es tu situación específica? ¡Vamos a resolverlo juntos!'
                ]
            },
            tiempo: {
                keywords: ['cuando', 'cuándo', 'tiempo', 'duración', 'implementación'],
                responses: [
                    '⏱️ **Tiempos de implementación CHAPI:**\n\n🟢 **Setup básico**: 2-3 días\n🔵 **Configuración Pro**: 5-7 días\n🟣 **Proyecto empresarial**: 1-2 semanas\n\n✅ **Incluye**: Configuración, pruebas, capacitación\n🎯 **Plus**: Soporte durante la implementación\n\n¿Tienes alguna fecha límite en mente?'
                ]
            },
            integracion: {
                keywords: ['integración', 'api', 'crm', 'sistema', 'conectar'],
                responses: [
                    '🔗 **CHAPI se integra con todo:**\n\n💼 **CRM**: Salesforce, HubSpot, Zoho\n🛒 **E-commerce**: Shopify, WooCommerce\n📊 **Analytics**: Google Analytics, Mixpanel\n📧 **Email**: Mailchimp, SendGrid\n⚙️ **APIs personalizadas**: Webhooks, REST\n\n¿Con qué sistema necesitas integrar? ¡Te ayudo con los detalles técnicos!'
                ]
            },
            soporte: {
                keywords: ['soporte', 'ayuda', 'support', 'problema', 'error'],
                responses: [
                    '🛠️ **Nuestro soporte está siempre disponible:**\n\n📱 **WhatsApp**: ' + this.config.whatsappNumber + ' (Respuesta inmediata)\n📧 **Email**: ' + this.config.email + '\n💬 **Chat**: Aquí mismo\n📞 **Llamada**: Agenda tu cita\n\n**Planes incluyen:**\n🟢 Básico: Email support\n🔵 Pro: Soporte prioritario\n🟣 Empresarial: 24/7 + Account Manager\n\n¿En qué puedo ayudarte específicamente?'
                ]
            },
            horarios: {
                keywords: ['horario', 'hora', 'disponible', 'abierto'],
                responses: [
                    '🕐 **Horarios de atención:**\n\n🤖 **CHAPI (yo)**: 24/7 siempre disponible\n👨‍💻 **Soporte humano**: Lun-Vie 9:00-18:00 (GMT-6)\n📱 **WhatsApp**: Respuesta en menos de 1 hora\n📧 **Email**: Respuesta en menos de 4 horas\n\n¡Pero yo estoy aquí ahora para resolver tus dudas! ¿En qué puedo ayudarte?'
                ]
            }
        };

        this.init();
    }

    init() {
        // Esperar a que el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.createWidget();
                this.bindEvents();
                this.loadWelcomeMessage();
                this.ensureVisibility();
                this.initAnalytics();
            });
        } else {
            // DOM ya está listo
            this.createWidget();
            this.bindEvents();
            this.loadWelcomeMessage();
            this.ensureVisibility();
            this.initAnalytics();
        }
    }

    initAnalytics() {
        if (!this.config.enableAnalytics) return;

        // Cargar analytics previos si existen
        const saved = localStorage.getItem('chapi_analytics');
        if (saved) {
            try {
                this.analytics = { ...this.analytics, ...JSON.parse(saved) };
            } catch (e) {
                console.warn('Error loading saved analytics:', e);
            }
        }

        // Tracking de tiempo
        this.analyticsTimer = setInterval(() => {
            this.analytics.timeSpent += 1;
            this.saveAnalytics();
        }, 1000);

        // Track page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.saveAnalytics();
            }
        });
    }

    saveAnalytics() {
        if (!this.config.enableAnalytics) return;

        try {
            localStorage.setItem('chapi_analytics', JSON.stringify(this.analytics));
        } catch (e) {
            console.warn('Error saving analytics:', e);
        }
    }

    generateSessionId() {
        return 'chapi_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    ensureVisibility() {
        // Forzar visibilidad en caso de problemas de renderizado
        setTimeout(() => {
            const widget = document.querySelector('.chapi-assistant');
            if (widget) {
                widget.style.display = 'block';
                widget.style.visibility = 'visible';
                widget.style.opacity = '1';
                widget.style.position = 'fixed';
                widget.style.zIndex = '999999';

                const button = widget.querySelector('.chapi-chat-button');
                if (button) {
                    button.style.display = 'flex';
                    button.style.visibility = 'visible';
                    button.style.opacity = '1';
                }

                console.log('CHAPI Assistant: Widget visibility ensured');
            }
        }, 100);
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'chapi-assistant';
        widget.innerHTML = `
            <!-- Chat Button -->
            <button class="chapi-chat-button" id="chapiChatButton">
                <svg class="chapi-chat-icon" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                <div class="chapi-notification-dot" id="chapiNotification"></div>
            </button>

            <!-- Chat Window -->
            <div class="chapi-chat-window" id="chapiChatWindow">
                <!-- Header -->
                <div class="chapi-chat-header">
                    <div class="chapi-header-content">
                        <h3 class="chapi-header-title">
                            🤖 ${this.config.botName}
                        </h3>
                        <p class="chapi-header-subtitle">
                            <span class="chapi-status-dot"></span>
                            Asistente Virtual Online
                        </p>
                    </div>
                    <button class="chapi-close-btn" id="chapiCloseBtn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>

                <!-- Chat Body -->
                <div class="chapi-chat-body" id="chapiChatBody">
                    <!-- Messages aparecerán aquí -->
                </div>

                <!-- Quick Actions -->
                <div class="chapi-quick-actions" id="chapiQuickActions" style="display: none;">
                    <button class="chapi-quick-btn" data-action="precios">💰 Ver Precios</button>
                    <button class="chapi-quick-btn" data-action="demo">🎯 Solicitar Demo</button>
                    <button class="chapi-quick-btn" data-action="contacto">📞 Contactar</button>
                </div>

                <!-- Typing Indicator -->
                <div class="chapi-typing-indicator" id="chapiTyping" style="display: none;">
                    <div class="chapi-typing-content">
                        <div class="chapi-typing-avatar">🤖</div>
                        <div class="chapi-typing-text">
                            <span class="chapi-typing-name">${this.config.botName}</span> está escribiendo
                            <div class="chapi-typing-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="chapi-input-area">
                    <div class="chapi-input-container">
                        <textarea
                            class="chapi-input"
                            id="chapiInput"
                            placeholder="Escribe tu mensaje..."
                            rows="1"
                        ></textarea>
                        <button class="chapi-send-btn" id="chapiSendBtn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Lead Capture Modal -->
            <div class="chapi-lead-modal" id="chapiLeadModal" style="display: none;">
                <div class="chapi-lead-content">
                    <div class="chapi-lead-header">
                        <h3>🎯 Cotización Personalizada</h3>
                        <button class="chapi-lead-close" id="chapiLeadClose">×</button>
                    </div>
                    <form class="chapi-lead-form" id="chapiLeadForm">
                        <div class="chapi-form-group">
                            <label>Nombre *</label>
                            <input type="text" id="leadName" required>
                        </div>
                        <div class="chapi-form-group">
                            <label>Email *</label>
                            <input type="email" id="leadEmail" required>
                        </div>
                        <div class="chapi-form-group">
                            <label>Teléfono</label>
                            <input type="tel" id="leadPhone">
                        </div>
                        <div class="chapi-form-group">
                            <label>Empresa</label>
                            <input type="text" id="leadCompany">
                        </div>
                        <div class="chapi-form-group">
                            <label>¿Qué necesitas?</label>
                            <select id="leadNeeds">
                                <option value="">Selecciona una opción</option>
                                <option value="chatbot-web">Chatbot para sitio web</option>
                                <option value="chatbot-whatsapp">Chatbot WhatsApp</option>
                                <option value="chatbot-completo">Solución completa</option>
                                <option value="integracion">Integración con sistema existente</option>
                                <option value="otro">Otro</option>
                            </select>
                        </div>
                        <button type="submit" class="chapi-lead-submit">
                            📩 Enviar Solicitud
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(widget);
        this.widget = widget;
    }

    bindEvents() {
        const chatButton = document.getElementById('chapiChatButton');
        const closeBtn = document.getElementById('chapiCloseBtn');
        const sendBtn = document.getElementById('chapiSendBtn');
        const input = document.getElementById('chapiInput');
        const leadClose = document.getElementById('chapiLeadClose');
        const leadForm = document.getElementById('chapiLeadForm');

        // Eventos para el botón principal - optimizado para móviles
        if (chatButton) {
            chatButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
                this.trackInteraction('chat_opened');
            });

            chatButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
                this.trackInteraction('chat_opened');
            }, { passive: false });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.close();
                this.trackInteraction('chat_closed');
            });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }

        // Quick actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('chapi-quick-btn')) {
                const action = e.target.dataset.action;
                this.handleQuickAction(action);
            }
        });

        // Lead modal events
        if (leadClose) {
            leadClose.addEventListener('click', () => {
                this.closeLeadModal();
            });
        }

        if (leadForm) {
            leadForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitLead();
            });
        }

        // Input events
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            input.addEventListener('input', () => {
                this.autoResize(input);
            });
        }

        // Hide notification dot after first interaction
        if (chatButton) {
            chatButton.addEventListener('click', () => {
                const notification = document.getElementById('chapiNotification');
                if (notification) notification.style.display = 'none';
            }, { once: true });
        }
    }

    trackInteraction(type, data = {}) {
        if (!this.config.enableAnalytics) return;

        this.analytics.interactions.push({
            type,
            timestamp: Date.now(),
            sessionId: this.sessionId,
            ...data
        });

        this.analytics.messagesCount++;
        this.saveAnalytics();
    }

    handleQuickAction(action) {
        this.trackInteraction('quick_action', { action });

        // Simular que el usuario escribió el comando
        const input = document.getElementById('chapiInput');
        input.value = action;
        this.sendMessage();
    }

    showTypingIndicator() {
        const typing = document.getElementById('chapiTyping');
        if (typing) {
            typing.style.display = 'block';
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        const typing = document.getElementById('chapiTyping');
        if (typing) {
            typing.style.display = 'none';
        }
    }

    autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        const window = document.getElementById('chapiChatWindow');
        window.classList.add('active');
        this.isOpen = true;

        // Show quick actions if no messages yet
        if (this.messages.length <= 1) {
            this.showQuickActions();
        }

        setTimeout(() => {
            const input = document.getElementById('chapiInput');
            if (input) input.focus();
        }, 300);

        this.trackInteraction('chat_opened');
    }
    close() {
        const window = document.getElementById('chapiChatWindow');
        window.classList.remove('active');
        this.isOpen = false;
        this.hideQuickActions();
        this.trackInteraction('chat_closed');
    }

    loadWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('bot', this.config.welcomeMessage);
            this.showQuickActions();
        }, 500);
    }

    showQuickActions() {
        const actions = document.getElementById('chapiQuickActions');
        if (actions) {
            actions.style.display = 'flex';
        }
    }

    hideQuickActions() {
        const actions = document.getElementById('chapiQuickActions');
        if (actions) {
            actions.style.display = 'none';
        }
    }

    sendMessage() {
        const input = document.getElementById('chapiInput');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage('user', message);
        this.trackInteraction('message_sent', { message });

        // Clear input
        input.value = '';
        input.style.height = 'auto';

        // Hide quick actions after first user message
        this.hideQuickActions();

        // Show typing indicator
        this.showTypingIndicator();

        // Process message with AI/Rules
        setTimeout(() => {
            this.processMessage(message);
        }, 1000 + Math.random() * 1000); // Realistic typing delay
    }

    addMessage(sender, text, options = {}) {
        const chatBody = document.getElementById('chapiChatBody');
        const messageId = 'msg_' + Date.now();

        const messageEl = document.createElement('div');
        messageEl.className = `chapi-message ${sender}`;
        messageEl.id = messageId;

        const avatar = sender === 'bot' ? '🤖' : '👤';
        const time = new Date().toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Format text for better display
        const formattedText = this.formatMessage(text);

        messageEl.innerHTML = `
            <div class="chapi-avatar">${avatar}</div>
            <div class="chapi-message-content">
                <div class="chapi-message-text">${formattedText}</div>
                <div class="chapi-message-time">${time}</div>
                ${options.actions ? this.createMessageActions(options.actions) : ''}
            </div>
        `;

        chatBody.appendChild(messageEl);
        this.scrollToBottom();

        this.messages.push({
            id: messageId,
            sender,
            text,
            timestamp: Date.now(),
            ...options
        });

        return messageId;
    }

    formatMessage(text) {
        // Handle markdown-like formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/(\d+\.\s)/g, '<br>$1'); // Line breaks for numbered lists
    }

    createMessageActions(actions) {
        const actionsHtml = actions.map(action =>
            `<button class="chapi-message-action" onclick="chapiAssistant.handleMessageAction('${action.type}', '${action.value || ''}')">
                ${action.icon} ${action.text}
            </button>`
        ).join('');

        return `<div class="chapi-message-actions">${actionsHtml}</div>`;
    }

    handleMessageAction(type, value) {
        this.trackInteraction('message_action', { type, value });

        switch (type) {
            case 'whatsapp':
                window.open(`https://wa.me/${this.config.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hola, vengo del chatbot de CHAPI y me interesa saber más`, '_blank');
                break;
            case 'email':
                window.open(`mailto:${this.config.email}?subject=Consulta desde CHAPI&body=Hola, vengo del chatbot y me interesa saber más sobre CHAPI.`, '_blank');
                break;
            case 'lead':
                this.showLeadModal();
                break;
            case 'demo':
                this.addMessage('bot', '🎯 ¡Perfecto! Te voy a mostrar cómo funciona CHAPI. Aquí tienes algunas opciones:', {
                    actions: [
                        { type: 'whatsapp', icon: '📱', text: 'Demo por WhatsApp', value: this.config.whatsappNumber },
                        { type: 'lead', icon: '📋', text: 'Agendar Demo Personalizada', value: 'demo' }
                    ]
                });
                break;
        }
    }

    processMessage(message) {
        this.hideTypingIndicator();

        // Detect intent
        const intent = this.detectIntent(message);
        let response = this.generateResponse(intent, message);

        // Check for urgency
        if (this.detectUrgency(message)) {
            this.userProfile.urgencyLevel++;
            if (this.userProfile.urgencyLevel >= 2) {
                response += '\n\n🎁 **Oferta especial por urgencia**: ¡20% de descuento si decides hoy!';
            }
        }

        // Add response with appropriate actions
        const actions = this.getActionsForIntent(intent);
        this.addMessage('bot', response, { actions });

        // Track intent
        this.trackInteraction('intent_detected', { intent: intent.name, confidence: intent.confidence });

        // Check for lead capture opportunity
        if (this.shouldOfferLeadCapture(intent, message)) {
            setTimeout(() => {
                this.offerLeadCapture();
            }, 3000);
        }
    }

    detectIntent(message) {
        const messageLower = message.toLowerCase();
        let bestMatch = { name: 'general', confidence: 0 };

        // Check each intent
        for (const [intentName, intentData] of Object.entries(this.intents)) {
            let confidence = 0;

            // Count keyword matches
            for (const keyword of intentData.keywords) {
                if (messageLower.includes(keyword)) {
                    confidence += 1;
                }
            }

            // Normalize confidence
            confidence = confidence / intentData.keywords.length;

            if (confidence > bestMatch.confidence) {
                bestMatch = { name: intentName, confidence, data: intentData };
            }
        }

        return bestMatch;
    }

    generateResponse(intent, message) {
        if (intent.confidence > 0.3 && intent.data) {
            // Use intent-specific response
            const responses = intent.data.responses;
            return responses[Math.floor(Math.random() * responses.length)];
        }

        // Fallback responses
        const fallbacks = [
            'Entiendo tu consulta. Te puedo ayudar con información sobre nuestros chatbots, precios, demostraciones o puedes contactar directamente con nuestro equipo.',
            '¡Interesante pregunta! CHAPI puede ayudarte con muchas cosas. ¿Te interesa conocer nuestros planes, ver una demo o necesitas contactar con soporte?',
            'No estoy 100% seguro de entender tu consulta específica, pero estoy aquí para ayudarte con cualquier duda sobre CHAPI. ¿Puedo ayudarte con precios, demostraciones o información técnica?'
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    detectUrgency(message) {
        const urgencyWords = ['urgente', 'rápido', 'ya', 'ahora', 'inmediato', 'pronto', 'necesito', 'tengo prisa'];
        return urgencyWords.some(word => message.toLowerCase().includes(word));
    }

    getActionsForIntent(intent) {
        const commonActions = [
            { type: 'whatsapp', icon: '📱', text: 'WhatsApp', value: this.config.whatsappNumber },
            { type: 'lead', icon: '📋', text: 'Cotización', value: 'quote' }
        ];

        switch (intent.name) {
            case 'precios':
            case 'urgente':
                return [
                    { type: 'lead', icon: '💰', text: 'Cotización Personalizada', value: 'pricing' },
                    ...commonActions
                ];
            case 'demo':
                return [
                    { type: 'demo', icon: '🎯', text: 'Ver Demo', value: 'demo' },
                    ...commonActions
                ];
            case 'contacto':
                return commonActions;
            default:
                return commonActions.slice(0, 1); // Only WhatsApp for general queries
        }
    }

    shouldOfferLeadCapture(intent, message) {
        // Offer lead capture for high-intent messages
        const highIntentKeywords = ['precio', 'costo', 'demo', 'cotización', 'información', 'necesito'];
        return highIntentKeywords.some(keyword => message.toLowerCase().includes(keyword)) &&
            !this.analytics.leadCaptured;
    }

    offerLeadCapture() {
        if (this.analytics.leadCaptured) return;

        this.addMessage('bot', '💡 **¡Antes de continuar!** ¿Te gustaría recibir una cotización personalizada? Solo te tomará 30 segundos y podrás obtener precios específicos para tu proyecto.', {
            actions: [
                { type: 'lead', icon: '📋', text: 'Sí, quiero cotización', value: 'offer' },
                { type: 'whatsapp', icon: '📱', text: 'Mejor por WhatsApp', value: this.config.whatsappNumber }
            ]
        });
    }

    showLeadModal() {
        const modal = document.getElementById('chapiLeadModal');
        if (modal) {
            modal.style.display = 'flex';
            this.trackInteraction('lead_modal_opened');
        }
    }

    closeLeadModal() {
        const modal = document.getElementById('chapiLeadModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    submitLead() {
        const form = document.getElementById('chapiLeadForm');
        const formData = new FormData(form);

        const leadData = {
            name: document.getElementById('leadName').value,
            email: document.getElementById('leadEmail').value,
            phone: document.getElementById('leadPhone').value,
            company: document.getElementById('leadCompany').value,
            needs: document.getElementById('leadNeeds').value,
            timestamp: Date.now(),
            sessionId: this.sessionId
        };

        // Save lead data
        this.userProfile = { ...this.userProfile, ...leadData };
        this.analytics.leadCaptured = true;
        this.analytics.conversion = true;

        // Store in localStorage (in real app, send to server)
        const leads = JSON.parse(localStorage.getItem('chapi_leads') || '[]');
        leads.push(leadData);
        localStorage.setItem('chapi_leads', JSON.stringify(leads));

        this.saveAnalytics();
        this.trackInteraction('lead_captured', leadData);

        // Close modal and show success
        this.closeLeadModal();

        this.addMessage('bot', `¡Excelente, ${leadData.name}! 🎉\n\nHe recibido tu información y nuestro equipo se pondrá en contacto contigo muy pronto para darte una cotización personalizada.\n\n📧 Te enviaremos los detalles a: ${leadData.email}\n📱 Si prefieres contacto inmediato: ${this.config.whatsappNumber}`, {
            actions: [
                { type: 'whatsapp', icon: '📱', text: 'Contacto inmediato', value: this.config.whatsappNumber }
            ]
        });

        // Clear form
        form.reset();
    }
    data: { template: 'custom' }
}
            ]
        };

return actions[type] || [];
    }

    async handleAction(action, data) {
    switch (action) {
        case 'start_sales_flow':
            this.addMessage('user', 'Quiero crear un flujo de ventas');
            await this.delay(800);
            this.addMessage('bot', '¡Perfecto! Te ayudo a crear un flujo de ventas personalizado. ¿Para qué tipo de negocio es?');
            this.showQuickActions('sales_flow');
            break;

        case 'show_faq':
            this.addMessage('user', 'Tengo dudas sobre los productos');
            await this.delay(800);
            this.handleFAQ();
            break;

        case 'show_pricing':
            this.addMessage('user', 'Quiero ver precios y planes');
            await this.delay(800);
            this.showPricing();
            break;

        case 'contact_human':
            this.addMessage('user', 'Quiero hablar con una persona');
            await this.delay(800);
            this.showContactOptions();
            break;

        case 'create_flow':
            this.addMessage('user', `Crear flujo para ${data.template}`);
            await this.delay(800);
            this.createFlowTemplate(data.template);
            break;

        default:
            this.addMessage('bot', 'Disculpa, no entendí esa acción. ¿Puedes intentar de nuevo?');
    }
}

    async sendMessage() {
    const input = document.getElementById('chapiInput');
    const message = input.value.trim();

    if (!message) return;

    input.value = '';
    input.style.height = 'auto';

    this.addMessage('user', message);

    // Show typing indicator
    this.showTyping();

    // Get bot response
    await this.delay(1000 + Math.random() * 1000);
    this.hideTyping();

    const response = this.config.enableAI ?
        await this.getAIResponse(message) :
        this.getStaticResponse(message);

    this.addMessage('bot', response);

    // Show relevant quick actions based on context
    this.showContextualActions(message.toLowerCase());
}

getStaticResponse(message) {
    const msg = message.toLowerCase();

    // Respuestas basadas en palabras clave
    if (msg.includes('precio') || msg.includes('costo') || msg.includes('plan')) {
        return 'Nuestros planes inician desde $49 USD/mes. Tenemos opciones para startups, PyMES y empresas grandes. ¿Te gustaría ver los detalles?';
    }

    if (msg.includes('demo') || msg.includes('prueba')) {
        return '¡Perfecto! Puedes probar CHAPI gratis por 30 días. Te ayudo a configurar tu demo personalizada. ¿Cuál es tu industria?';
    }

    if (msg.includes('whatsapp') || msg.includes('telegram')) {
        return 'CHAPI se integra perfectamente con WhatsApp Business API, Telegram, web chat y más canales. ¿Quieres que te ayude a configurar alguno específico?';
    }

    if (msg.includes('ia') || msg.includes('inteligencia') || msg.includes('gpt')) {
        return 'Usamos GPT-4 y Groq Llama 3 para conversaciones naturales. Nuestros bots aprenden de cada interacción y mejoran automáticamente. ¿Te interesa alguna funcionalidad específica?';
    }

    if (msg.includes('integra') || msg.includes('crm') || msg.includes('api')) {
        return 'CHAPI se integra con +50 sistemas: CRMs (HubSpot, Salesforce), pagos (Stripe, MercadoPago), calendarios y más. ¿Con qué sistema necesitas integrar?';
    }

    if (msg.includes('flujo') || msg.includes('venta') || msg.includes('automatizar')) {
        return 'Te ayudo a crear flujos de ventas automáticos que califican leads y cierran ventas 24/7. ¿Para qué tipo de negocio es?';
    }

    if (msg.includes('soporte') || msg.includes('ayuda') || msg.includes('problema')) {
        return 'Estoy aquí para ayudarte. También puedes contactar a nuestro equipo humano en soporte@chapibot.pro o WhatsApp +52 55 0000 0000. ¿Cuál es tu consulta específica?';
    }

    if (msg.includes('gracias') || msg.includes('perfecto') || msg.includes('excelente')) {
        return '¡De nada! Me alegra poder ayudarte. ¿Hay algo más en lo que pueda asistirte hoy?';
    }

    // Respuesta por defecto
    return 'Entiendo tu consulta. CHAPI puede ayudarte a automatizar ventas, generar leads y brindar soporte 24/7 con IA avanzada. ¿Te gustaría que empecemos con una demo personalizada?';
}

    async getAIResponse(message) {
    if (!this.config.apiKey) {
        return this.getStaticResponse(message);
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `Eres CHAPI, un asistente virtual especializado en chatbots inteligentes para empresas. Tu empresa ofrece soluciones de automatización de ventas y soporte al cliente con IA.

                            Características de CHAPI:
                            - Chatbots con GPT-4 y Llama 3
                            - Integración con WhatsApp, Telegram, web chat
                            - Planes desde $49 USD/mes
                            - Integración con CRMs, pagos, calendarios
                            - ROI promedio 400-800%
                            - Soporte 24/7 en español

                            Responde de manera amigable, profesional y enfocada en ayudar al cliente a entender cómo CHAPI puede resolver sus necesidades específicas. Mantén las respuestas concisas (máximo 2-3 oraciones).`
                    },
                    ...this.messages.slice(-5).map(msg => ({
                        role: msg.sender === 'bot' ? 'assistant' : 'user',
                        content: msg.text
                    })),
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 150,
                temperature: 0.7
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return this.getStaticResponse(message);
    }
}

showContextualActions(message) {
    if (message.includes('precio') || message.includes('plan')) {
        this.showQuickActions('pricing');
    } else if (message.includes('demo') || message.includes('prueba')) {
        this.showQuickActions('demo');
    } else if (message.includes('flujo') || message.includes('venta')) {
        this.showQuickActions('sales_flow');
    }
}

handleFAQ() {
    const faqMessage = `
        <strong>Preguntas Frecuentes:</strong><br><br>

        <strong>🤖 ¿Qué hace CHAPI?</strong><br>
        Automatiza ventas y soporte con chatbots inteligentes que trabajan 24/7.<br><br>

        <strong>💰 ¿Cuánto cuesta?</strong><br>
        Planes desde $49 USD/mes con 30 días de prueba gratuita.<br><br>

        <strong>📱 ¿En qué canales funciona?</strong><br>
        WhatsApp, Telegram, web chat, Facebook, Instagram y email.<br><br>

        <strong>⚡ ¿Qué tan rápido se implementa?</strong><br>
        En 24 horas tienes tu chatbot funcionando completamente.
        `;

    this.addMessage('bot', faqMessage);
}

showPricing() {
    const pricingMessage = `
        <strong>💰 Planes CHAPI 2025:</strong><br><br>

        <strong>🥉 BÁSICO - $990 MXN/mes</strong><br>
        • 1 canal • 50 leads/mes • Plantillas básicas<br><br>

        <strong>🥈 PROFESIONAL - $1,990 MXN/mes</strong><br>
        • 2 canales • 500 leads/mes • IA avanzada • CRM<br><br>

        <strong>🥇 EMPRESARIAL - $3,990 MXN/mes</strong><br>
        • Todo ilimitado • Machine Learning • API custom<br><br>

        <strong>🎁 30 días gratis + ROI garantizado</strong>
        `;

    this.addMessage('bot', pricingMessage);
}

showContactOptions() {
    const contactMessage = `
        <strong>📞 Contacta con nuestro equipo:</strong><br><br>

        <strong>WhatsApp:</strong> +52 55 0000 0000<br>
        <strong>Email:</strong> soporte@chapibot.pro<br>
        <strong>Horario:</strong> Lun-Vie 9:00-18:00 (México)<br><br>

        <strong>🚀 O agenda una demo personalizada:</strong><br>
        <a href="https://chapibot.pro/demo" target="_blank" style="color: #2f7afe;">chapibot.pro/demo</a>
        `;

    this.addMessage('bot', contactMessage);
}

createFlowTemplate(template) {
    const templates = {
        ecommerce: {
            name: 'E-commerce',
            description: 'Flujo optimizado para tiendas online',
            steps: [
                'Saludo personalizado',
                'Consulta de productos',
                scrollToBottom() {
                    const chatBody = document.getElementById('chapiChatBody');
                    if(chatBody) {
                        chatBody.scrollTop = chatBody.scrollHeight;
                    }
                }

    // Analytics and utilities
    getAnalytics() {
                    return {
                        ...this.analytics,
                        sessionDuration: Date.now() - this.startTime,
                        messagesPerSession: this.messages.length,
                        userProfile: this.userProfile
                    };
                }

    // Mobile optimization
    optimizeForMobile() {
                    const isMobile = window.innerWidth <= 768;
                    const widget = this.widget;

                    if(isMobile) {
                        widget.classList.add('mobile');

                        // Adjust chat window size for mobile
                        const chatWindow = widget.querySelector('.chapi-chat-window');
                        if (chatWindow && this.isOpen) {
                            chatWindow.style.width = '100vw';
                            chatWindow.style.height = '100vh';
                            chatWindow.style.right = '0';
                            chatWindow.style.bottom = '0';
                            chatWindow.style.borderRadius = '0';
                        }
                    } else {
                        widget.classList.remove('mobile');
                    }
                }

    // Cleanup
    destroy() {
                    if(this.analyticsTimer) {
                    clearInterval(this.analyticsTimer);
        }

        this.saveAnalytics();

        if(this.widget) {
            this.widget.remove();
}
    }
}

// Auto-initialize if config is available
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        if (window.chapiConfig) {
            window.chapiAssistant = new ChapiAssistant(window.chapiConfig);
        }
    });
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChapiAssistant;
}
'Carrito de compras',
    'Proceso de pago',
    'Confirmación y seguimiento'
                ]
            },
restaurant: {
    name: 'Restaurante',
        description: 'Automatización para reservas y pedidos',
            steps: [
                'Bienvenida al restaurante',
                'Consulta de menú',
                'Reserva de mesa',
                'Pedidos para llevar',
                'Confirmación automática',
                'Recordatorios y feedback'
            ]
},
services: {
    name: 'Servicios',
        description: 'Para empresas de servicios profesionales',
            steps: [
                'Calificación de lead',
                'Consulta de necesidades',
                'Propuesta personalizada',
                'Agendamiento de citas',
                'Seguimiento automático',
                'Cierre de venta'
            ]
},
custom: {
    name: 'Personalizado',
        description: 'Flujo adaptado a tu negocio específico',
            steps: [
                'Análisis de tu industria',
                'Mapeo de customer journey',
                'Diseño de conversaciones',
                'Integración con sistemas',
                'Testing y optimización',
                'Lanzamiento y monitoreo'
            ]
}
        };

const templateData = templates[template];

const message = `
        <strong>🎯 Flujo: ${templateData.name}</strong><br>
        ${templateData.description}<br><br>

        <strong>📋 Pasos incluidos:</strong><br>
        ${templateData.steps.map((step, i) => `${i + 1}. ${step}`).join('<br>')}<br><br>

        <strong>⏱️ Tiempo de implementación:</strong> 24-48 horas<br>
        <strong>🎁 Incluye:</strong> Configuración + capacitación + soporte<br><br>

        ¿Te gustaría que empecemos con este flujo?
        `;

this.addMessage('bot', message);
    }

showTyping() {
    const chatBody = document.getElementById('chapiChatBody');
    const typingEl = document.createElement('div');
    typingEl.className = 'chapi-message bot';
    typingEl.id = 'chapiTyping';
    typingEl.innerHTML = `
            <div class="chapi-avatar">🤖</div>
            <div class="chapi-message-content">
                <div class="chapi-typing">
                    <div class="chapi-typing-dot"></div>
                    <div class="chapi-typing-dot"></div>
                    <div class="chapi-typing-dot"></div>
                </div>
            </div>
        `;

    chatBody.appendChild(typingEl);
    this.scrollToBottom();
}

hideTyping() {
    const typingEl = document.getElementById('chapiTyping');
    if (typingEl) {
        typingEl.remove();
    }
}

scrollToBottom() {
    const chatBody = document.getElementById('chapiChatBody');
    setTimeout(() => {
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 100);
}

delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Public methods for external control
addCustomMessage(text) {
    this.addMessage('bot', text);
}

setConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
}

destroy() {
    if (this.widget) {
        this.widget.remove();
    }
}
}

// Auto-initialize if not in module environment
if (typeof module === 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChapiAssistant);
    } else {
        initChapiAssistant();
    }
}

function initChapiAssistant() {
    // Configuration can be customized here
    window.chapiAssistant = new ChapiAssistant({
        botName: 'CHAPI',
        companyName: 'CHAPI',
        enableAI: false, // Set to true and add apiKey for OpenAI integration
        apiKey: '', // Add your OpenAI API key here if needed
        welcomeMessage: '¡Hola! 👋 Soy CHAPI, tu asistente virtual especializado en chatbots inteligentes. ¿En qué puedo ayudarte hoy?'
    });
}

// Inicialización robusta que funciona en todos los dispositivos
(function () {
    'use strict';

    let initialized = false;

    function tryInit() {
        if (initialized) return;

        try {
            console.log('CHAPI: Attempting initialization...');

            // Verificar que tenemos la configuración
            if (typeof CHAPI_CONFIG !== 'undefined') {
                window.chapiAssistant = new ChapiAssistant(CHAPI_CONFIG);
                initialized = true;
                console.log('CHAPI: Successfully initialized with config');
            } else {
                // Usar configuración por defecto
                initChapiAssistant();
                initialized = true;
                console.log('CHAPI: Successfully initialized with default config');
            }
        } catch (error) {
            console.error('CHAPI: Initialization error:', error);
            // Intentar de nuevo en 1 segundo
            setTimeout(tryInit, 1000);
        }
    }

    // Múltiples puntos de inicialización para máxima compatibilidad
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }

    // Backup para navegadores problemáticos
    window.addEventListener('load', function () {
        setTimeout(tryInit, 100);
    });

    // Para dispositivos móviles con carga diferida
    setTimeout(tryInit, 500);

})();

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChapiAssistant;
}
