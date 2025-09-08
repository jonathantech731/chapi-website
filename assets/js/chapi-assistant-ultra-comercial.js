/**
 * 🚀 CHAPI Assistant Ultra Comercial - Versión Vendedor Automático
 * Asistente ultra-agresivo especializado en conversión máxima
 * @version Ultra Comercial 1.0
 * @author CHAPI Team
 */

class ChapiAssistantUltraComercial {
  constructor(config = {}) {
    // Fusionar configuración ultra-comercial
    const ultraConfig = window.chapiConfigUltraComercial || {};
    this.config = { ...ultraConfig, ...config };

    this.isOpen = false;
    this.messages = [];
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();

    // Perfil comercial del usuario
    this.userProfile = {
      name: null,
      business: null,
      businessType: null,
      problems: [],
      urgencyLevel: 0,
      objections: [],
      engagementScore: 0,
      qualificationScore: 0,
      readyToBuy: false
    };

    // Analytics comerciales
    this.analytics = {
      messagesCount: 0,
      timeSpent: 0,
      closeAttempts: 0,
      objectionsSolved: 0,
      qualificationStage: 'initial'
    };

    this.init();
  }

  init() {
    this.createWidget();
    this.bindEvents();
    this.loadWelcomeMessage();
    console.log('🚀 CHAPI Ultra Comercial iniciado');
  }

