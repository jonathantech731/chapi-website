"""
Bot de Telegram CHAPI usando Azure OpenAI
Utiliza la función centralizada de chapi_azure_openai.py
"""

import os
import logging
import asyncio
from typing import Dict, List
from datetime import datetime

# Importaciones para Telegram (requiere python-telegram-bot)
try:
    from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
    from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackQueryHandler, ContextTypes
except ImportError:
    print("⚠️  python-telegram-bot no está instalado. Instalar con: pip install python-telegram-bot")
    exit(1)

from chapi_azure_openai import get_azure_answer, create_chapi_system_message, AzureOpenAIError

# Configurar logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class ChapiTelegramBot:
    def __init__(self):
        self.bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
        if not self.bot_token:
            raise ValueError("TELEGRAM_BOT_TOKEN no está configurado")
        
        self.application = Application.builder().token(self.bot_token).build()
        self.user_contexts = {}  # Almacenar contexto de conversaciones
        
        # Configurar handlers
        self.setup_handlers()
    
    def setup_handlers(self):
        """Configurar manejadores de comandos y mensajes"""
        # Comandos
        self.application.add_handler(CommandHandler("start", self.start_command))
        self.application.add_handler(CommandHandler("help", self.help_command))
        self.application.add_handler(CommandHandler("reset", self.reset_command))
        self.application.add_handler(CommandHandler("planes", self.planes_command))
        self.application.add_handler(CommandHandler("demo", self.demo_command))
        self.application.add_handler(CommandHandler("contacto", self.contacto_command))
        
        # Mensajes de texto
        self.application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message))
        
        # Callbacks de botones inline
        self.application.add_handler(CallbackQueryHandler(self.handle_callback))
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /start"""
        user_id = update.effective_user.id
        user_name = update.effective_user.first_name or "Usuario"
        
        # Resetear contexto
        self.user_contexts[user_id] = {"messages": []}
        
        welcome_message = f"""
¡Hola {user_name}! 👋

Soy **CHAPI**, tu asistente virtual especializado en chatbots inteligentes para empresas.

🚀 **¿En qué puedo ayudarte?**
• Crear flujos de ventas automáticos
• Mostrar planes y precios  
• Explicar nuestras integraciones
• Conectarte con nuestro equipo

**Comandos útiles:**
/planes - Ver precios y planes
/demo - Solicitar demostración
/contacto - Información de contacto
/help - Ayuda completa

