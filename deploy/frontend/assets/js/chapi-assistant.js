/**
 * 🤖 CHAPI Assistant Widget - Versión Optimizada para Producción
 * @version 3.0
 */

class ChapiAssistant {
  constructor() {
    this.config = window.CHAPI_CONFIG || {};
    this.isOpen = false;
    this.messages = [];
    this.conversationId = null;
    this.init();
  }

  init() {
    this.createWidget();
    this.bindEvents();
    this.showWelcomeMessage();
  }

  createWidget() {
    const widgetHTML = `
            <div class="chapi-widget" id="chapi-widget">
                <!-- Trigger Button -->
                <button class="chapi-trigger" id="chapi-trigger">
                    <div class="chapi-trigger-icon">💬</div>
                </button>

                <!-- Chat Window -->
                <div class="chapi-chat" id="chapi-chat">
                    <!-- Header -->
                    <div class="chapi-header">
                        <div class="chapi-header-content">
                            <div class="chapi-avatar">🤖</div>
                            <div class="chapi-header-text">
                                <div class="chapi-header-title">CHAPI Assistant</div>
                                <div class="chapi-header-subtitle">Online • Powered by IA</div>
                            </div>
                        </div>
                        <button class="chapi-close" id="chapi-close">✕</button>
                    </div>

                    <!-- Messages Area -->
                    <div class="chapi-messages" id="chapi-messages"></div>

                    <!-- Quick Actions -->
                    <div class="chapi-quick-actions" id="chapi-quick-actions">
                        <button class="chapi-quick-btn" onclick="window.CHAPI.sendQuickMessage('🏢 Para mi negocio')">🏢 Para mi negocio</button>
                        <button class="chapi-quick-btn" onclick="window.CHAPI.sendQuickMessage('💰 Ver precios')">💰 Precios</button>
                        <button class="chapi-quick-btn" onclick="window.CHAPI.sendQuickMessage('📞 Agendar demo')">📞 Demo</button>
                    </div>

                    <!-- Input Container -->
                    <div class="chapi-input-container">
                        <textarea
                            class="chapi-input"
                            id="chapi-input"
                            placeholder="Escribe tu mensaje..."
                            rows="1"
                        ></textarea>
                        <button class="chapi-send-btn" id="chapi-send">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>

                    <!-- Footer -->
                    <div class="chapi-footer">
                        <div class="chapi-promo">Powered by OpenAI • chapibot.pro</div>
                    </div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  bindEvents() {
    const trigger = document.getElementById('chapi-trigger');
    const close = document.getElementById('chapi-close');
    const input = document.getElementById('chapi-input');
    const sendBtn = document.getElementById('chapi-send');

    trigger.addEventListener('click', () => this.toggleWidget());
    close.addEventListener('click', () => this.closeWidget());
    sendBtn.addEventListener('click', () => this.sendMessage());

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    // Auto-resize textarea
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });
  }

  toggleWidget() {
    const chat = document.getElementById('chapi-chat');
    if (this.isOpen) {
      this.closeWidget();
    } else {
      this.openWidget();
    }
  }

  openWidget() {
    const chat = document.getElementById('chapi-chat');
    chat.classList.add('chapi-chat-open');
    this.isOpen = true;

    // Focus input
    setTimeout(() => {
      document.getElementById('chapi-input').focus();
    }, 300);
  }

  closeWidget() {
    const chat = document.getElementById('chapi-chat');
    chat.classList.remove('chapi-chat-open');
    this.isOpen = false;
  }

  showWelcomeMessage() {
    const welcomeMsg = this.config.messages?.welcome || `
            ¡Hola! 👋 Soy <strong>CHAPI</strong>, tu asistente de IA.
            <br><br>
            ¿En qué puedo ayudarte hoy?
        `;

    this.addMessage(welcomeMsg, 'bot');
  }

  addMessage(content, sender = 'user', timestamp = new Date()) {
    const messagesContainer = document.getElementById('chapi-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `chapi-message chapi-message-${sender}`;

    const time = timestamp.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });

    messageElement.innerHTML = `
            <div class="chapi-message-avatar">
                ${sender === 'bot' ? '🤖' : '👤'}
            </div>
            <div class="chapi-message-content">
                <div class="chapi-message-text">${content}</div>
                <div class="chapi-message-time">${time}</div>
            </div>
        `;

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Animate message
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(10px)';
    setTimeout(() => {
      messageElement.style.opacity = '1';
      messageElement.style.transform = 'translateY(0)';
    }, 100);
  }

  showTypingIndicator() {
    const messagesContainer = document.getElementById('chapi-messages');
    const typingElement = document.createElement('div');
    typingElement.className = 'chapi-typing-indicator';
    typingElement.id = 'chapi-typing';

    typingElement.innerHTML = `
            <div class="chapi-message-avatar">🤖</div>
            <div class="chapi-typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    const typing = document.getElementById('chapi-typing');
    if (typing) {
      typing.remove();
    }
  }

  async sendMessage() {
    const input = document.getElementById('chapi-input');
    const message = input.value.trim();

    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Try API call
      const response = await this.callAPI(message);
      this.hideTypingIndicator();
      this.addMessage(response, 'bot');
    } catch (error) {
      this.hideTypingIndicator();
      // Fallback response
      const fallbackResponse = this.getFallbackResponse(message);
      this.addMessage(fallbackResponse, 'bot');
    }
  }

  async callAPI(message) {
    const apiUrl = this.config.apiUrl || 'https://api.chapibot.pro';

    const response = await fetch(`${apiUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        conversation_id: this.conversationId
      })
    });

    if (!response.ok) {
      throw new Error('API Error');
    }

    const data = await response.json();
    this.conversationId = data.conversation_id;
    return data.response;
  }

  getFallbackResponse(message) {
    const msg = message.toLowerCase();

    // Check custom responses
    if (this.config.customResponses) {
      for (const [pattern, response] of Object.entries(this.config.customResponses)) {
        const keywords = pattern.split('|');
        if (keywords.some(keyword => msg.includes(keyword))) {
          return response;
        }
      }
    }

    // Default fallback
    return this.config.offlineMode?.responses?.default || `
            💬 <strong>¡Gracias por tu mensaje!</strong>
            <br><br>
            Estoy en modo demo. Para una experiencia completa:
            <br>📱 <strong>WhatsApp:</strong> +56 9 xxxx xxxx
            <br>📧 <strong>Email:</strong> info@chapibot.pro
            <br><br>
            ¿Te gustaría agendar una demo personalizada?
        `;
  }

  sendQuickMessage(message) {
    const input = document.getElementById('chapi-input');
    input.value = message;
    this.sendMessage();
  }

  // Public API
  open() {
    this.openWidget();
  }

  close() {
    this.closeWidget();
  }

  sendMessage(text) {
    if (text) {
      const input = document.getElementById('chapi-input');
      input.value = text;
    }
    this.sendMessage();
  }
}

// Initialize CHAPI Assistant
document.addEventListener('DOMContentLoaded', function () {
  // Wait for config to load
  setTimeout(() => {
    if (window.CHAPI_CONFIG) {
      window.CHAPI = new ChapiAssistant();
      console.log('🤖 CHAPI Assistant initialized');
    } else {
      console.warn('⚠️ CHAPI_CONFIG not found, using defaults');
      window.CHAPI = new ChapiAssistant();
    }
  }, 100);
});

// Export for global access
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChapiAssistant;
}
