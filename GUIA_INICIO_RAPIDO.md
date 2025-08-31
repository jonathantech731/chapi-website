# 🚀 GUÍA DE INICIO RÁPIDO - CHAPI Assistant

## ✅ Verificaciones Previas

1. **Verificar archivos principales:**
   - ✅ `.env` (creado con tu API key)
   - ✅ `simple_openai_server.py` (backend)
   - ✅ `frontend_server.py` (frontend)
   - ✅ `index.html` (página principal)

2. **Verificar entorno Python:**
   - ✅ Entorno virtual creado en `.venv`
   - ✅ Dependencias instaladas

## 🛠️ OPCIÓN 1: Inicio Automático

### Ejecuta el script completo:
```batch
iniciar-completo.bat
```

## 🔧 OPCIÓN 2: Inicio Manual (Recomendado)

### Paso 1: Abrir Terminal de Backend
```powershell
# Abrir PowerShell/CMD en d:\chapi-website
cd d:\chapi-website

# Iniciar servidor backend
.venv\Scripts\python.exe simple_openai_server.py
```

### Paso 2: Abrir Segundo Terminal para Frontend
```powershell
# Abrir OTRO PowerShell/CMD en d:\chapi-website
cd d:\chapi-website

# Iniciar servidor frontend
.venv\Scripts\python.exe frontend_server.py
```

## 🌐 Acceso al Sistema

1. **Backend API**: http://localhost:8000
   - Endpoint: `/api/chat`
   - Documentación: http://localhost:8000/docs

2. **Frontend Web**: http://localhost:3000
   - Página principal con widget de chat

## 🧪 Prueba del Asistente

1. Abre tu navegador en: **http://localhost:3000**
2. Busca el widget de chat (esquina inferior derecha)
3. Haz clic en el ícono de chat
4. Escribe un mensaje de prueba
5. ¡Debería responder usando OpenAI!

## 🔍 Solución de Problemas

### Error: Puerto 8000 en uso
```powershell
# Encontrar proceso usando el puerto
netstat -ano | findstr :8000

# Terminar proceso (reemplaza PID)
taskkill /PID [PID] /F
```

### Error: Puerto 3000 en uso
```powershell
# Cambiar puerto en frontend_server.py
# Línea: PORT = 3001  # Cambiar a otro puerto
```

### Error: OpenAI API Key
- Verificar que el archivo `.env` contiene tu API key correcta
- Verificar que la API key tiene créditos disponibles

### Error: CORS
- Los servidores ya están configurados para permitir CORS
- Si persiste, usar: http://localhost:3000 (no 127.0.0.1)

## 📋 Logs y Debugging

### Ver logs del backend:
- El servidor backend muestra logs en tiempo real
- Errores de API aparecerán allí

### Ver logs del frontend:
- Abre DevTools en el navegador (F12)
- Ve a Console para ver logs de JavaScript

## 🎯 Flujo Completo Esperado

1. ✅ Backend iniciado en puerto 8000
2. ✅ Frontend iniciado en puerto 3000
3. ✅ Widget de chat visible en la página
4. ✅ Mensajes se envían al backend
5. ✅ Backend conecta con OpenAI
6. ✅ Respuestas aparecen en el chat

## 📞 Comandos Útiles

```powershell
# Verificar puertos en uso
netstat -an | findstr "8000\|3000"

# Verificar procesos Python
tasklist | findstr python

# Terminar todos los procesos Python
taskkill /f /im python.exe
```

---

**¡Listo para usar! 🎉**

Si todo funciona correctamente, deberías ver el asistente CHAPI respondiendo con OpenAI en tu navegador.
