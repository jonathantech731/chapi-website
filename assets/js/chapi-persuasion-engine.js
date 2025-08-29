/**
 * 🎯 CHAPI Persuasion Engine
 * Motor de persuasión avanzado para mejorar la capacidad de convencimiento del asistente
 * @version 1.0
 */

class ChapiPersuasionEngine {
  constructor(config = {}) {
    this.config = {
      enablePersonalization: true,
      trackUserInterests: true,
      useEmotionalIntelligence: true,
      useSocialProof: true,
      useScarcity: true,
      useReciprocity: true,
      ...config
    };

    this.userProfile = {
      interests: [],
      objections: [],
      personality: null,
      engagementLevel: 0,
      visitCount: 0,
      decisiveness: null
    };

    this.persuasionTemplates = {
      socialProof: [
        "Más de 500 empresas ya confían en CHAPI para sus ventas automáticas.",
        "Nuestros clientes reportan un aumento promedio del 45% en conversiones.",
        "El 92% de nuestros usuarios renuevan su suscripción después del primer año.",
        "Empresas como {companyReference} han aumentado sus ventas un 300% con CHAPI."
      ],
      scarcity: [
        "Esta oferta especial solo está disponible hasta {deadline}.",
        "Solo quedan {number} cupos para la promoción de lanzamiento.",
        "El precio promocional aumentará en 48 horas.",
        "Esta es la última semana para aprovechar el 30% de descuento."
      ],
      urgency: [
        "Actúa ahora y obtén 2 meses adicionales gratis.",
        "Los primeros 10 clientes reciben configuración personalizada sin costo.",
        "Agenda tu demo hoy y recibe un análisis de conversión gratuito.",
        "Implementación prioritaria para decisiones tomadas esta semana."
      ],
      reciprocity: [
        "Te hemos preparado una guía gratuita sobre automatización de ventas.",
        "Descarga nuestro template de flujos de conversación sin compromiso.",
        "Accede a nuestra masterclass gratuita sobre IA conversacional.",
        "Recibe un análisis personalizado de tu actual proceso de ventas."
      ],
      authority: [
        "Nuestro equipo de IA está liderado por ex-ingenieros de OpenAI y Google.",
        "CHAPI ha sido reconocido como líder en el informe Gartner 2025.",
        "Nuestra tecnología está respaldada por 3 patentes en procesamiento de lenguaje natural.",
        "Casos de éxito publicados en Forbes, TechCrunch y Business Insider."
      ],
      liking: [
        "Entendemos los desafíos que enfrentas en tu industria.",
        "Compartimos tu visión de crear experiencias excepcionales para tus clientes.",
        "Nos apasiona ayudar a negocios como el tuyo a crecer con tecnología.",
        "Estamos aquí para ser un aliado en tu transformación digital, no solo un proveedor."
      ],
      commitment: [
        "Comienza con un pequeño paso: una demo sin compromiso.",
        "Prueba CHAPI gratis por 30 días, sin tarjeta de crédito.",
        "Implementa un flujo simple y ve los resultados por ti mismo.",
        "Nuestro contrato es mensual, sin permanencia mínima."
      ],
      storytelling: [
        "Un restaurante familiar aumentó sus reservas un 200% en 3 meses con nuestro chatbot.",
        "Una tienda online redujo su tasa de abandono de carrito un 45% con CHAPI.",
        "Una clínica dental pasó de 20 a 60 citas mensuales gracias a la automatización.",
        "Un despacho de abogados califica 100+ leads al mes mientras su equipo duerme."
      ]
    };

    this.objectionHandlers = {
      price: [
        "Entiendo tu preocupación por el precio. Sin embargo, nuestros clientes suelen recuperar la inversión en menos de 60 días. ¿Te gustaría ver algunos casos de ROI específicos?",
        "El costo promedio de un lead generado con CHAPI es 70% menor que con métodos tradicionales. Además, trabajamos 24/7 sin descansos ni vacaciones.",
        "Ofrecemos una garantía de ROI: si no recuperas al menos 3 veces tu inversión en 90 días, te devolvemos tu dinero."
      ],
      complexity: [
        "Aunque la tecnología detrás es compleja, la experiencia de usuario no lo es. Te asignamos un especialista que configura todo por ti en 24 horas.",
        "No necesitas conocimientos técnicos. Nuestro sistema visual tipo 'drag and drop' te permite crear flujos sin escribir código.",
        "El 40% de nuestros clientes no tienen departamento técnico y usan CHAPI exitosamente."
      ],
      timeToImplement: [
        "A diferencia de otros sistemas que tardan semanas, CHAPI se implementa en 24 horas. Tu primer flujo estará funcionando mañana mismo.",
        "Tenemos templates preconfigurados para tu industria que aceleran la implementación. Solo necesitamos personalizar algunos detalles.",
        "El tiempo que inviertes en la configuración inicial lo recuperas en la primera semana de uso."
      ],
      humanTouch: [
        "CHAPI no reemplaza el toque humano, lo potencia. Tu equipo puede enfocarse en conversaciones de alto valor mientras automatizamos las rutinarias.",
        "Nuestro sistema detecta cuando una conversación necesita intervención humana y transfiere al cliente a tu equipo sin fricciones.",
        "Los clientes valoran la inmediatez y disponibilidad 24/7, algo que incluso el mejor equipo humano no puede ofrecer constantemente."
      ],
      dataPrivacy: [
        "La privacidad es nuestra prioridad. Todos los datos se almacenan encriptados y cumplimos con GDPR, CCPA y LFPDPPP (México).",
        "Ofrecemos opciones de alojamiento en tu propio servidor para datos especialmente sensibles.",
        "Firmamos acuerdos de confidencialidad y no utilizamos los datos de tus clientes para entrenar nuestros modelos."
      ]
    };
  }

