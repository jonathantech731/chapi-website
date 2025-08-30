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

    scrollToBottom() {
        const chatBody = document.getElementById('chapiChatBody');
        if (chatBody) {
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
        // Add mobile-specific optimizations
        const widget = document.querySelector('.chapi-assistant');
        if (widget && window.innerWidth <= 768) {
            widget.classList.add('chapi-mobile');
        }
    }

    // Cleanup
    destroy() {
        if (this.analyticsTimer) {
            clearInterval(this.analyticsTimer);
        }

        this.saveAnalytics();

        if (this.widget) {
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
