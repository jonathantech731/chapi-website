# CHAPI Assistant - Comandos de Desarrollo
# Guía rápida de todos los comandos disponibles

## 🚀 CONFIGURACIÓN AUTOMÁTICA (RECOMENDADO)

### Scripts Automáticos
```powershell
# Configuración completa + diagnóstico + servidor
.\auto-setup.ps1 -StartServer

# Solo diagnóstico (sin iniciar servidor)
.\auto-setup.ps1

# Script batch simple (doble clic)
start-chapi.bat
```

## 📦 COMANDOS NPM

### Servidor de Desarrollo
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
