/**
 * CHAPI Chat API Client
 * Cliente seguro para comunicarse con el proxy de Azure OpenAI
 * Reemplaza las llamadas directas a OpenAI desde el frontend
 */

class ChapiChatAPI {
    constructor(options = {}) {
        this.baseURL = options.baseURL || window.location.origin;
        this.timeout = options.timeout || 30000; // 30 segundos
        this.retries = options.retries || 2;
        this.debug = options.debug || false;
    }

    /**
     * Envía mensajes al proxy de Azure OpenAI
     * @param {Array} messages - Array de mensajes [{role: 'user', content: 'texto'}]
     * @param {Object} options - Opciones adicionales
     * @returns {Promise<string>} - Respuesta del AI
     */
    async askServer(messages, options = {}) {
        if (!messages || !Array.isArray(messages)) {
            throw new Error('messages debe ser un array válido');
        }

        // Validar mensajes
        for (const msg of messages) {
            if (!msg.role || !msg.content) {
                throw new Error('Cada mensaje debe tener role y content');
            }
            if (!['user', 'assistant', 'system'].includes(msg.role)) {
                throw new Error('role debe ser user, assistant o system');
            }
        }

        const requestData = {
            messages: messages,
            max_tokens: options.max_tokens || 500,
            temperature: options.temperature || 0.2
        };

        if (this.debug) {
            console.log('🚀 Enviando request a CHAPI proxy:', requestData);
        }

        try {
            const response = await this._makeRequest('/api/chat', requestData);
            
            if (this.debug) {
                console.log('✅ Respuesta recibida:', response);
            }

            return response.content || response.message || 'Sin respuesta';

        } catch (error) {
            console.error('❌ Error en CHAPI Chat API:', error);
            
            // Manejar diferentes tipos de error
            if (error.name === 'NetworkError' || error.message.includes('fetch')) {
                throw new Error('Error de conexión. Verifica tu internet.');
            } else if (error.status === 429) {
                throw new Error('Demasiadas consultas. Espera un momento antes de intentar de nuevo.');
            } else if (error.status === 500) {
                throw new Error('Servicio temporalmente no disponible. Intenta más tarde.');
            } else {
                throw new Error(error.message || 'Error al procesar tu consulta');
            }
        }
    }

    /**
     * Realizar petición HTTP con reintentos
     */
    async _makeRequest(endpoint, data, attempt = 1) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Parsear respuesta JSON
            const responseData = await response.json();

            // Verificar status
            if (!response.ok) {
                const error = new Error(responseData.message || `HTTP ${response.status}`);
                error.status = response.status;
                error.data = responseData;
                throw error;
            }

            return responseData;

        } catch (error) {
            clearTimeout(timeoutId);

            // Si es error de abort (timeout)
            if (error.name === 'AbortError') {
                error.message = 'Timeout: La consulta tardó demasiado';
            }

            // Reintentar si hay intentos disponibles y no es un error del cliente
            if (attempt < this.retries && 
                !error.status || 
                error.status >= 500) {
                
                if (this.debug) {
                    console.log(`🔄 Reintentando... (${attempt + 1}/${this.retries})`);
                }

                // Esperar antes de reintentar (backoff exponencial)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
                
                return this._makeRequest(endpoint, data, attempt + 1);
            }

            throw error;
        }
    }

    /**
     * Verificar estado del servicio
     */
    async checkHealth() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            const data = await response.json();
            return {
                status: response.ok ? 'healthy' : 'error',
                data: data
            };
        } catch (error) {
            return {
                status: 'error',
                error: error.message
            };
        }
    }

    /**
     * Obtener límites de rate limiting
     */
    async getRateLimit() {
        try {
            // Obtener IP del cliente (solo funciona si el proxy lo soporta)
            const response = await fetch(`${this.baseURL}/api/rate-limit/current`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            // Ignorar errores de rate limit check
        }
        return null;
    }
}

/**
 * Función de conveniencia para crear mensajes del sistema CHAPI
 */
function createChapiSystemMessage() {
    return {
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
    };
}

/**
 * Función helper para conversaciones simples
 */
async function askChapi(message, options = {}) {
    const api = new ChapiChatAPI(options);
    
    const messages = [
        createChapiSystemMessage(),
        { role: 'user', content: message }
    ];

    return await api.askServer(messages, options);
}

// Exportar para diferentes entornos
if (typeof module !== 'undefined' && module.exports) {
    // Node.js
    module.exports = { ChapiChatAPI, createChapiSystemMessage, askChapi };
} else if (typeof window !== 'undefined') {
    // Browser - agregar al objeto global
    window.ChapiChatAPI = ChapiChatAPI;
    window.createChapiSystemMessage = createChapiSystemMessage;
    window.askChapi = askChapi;
}

// Para uso con ES6 modules
export { ChapiChatAPI, createChapiSystemMessage, askChapi };