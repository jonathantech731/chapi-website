# 🚀 CHAPI Azure OpenAI - Guía de Deployment

## 📋 Resumen de la Integración

Esta implementación proporciona una integración **segura** con Azure OpenAI que:

- ✅ **Elimina claves API del frontend** - Solo en variables de entorno del servidor
- ✅ **Centraliza la lógica AI** - Función reutilizable para web y Telegram
- ✅ **Proxy HTTP seguro** - FastAPI con rate limiting y CORS
- ✅ **Manejo de errores robusto** - Sin exposición de datos sensibles
- ✅ **Documentación completa** - Variables de entorno y rotación de claves

## 🏗️ Arquitectura

```
Frontend (JS) ──→ Proxy Seguro (FastAPI) ──→ Azure OpenAI
     ❌ No API keys        ✅ API keys seguras
     
Telegram Bot ──→ Función Compartida ──→ Azure OpenAI
     ✅ Misma lógica       ✅ Mantenimiento fácil
```

## 🚀 Deployment Rápido

### 1. **Docker (Recomendado)**

```bash
# 1. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales reales

# 2. Construir y ejecutar
docker-compose up -d

# 3. Verificar estado
curl http://localhost:8000/health
```

### 2. **Manual (Python)**

```bash
# 1. Instalar dependencias
pip install -r requirements.txt

# 2. Configurar environment
export AZURE_OPENAI_ENDPOINT="https://tu-recurso.openai.azure.com/"
export AZURE_OPENAI_DEPLOYMENT="gpt35-chapi"
export AZURE_OPENAI_KEY="tu-clave-azure"

# 3. Iniciar proxy
python chapi_proxy.py

# 4. (Opcional) Iniciar bot Telegram
python telegram_chapi_bot.py
```

### 3. **Cloud Platform**

#### Azure App Service
```bash
az webapp create --resource-group chapi --plan chapiPlan --name chapi-proxy --runtime "PYTHON|3.11"
az webapp config appsettings set --resource-group chapi --name chapi-proxy --settings @appsettings.json
```

#### AWS ECS/Fargate
```yaml
# task-definition.json
{
  "family": "chapi-proxy",
  "containerDefinitions": [{
    "name": "chapi",
    "image": "chapi-proxy:latest",
    "portMappings": [{"containerPort": 8000}],
    "environment": [
      {"name": "AZURE_OPENAI_ENDPOINT", "value": "..."},
      {"name": "AZURE_OPENAI_DEPLOYMENT", "value": "..."}
    ],
    "secrets": [
      {"name": "AZURE_OPENAI_KEY", "valueFrom": "arn:aws:secretsmanager:..."}
    ]
  }]
}
```

## 🔐 Configuración de Seguridad

### Variables de Entorno Críticas

```bash
# OBLIGATORIAS
AZURE_OPENAI_ENDPOINT=https://tu-recurso.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=gpt35-chapi
AZURE_OPENAI_KEY=1234567890abcdef...

# OPCIONALES
ALLOWED_ORIGINS=https://chapibot.pro,https://www.chapibot.pro
TELEGRAM_BOT_TOKEN=123456789:ABCDEF...
PORT=8000
```

### Rotación de Claves (CRÍTICO)

Si alguna clave se expuso públicamente:

```bash
# 1. INMEDIATAMENTE generar nueva clave en Azure
# 2. Actualizar variable de entorno
export AZURE_OPENAI_KEY="nueva-clave-segura"

# 3. Reiniciar servicios
docker-compose restart
# o
systemctl restart chapi-proxy

# 4. Verificar logs para uso anómalo
tail -f /var/log/chapi-proxy.log
```

## 🔧 Configuración Frontend

```javascript
// En assets/js/chapi-config.js
const CHAPI_CONFIG = {
    enableAI: true,  // ✅ Cambiar a true para usar Azure OpenAI
    // ❌ Ya NO necesitas apiKey aquí - el proxy maneja la seguridad
    
    // ... resto de configuración
};
```

## 📊 Monitoring y Salud

### Health Checks

```bash
# Estado básico
curl http://localhost:8000/

# Estado detallado
curl http://localhost:8000/health

# Rate limiting info
curl http://localhost:8000/api/rate-limit/tu-ip
```

### Logs Importantes

```bash
# Ver logs del proxy
docker logs chapi-proxy

# Monitorear requests
tail -f logs/chapi-proxy.log | grep "POST /api/chat"

# Alertas críticas
grep "ERROR\|CRITICAL" logs/chapi-proxy.log
```

## 🧪 Testing

```bash
# Tests de integración
python test_integration.py

# Demo completo
python demo_integration.py

# Test manual API
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hola"}],
    "max_tokens": 100
  }'
```

## 🚨 Troubleshooting

### Error: "Configuration incorrecta"
```bash
# Verificar variables de entorno
python -c "from chapi_azure_openai import AzureOpenAIConfig; print(AzureOpenAIConfig.from_env())"
```

### Error: "Rate limit excedido"
```bash
# Verificar límites actuales
curl http://localhost:8000/api/rate-limit/tu-ip
```

### Error: "CORS blocked"
```bash
# Verificar orígenes permitidos
echo $ALLOWED_ORIGINS
```

### Error: Frontend no se conecta
```bash
# 1. Verificar que el proxy esté corriendo
curl http://localhost:8000/health

# 2. Verificar que chat-api.js esté incluido
grep "chat-api.js" index.html

# 3. Verificar configuración frontend
grep "enableAI: true" assets/js/chapi-config.js
```

## 📈 Optimización Producción

### Performance
- Usar CDN para archivos estáticos
- Configurar cache headers
- Implementar connection pooling
- Usar HTTP/2

### Seguridad
- HTTPS obligatorio
- Rate limiting más estricto (CloudFlare)
- WAF (Web Application Firewall)
- Secrets management (Azure Key Vault, AWS Secrets)

### Escalabilidad
- Load balancer (nginx, CloudFlare)
- Multiple instances
- Auto-scaling
- Database para rate limiting distribuido

## 📞 Soporte

Para problemas con la integración:

1. **Revisar logs** - `docker logs chapi-proxy`
2. **Ejecutar tests** - `python test_integration.py`
3. **Verificar configuración** - Variables de entorno
4. **Contactar soporte** - soporte@chapibot.pro

---

**✅ La integración está completa y lista para producción!**