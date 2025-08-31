"""
🤖 CHAPI Assistant - Backend Proxy Inteligente
Proporciona endpoints seguros con flujos conversacionales programados
Integra OpenAI/Azure OpenAI como fallback para respuestas avanzadas
"""

from fastapi import FastAPI, HTTPException, Request, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, validator
from typing import List, Dict, Optional, Any
import os
import time
import logging
import json
import sqlite3
import yaml
import uuid
from collections import defaultdict, deque
import asyncio
from datetime import datetime, timedelta
from pathlib import Path
import smtplib
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart

from chapi_azure_openai import get_azure_answer, AzureOpenAIConfig, AzureOpenAIError

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Inicializar FastAPI
app = FastAPI(
    title="CHAPI Assistant - Backend Inteligente",
    description="Backend con flujos conversacionales programados + OpenAI fallback",
    version="2.0.0"
)

# Configuración CORS
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', 'https://chapibot.pro,http://localhost:8000,http://127.0.0.1:8000').split(',')

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# ===========================================
# CLASES Y MODELOS
# ===========================================

class ChatMessage(BaseModel):
    role: str = Field(..., regex=r"^(user|assistant|system)$")
    content: str = Field(..., min_length=1, max_length=4000)
    timestamp: Optional[str] = None

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    session_id: Optional[str] = None
    user_input: Optional[str] = None
    current_step: Optional[str] = None
    user_data: Optional[Dict[str, Any]] = {}