  generateSessionId() {
    return 'chapi_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  createWidget() {
    const widget = document.createElement('div');
    widget.id = 'chapiWidget';
    widget.innerHTML = `
            <!-- Chat Button -->
            <div class="chapi-chat-button" id="chapiChatButton">
                <div class="chapi-button-content">
                    <div class="chapi-avatar">🚀</div>
                    <div class="chapi-button-text">
                        <strong>¡Habla con CHAPI PRO!</strong>
                        <small>Especialista en ventas 24/7</small>
                    </div>
                </div>
                <div class="chapi-notification-dot"></div>
            </div>

            <!-- Chat Window -->
            <div class="chapi-chat-window" id="chapiChatWindow">
                <div class="chapi-header">
                    <div class="chapi-header-info">
                        <div class="chapi-avatar">🚀</div>
                        <div class="chapi-header-text">
                            <strong>${this.config.botName || 'CHAPI PRO'}</strong>
                            <small>Consultor de Ventas Digital</small>
                        </div>
                    </div>
                    <button class="chapi-close-btn" id="chapiCloseBtn">×</button>
                </div>

                <div class="chapi-chat-body" id="chapiChatBody">
                    <!-- Typing indicator -->
                    <div class="chapi-typing" id="chapiTyping" style="display: none;">
                        <div class="chapi-message bot">
                            <div class="chapi-avatar">🚀</div>
                            <div class="chapi-message-content">
                                <div class="chapi-typing-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="chapi-quick-actions" id="chapiQuickActions">
                    ${this.createQuickActions()}
                </div>

                <div class="chapi-input-area">
                    <div class="chapi-input-container">
                        <textarea
                            class="chapi-input"
                            id="chapiInput"
                            placeholder="Escribe tu respuesta..."
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

  createQuickActions() {
    if (!this.config.quickActions || this.config.quickActions.length === 0) {
      return '<p style="text-align: center; color: #666; font-size: 12px;">Escribe tu consulta abajo</p>';
    }

    return this.config.quickActions.map(action => `
            <button class="chapi-quick-action ${action.priority ? 'priority' : ''}"
                    onclick="chapiAssistant.handleQuickAction('${action.action}')">
                ${action.text}
            </button>
        `).join('');
  }

  bindEvents() {
    const chatButton = document.getElementById('chapiChatButton');
    const closeBtn = document.getElementById('chapiCloseBtn');
    const sendBtn = document.getElementById('chapiSendBtn');
    const input = document.getElementById('chapiInput');

    if (chatButton) {
      chatButton.addEventListener('click', () => this.toggle());
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.sendMessage());
    }

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
      const input = document.getElementById('chapiInput');
      if (input) input.focus();
    }, 300);

    this.trackInteraction('chat_opened');
  }

  close() {
    const window = document.getElementById('chapiChatWindow');
    window.classList.remove('active');
    this.isOpen = false;
    this.trackInteraction('chat_closed');
  }

  loadWelcomeMessage() {
    setTimeout(() => {
      const welcomeMessage = this.config.welcomeMessage ||
        '🚀 ¡Hola! Soy CHAPI PRO, especialista en chatbots comerciales. ¿Qué tipo de negocio tienes?';

      this.addMessage('bot', welcomeMessage);
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
    this.analytics.messagesCount++;

    // Clear input
    input.value = '';
    input.style.height = 'auto';

    // Hide quick actions after first user message
    this.hideQuickActions();

    // Show typing indicator
    this.showTypingIndicator();

    // Process message
    setTimeout(() => {
      this.processMessage(message);
    }, 1000 + Math.random() * 1000);
  }

  addMessage(sender, text) {
    const chatBody = document.getElementById('chapiChatBody');
    const messageEl = document.createElement('div');
    messageEl.className = `chapi-message ${sender}`;

    const avatar = sender === 'bot' ? '🚀' : '👤';
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
    this.messages.push({ sender, text, timestamp: Date.now() });
    this.scrollToBottom();
  }

  processMessage(message) {
    this.hideTypingIndicator();

    // Procesar con respuestas comerciales ultra-agresivas
    const response = this.getCommercialResponse(message);

    // Actualizar perfil del usuario
    this.updateUserProfile(message);

    // Agregar respuesta
    this.addMessage('bot', response);

    // Incrementar intentos de cierre si aplica
    if (this.isCloseAttempt(response)) {
      this.analytics.closeAttempts++;
    }

    this.trackInteraction('message_processed', {
      message: message.substring(0, 50),
      qualification: this.userProfile.qualificationScore
    });
  }

  getCommercialResponse(message) {
    const messageLower = message.toLowerCase();
    const customResponses = this.config.customResponses || {};

    // Buscar respuesta específica
    for (const [keywords, response] of Object.entries(customResponses)) {
      const keywordList = keywords.split('|');

      const hasMatch = keywordList.some(keyword =>
        messageLower.includes(keyword.toLowerCase())
      );

      if (hasMatch) {
        this.userProfile.engagementScore += 10;
        return this.personalizeResponse(response);
      }
    }

    // Respuesta de fallback comercial
    return this.getFallbackResponse(message);
  }

  personalizeResponse(response) {
    // Reemplazar placeholders con datos dinámicos
    let personalized = response;

    if (this.config.salesStats) {
      personalized = personalized.replace('[ROI]', this.config.salesStats.averageROI || '380%');
      personalized = personalized.replace('[PERSONALIZAR]', this.getSuggestedPackage());
    }

    if (this.config.contactInfo) {
      personalized = personalized.replace('[NÚMERO_COMERCIAL]',
        this.config.contactInfo.whatsapp || '+52 222 858 8674');
    }

    return personalized;
  }

  getSuggestedPackage() {
    const score = this.userProfile.qualificationScore;

    if (score >= 70) {
      return 'ULTRA ($1,000 MXN)';
    } else if (score >= 40) {
      return 'PREMIUM ($600 MXN)';
    } else {
      return 'BÁSICO ($300 MXN)';
    }
  }

  getFallbackResponse(message) {
    const fallbacks = [
      '🎯 Interesante. Para ayudarte mejor, ¿qué tipo de negocio tienes exactamente?',
      '💡 Entiendo. ¿Cuál es tu mayor problema actual con la atención al cliente?',
      '🚀 Perfecto. ¿Cuántos clientes pierdes al día por no contestar rápido?'
    ];

    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  updateUserProfile(message) {
    const messageLower = message.toLowerCase();

    // Detectar tipo de negocio
    if (messageLower.includes('restaurante') || messageLower.includes('comida')) {
      this.userProfile.businessType = 'restaurante';
      this.userProfile.qualificationScore += 20;
    } else if (messageLower.includes('tienda') || messageLower.includes('ecommerce')) {
      this.userProfile.businessType = 'ecommerce';
      this.userProfile.qualificationScore += 20;
    } else if (messageLower.includes('servicio') || messageLower.includes('consultor')) {
      this.userProfile.businessType = 'servicios';
      this.userProfile.qualificationScore += 20;
    }

    // Detectar urgencia
    const urgencyWords = ['urgente', 'rápido', 'ya', 'ahora', 'necesito'];
    if (urgencyWords.some(word => messageLower.includes(word))) {
      this.userProfile.urgencyLevel++;
      this.userProfile.qualificationScore += 15;
    }

    // Detectar interés en precios
    if (messageLower.includes('precio') || messageLower.includes('costo')) {
      this.userProfile.qualificationScore += 25;
    }
  }

  isCloseAttempt(response) {
    const closeIndicators = [
      'demo personalizada',
      'empezamos hoy',
      'whatsapp directo',
      'hacemos la demo',
      'decides hoy'
    ];

    return closeIndicators.some(indicator =>
      response.toLowerCase().includes(indicator)
    );
  }

  handleQuickAction(action) {
    // Agregar mensaje del usuario
    this.addMessage('user', this.getActionDisplayText(action));

    // Simular typing
    this.showTypingIndicator();

    // Procesar después de delay
    setTimeout(() => {
      this.processMessage(action);
    }, 1500);

    this.trackInteraction('quick_action', { action });
  }

  getActionDisplayText(action) {
    const actionTexts = {
      'negocio_restaurante': '🍕 Tengo un restaurante',
      'negocio_ecommerce': '🛒 Tengo una tienda online',
      'negocio_servicios': '👔 Ofrezco servicios profesionales',
      'negocio_otro': '🏪 Tengo otro tipo de negocio',
      'precios_directo': '💰 Quiero ver los precios',
      'demo_inmediata': '🎯 Quiero ver una demo'
    };

    return actionTexts[action] || action;
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

  scrollToBottom() {
    const chatBody = document.getElementById('chapiChatBody');
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
  }

  trackInteraction(event, data = {}) {
    const interaction = {
      event,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userProfile: this.userProfile,
      ...data
    };

    console.log('📊 CHAPI Analytics:', interaction);

    // Enviar a analytics si está configurado
    if (this.config.enableAnalytics && typeof gtag === 'function') {
      gtag('event', event, {
        event_category: 'chapi_commercial',
        event_label: data.action || 'interaction',
        value: this.userProfile.qualificationScore
      });
    }
  }
}

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
  if (typeof window.chapiConfigUltraComercial !== 'undefined') {
    window.chapiAssistant = new ChapiAssistantUltraComercial();
    console.log('🚀 CHAPI Ultra Comercial auto-inicializado');
  }
});

// Exportar para uso manual
if (typeof window !== 'undefined') {
  window.ChapiAssistantUltraComercial = ChapiAssistantUltraComercial;
}
