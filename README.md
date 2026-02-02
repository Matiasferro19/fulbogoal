# ⚽ FulboGoal - Predicciones de Gol Primer Tiempo

Sistema de análisis y predicción de partidos con alta probabilidad de gol en el primer tiempo.

## 🚀 Características

- 📊 Predicciones en tiempo real
- 🎯 Filtrado por probabilidad (70%+, 85%+)
- 📅 Vista de partidos: Ayer, Hoy y Mañana
- 📱 Diseño responsive
- 🔄 Sincronización automática con n8n

## 🛠️ Tecnologías

- HTML5, CSS3, JavaScript
- Bootstrap 5
- Font Awesome
- n8n (automatización)
- Vercel (deployment)

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/fulbogoal.git
cd fulbogoal
```

2. Configura los webhooks en `config.js`:
```javascript
const CONFIG = {
  webhooks: {
    hoy: 'TU_WEBHOOK_HOY',
    manana: 'TU_WEBHOOK_MANANA',
    ayer: 'TU_WEBHOOK_AYER'
  }
};
```

3. Si usas Vercel, configura las variables de entorno en `api/proxy.js`

4. Abre `index.html` en tu navegador

## 📁 Estructura del Proyecto

```
fulbogoal/
├── index.html              # Página principal
├── gol-primer-tiempo.html  # Estadísticas de equipos
├── liga-argentina.html     # Liga Argentina
├── primera-nacional.html   # Primera Nacional
├── styles.css              # Estilos
├── script.js               # Lógica principal
├── config.js               # Configuración de webhooks
├── api/
│   └── proxy.js           # Proxy para webhooks
└── imagenes/              # Assets
```

## 🔄 Workflow de n8n

El sistema usa webhooks de n8n para obtener predicciones. Configura tus webhooks en:
- `config.js` (para frontend)
- `api/proxy.js` (para Vercel)

## 🚀 Deploy en Vercel

1. Conecta tu repositorio con Vercel
2. Configura las variables de entorno si usas el proxy
3. Deploy automático

## 📝 Licencia

Este proyecto es de código abierto.

---

⚽ **FulboGoal** - Análisis inteligente de partidos