class FlowManager:
    """Gestor de flujos conversacionales"""

    def __init__(self, flows_file: str = "flows.yaml"):
        self.flows_file = flows_file
        self.flows = {}
        self.recommendations = {}
        self.sector_templates = {}
        self.load_flows()

    def load_flows(self):
        """Cargar flujos desde archivo YAML"""
        try:
            flows_path = Path(self.flows_file)
            if flows_path.exists():
                with open(flows_path, 'r', encoding='utf-8') as f:
                    data = yaml.safe_load(f)
                    self.flows = data.get('flows', {})
                    self.recommendations = data.get('recommendations', {})
                    self.sector_templates = data.get('sector_templates', {})
                logger.info(f"✅ Flujos cargados desde {self.flows_file}")
            else:
                logger.warning(f"⚠️ Archivo {self.flows_file} no encontrado. Usando flujos por defecto.")
                self._create_default_flows()
        except Exception as e:
            logger.error(f"❌ Error cargando flujos: {e}")
            self._create_default_flows()

    def _create_default_flows(self):
        """Crear flujos por defecto si no hay archivo YAML"""
        self.flows = {
            "main_flow": {
                "steps": [
                    {
                        "id": "welcome",
                        "message": "¡Hola! 👋 Soy **CHAPI**, tu asistente de chatbots inteligentes.\n\n¿En qué **sector** trabaja tu negocio?",
                        "options": [
                            {"text": "🍕 Restaurante/Comida", "next": "sector_restaurant"},
                            {"text": "🛒 E-commerce/Tienda", "next": "sector_ecommerce"},
                            {"text": "🏢 Servicios Profesionales", "next": "sector_services"},
                            {"text": "🔧 Otro sector", "next": "sector_other"}
                        ]
                    }
                ]
            }
        }

    def get_step(self, step_id: str) -> Optional[Dict]:
        """Obtener paso específico del flujo"""
        for flow_name, flow_data in self.flows.items():
            steps = flow_data.get('steps', [])
            for step in steps:
                if step.get('id') == step_id:
                    return step
        return None

    def process_user_input(self, step_id: str, user_input: str, user_data: Dict) -> Dict:
        """Procesar entrada del usuario y determinar siguiente paso"""
        step = self.get_step(step_id)
        if not step:
            return self._fallback_response()

        # Guardar datos del usuario
        if step.get('input_type') == 'number':
            try:
                user_data['daily_queries'] = int(user_input)
            except ValueError:
                user_data['daily_queries'] = user_input

        # Procesar según tipo de paso
        if 'options' in step:
            # Buscar opción seleccionada
            for option in step['options']:
                if option['text'].lower() in user_input.lower():
                    if 'goal' in option:
                        user_data['goal'] = option['goal']
                    if 'next' in option:
                        next_step = self.get_step(option['next'])
                        if next_step:
                            return self._format_response(next_step, user_data)

        # Si tiene 'next' directo
        if 'next' in step:
            next_step = self.get_step(step['next'])
            if next_step:
                return self._format_response(next_step, user_data)

        return self._fallback_response()

    def _format_response(self, step: Dict, user_data: Dict) -> Dict:
        """Formatear respuesta del paso con datos del usuario"""
        message = step.get('message', '')

        # Reemplazar variables en el mensaje
        if '{sector}' in message:
            message = message.replace('{sector}', user_data.get('sector', 'tu sector'))
        if '{daily_queries}' in message:
            message = message.replace('{daily_queries}', str(user_data.get('daily_queries', 'varias')))
        if '{company_name}' in message:
            message = message.replace('{company_name}', user_data.get('company_name', 'tu empresa'))
        if '{contact_name}' in message:
            message = message.replace('{contact_name}', user_data.get('contact_name', ''))
        if '{phone}' in message:
            message = message.replace('{phone}', user_data.get('phone', ''))

        # Agregar recomendaciones si es necesario
        if '{recommendation}' in message:
            recommendation = self._get_recommendation(user_data)
            message = message.replace('{recommendation}', recommendation)

        response = {
            "message": message,
            "step_id": step.get('id'),
            "step_data": step
        }

        return response

    def _get_recommendation(self, user_data: Dict) -> str:
        """Obtener recomendación personalizada"""
        sector = user_data.get('sector', '')
        goal = user_data.get('goal', '')
        daily_queries = user_data.get('daily_queries', 0)

        try:
            daily_queries = int(daily_queries) if daily_queries else 0
        except:
            daily_queries = 0

        # Recomendación base según sector y objetivo
        if sector in self.recommendations and goal in self.recommendations[sector]:
            rec = self.recommendations[sector][goal]
        else:
            rec = "Un chatbot personalizado que automatice tus consultas más frecuentes y mejore la experiencia de tus clientes."

        # Agregar análisis de volumen
        if daily_queries > 50:
            rec += f"\n\n**💡 Con {daily_queries} consultas diarias, ahorrarías 3-4 horas de trabajo manual.**"
        elif daily_queries > 20:
            rec += f"\n\n**💡 Con {daily_queries} consultas diarias, podrías automatizar 70-80% de respuestas.**"

        return rec

    def _fallback_response(self) -> Dict:
        """Respuesta por defecto cuando no se encuentra paso"""
        return {
            "message": "🤔 No entendí bien. ¿Podrías reformular? O selecciona una opción específica.",
            "step_id": "fallback",
            "step_data": {
                "options": [
                    {"text": "🔄 Empezar de nuevo", "next": "welcome"},
                    {"text": "💬 Hablar con humano", "next": "human_handoff"}
                ]
            }
        }

