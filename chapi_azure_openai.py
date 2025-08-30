"""
Módulo centralizado para integración con Azure OpenAI
Proporciona funciones reutilizables para el bot de Telegram y la aplicación web
"""

import os
import logging
import asyncio
import aiohttp
from typing import List, Dict, Optional, Union
from dataclasses import dataclass

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class AzureOpenAIConfig:
    """Configuración para Azure OpenAI"""
    endpoint: str
    deployment: str
    api_key: str
    api_version: str = "2023-05-15"
    
    @classmethod
    def from_env(cls) -> 'AzureOpenAIConfig':
        """Crear configuración desde variables de entorno"""
        endpoint = os.getenv('AZURE_OPENAI_ENDPOINT')
        deployment = os.getenv('AZURE_OPENAI_DEPLOYMENT')
        api_key = os.getenv('AZURE_OPENAI_KEY')
        
        if not all([endpoint, deployment, api_key]):
            missing = []
            if not endpoint: missing.append('AZURE_OPENAI_ENDPOINT')
            if not deployment: missing.append('AZURE_OPENAI_DEPLOYMENT')
            if not api_key: missing.append('AZURE_OPENAI_KEY')
            raise ValueError(f"Faltan variables de entorno: {', '.join(missing)}")
        
        return cls(endpoint=endpoint, deployment=deployment, api_key=api_key)

class AzureOpenAIError(Exception):
    """Excepción personalizada para errores de Azure OpenAI"""
    pass

async def get_azure_answer(
    messages: List[Dict[str, str]], 
    max_tokens: int = 500, 
    temperature: float = 0.2,
    config: Optional[AzureOpenAIConfig] = None
) -> Union[str, Dict]:
    """
    Obtiene respuesta de Azure OpenAI
    
    Args:
        messages: Lista de mensajes en formato [{"role": "user", "content": "texto"}]
        max_tokens: Máximo número de tokens en la respuesta
        temperature: Creatividad de la respuesta (0.0-1.0)
        config: Configuración de Azure OpenAI (si no se proporciona, se usa desde env vars)
    
    Returns:
        str: Texto de respuesta
        
    Raises:
        AzureOpenAIError: Si hay error en la llamada a Azure
        ValueError: Si la configuración es inválida
    """
    
    if config is None:
        try:
            config = AzureOpenAIConfig.from_env()
        except ValueError as e:
            logger.error(f"Error de configuración: {e}")
            raise AzureOpenAIError(f"Error de configuración: {e}")
    
    # Validar mensajes
    if not messages or not isinstance(messages, list):
        raise ValueError("messages debe ser una lista no vacía")
    
    for msg in messages:
        if not isinstance(msg, dict) or 'role' not in msg or 'content' not in msg:
            raise ValueError("Cada mensaje debe tener 'role' y 'content'")
    
    # Construir URL
    url = f"{config.endpoint}openai/deployments/{config.deployment}/chat/completions"
    
    # Headers
    headers = {
        'Content-Type': 'application/json',
        'api-key': config.api_key
    }
    
    # Payload
    payload = {
        'messages': messages,
        'max_tokens': max_tokens,
        'temperature': temperature
    }
    
    try:
        timeout = aiohttp.ClientTimeout(total=30)  # 30 segundos timeout
        
        async with aiohttp.ClientSession(timeout=timeout) as session:
            async with session.post(
                url, 
                json=payload, 
                headers=headers,
                params={'api-version': config.api_version}
            ) as response:
                
                response_data = await response.json()
                
                if response.status != 200:
                    error_msg = response_data.get('error', {}).get('message', 'Error desconocido')
                    logger.error(f"Error de Azure OpenAI ({response.status}): {error_msg}")
                    raise AzureOpenAIError(f"Error de Azure OpenAI: {error_msg}")
                
                # Extraer respuesta
                choices = response_data.get('choices', [])
                if not choices:
                    raise AzureOpenAIError("No se recibieron respuestas de Azure OpenAI")
                
                content = choices[0].get('message', {}).get('content', '')
                if not content:
                    raise AzureOpenAIError("Respuesta vacía de Azure OpenAI")
                
                logger.info(f"Respuesta exitosa de Azure OpenAI ({len(content)} chars)")
                return content.strip()
                
    except asyncio.TimeoutError:
        logger.error("Timeout al llamar Azure OpenAI")
        raise AzureOpenAIError("Timeout al conectar con Azure OpenAI")
    except aiohttp.ClientError as e:
        logger.error(f"Error de conexión: {e}")
        raise AzureOpenAIError(f"Error de conexión: {e}")
    except Exception as e:
        logger.error(f"Error inesperado: {e}")
        raise AzureOpenAIError(f"Error inesperado: {e}")

def get_azure_answer_sync(
    messages: List[Dict[str, str]], 
    max_tokens: int = 500, 
    temperature: float = 0.2,
    config: Optional[AzureOpenAIConfig] = None
) -> str:
    """
    Versión sincrónica de get_azure_answer para uso en contextos no asyncrónicos
    """
    try:
        loop = asyncio.get_event_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
    
    return loop.run_until_complete(
        get_azure_answer(messages, max_tokens, temperature, config)
    )

# Función de conveniencia para crear mensaje del sistema CHAPI
def create_chapi_system_message() -> Dict[str, str]:
    """Crea el mensaje del sistema estándar para CHAPI"""
    return {
        "role": "system",
        "content": """Eres CHAPI, un asistente virtual especializado en chatbots inteligentes para empresas. Tu empresa ofrece soluciones de automatización de ventas y soporte al cliente con IA.

Características de CHAPI:
- Chatbots con GPT-4 y Llama 3
- Integración con WhatsApp, Telegram, web chat
- Planes desde $49 USD/mes
- Integración con CRMs, pagos, calendarios
- ROI promedio 400-800%
- Soporte 24/7 en español

Responde de manera amigable, profesional y enfocada en ayudar al cliente a entender cómo CHAPI puede resolver sus necesidades específicas. Mantén las respuestas concisas (máximo 2-3 oraciones)."""
    }

# Ejemplo de uso
if __name__ == "__main__":
    # Test básico (requiere variables de entorno configuradas)
    import asyncio
    
    async def test_azure_openai():
        messages = [
            create_chapi_system_message(),
            {"role": "user", "content": "¿Qué es CHAPI?"}
        ]
        
        try:
            response = await get_azure_answer(messages)
            print(f"Respuesta: {response}")
        except Exception as e:
            print(f"Error: {e}")
    
    # asyncio.run(test_azure_openai())
    print("Módulo chapi_azure_openai cargado correctamente")