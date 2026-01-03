async function getPrediccionesHoy() {
    try {
    const res = await fetch("TU_WEBHOOK_AQUI");
    const data = await res.json();
    console.log(data);

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
    const res = await fetch("TU_WEBHOOK_AQUI");
    const data = await res.json();
    console.log(data);

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
  const res = await fetch("TU_WEBHOOK_AQUI");
  const data = await res.json();
  console.log(data);
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
  { equipo: "Alhilal", porcentaje: "100%", proximoPartido: "31/12/2025"},
  { equipo: "Queretaro FC", porcentaje: "94%", proximoPartido: "11/01/2026" },
  { equipo: "FC Barcelona", porcentaje: "94%", proximoPartido: "03/01/2026" },
  { equipo: "FC Bayer Munich", porcentaje: "93%", proximoPartido: "11/01/2026" },
  { equipo: "Girona FC", porcentaje: "88%", proximoPartido: "04/01/2026" },
  { equipo: "Manchester City", porcentaje: "88%", proximoPartido: "10/01/2026" },
  { equipo: "Levante", porcentaje: "88%", proximoPartido: "04/01/2026" },
  { equipo: "Fortaleza", porcentaje: "87%", proximoPartido: "11/01/2026" },
  { equipo: "St Pauli", porcentaje: "86%", proximoPartido: "10/01/2026" },
  { equipo: "FC Inter (Italia)", porcentaje: "80%", proximoPartido: "04/01/2026" },
  ];

// Función para determinar el color según el porcentaje
function getColorByPercentage(percentage) {
  if (percentage >= 70) {
    return { bg: '#3b82f6', text: '#fff', bar: '#3b82f6' }; // Azul alto
  } else if (percentage >= 50) {
    return { bg: '#f59e0b', text: '#000', bar: '#f59e0b' }; // Naranja medio
  } else {
    return { bg: '#64748b', text: '#fff', bar: '#64748b' }; // Gris bajo
  }
}

// Función para crear el acordeón de equipos
function createTeamsAccordion() {
  const accordion = document.getElementById('teamsAccordion');
  
  if (!accordion) return;

  teamsStats.forEach((team, index) => {
    const percentageNum = parseInt(team.porcentaje);
    const colors = getColorByPercentage(percentageNum);
    
    const matchPreview = team.proximoPartido ? 
      `<span class="next-match-preview">${team.proximoPartido}</span>` : 
      '<span class="next-match-preview">Sin partido próximo</span>';

    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';
    accordionItem.innerHTML = `
      <div class="accordion-header">
        <div class="team-name">
          <i class="fa-solid fa-shield-halved" style="color: #3b82f6; margin-right: 8px;"></i>
          ${team.equipo}
        </div>
        ${matchPreview}
        <div class="team-percentage" style="background: ${colors.bg}; color: ${colors.text};">
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
                ${percentageNum >= 85 ? '<span style="color: #10b981;">🔥 Muy Alto</span>' : 
                  percentageNum >= 70 ? '<span style="color: #3b82f6;">✓ Alto</span>' : 
                  '<span style="color: #f59e0b;">⚠ Moderado</span>'}
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

  console.log(`Predictions (${tab}):`, predictions);

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
      const colors = getColorByPercentage(prediction.porcentaje);

      tableBody.innerHTML += `
        <tr>
          <td><strong>${prediction.hora}</strong></td>
          <td><span class="league-cell">${prediction.liga}</span></td>
          <td>${prediction.partido}</td>
          <td><strong>${prediction.racha}</strong></td>
          <td>
            <div class="percentage-bar-container">
              <div class="percentage-bar">
                <div class="percentage-fill"
                     style="width:${prediction.porcentaje}%; background:${colors.bar};">
                </div>
              </div>
              <span class="percentage-value"
                    style="background:${colors.bg}; color:${colors.text};">
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
    tab.addEventListener('click', function() {
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

  // === MENÚ HAMBURGUESA MÓVIL ===
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer click en un link (excepto dropdowns)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Si no es un dropdown toggle, cerrar el menú
        if (!this.classList.contains('dropdown-toggle')) {
          navMenu.classList.remove('active');
        }
      });
    });
    
    // Toggle para dropdowns en móvil
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (toggle) {
        toggle.addEventListener('click', function(e) {
          if (window.innerWidth <= 992) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            // Cerrar otros dropdowns
            dropdowns.forEach(otherDropdown => {
              if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('active');
              }
            });
          }
        });
      }
    });
    
    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
  }

  // Modal de apoyo
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("supportModal");
  const btn = document.getElementById("openSupportModal");
  const span = document.querySelector(".close");

  if (btn && modal && span) {
    btn.onclick = function(e) {
      e.preventDefault(); // evita que el link recargue la página
      modal.style.display = "flex";
    };

    span.onclick = function() {
      modal.style.display = "none";
    };

    window.onclick = function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  }
});