  /**
   * Analiza el mensaje del usuario para detectar intereses y objeciones
   * @param {string} message - Mensaje del usuario
   * @returns {object} Análisis del mensaje
   */
  analyzeUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    const analysis = {
      interests: [],
      objections: [],
      sentiment: this.detectSentiment(message),
      questionType: this.detectQuestionType(message),
      buyingStage: this.detectBuyingStage(message),
      urgency: this.detectUrgency(message)
    };

    // Detectar intereses
    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('plan')) {
      analysis.interests.push('pricing');
    }
    if (lowerMessage.includes('whatsapp') || lowerMessage.includes('telegram') || lowerMessage.includes('canal')) {
      analysis.interests.push('channels');
    }
    if (lowerMessage.includes('ia') || lowerMessage.includes('inteligencia') || lowerMessage.includes('gpt')) {
      analysis.interests.push('ai_technology');
    }
    if (lowerMessage.includes('integra') || lowerMessage.includes('crm') || lowerMessage.includes('api')) {
      analysis.interests.push('integrations');
    }
    if (lowerMessage.includes('flujo') || lowerMessage.includes('venta') || lowerMessage.includes('automatizar')) {
      analysis.interests.push('sales_automation');
    }

    // Detectar objeciones
    if (lowerMessage.includes('caro') || lowerMessage.includes('costoso') || lowerMessage.includes('precio alto')) {
      analysis.objections.push('price');
    }
    if (lowerMessage.includes('complejo') || lowerMessage.includes('difícil') || lowerMessage.includes('complicado')) {
      analysis.objections.push('complexity');
    }
    if (lowerMessage.includes('tiempo') || lowerMessage.includes('implementación') || lowerMessage.includes('demora')) {
      analysis.objections.push('timeToImplement');
    }
    if (lowerMessage.includes('humano') || lowerMessage.includes('personal') || lowerMessage.includes('robot')) {
      analysis.objections.push('humanTouch');
    }
    if (lowerMessage.includes('datos') || lowerMessage.includes('privacidad') || lowerMessage.includes('seguridad')) {
      analysis.objections.push('dataPrivacy');
    }

    // Actualizar perfil del usuario
    this.updateUserProfile(analysis);

    return analysis;
  }

  /**
   * Detecta el sentimiento del mensaje
   * @param {string} message - Mensaje del usuario
   * @returns {string} Sentimiento detectado (positive, neutral, negative)
   */
  detectSentiment(message) {
    const lowerMessage = message.toLowerCase();

    const positiveWords = ['bueno', 'excelente', 'genial', 'me gusta', 'interesante', 'perfecto', 'increíble', 'fantástico'];
    const negativeWords = ['malo', 'terrible', 'no me gusta', 'costoso', 'complicado', 'difícil', 'problema', 'caro'];

    let positiveScore = 0;
    let negativeScore = 0;

    positiveWords.forEach(word => {
      if (lowerMessage.includes(word)) positiveScore++;
    });

    negativeWords.forEach(word => {
      if (lowerMessage.includes(word)) negativeScore++;
    });

    if (positiveScore > negativeScore) return 'positive';
    if (negativeScore > positiveScore) return 'negative';
    return 'neutral';
  }

  /**
   * Detecta el tipo de pregunta
   * @param {string} message - Mensaje del usuario
   * @returns {string} Tipo de pregunta
   */
  detectQuestionType(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('?')) {
      if (lowerMessage.includes('cómo') || lowerMessage.includes('como')) return 'how';
      if (lowerMessage.includes('por qué') || lowerMessage.includes('porque')) return 'why';
      if (lowerMessage.includes('cuánto') || lowerMessage.includes('cuanto')) return 'how_much';
      if (lowerMessage.includes('cuándo') || lowerMessage.includes('cuando')) return 'when';
      if (lowerMessage.includes('dónde') || lowerMessage.includes('donde')) return 'where';
      if (lowerMessage.includes('quién') || lowerMessage.includes('quien')) return 'who';
      return 'general_question';
    }

    return 'statement';
  }

  /**
   * Detecta la etapa de compra del usuario
   * @param {string} message - Mensaje del usuario
   * @returns {string} Etapa de compra
   */
  detectBuyingStage(message) {
    const lowerMessage = message.toLowerCase();

    // Awareness (Conciencia del problema)
    if (lowerMessage.includes('qué es') || lowerMessage.includes('cómo funciona') ||
      lowerMessage.includes('para qué sirve') || lowerMessage.includes('qué hace')) {
      return 'awareness';
    }

    // Consideration (Consideración de soluciones)
    if (lowerMessage.includes('comparar') || lowerMessage.includes('diferencia') ||
      lowerMessage.includes('versus') || lowerMessage.includes('vs') ||
      lowerMessage.includes('alternativa') || lowerMessage.includes('opciones')) {
      return 'consideration';
    }

    // Decision (Decisión de compra)
    if (lowerMessage.includes('precio') || lowerMessage.includes('contratar') ||
      lowerMessage.includes('comprar') || lowerMessage.includes('adquirir') ||
      lowerMessage.includes('implementar') || lowerMessage.includes('empezar')) {
      return 'decision';
    }

    // Retention (Post-venta)
    if (lowerMessage.includes('soporte') || lowerMessage.includes('ayuda') ||
      lowerMessage.includes('problema') || lowerMessage.includes('error') ||
      lowerMessage.includes('no funciona')) {
      return 'retention';
    }

    return 'unknown';
  }

  /**
   * Detecta la urgencia del usuario
   * @param {string} message - Mensaje del usuario
   * @returns {string} Nivel de urgencia (high, medium, low)
   */
  detectUrgency(message) {
    const lowerMessage = message.toLowerCase();

    const highUrgencyWords = ['urgente', 'inmediato', 'ahora', 'hoy', 'ya', 'pronto', 'cuanto antes'];
    const mediumUrgencyWords = ['próximo', 'semana', 'pronto', 'interesado', 'necesito'];

    for (const word of highUrgencyWords) {
      if (lowerMessage.includes(word)) return 'high';
    }

    for (const word of mediumUrgencyWords) {
      if (lowerMessage.includes(word)) return 'medium';
    }

    return 'low';
  }

  /**
   * Actualiza el perfil del usuario con nueva información
   * @param {object} analysis - Análisis del mensaje del usuario
   */
  updateUserProfile(analysis) {
    // Actualizar intereses
    analysis.interests.forEach(interest => {
      if (!this.userProfile.interests.includes(interest)) {
        this.userProfile.interests.push(interest);
      }
    });

    // Actualizar objeciones
    analysis.objections.forEach(objection => {
      if (!this.userProfile.objections.includes(objection)) {
        this.userProfile.objections.push(objection);
      }
    });

    // Actualizar nivel de compromiso
    if (analysis.sentiment === 'positive') {
      this.userProfile.engagementLevel += 1;
    } else if (analysis.sentiment === 'negative') {
      this.userProfile.engagementLevel -= 1;
    }

    // Inferir personalidad basada en patrones
    if (this.userProfile.personality === null) {
      if (analysis.questionType === 'how_much' || analysis.questionType === 'when') {
        this.userProfile.personality = 'analytical';
      } else if (analysis.sentiment === 'positive' && analysis.urgency === 'high') {
        this.userProfile.personality = 'expressive';
      } else if (analysis.sentiment === 'neutral' && analysis.questionType === 'how') {
        this.userProfile.personality = 'amiable';
      } else if (analysis.objections.length > 0) {
        this.userProfile.personality = 'driver';
      }
    }

    // Incrementar contador de visitas
    this.userProfile.visitCount += 1;
  }

  /**
   * Genera una respuesta persuasiva basada en el análisis y perfil del usuario
   * @param {object} analysis - Análisis del mensaje del usuario
   * @param {string} baseResponse - Respuesta base a mejorar
   * @returns {string} Respuesta persuasiva mejorada
   */
  enhanceResponse(analysis, baseResponse) {
    let enhancedResponse = baseResponse;

    // Manejar objeciones si existen
    if (analysis.objections.length > 0) {
      const objection = analysis.objections[0];
      const handlers = this.objectionHandlers[objection];
      if (handlers && handlers.length > 0) {
        const randomHandler = handlers[Math.floor(Math.random() * handlers.length)];
        enhancedResponse += `<br><br>${randomHandler}`;
      }
    }

    // Aplicar técnicas de persuasión según la etapa de compra
    if (analysis.buyingStage === 'awareness') {
      // Para etapa de conciencia, usar autoridad y storytelling
      const authorityLine = this.getRandomTemplate('authority');
      const storyLine = this.getRandomTemplate('storytelling');
      enhancedResponse += `<br><br>${authorityLine}<br><br>${storyLine}`;
    }
    else if (analysis.buyingStage === 'consideration') {
      // Para etapa de consideración, usar prueba social y reciprocidad
      const socialProofLine = this.getRandomTemplate('socialProof');
      const reciprocityLine = this.getRandomTemplate('reciprocity');
      enhancedResponse += `<br><br>${socialProofLine}<br><br>${reciprocityLine}`;
    }
    else if (analysis.buyingStage === 'decision') {
      // Para etapa de decisión, usar escasez y urgencia
      const scarcityLine = this.getRandomTemplate('scarcity');
      const urgencyLine = this.getRandomTemplate('urgency');
      enhancedResponse += `<br><br>${scarcityLine}<br><br>${urgencyLine}`;
    }
    else if (analysis.buyingStage === 'retention') {
      // Para etapa de retención, usar compromiso y agrado
      const commitmentLine = this.getRandomTemplate('commitment');
      const likingLine = this.getRandomTemplate('liking');
      enhancedResponse += `<br><br>${commitmentLine}<br><br>${likingLine}`;
    }
    else {
      // Si no se detecta etapa, usar prueba social
      const socialProofLine = this.getRandomTemplate('socialProof');
      enhancedResponse += `<br><br>${socialProofLine}`;
    }

    // Personalizar según intereses detectados
    if (this.userProfile.interests.length > 0) {
      const primaryInterest = this.userProfile.interests[0];
      let interestLine = '';

      switch (primaryInterest) {
        case 'pricing':
          interestLine = 'Nuestros planes son flexibles y se adaptan a tu presupuesto, con ROI garantizado.';
          break;
        case 'channels':
          interestLine = 'Integramos todos los canales en una sola plataforma, manteniendo el contexto de la conversación.';
          break;
        case 'ai_technology':
          interestLine = 'Nuestra IA aprende constantemente de cada interacción, mejorando automáticamente con el tiempo.';
          break;
        case 'integrations':
          interestLine = 'Nos conectamos con tus sistemas actuales sin fricción, sin necesidad de cambiar tu stack tecnológico.';
          break;
        case 'sales_automation':
          interestLine = 'Automatizamos todo el proceso de ventas, desde la captación hasta el cierre y seguimiento post-venta.';
          break;
      }

      if (interestLine) {
        enhancedResponse += `<br><br>${interestLine}`;
      }
    }

    // Adaptar al tipo de personalidad
    if (this.userProfile.personality) {
      let closingLine = '';

      switch (this.userProfile.personality) {
        case 'analytical':
          closingLine = '¿Te gustaría ver datos específicos sobre el ROI que podrías obtener en tu caso?';
          break;
        case 'driver':
          closingLine = '¿Prefieres agendar una demo rápida de 15 minutos para ver resultados concretos?';
          break;
        case 'amiable':
          closingLine = '¿Te gustaría que te conectemos con algunos de nuestros clientes para conocer su experiencia?';
          break;
        case 'expressive':
          closingLine = '¿Qué te parecería ver cómo CHAPI transformaría la experiencia de tus clientes?';
          break;
      }

      if (closingLine) {
        enhancedResponse += `<br><br>${closingLine}`;
      }
    }

    // Añadir llamada a la acción según urgencia
    if (analysis.urgency === 'high') {
      enhancedResponse += `<br><br><strong>¿Comenzamos hoy mismo? En 24 horas podrías tener tu chatbot funcionando.</strong>`;
    } else if (analysis.urgency === 'medium') {
      enhancedResponse += `<br><br><strong>¿Te gustaría agendar una demo esta semana para avanzar?</strong>`;
    } else {
      enhancedResponse += `<br><br><strong>¿En qué más puedo ayudarte a conocer sobre CHAPI?</strong>`;
    }

    return enhancedResponse;
  }

  /**
   * Obtiene una plantilla aleatoria de persuasión
   * @param {string} templateType - Tipo de plantilla
   * @returns {string} Plantilla aleatoria
   */
  getRandomTemplate(templateType) {
    const templates = this.persuasionTemplates[templateType];
    if (!templates || templates.length === 0) return '';

    return templates[Math.floor(Math.random() * templates.length)];
  }

  /**
   * Genera una respuesta personalizada para el usuario
   * @param {string} userMessage - Mensaje del usuario
   * @param {string} baseResponse - Respuesta base del sistema
   * @returns {string} Respuesta personalizada y persuasiva
   */
  generatePersuasiveResponse(userMessage, baseResponse) {
    // Analizar el mensaje del usuario
    const analysis = this.analyzeUserMessage(userMessage);

    // Mejorar la respuesta con técnicas de persuasión
    return this.enhanceResponse(analysis, baseResponse);
  }

  /**
   * Obtiene el perfil actual del usuario
   * @returns {object} Perfil del usuario
   */
  getUserProfile() {
    return { ...this.userProfile };
  }

  /**
   * Reinicia el perfil del usuario
   */
  resetUserProfile() {
    this.userProfile = {
      interests: [],
      objections: [],
      personality: null,
      engagementLevel: 0,
      visitCount: 0,
      decisiveness: null
    };
  }
}

// Exportar para entornos modulares
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChapiPersuasionEngine;
}
