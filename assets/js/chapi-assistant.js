/**
 * 🤖 CHAPI Assistant Widget
 * Asistente inteligente para sitio web CHAPI
 * @version 2.0
 * @author CHAPI Team
 */

class ChapiAssistant {
    constructor(config = {}) {
        this.config = {
            apiKey: config.apiKey || '', // Para OpenAI (opcional)
            botName: config.botName || 'CHAPI',
            enableAI: config.enableAI || false,
            welcomeMessage: config.welcomeMessage || '¡Hola! Soy CHAPI, tu asistente virtual. ¿En qué puedo ayudarte hoy?',
            companyName: config.companyName || 'CHAPI',
            ...config
        };

        this.isOpen = false;
        this.messages = [];
        this.currentFlow = null;

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
            });
        } else {
            // DOM ya está listo
            this.createWidget();
            this.bindEvents();
            this.loadWelcomeMessage();
            this.ensureVisibility();
        }
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
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-2h2v2zm2.07-7.75l-.9.92C11.45 12.9 11 13.5 11 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H6c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
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
        `;

        document.body.appendChild(widget);
        this.widget = widget;
    }

    bindEvents() {
        const chatButton = document.getElementById('chapiChatButton');
        const closeBtn = document.getElementById('chapiCloseBtn');
        const sendBtn = document.getElementById('chapiSendBtn');
        const input = document.getElementById('chapiInput');

        // Eventos para el botón principal - optimizado para móviles
        if (chatButton) {
            // Usar tanto click como touchend para mejor compatibilidad móvil
            chatButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });

            chatButton.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            }, { passive: false });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.close();
            });

            closeBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.close();
            }, { passive: false });
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.sendMessage();
            });

            sendBtn.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.sendMessage();
            }, { passive: false });
        }

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        input.addEventListener('input', () => {
            this.autoResize(input);
        });

        // Hide notification dot after first interaction
        chatButton.addEventListener('click', () => {
            const notification = document.getElementById('chapiNotification');
            notification.style.display = 'none';
        }, { once: true });
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

        setTimeout(() => {
            document.getElementById('chapiInput').focus();
        }, 300);
    }

    close() {
        const window = document.getElementById('chapiChatWindow');
        window.classList.remove('active');
        this.isOpen = false;
    }

    loadWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('bot', this.config.welcomeMessage);
            this.showQuickActions('welcome');
        }, 500);
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

        messageEl.innerHTML = `
            <div class="chapi-avatar">${avatar}</div>
            <div class="chapi-message-content">
                <div class="chapi-message-text">${text}</div>
                <div class="chapi-message-time">${time}</div>
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

    showQuickActions(type) {
        const actions = this.getQuickActions(type);
        if (actions.length === 0) return;

        const chatBody = document.getElementById('chapiChatBody');
        const actionsEl = document.createElement('div');
        actionsEl.className = 'chapi-quick-actions';

        actions.forEach(action => {
            const button = document.createElement('button');
            button.className = 'chapi-action-btn';
            button.innerHTML = `${action.icon} ${action.text}`;
            button.addEventListener('click', () => {
                this.handleAction(action.action, action.data);
                actionsEl.remove();
            });
            actionsEl.appendChild(button);
        });

        chatBody.appendChild(actionsEl);
        this.scrollToBottom();
    }

    getQuickActions(type) {
        const actions = {
            welcome: [
                {
                    icon: '🚀',
                    text: 'Crear flujo de ventas',
                    action: 'start_sales_flow',
                    data: { type: 'sales' }
                },
                {
                    icon: '❓',
                    text: 'Dudas sobre productos',
                    action: 'show_faq',
                    data: { category: 'products' }
                },
                {
                    icon: '💰',
                    text: 'Ver precios y planes',
                    action: 'show_pricing',
                    data: {}
                },
                {
                    icon: '📞',
                    text: 'Contactar humano',
                    action: 'contact_human',
                    data: {}
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
        
        <strong>🥉 BÁSICO - $49 USD/mes</strong><br>
        • 1 canal • 50 leads/mes • Plantillas básicas<br><br>
        
        <strong>🥈 PROFESIONAL - $99 USD/mes</strong><br>
        • 2 canales • 500 leads/mes • IA avanzada • CRM<br><br>
        
        <strong>🥇 EMPRESARIAL - $199 USD/mes</strong><br>
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
                    'Recomendaciones IA',
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
