# 🚀 Guía de Instalación y Configuración

<div align="center">
  
  ![Setup](https://img.shields.io/badge/Setup-Rápido-success?style=for-the-badge)
  ![Time](https://img.shields.io/badge/Tiempo-24_horas-blue?style=for-the-badge)
  
</div>

---

## 🎯 Opciones de Implementación

### **1. 🌟 SaaS - Recomendado (Sin instalación)**

**⏱️ Tiempo:** 24 horas  
**👥 Para quien:** Empresas que quieren empezar YA  
**💰 Costo:** Desde $49 USD/mes  

```bash
📝 PROCESO:
1. Llenar formulario en chapibot.pro
2. Llamada de configuración (30 min)
3. Configuramos tu chatbot
4. Te damos acceso al dashboard
5. ¡Empieza a vender!

✅ INCLUYE:
- Configuración completa
- Integración con tus sistemas
- Capacitación del equipo
- Soporte 24/7
- Actualizaciones automáticas
```

### **2. 🔧 Self-Hosted (Instalación propia)**

**⏱️ Tiempo:** 2-5 días  
**👥 Para quien:** Equipos técnicos con control total  
**💰 Costo:** Licencia one-time  

```bash
# Prerequisitos
- Docker & Docker Compose
- Servidor Linux (Ubuntu 20.04+)
- 4GB RAM mínimo, 8GB recomendado
- SSL Certificate
- Dominio propio

# Instalación
git clone https://github.com/chapi-team/chapi-selfhosted.git
cd chapi-selfhosted
cp .env.example .env
# Configurar variables en .env
docker-compose up -d

# Verificar instalación
curl http://localhost:3000/health
```

### **3. 🛠️ Custom Development (A medida)**

**⏱️ Tiempo:** 2-6 semanas  
**👥 Para quien:** Empresas con necesidades específicas  
**💰 Costo:** Cotización personalizada  

```yaml
Incluye:
  - Desarrollo específico
  - Integraciones custom
  - API personalizada
  - Implementación on-premise
  - SLA empresarial
```

---

## 🔧 Configuración Paso a Paso (SaaS)

### **Paso 1: Registro y Configuración Inicial**

```yaml
Información requerida:
  empresa:
    nombre: "Mi Empresa S.A."
    industria: "E-commerce / Servicios / Restaurante"
    tamaño: "1-10 / 11-50 / 50+ empleados"
    sitio_web: "https://miempresa.com"
  
  contacto:
    nombre: "Juan Pérez"
    email: "juan@miempresa.com"
    telefono: "+52 55 1234 5678"
    rol: "CEO / CMO / CTO / Otro"
```

### **Paso 2: Selección de Canales**

```yaml
Canales disponibles:
  whatsapp:
    requerido: "Número de WhatsApp Business"
    configuracion: "API Token de Meta"
    tiempo_setup: "2 horas"
  
  telegram:
    requerido: "Bot Token de BotFather"
    configuracion: "Webhook URL"
    tiempo_setup: "30 minutos"
  
  webchat:
    requerido: "Dominio del sitio web"
    configuracion: "Script embed"
    tiempo_setup: "15 minutos"
```

### **Paso 3: Integración con Sistemas Existentes**

#### **CRM Integration**

```javascript
// Ejemplo para HubSpot
{
  "crm": "hubspot",
  "api_key": "tu-hubspot-api-key",
  "mappings": {
    "lead_source": "chatbot",
    "lifecycle_stage": "lead",
    "properties": {
      "firstname": "user.name",
      "email": "user.email",
      "phone": "user.phone",
      "lead_score": "conversation.score"
    }
  },
  "triggers": {
    "create_contact": "qualified_lead",
    "create_deal": "purchase_intent",
    "update_stage": "conversation_end"
  }
}
```

#### **Payment Integration**

```javascript
// Ejemplo para Stripe
{
  "payment_processor": "stripe",
  "public_key": "pk_live_...",
  "secret_key": "sk_live_...",
  "webhook_secret": "whsec_...",
  "products": [
    {
      "id": "prod_basic",
      "name": "Plan Básico",
      "price": 4900, // en centavos
      "currency": "usd"
    }
  ]
}
```

### **Paso 4: Configuración de Flujos Conversacionales**

```yaml
flujos_basicos:
  saludo:
    trigger: ["hola", "buenos días", "información"]
    respuesta: "¡Hola! Soy CHAPI, tu asistente virtual. ¿En qué puedo ayudarte hoy?"
    opciones: ["Ver productos", "Solicitar cotización", "Hablar con humano"]
  
  calificacion_lead:
    preguntas:
      - "¿Cuál es tu nombre?"
      - "¿En qué empresa trabajas?"
      - "¿Cuál es tu rol en la empresa?"
      - "¿Cuántos empleados tienen?"
      - "¿Cuál es tu presupuesto aproximado?"
    
  cierre_venta:
    condiciones: ["lead_calificado", "presupuesto_definido"]
    acciones: ["enviar_propuesta", "agendar_demo", "crear_deal_crm"]
```

---

## 📊 Dashboard y Analytics

### **Configuración de Métricas**

```yaml
kpis_principales:
  conversacion:
    - total_mensajes
    - tiempo_respuesta_promedio
    - satisfaccion_cliente
    - conversaciones_activas
  
  ventas:
    - leads_generados
    - leads_calificados
    - conversion_rate
    - revenue_generado
  
  operacion:
    - uptime_bot
    - errores_por_hora
    - integraciones_activas
    - usuarios_concurrentes
```

### **Reportes Automáticos**

```yaml
configuracion_reportes:
  frecuencia: "diario" # diario, semanal, mensual
  formato: "pdf" # pdf, excel, csv
  destinatarios: 
    - "ceo@miempresa.com"
    - "marketing@miempresa.com"
  
  contenido:
    - resumen_ejecutivo
    - metricas_principales
    - comparativa_periodo_anterior
    - recomendaciones_ia
    - acciones_sugeridas
```

---

## 🔒 Configuración de Seguridad

### **Autenticación y Permisos**

```yaml
usuarios:
  admin:
    permisos: ["all"]
    acceso: ["dashboard", "configuracion", "reportes", "usuarios"]
  
  manager:
    permisos: ["read", "moderate"]
    acceso: ["dashboard", "reportes", "conversaciones"]
  
  agent:
    permisos: ["read", "respond"]
    acceso: ["conversaciones", "knowledge_base"]
```

### **Configuración de Privacidad**

```yaml
gdpr_compliance:
  data_retention: "24_months"
  user_consent: "explicit"
  data_portability: "enabled"
  right_to_be_forgotten: "enabled"
  
mexico_lfpdppp:
  data_localization: "enabled"
  consent_mechanism: "active"
  notification_authority: "enabled"
```

---

## 🚀 Optimización y Mejores Prácticas

### **Performance**

```yaml
optimizaciones:
  cache:
    conversation_context: "redis"
    user_profiles: "memory"
    response_templates: "cdn"
  
  scaling:
    auto_scaling: "enabled"
    max_instances: 10
    target_cpu: "70%"
    target_memory: "80%"
```

### **Monitoring**

```yaml
alertas:
  response_time: "> 500ms"
  error_rate: "> 1%"
  uptime: "< 99.9%"
  
notificaciones:
  slack: "webhook_url"
  email: "admin@miempresa.com"
  sms: "+52551234567"
```

---

## 🆘 Soporte y Mantenimiento

### **Canales de Soporte**

| Nivel | Canal | Tiempo Respuesta | Disponibilidad |
|-------|-------|------------------|----------------|
| **Crítico** | WhatsApp | < 15 min | 24/7 |
| **Alto** | Email | < 2 horas | 24/7 |
| **Medio** | Ticket | < 24 horas | Lun-Vie |
| **Bajo** | Chat | < 48 horas | Horario comercial |

### **Mantenimiento Programado**

```yaml
actualizaciones:
  frecuencia: "quincenal"
  horario: "domingo 2:00 AM - 4:00 AM (México)"
  notificacion: "48 horas antes"
  
backup:
  frecuencia: "cada 6 horas"
  retencion: "30 días"
  ubicacion: "multi-region"
```

---

## 📞 Siguientes Pasos

<div align="center">

### **¿Listo para empezar?**

<a href="https://chapibot.pro/signup">
  <img src="https://img.shields.io/badge/COMENZAR_AHORA-00d4a6?style=for-the-badge&logo=rocket&logoColor=black" />
</a>

<br/><br/>

**📱 WhatsApp:** [+52 55 0000 0000](https://wa.me/525500000000)  
**📧 Email:** <setup@chapibot.pro>  
**📅 Agendar demo:** [calendly.com/chapi-demo](https://calendly.com/chapi-demo)  

</div>

---

<div align="center">
  
  **Instalación y configuración garantizada en 24 horas**
  
  <sub>© 2025 CHAPI - Soporte técnico especializado</sub>
  
</div>
