# 🚀 COMANDOS RÁPIDOS - CHAPI ASSISTANT

## ⚡ INICIO SÚPER RÁPIDO

```powershell
# Opción 1: Comando directo (Recomendado)
.\start-chapi-integrated.ps1

# Opción 2: Con npm
npm run chapi
```

**¡Eso es todo!** Se abre automáticamente en tu navegador con el asistente funcionando.

---

## 🛠️ COMANDOS PRINCIPALES

### 🔧 Primera Configuración
```powershell
# Solo necesario la primera vez
.\configurar-seguridad.ps1
# O también:
npm run config
```

### 🚀 Iniciar Sistema Completo
```powershell
# Inicia backend + frontend automáticamente
.\start-chapi-integrated.ps1
# O también:
npm run chapi
```

### 🔍 Verificar Sistema
```powershell
# Validar que todo esté correcto
.\validacion-final.ps1
# O también:
npm run validate
```

### 📊 Ver Resumen Completo
```powershell
# Mostrar todo lo implementado
.\verificacion-completa.ps1
# O también:
npm run verify
```

---

## 🌐 URLs IMPORTANTES

| URL | Descripción | Cuándo Usar |
|-----|-------------|-------------|
| `http://localhost:3000` | **Landing page con asistente** | Siempre - Tu página principal |
| `http://localhost:8000/health` | Estado del backend | Para verificar que el backend funciona |
| `http://localhost:8000/docs` | Documentación API | Para desarrolladores |
| `http://localhost:8000/stats` | Estadísticas de uso | Para ver métricas |

---

## � COMANDOS ALTERNATIVOS

### Solo Frontend (sin asistente AI)
```powershell
npm run dev
# Abre solo la landing page en puerto 3000
```

### Solo Backend
```powershell
python chapi_proxy.py
# Inicia solo el backend en puerto 8000
```

### Instalar Dependencias
```powershell
npm install
pip install -r requirements.txt
```

---

## 🚨 COMANDOS DE EMERGENCIA

### Rotar API Key Comprometida
```powershell
.\emergencia-rotar-clave.bat
```

### Reconfigurar Todo
```powershell
.\configurar-seguridad.ps1
```

### Cerrar Todo
```powershell
# Ctrl+C en las ventanas de terminal abiertas
# O cerrar las ventanas directamente
```

---

## 🎯 FLUJO DE TRABAJO TÍPICO

### Primera Vez:
```powershell
1. .\configurar-seguridad.ps1    # Configurar Azure OpenAI
2. .\start-chapi-integrated.ps1  # Iniciar sistema
3. Abrir http://localhost:3000   # Probar asistente
```

### Uso Diario:
```powershell
1. .\start-chapi-integrated.ps1  # Solo este comando
```

### Personalización:
```powershell
1. Editar flows.yaml            # Cambiar conversaciones
2. Editar chapi-config.js       # Modificar respuestas
3. .\start-chapi-integrated.ps1 # Reiniciar para ver cambios
```

---

## 📚 ARCHIVOS IMPORTANTES

| Archivo | Para Qué | Cuándo Editar |
|---------|----------|---------------|
| `flows.yaml` | Flujos conversacionales | Personalizar conversaciones |
| `chapi-config.js` | Respuestas específicas | Cambiar respuestas por sector |
| `.env` | Configuración API keys | Solo si cambias claves |
| `index.html` | Landing page | Solo para diseño web |

---

## 💡 TIPS ÚTILES

### ✅ Comando Más Usado
```powershell
.\start-chapi-integrated.ps1
```
*Este comando hace todo automáticamente*

### ✅ Para Personalizar Rápido
1. Edita `flows.yaml` para cambiar conversaciones
2. Edita `chapi-config.js` para respuestas específicas
3. Reinicia con `.\start-chapi-integrated.ps1`

### ✅ Para Ver Logs
El script de inicio muestra logs en tiempo real de:
- ✅ Backend FastAPI
- ✅ Servidor web
- ✅ Estado de conexiones
- ✅ Errores si los hay