¡Escríbeme cualquier pregunta sobre automatización con IA! 🤖
        """
        
        # Teclado inline con opciones rápidas
        keyboard = [
            [
                InlineKeyboardButton("💰 Ver Planes", callback_data="planes"),
                InlineKeyboardButton("🚀 Solicitar Demo", callback_data="demo")
            ],
            [
                InlineKeyboardButton("📱 Integraciones", callback_data="integraciones"),
                InlineKeyboardButton("📞 Contacto", callback_data="contacto")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(welcome_message, parse_mode='Markdown', reply_markup=reply_markup)
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /help"""
        help_text = """
🤖 **CHAPI - Ayuda Completa**

**Comandos disponibles:**
/start - Reiniciar conversación
/planes - Ver precios y planes
/demo - Solicitar demostración  
/contacto - Información de contacto
/reset - Limpiar historial de chat
/help - Esta ayuda

**¿Qué puedes preguntarme?**
• "¿Qué es CHAPI?"
• "¿Cuánto cuesta?"
• "¿Cómo funciona la IA?"
• "¿Qué integraciones tienen?"
• "Quiero automatizar mi negocio"

**Sobre CHAPI:**
🎯 Automatizamos ventas y soporte con IA
📱 WhatsApp, Telegram, Web Chat
🔗 +50 integraciones (CRM, pagos, calendarios)
📈 ROI promedio 400-800%
⏰ Soporte 24/7 en español

¡Pregúntame lo que necesites! 💪
        """
        
        await update.message.reply_text(help_text, parse_mode='Markdown')
    
    async def reset_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /reset"""
        user_id = update.effective_user.id
        self.user_contexts[user_id] = {"messages": []}
        
        await update.message.reply_text(
            "🔄 **Conversación reiniciada**\n\n"
            "El historial se ha limpiado. ¡Empecemos de nuevo!\n"
            "¿En qué puedo ayudarte?",
            parse_mode='Markdown'
        )
    
    async def planes_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /planes"""
        planes_text = """
💰 **PLANES CHAPI 2025**

🥉 **BÁSICO - $49 USD/mes**
• 1 canal de comunicación
• 50 leads/mes
• Plantillas básicas
• Soporte por email

🥈 **PROFESIONAL - $99 USD/mes** ⭐ *Más popular*
• 2 canales (WhatsApp + Web)
• 500 leads/mes
• IA avanzada personalizable
• CRM básico incluido
• Soporte prioritario

🥇 **EMPRESARIAL - $199 USD/mes**
• Canales ilimitados
• Leads ilimitados
• IA personalizada + memoria
• CRM completo + integraciones
• Manager dedicado
• SLA garantizado

**🎁 Oferta especial:** 30 días gratis en cualquier plan

¿Te interesa algún plan en particular?
        """
        
        keyboard = [
            [
                InlineKeyboardButton("🚀 Solicitar Demo", callback_data="demo"),
                InlineKeyboardButton("📞 Hablar con Ventas", callback_data="contacto")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(planes_text, parse_mode='Markdown', reply_markup=reply_markup)
    
    async def demo_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /demo"""
        demo_text = """
🚀 **DEMO PERSONALIZADA GRATIS**

**¿Qué incluye la demo?**
• ✅ Configuración personalizada para tu negocio
• ✅ Prueba en vivo con tus datos
• ✅ Integración con tu CRM/sistema actual
• ✅ Análisis de ROI proyectado
• ✅ Plan de implementación detallado

**Duración:** 30-45 minutos
**Modalidad:** Videollamada o presencial
**Costo:** Completamente GRATIS

**Para agendar necesitamos:**
• Nombre de tu empresa
• Tu industria/sector
• Número de empleados
• Principales retos actuales

¿Te gustaría agendar tu demo ahora?
        """
        
        keyboard = [
            [
                InlineKeyboardButton("📅 Agendar Demo", url="https://calendly.com/chapi-demo"),
                InlineKeyboardButton("📞 Llamar Ahora", callback_data="contacto")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(demo_text, parse_mode='Markdown', reply_markup=reply_markup)
    
    async def contacto_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Comando /contacto"""
        contacto_text = """
📞 **CONTACTO CHAPI**

**Ventas y Demos:**
• 📱 WhatsApp: +52 55 0000 0000
• 📧 Email: ventas@chapibot.pro
• 🌐 Web: https://chapibot.pro

**Soporte Técnico:**
• 📧 Email: soporte@chapibot.pro
• 💬 Chat: chapibot.pro/soporte
• ⏰ Horario: 24/7

**Oficinas:**
• 🏢 Ciudad de México, México
• 🇺🇸 Próximamente en Estados Unidos

**Síguenos:**
• 📘 Facebook: @ChapiBotPro
• 📸 Instagram: @chapibot.pro
• 💼 LinkedIn: /company/chapibot

¿Prefieres que te contactemos nosotros?
        """
        
        keyboard = [
            [
                InlineKeyboardButton("📱 WhatsApp", url="https://wa.me/5255000000"),
                InlineKeyboardButton("📧 Email", url="mailto:ventas@chapibot.pro")
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(contacto_text, parse_mode='Markdown', reply_markup=reply_markup)
    
    async def handle_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Manejar clicks en botones inline"""
        query = update.callback_query
        await query.answer()
        
        if query.data == "planes":
            await self.planes_command(update, context)
        elif query.data == "demo":
            await self.demo_command(update, context)
        elif query.data == "contacto":
            await self.contacto_command(update, context)
        elif query.data == "integraciones":
            await self.handle_integraciones(update, context)
    
    async def handle_integraciones(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Mostrar información de integraciones"""
        integraciones_text = """
🔗 **INTEGRACIONES CHAPI**

**💼 CRMs y Ventas:**
• HubSpot, Salesforce, Pipedrive
• Zoho, ActiveCampaign, Monday.com

**💳 Procesadores de Pago:**
• Stripe, MercadoPago, PayPal
• OpenPay, Conekta, Square

**📅 Calendarios:**
• Google Calendar, Calendly
• Microsoft Outlook, Acuity

**📊 Automatización:**
• n8n (recomendado)
• Make.com, Zapier
• API REST personalizada

**📱 Comunicación:**
• WhatsApp Business API
• Telegram Bot API
• Facebook Messenger
• Instagram DM

¿Con qué sistema necesitas integrar?
        """
        
        await update.effective_message.reply_text(integraciones_text, parse_mode='Markdown')
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Manejar mensajes de texto usando Azure OpenAI"""
        user_id = update.effective_user.id
        user_message = update.message.text
        
        # Obtener o crear contexto del usuario
        if user_id not in self.user_contexts:
            self.user_contexts[user_id] = {"messages": []}
        
        user_context = self.user_contexts[user_id]
        
        try:
            # Preparar mensajes para Azure OpenAI
            messages = [create_chapi_system_message()]
            
            # Agregar contexto previo (últimos 5 mensajes)
            messages.extend(user_context["messages"][-10:])
            
            # Agregar mensaje actual
            messages.append({"role": "user", "content": user_message})
            
            # Mostrar indicador de escritura
            await context.bot.send_chat_action(chat_id=update.effective_chat.id, action="typing")
            
            # Obtener respuesta de Azure OpenAI
            response = await get_azure_answer(
                messages=messages,
                max_tokens=400,
                temperature=0.3
            )
            
            # Guardar en contexto
            user_context["messages"].extend([
                {"role": "user", "content": user_message},
                {"role": "assistant", "content": response}
            ])
            
            # Limitar contexto a últimos 10 intercambios
            if len(user_context["messages"]) > 20:
                user_context["messages"] = user_context["messages"][-20:]
            
            # Enviar respuesta
            await update.message.reply_text(response, parse_mode='Markdown')
            
            logger.info(f"Respuesta AI enviada a usuario {user_id}")
            
        except AzureOpenAIError as e:
            logger.error(f"Error Azure OpenAI para usuario {user_id}: {e}")
            
            fallback_response = self.get_fallback_response(user_message.lower())
            await update.message.reply_text(
                f"🤖 {fallback_response}\n\n"
                "_(Sistema AI temporalmente no disponible)_",
                parse_mode='Markdown'
            )
            
        except Exception as e:
            logger.error(f"Error inesperado para usuario {user_id}: {e}")
            await update.message.reply_text(
                "❌ **Error temporal**\n\n"
                "Disculpa, hay un problema técnico. "
                "Por favor intenta de nuevo o usa /contacto para ayuda directa.",
                parse_mode='Markdown'
            )
    
    def get_fallback_response(self, message: str) -> str:
        """Respuestas de respaldo cuando Azure OpenAI no está disponible"""
        if any(word in message for word in ['precio', 'costo', 'plan', 'cuanto']):
            return ("💰 Nuestros planes inician desde $49 USD/mes. "
                   "Usa /planes para ver todos los detalles.")
        
        elif any(word in message for word in ['demo', 'prueba', 'test']):
            return ("🚀 ¡Perfecto! Ofrecemos demos gratuitas personalizadas. "
                   "Usa /demo para más información.")
        
        elif any(word in message for word in ['ia', 'inteligencia', 'gpt', 'ai']):
            return ("🧠 Usamos GPT-4 y Llama 3 para conversaciones naturales. "
                   "¿Te interesa conocer más sobre nuestras capacidades de IA?")
        
        elif any(word in message for word in ['integra', 'crm', 'api', 'conectar']):
            return ("🔗 CHAPI se integra con +50 sistemas incluyendo CRMs, pagos y calendarios. "
                   "¿Con qué sistema necesitas integrar?")
        
        elif any(word in message for word in ['contacto', 'humano', 'persona', 'ayuda']):
            return ("📞 Nuestro equipo está disponible 24/7. "
                   "Usa /contacto para todas las opciones de comunicación.")
        
        else:
            return ("¡Hola! Soy CHAPI, tu asistente para automatización con IA. "
                   "Usa /help para ver todo lo que puedo hacer por ti.")
    
    async def error_handler(self, update: object, context: ContextTypes.DEFAULT_TYPE):
        """Manejar errores del bot"""
        logger.error(f"Exception while handling an update: {context.error}")
    
    def run(self):
        """Ejecutar el bot"""
        # Agregar error handler
        self.application.add_error_handler(self.error_handler)
        
        logger.info("🤖 Iniciando CHAPI Telegram Bot...")
        logger.info(f"Bot configurado correctamente")
        
        # Iniciar el bot
        self.application.run_polling(allowed_updates=Update.ALL_TYPES)

def main():
    """Función principal"""
    try:
        bot = ChapiTelegramBot()
        bot.run()
    except ValueError as e:
        logger.error(f"Error de configuración: {e}")
        print("\n❌ Error de configuración:")
        print("   Asegúrate de configurar TELEGRAM_BOT_TOKEN en las variables de entorno")
    except KeyboardInterrupt:
        logger.info("Bot detenido por el usuario")
    except Exception as e:
        logger.error(f"Error inesperado: {e}")

if __name__ == "__main__":
    main()