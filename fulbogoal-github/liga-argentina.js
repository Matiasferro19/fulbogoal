// Datos de Liga Argentina - Gol Primer Tiempo
const ligaArgentinaData = [
  {
    "equipo": "CA Tucuman",
    "porcentaje": "72%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Barracas Central",
    "porcentaje": "71%",
    "proximoPartido": ""
  },
  {
    "equipo": "Newell's Old Boys",
    "porcentaje": "69%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Aldosivi",
    "porcentaje": "69%",
    "proximoPartido": ""
  },
  {
    "equipo": "Godoy Cruz Antonio Tomba",
    "porcentaje": "66%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Huracán",
    "porcentaje": "64%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Unión de Santa Fe",
    "porcentaje": "64%",
    "proximoPartido": ""
  },
  {
    "equipo": "Gimnasia y Esgrima La Plata",
    "porcentaje": "63%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Banfield",
    "porcentaje": "63%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Belgrano de Córdoba",
    "porcentaje": "63%",
    "proximoPartido": ""
  },
  {
    "equipo": "Racing Club de Avellaneda",
    "porcentaje": "61%",
    "proximoPartido": ""
  },
  {
    "equipo": "Estudiantes de La Plata",
    "porcentaje": "61%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Rosario Central",
    "porcentaje": "60%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA River Plate",
    "porcentaje": "60%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Independiente",
    "porcentaje": "60%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Central Córdoba de Santiago del Estero",
    "porcentaje": "59%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Sarmiento",
    "porcentaje": "59%",
    "proximoPartido": ""
  },
  {
    "equipo": "Club Atlético Vélez Sarsfield",
    "porcentaje": "58%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Boca Juniors",
    "porcentaje": "54%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Tigre",
    "porcentaje": "54%",
    "proximoPartido": ""
  },
  {
    "equipo": "Argentinos Juniors",
    "porcentaje": "53%",
    "proximoPartido": ""
  },
  {
    "equipo": "CSD Defensa y Justicia",
    "porcentaje": "53%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Platense",
    "porcentaje": "53%",
    "proximoPartido": ""
  },
  {
    "equipo": "Instituto AC Córdoba",
    "porcentaje": "52%",
    "proximoPartido": ""
  },
  {
    "equipo": "CS Independiente Rivadavia",
    "porcentaje": "52%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Lanús",
    "porcentaje": "50%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Talleres de Córdoba",
    "porcentaje": "48%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA San Lorenzo de Almagro",
    "porcentaje": "47%",
    "proximoPartido": ""
  },
  {
    "equipo": "CD Riestra",
    "porcentaje": "41%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA San Martín de San Juan",
    "porcentaje": "38%",
    "proximoPartido": ""
  }
];

// Función para determinar el color según el porcentaje
function getColorByPercentage(percentage) {
  if (percentage >= 70) {
    return { bg: '#3b82f6', text: '#fff', bar: '#3b82f6' };
  } else if (percentage >= 50) {
    return { bg: '#f59e0b', text: '#000', bar: '#f59e0b' };
  } else {
    return { bg: '#64748b', text: '#fff', bar: '#64748b' };
  }
}

// Cargar datos de la Liga Argentina
document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.getElementById('ligaArgentinaTableBody');
  
  if (tableBody) {
    tableBody.innerHTML = "";
    
    ligaArgentinaData.forEach((team, index) => {
      const percentageNum = parseFloat(team.porcentaje.replace('%', ''));
      const colors = getColorByPercentage(percentageNum);
      
      const row = `
        <tr>
          <td><strong>${index + 1}</strong></td>
          <td>${team.equipo}</td>
          <td>${team.proximoPartido || 'Sin partido próximo'}</td>
          <td>
            <div class="percentage-bar-container">
              <div class="percentage-bar">
                <div class="percentage-fill" style="width:${percentageNum}%; background:${colors.bar};"></div>
              </div>
              <span class="percentage-value" style="background:${colors.bg}; color:${colors.text};">${team.porcentaje}</span>
            </div>
          </td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  }
  
  // Modal de apoyo
  const modal = document.getElementById("supportModal");
  const btn = document.getElementById("openSupportModal");
  const span = document.querySelector(".close");

  if (btn && modal && span) {
    btn.onclick = function(e) {
      e.preventDefault();
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

  // === MENÚ HAMBURGUESA MÓVIL ===
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        if (!this.classList.contains('dropdown-toggle')) {
          navMenu.classList.remove('active');
        }
      });
    });
    
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (toggle) {
        toggle.addEventListener('click', function(e) {
          if (window.innerWidth <= 992) {
            e.preventDefault();
            dropdown.classList.toggle('active');
            
            dropdowns.forEach(otherDropdown => {
              if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('active');
              }
            });
          }
        });
      }
    });
    
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
  }
});