### ✅ Para Parar el Sistema
- Simplemente cierra las ventanas de terminal
- O presiona `Ctrl+C` en cada ventana

---

## 🎉 ¡LISTO PARA USAR!

**Tu asistente CHAPI está completamente implementado.**

👉 **Ejecuta ahora:** `.\start-chapi-integrated.ps1`

🌐 **Abre tu navegador en:** `http://localhost:3000`

💬 **Prueba el asistente** haciendo clic en el widget flotante

---

*¿Necesitas ayuda? Lee `docs/CHAPI_ASSISTANT_INTEGRATION.md` para la guía completa.*
```powershell
npm run dev          # Live-server en puerto 3000
npm run dev-alt      # Servidor Python alternativo
npm run start        # Alias de 'dev'
npm run preview      # Alias de 'dev'
```

### Testing
```powershell
npm run test         # Test básico en puerto 3001
npm run test-pro     # Test PRO en puerto 3002
```

### Utilidades
```powershell
npm run debug        # Diagnóstico del entorno
npm run diagnose     # Verificar Node.js y dependencias
npm run setup        # Instalar dependencias
npm run clean        # Limpiar node_modules
npm run build        # Mensaje de build completo
```

## 🐍 SERVIDORES ALTERNATIVOS

### Python (Backup)
```powershell
python simple-server.py          # Servidor personalizado
python -m http.server 3000       # Servidor HTTP simple
```

### Node.js Directo
```powershell
npx live-server --port=3000 --host=localhost --open=index.html --cors
npx http-server -p 3000 -c-1
```

## 🔧 SOLUCIÓN DE PROBLEMAS

### Errores Comunes
```powershell
# Error: Puerto en uso
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Error: Node.js no encontrado
# Descargar desde: https://nodejs.org/

# Error: Dependencias corruptas
npm cache clean --force
rm -rf node_modules
npm install

# Error: PowerShell execution policy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🌐 URLs DE DESARROLLO

```
http://localhost:3000/                    # Sitio principal
http://localhost:3000/index.html          # Página principal
http://localhost:3000/test-assistant.html # Test básico
http://localhost:3000/test-chapi-pro.html # Test PRO
```

## 📁 ARCHIVOS IMPORTANTES

```
D:\chapi-website\
├── auto-setup.ps1              # ⭐ Script principal de configuración
├── start-chapi.bat             # ⭐ Script batch simple
├── debug-environment.ps1       # Script de diagnóstico original
├── simple-server.py            # ⭐ Servidor Python alternativo
├── package.json                # ⭐ Configuración npm
├── index.html                  # Sitio principal
├── test-assistant.html         # Test básico
├── test-chapi-pro.html         # Test PRO
└── assets/js/chapi-config.js   # ⭐ Configuración del asistente
```

## 🎯 FLUJO RECOMENDADO

1. **Configuración inicial (una sola vez):**
   ```powershell
   cd D:\chapi-website
   .\auto-setup.ps1
   ```

2. **Desarrollo diario:**
   ```powershell
   cd D:\chapi-website
   .\auto-setup.ps1 -StartServer
   # O simplemente: npm run dev
   ```

3. **Si hay problemas:**
   ```powershell
   .\auto-setup.ps1          # Diagnóstico completo
   npm run clean             # Limpiar dependencias
   npm run setup             # Reinstalar dependencias
   ```

4. **Testing:**
   ```powershell
   npm run test              # Test básico
   npm run test-pro          # Test avanzado
   ```

## ✅ VERIFICACIÓN RÁPIDA

```powershell
# Verificar que todo funciona
node --version               # Debe mostrar v14+
npm --version               # Debe mostrar versión
npm list live-server        # Debe estar instalado
curl http://localhost:3000  # Debe responder (si servidor está activo)
```

---

💡 **TIP:** Los scripts automáticos (auto-setup.ps1, start-chapi.bat) manejan todos los errores comunes automáticamente. Úsalos primero antes de comandos manuales.

🚀 **PARA COPILOT:** Simplemente pide a Copilot que ejecute `.\auto-setup.ps1 -StartServer` y manejará todo automáticamente.