class LeadManager:
    """Gestor de leads y almacenamiento"""

    def __init__(self, db_path: str = "chapi_leads.db"):
        self.db_path = db_path
        self.init_database()

    def init_database(self):
        """Inicializar base de datos SQLite"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            cursor.execute('''
                CREATE TABLE IF NOT EXISTS leads (
                    id TEXT PRIMARY KEY,
                    session_id TEXT,
                    company_name TEXT,
                    contact_name TEXT,
                    phone TEXT,
                    email TEXT,
                    sector TEXT,
                    daily_queries INTEGER,
                    goal TEXT,
                    interest_level TEXT,
                    conversation_data TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')

            cursor.execute('''
                CREATE TABLE IF NOT EXISTS conversations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    session_id TEXT,
                    step_id TEXT,
                    user_input TEXT,
                    bot_response TEXT,
                    user_data TEXT,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')

            conn.commit()
            conn.close()
            logger.info("✅ Base de datos inicializada")

        except Exception as e:
            logger.error(f"❌ Error inicializando base de datos: {e}")

    def save_conversation(self, session_id: str, step_id: str, user_input: str, bot_response: str, user_data: Dict):
        """Guardar conversación en base de datos"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            cursor.execute('''
                INSERT INTO conversations (session_id, step_id, user_input, bot_response, user_data)
                VALUES (?, ?, ?, ?, ?)
            ''', (session_id, step_id, user_input, bot_response, json.dumps(user_data)))

            conn.commit()
            conn.close()

        except Exception as e:
            logger.error(f"❌ Error guardando conversación: {e}")

    def save_lead(self, session_id: str, user_data: Dict):
        """Guardar lead calificado"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()

            lead_id = str(uuid.uuid4())

            cursor.execute('''
                INSERT OR REPLACE INTO leads
                (id, session_id, company_name, contact_name, phone, email,
                 sector, daily_queries, goal, conversation_data, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ''', (
                lead_id,
                session_id,
                user_data.get('company_name', ''),
                user_data.get('contact_name', ''),
                user_data.get('phone', ''),
                user_data.get('email', ''),
                user_data.get('sector', ''),
                user_data.get('daily_queries', 0),
                user_data.get('goal', ''),
                json.dumps(user_data)
            ))

            conn.commit()
            conn.close()

            logger.info(f"✅ Lead guardado: {lead_id}")
            return lead_id

        except Exception as e:
            logger.error(f"❌ Error guardando lead: {e}")
            return None

# Inicializar gestores globales
flow_manager = FlowManager()
lead_manager = LeadManager()

# Rate Limiter mejorado
class AdvancedRateLimiter:
    def __init__(self, max_requests: int = 60, window_minutes: int = 1, max_ai_requests: int = 10):
        self.max_requests = max_requests
        self.max_ai_requests = max_ai_requests
        self.window_minutes = window_minutes
        self.requests = defaultdict(deque)
        self.ai_requests = defaultdict(deque)

    def is_allowed(self, client_ip: str, is_ai_request: bool = False) -> bool:
        """Verifica si la IP puede hacer más requests"""
        now = time.time()
        window_start = now - (self.window_minutes * 60)

        # Limpiar requests antiguos
        requests_deque = self.ai_requests[client_ip] if is_ai_request else self.requests[client_ip]
        max_allowed = self.max_ai_requests if is_ai_request else self.max_requests

        while requests_deque and requests_deque[0] < window_start:
            requests_deque.popleft()

        if len(requests_deque) >= max_allowed:
            return False

        requests_deque.append(now)
        return True

# Inicializar rate limiter
rate_limiter = AdvancedRateLimiter()

# ===========================================
# FUNCIONES AUXILIARES
# ===========================================

def get_client_ip(request: Request) -> str:
    """Obtener IP real del cliente"""
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return request.client.host

async def send_lead_notification(user_data: Dict, background_tasks: BackgroundTasks):
    """Enviar notificación de nuevo lead"""
    def send_email():
        try:
            # Configuración de email desde variables de entorno
            smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
            smtp_port = int(os.getenv('SMTP_PORT', '587'))
            email_user = os.getenv('EMAIL_USER')
            email_password = os.getenv('EMAIL_PASSWORD')
            notification_email = os.getenv('NOTIFICATION_EMAIL', 'leads@chapibot.pro')

            if not all([email_user, email_password]):
                logger.warning("⚠️ Configuración de email no encontrada")
                return

            # Crear mensaje
            msg = MimeMultipart()
            msg['From'] = email_user
            msg['To'] = notification_email
            msg['Subject'] = f"🔥 NUEVO LEAD CALIFICADO - {user_data.get('company_name', 'Sin nombre')}"

            # Contenido del email
            body = f"""
            🎉 NUEVO LEAD CAPTURADO - CHAPI ASSISTANT

            📊 INFORMACIÓN DEL LEAD:
            • Empresa: {user_data.get('company_name', 'No especificado')}
            • Contacto: {user_data.get('contact_name', 'No especificado')}
            • Teléfono: {user_data.get('phone', 'No especificado')}
            • Email: {user_data.get('email', 'No especificado')}
            • Sector: {user_data.get('sector', 'No especificado')}
            • Consultas diarias: {user_data.get('daily_queries', 'No especificado')}
            • Objetivo: {user_data.get('goal', 'No especificado')}

            💡 NIVEL DE INTERÉS: {user_data.get('interest_level', 'Alto')}

            🕐 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

            📋 PRÓXIMOS PASOS:
            • Contactar por WhatsApp al {user_data.get('phone', 'teléfono proporcionado')}
            • Mencionar "vengo del chat web"
            • Preparar demo personalizado para sector {user_data.get('sector', '')}
            """

            msg.attach(MimeText(body, 'plain'))

            # Enviar email
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()
            server.login(email_user, email_password)
            text = msg.as_string()
            server.sendmail(email_user, notification_email, text)
            server.quit()

            logger.info(f"✅ Notificación de lead enviada para {user_data.get('company_name')}")

        except Exception as e:
            logger.error(f"❌ Error enviando notificación de lead: {e}")

    background_tasks.add_task(send_email)

# ===========================================
# ENDPOINTS
# ===========================================

@app.get("/")
async def root():
    """Endpoint de estado"""
    return {
        "service": "CHAPI Assistant Backend",
        "version": "2.0.0",
        "status": "online",
        "features": ["programmed_flows", "openai_fallback", "lead_management"],
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/chat")
async def chat_endpoint(
    request: ChatRequest,
    http_request: Request,
    background_tasks: BackgroundTasks
):
    """
    Endpoint principal de chat con flujos programados + IA fallback
    """
    client_ip = get_client_ip(http_request)

    # Rate limiting básico
    if not rate_limiter.is_allowed(client_ip):
        raise HTTPException(
            status_code=429,
            detail="Demasiadas solicitudes. Intenta de nuevo en un minuto."
        )

    try:
        # Generar session_id si no existe
        session_id = request.session_id or str(uuid.uuid4())
        user_input = request.user_input or ""
        current_step = request.current_step or "welcome"
        user_data = request.user_data or {}

        # Log de la interacción
        logger.info(f"💬 Chat request - Session: {session_id[:8]}... Step: {current_step}")

        # Procesar con flujos programados primero
        if current_step and user_input:
            flow_response = flow_manager.process_user_input(current_step, user_input, user_data)

            if flow_response and flow_response.get('step_id') != 'fallback':
                # Guardar conversación
                lead_manager.save_conversation(
                    session_id,
                    current_step,
                    user_input,
                    flow_response['message'],
                    user_data
                )

                # Si es un paso de captura de lead, guardar lead
                if flow_response.get('step_id') in ['demo_request', 'demo_confirmation']:
                    user_data['interest_level'] = 'Alto'
                    lead_id = lead_manager.save_lead(session_id, user_data)
                    if lead_id:
                        await send_lead_notification(user_data, background_tasks)

                return {
                    "response": flow_response['message'],
                    "session_id": session_id,
                    "step_id": flow_response.get('step_id'),
                    "step_data": flow_response.get('step_data'),
                    "user_data": user_data,
                    "source": "programmed_flow",
                    "timestamp": datetime.now().isoformat()
                }

        # Si no hay match en flujos programados, usar IA como fallback
        if not rate_limiter.is_allowed(client_ip, is_ai_request=True):
            return {
                "response": "🤔 He recibido muchas consultas. Por favor, selecciona una opción específica o intenta en unos minutos.",
                "session_id": session_id,
                "source": "rate_limited",
                "timestamp": datetime.now().isoformat()
            }

        # Preparar mensajes para IA
        system_message = {
            "role": "system",
            "content": """Eres CHAPI, un asistente especialista en chatbots para negocios mexicanos.

            CONTEXTO DEL USUARIO:
            - Sector: {sector}
            - Consultas diarias: {daily_queries}
            - Objetivo: {goal}

            INSTRUCCIONES:
            1. Responde en español mexicano, amigable y profesional
            2. Enfócate en beneficios comerciales específicos
            3. Si preguntan precios, menciona: Básico $599, Premium $999, Ultra $1599 (mensual)
            4. Siempre busca agendar una demo o capturar datos de contacto
            5. Usa emojis y formato markdown para mejor experiencia
            6. Máximo 150 palabras por respuesta

            Si no sabes algo específico, redirige a: "¿Te gustaría agendar una demo personalizada?"
            """.format(
                sector=user_data.get('sector', 'no especificado'),
                daily_queries=user_data.get('daily_queries', 'no especificadas'),
                goal=user_data.get('goal', 'no especificado')
            )
        }

        # Convertir mensajes del request
        ai_messages = [system_message] + [
            {"role": msg.role, "content": msg.content}
            for msg in request.messages[-5:]  # Solo últimos 5 mensajes para contexto
        ]

        # Llamar a IA
        try:
            ai_response = await get_azure_answer(
                messages=ai_messages,
                max_tokens=200,
                temperature=0.3
            )

            if isinstance(ai_response, dict) and 'response' in ai_response:
                ai_response = ai_response['response']

            # Guardar conversación con IA
            lead_manager.save_conversation(
                session_id,
                "ai_fallback",
                user_input,
                ai_response,
                user_data
            )

            return {
                "response": ai_response,
                "session_id": session_id,
                "source": "ai_fallback",
                "user_data": user_data,
                "timestamp": datetime.now().isoformat()
            }

        except Exception as ai_error:
            logger.error(f"❌ Error en IA fallback: {ai_error}")

            # Fallback final
            fallback_message = """
            🤖 **¡Hola! Soy CHAPI, especialista en chatbots.**

            **¿En qué puedo ayudarte?**
            • 🍕 Chatbot para restaurante
            • 🛒 Bot para tienda online
            • 🏢 Asistente para servicios
            • 💰 Información de precios
            • 📞 Agendar demo personalizada

            📱 **Contacto directo:** +52 123 456 7890
            """

            return {
                "response": fallback_message,
                "session_id": session_id,
                "source": "static_fallback",
                "timestamp": datetime.now().isoformat()
            }

    except Exception as e:
        logger.error(f"❌ Error en chat endpoint: {e}")
        raise HTTPException(
            status_code=500,
            detail="Error interno del servidor. Por favor intenta de nuevo."
        )

@app.get("/api/health")
async def health_check():
    """Endpoint de health check"""
    try:
        # Verificar conexión a base de datos
        conn = sqlite3.connect(lead_manager.db_path)
        conn.close()

        # Verificar carga de flujos
        flows_loaded = len(flow_manager.flows) > 0

        return {
            "status": "healthy",
            "database": "connected",
            "flows": "loaded" if flows_loaded else "error",
            "flows_count": len(flow_manager.flows),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"❌ Health check failed: {e}")
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }

@app.get("/api/stats")
async def get_stats():
    """Endpoint para estadísticas básicas"""
    try:
        conn = sqlite3.connect(lead_manager.db_path)
        cursor = conn.cursor()

        # Contar leads
        cursor.execute("SELECT COUNT(*) FROM leads")
        total_leads = cursor.fetchone()[0]

        # Contar conversaciones hoy
        cursor.execute("""
            SELECT COUNT(*) FROM conversations
            WHERE date(timestamp) = date('now')
        """)
        conversations_today = cursor.fetchone()[0]

        # Sectores más populares
        cursor.execute("""
            SELECT sector, COUNT(*) as count
            FROM leads
            WHERE sector IS NOT NULL AND sector != ''
            GROUP BY sector
            ORDER BY count DESC
            LIMIT 5
        """)
        top_sectors = cursor.fetchall()

        conn.close()

        return {
            "total_leads": total_leads,
            "conversations_today": conversations_today,
            "top_sectors": [{"sector": s[0], "count": s[1]} for s in top_sectors],
            "timestamp": datetime.now().isoformat()
        }

    except Exception as e:
        logger.error(f"❌ Error getting stats: {e}")
        raise HTTPException(status_code=500, detail="Error obteniendo estadísticas")

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv('PORT', 8001))
    host = os.getenv('HOST', '0.0.0.0')

    logger.info(f"🚀 Iniciando CHAPI Assistant Backend en {host}:{port}")

    uvicorn.run(
        "chapi_proxy:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )
        now = datetime.now()
        cutoff = now - timedelta(minutes=self.window_minutes)

        # Limpiar requests antiguos
        client_requests = self.requests[client_ip]
        while client_requests and client_requests[0] < cutoff:
            client_requests.popleft()

        # Verificar límite
        if len(client_requests) >= self.max_requests:
            return False

        # Agregar request actual
        client_requests.append(now)
        return True

    def get_remaining(self, client_ip: str) -> int:
        """Obtiene requests restantes para la IP"""
        now = datetime.now()
        cutoff = now - timedelta(minutes=self.window_minutes)

        client_requests = self.requests[client_ip]
        # Contar requests válidos
        valid_requests = sum(1 for req_time in client_requests if req_time > cutoff)
        return max(0, self.max_requests - valid_requests)

# Instancia global del rate limiter
rate_limiter = RateLimiter(max_requests=60, window_minutes=1)

# Modelos Pydantic
class Message(BaseModel):
    role: str = Field(..., description="Rol del mensaje: 'user', 'assistant', o 'system'")
    content: str = Field(..., description="Contenido del mensaje")

    @validator('role')
    def validate_role(cls, v):
        allowed_roles = ['user', 'assistant', 'system']
        if v not in allowed_roles:
            raise ValueError(f'role debe ser uno de: {allowed_roles}')
        return v

    @validator('content')
    def validate_content(cls, v):
        if not v or not v.strip():
            raise ValueError('content no puede estar vacío')
        if len(v) > 4000:
            raise ValueError('content no puede exceder 4000 caracteres')
        return v.strip()

class ChatRequest(BaseModel):
    messages: List[Message] = Field(..., description="Lista de mensajes de la conversación")
    max_tokens: Optional[int] = Field(500, ge=1, le=1000, description="Máximo tokens en respuesta")
    temperature: Optional[float] = Field(0.2, ge=0.0, le=1.0, description="Creatividad de respuesta")

    @validator('messages')
    def validate_messages(cls, v):
        if not v:
            raise ValueError('messages no puede estar vacío')
        if len(v) > 20:
            raise ValueError('Máximo 20 mensajes por request')

        # Verificar que hay al menos un mensaje de usuario
        user_messages = [msg for msg in v if msg.role == 'user']
        if not user_messages:
            raise ValueError('Debe haber al menos un mensaje de usuario')

        return v

class ChatResponse(BaseModel):
    content: str
    usage: Dict[str, int] = {}
    model: str = "azure-openai"
    timestamp: str = ""

# Dependency para verificar rate limiting
async def check_rate_limit(request: Request):
    """Verifica rate limiting por IP"""
    client_ip = request.client.host

    if not rate_limiter.is_allowed(client_ip):
        remaining = rate_limiter.get_remaining(client_ip)
        logger.warning(f"Rate limit excedido para IP: {client_ip}")
        raise HTTPException(
            status_code=429,
            detail={
                "error": "Rate limit excedido",
                "message": "Demasiadas peticiones. Intenta de nuevo en un minuto.",
                "remaining": remaining,
                "reset_time": 60
            }
        )

    return client_ip

# Dependency para verificar configuración de Azure
async def get_azure_config():
    """Verifica que la configuración de Azure esté disponible"""
    try:
        config = AzureOpenAIConfig.from_env()
        return config
    except ValueError as e:
        logger.error(f"Error de configuración Azure OpenAI: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Configuración incorrecta",
                "message": "Servicio temporalmente no disponible"
            }
        )

# Endpoints
@app.get("/")
async def root():
    """Endpoint de salud"""
    return {
        "service": "CHAPI Azure OpenAI Proxy",
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    """Health check detallado"""
    try:
        # Verificar configuración
        config = AzureOpenAIConfig.from_env()
        config_status = "ok"
    except Exception as e:
        config_status = f"error: {e}"

    return {
        "status": "healthy" if config_status == "ok" else "degraded",
        "azure_config": config_status,
        "rate_limiter": "active",
        "cors_origins": ALLOWED_ORIGINS,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_completion(
    request: ChatRequest,
    client_ip: str = Depends(check_rate_limit),
    config: AzureOpenAIConfig = Depends(get_azure_config)
):
    """
    Endpoint principal para chat completions con Azure OpenAI
    """
    start_time = time.time()

    try:
        logger.info(f"Request de chat desde {client_ip}, {len(request.messages)} mensajes")

        # Convertir mensajes a formato dict
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]

        # Llamar a Azure OpenAI
        response_content = await get_azure_answer(
            messages=messages,
            max_tokens=request.max_tokens,
            temperature=request.temperature,
            config=config
        )

        response_time = time.time() - start_time
        logger.info(f"Respuesta exitosa en {response_time:.2f}s para IP {client_ip}")

        return ChatResponse(
            content=response_content,
            usage={"response_time_ms": int(response_time * 1000)},
            timestamp=datetime.now().isoformat()
        )

    except AzureOpenAIError as e:
        logger.error(f"Error Azure OpenAI para IP {client_ip}: {e}")
        raise HTTPException(
            status_code=502,
            detail={
                "error": "Error del servicio AI",
                "message": "No se pudo procesar tu solicitud. Intenta de nuevo.",
                "timestamp": datetime.now().isoformat()
            }
        )
    except Exception as e:
        logger.error(f"Error inesperado para IP {client_ip}: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Error interno",
                "message": "Error interno del servidor",
                "timestamp": datetime.now().isoformat()
            }
        )

@app.get("/api/rate-limit/{ip}")
async def get_rate_limit_status(ip: str, client_ip: str = Depends(check_rate_limit)):
    """Obtiene estado del rate limiting para debugging (solo para admins)"""
    # Solo permitir consulta de propia IP
    if ip != client_ip:
        raise HTTPException(status_code=403, detail="Solo puedes consultar tu propia IP")

    remaining = rate_limiter.get_remaining(ip)

    return {
        "ip": ip,
        "remaining_requests": remaining,
        "max_requests": rate_limiter.max_requests,
        "window_minutes": rate_limiter.window_minutes,
        "timestamp": datetime.now().isoformat()
    }

# Error handlers
@app.exception_handler(422)
async def validation_exception_handler(request: Request, exc):
    """Handler para errores de validación"""
    logger.warning(f"Error de validación desde {request.client.host}: {exc}")
    return JSONResponse(
        status_code=422,
        content={
            "error": "Datos inválidos",
            "message": "Por favor verifica los datos enviados",
            "details": exc.errors() if hasattr(exc, 'errors') else str(exc),
            "timestamp": datetime.now().isoformat()
        }
    )

@app.exception_handler(500)
async def internal_server_error_handler(request: Request, exc):
    """Handler para errores internos"""
    logger.error(f"Error interno desde {request.client.host}: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Error interno",
            "message": "Error interno del servidor",
            "timestamp": datetime.now().isoformat()
        }
    )

# Configuración para desarrollo
if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv('PORT', 8000))
    host = os.getenv('HOST', '0.0.0.0')

    logger.info(f"Iniciando CHAPI Proxy en {host}:{port}")
    logger.info(f"CORS origins: {ALLOWED_ORIGINS}")

    uvicorn.run(
        "chapi_proxy:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )
