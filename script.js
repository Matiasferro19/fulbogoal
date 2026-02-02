// Importar configuración (si usas módulos ES6)
// Si no usas módulos, define CONFIG directamente aquí
// import CONFIG from './config.js';

// Si no usas módulos ES6, descomenta esto y borra el import:
// const CONFIG = { webhooks: { hoy: 'URL', manana: 'URL', ayer: 'URL' } };

async function getPrediccionesHoy() {
  try {
    const res = await fetch(CONFIG.webhooks.hoy);
    const data = await res.json();

    // ⚠️ eliminamos la fila de encabezado
    const filasValidas = data.filter(item => item.hora !== "Hora");

    return filasValidas.map(item => ({
      hora: item.hora,
      liga: item.liga,
      partido: item.partido,
      racha: item.racha,
      porcentaje: Math.round(Number(item.probabilidad) * 100)
    }));

  } catch (error) {
    console.error("Error cargando predicciones:", error);
    return [];
  }
}

async function getPrediccionesManana() {
  try {
    const res = await fetch(CONFIG.webhooks.manana);
    const data = await res.json();

    // ⚠️ eliminar fila de encabezado
    const filasValidas = data.filter(item => item.hora !== "Hora");

    return filasValidas.map(item => ({
      hora: item.hora,
      liga: item.liga,
      partido: item.partido,
      racha: item.racha,
      porcentaje: Math.round(Number(item.probabilidad) * 100)
    }));

  } catch (error) {
    console.error("Error cargando predicciones MAÑANA:", error);
    return [];
  }
}

async function getPrediccionesAyer() {
  const res = await fetch(CONFIG.webhooks.ayer);
  const data = await res.json();
  return data
    .filter(item => item.hora !== "Hora")
    .map(item => {
      // Convertir a string y comparar en mayúsculas para aceptar cualquier formato
      const aciertoStr = String(item.acierto).toUpperCase();
      return {
        hora: item.hora,
        liga: item.liga,
        partido: item.partido,
        acierto: aciertoStr === "TRUE"
      };
    });
}


/* Predicciones por día
const predictionsAyer = [
];

const predictionsHoy = [
  
];

const predictionsManana = [
  
];*/

let currentTab = 'hoy';

// Datos de equipos del CSV
const teamsStats = [
  { equipo: "Alhilal", porcentaje: "100%", proximoPartido: "05/02/2026" },
  { equipo: "PSV", porcentaje: "100%", proximoPartido: "08/02/2026" },
  { equipo: "Ajax ", porcentaje: "100%", proximoPartido: "08/02/2026" },
  { equipo: "FC Bayern Munich", porcentaje: "95%", proximoPartido: "08/02/2026" },
  { equipo: "Borussia Dortmund", porcentaje: "90%", proximoPartido: "07/02/2026" },
];

// Función para determinar clases según el porcentaje
function getStatusByPercentage(percentage) {
  if (percentage >= 85) return 'status-very-high';
  if (percentage >= 70) return 'status-high';
  if (percentage >= 50) return 'status-mid';
  return 'status-low';
}

// Función para crear el acordeón de equipos
function createTeamsAccordion() {
  const accordion = document.getElementById('teamsAccordion');

  if (!accordion) return;

  teamsStats.forEach((team, index) => {
    const percentageNum = parseInt(team.porcentaje);
    const statusClass = getStatusByPercentage(percentageNum);

    const matchPreview = team.proximoPartido ?
      `<span class="next-match-preview">${team.proximoPartido}</span>` :
      '<span class="next-match-preview">Sin partido próximo</span>';

    const accordionItem = document.createElement('div');
    accordionItem.className = `accordion-item ${statusClass}`;
    accordionItem.innerHTML = `
      <div class="accordion-header">
        <div class="team-name">
          <i class="fa-solid fa-shield-halved"></i>
          ${team.equipo}
        </div>
        ${matchPreview}
        <div class="team-percentage">
          ${team.porcentaje}
        </div>
        <i class="fa-solid fa-chevron-down accordion-icon"></i>
      </div>
      <div class="accordion-content">
        <div class="accordion-content-inner">
          <div class="match-info">
            <div class="info-card">
              <div class="info-label">Porcentaje Gol 1T</div>
              <div class="info-value">${team.porcentaje}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Próximo Partido</div>
              <div class="info-value ${!team.proximoPartido ? 'no-match' : ''}">
                ${team.proximoPartido || 'Por confirmar'}
              </div>
            </div>
            <div class="info-card">
              <div class="info-label">Estado</div>
              <div class="info-value">
                ${percentageNum >= 85 ? '🔥 Muy Alto' :
        percentageNum >= 70 ? '✓ Alto' :
          '⚠ Moderado'}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    accordion.appendChild(accordionItem);

    // Agregar evento click al header
    const header = accordionItem.querySelector('.accordion-header');
    const content = accordionItem.querySelector('.accordion-content');

    header.addEventListener('click', () => {
      const isActive = accordionItem.classList.contains('active');

      // Cerrar todos los items
      document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Si no estaba activo, abrirlo
      if (!isActive) {
        accordionItem.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

let lastPredictionsHoy = [];
let lastPredictionsManana = [];



// Función para cargar predicciones según el tab activo
async function loadPredictions(tab) {
  const tableBody = document.getElementById('predictionsTableBody');
  const tableHeader = document.getElementById('tableHeader');

  if (!tableBody || !tableHeader) return;

  tableBody.innerHTML = "";

  let predictions = [];

  // =========================
  // 🔹 CARGA + CACHE POR TAB
  // =========================
  if (tab === 'hoy') {
    const dataHoy = await getPrediccionesHoy();

    if (dataHoy.length > 0) {
      lastPredictionsHoy = dataHoy;
      predictions = dataHoy;
    } else {
      predictions = lastPredictionsHoy;
    }

  } else if (tab === 'manana') {
    const dataManana = await getPrediccionesManana();

    if (dataManana.length > 0) {
      lastPredictionsManana = dataManana;
      predictions = dataManana;
    } else {
      predictions = lastPredictionsManana;
    }

  } else if (tab === 'ayer') {
    const dataAyer = await getPrediccionesAyer();

    if (dataAyer.length > 0) {
      predictions = dataAyer;
    } else {
      predictions = [];
    }
  }

  // =========================
  // 🔹 TAB AYER
  // =========================
  if (tab === 'ayer') {
    tableHeader.innerHTML = `
      <tr>
        <th>Hora</th>
        <th>Liga</th>
        <th>Partidos</th>
        <th>Acierto</th>
      </tr>
    `;

    predictions.forEach(prediction => {
      const checkIcon = prediction.acierto
        ? '<i class="fa-solid fa-circle-check" style="color:#10b981; font-size:24px;"></i>'
        : '<i class="fa-solid fa-circle-xmark" style="color:#ef4444; font-size:24px;"></i>';

      tableBody.innerHTML += `
        <tr>
          <td><strong>${prediction.hora}</strong></td>
          <td><span class="league-cell">${prediction.liga}</span></td>
          <td>${prediction.partido}</td>
          <td style="text-align:center;">${checkIcon}</td>
        </tr>
      `;
    });

    // =========================
    // 🔹 TAB HOY / MAÑANA
    // =========================
  } else {
    tableHeader.innerHTML = `
      <tr>
        <th>Hora</th>
        <th>Liga</th>
        <th>Partidos</th>
        <th>Racha</th>
        <th>Probabilidad</th>
      </tr>
    `;

    predictions.forEach(prediction => {
      const statusClass = getStatusByPercentage(prediction.porcentaje);

      tableBody.innerHTML += `
        <tr class="${statusClass}">
          <td><strong>${prediction.hora}</strong></td>
          <td><span class="league-cell">${prediction.liga}</span></td>
          <td>${prediction.partido}</td>
          <td><strong>${prediction.racha}</strong></td>
          <td>
            <div class="percentage-bar-container">
              <div class="percentage-bar">
                <div class="percentage-fill" style="width:${prediction.porcentaje}%;"></div>
              </div>
              <span class="percentage-value">
                ${prediction.porcentaje}%
              </span>
            </div>
          </td>
        </tr>
      `;
    });
  }
}

// Esperar a que el DOM esté cargado

// Cargar predicciones iniciales
loadPredictions(currentTab);

// Agregar eventos a los tabs
const tabs = document.querySelectorAll('.date-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', function () {
    // Remover clase active de todos los tabs
    tabs.forEach(t => t.classList.remove('active'));

    // Agregar clase active al tab clickeado
    this.classList.add('active');

    // Obtener el tab seleccionado
    const selectedTab = this.getAttribute('data-tab');
    currentTab = selectedTab;

    // Cargar las predicciones correspondientes
    loadPredictions(selectedTab);
  });
});

// Código existente del tableBody eliminado ya que está en loadPredictions

// Crear acordeón de equipos
createTeamsAccordion();

// El menú hamburguesa y los dropdowns ahora son manejados por Bootstrap (data-bs-toggle="collapse")

// Modal de apoyo
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("supportModal");
  const btn = document.getElementById("openSupportModal");
  const span = document.querySelector(".close");

  if (btn && modal && span) {
    btn.onclick = function (e) {
      e.preventDefault(); // evita que el link recargue la página
      modal.style.display = "flex";
    };

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  }
});
