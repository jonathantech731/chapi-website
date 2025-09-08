"""
Servidor web simple para servir el frontend de CHAPI
"""
import http.server
import socketserver
import os
import sys
from pathlib import Path

# Configuración
PORT = 3000
DIRECTORY = "."

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Habilitar CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

def main():
    print(f"═══════════════════════════════════════")
    print(f"  CHAPI Frontend Server")
    print(f"═══════════════════════════════════════")
    print(f"  📂 Directorio: {os.getcwd()}")
    print(f"  🌐 Puerto: {PORT}")
    print(f"  🔗 URL: http://localhost:{PORT}")
    print(f"═══════════════════════════════════════")
    print()

    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ Servidor iniciado en http://localhost:{PORT}")
            print(f"📱 Abre tu navegador y ve a: http://localhost:{PORT}")
            print(f"🛑 Presiona Ctrl+C para detener el servidor")
            print()
            httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n🛑 Servidor detenido por el usuario")
    except OSError as e:
        if e.errno == 10048:  # Puerto en uso
            print(f"❌ ERROR: El puerto {PORT} ya está en uso")
            print(f"   Cierra otros servidores o cambia el puerto")
        else:
            print(f"❌ ERROR: {e}")
    except Exception as e:
        print(f"❌ ERROR inesperado: {e}")

if __name__ == "__main__":
    main()
