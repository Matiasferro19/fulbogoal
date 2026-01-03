// Datos de Primera Nacional - Gol Primer Tiempo
const primeraNacionalData = [
  {
    "equipo": "Arsenal de Sarandi",
    "porcentaje": "85%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Racing de Cordoba",
    "porcentaje": "71%",
    "proximoPartido": ""
  },
  {
    "equipo": "San Martin de Tucuman",
    "porcentaje": "66%",
    "proximoPartido": ""
  },
  {
    "equipo": "Maipu",
    "porcentaje": "63%",
    "proximoPartido": ""
  },
  {
    "equipo": "Nueva Chicago",
    "porcentaje": "62%",
    "proximoPartido": ""
  },
  {
    "equipo": "Estudiantes de Rio Cuarto",
    "porcentaje": "61%",
    "proximoPartido": ""
  },
  {
    "equipo": "San Miguel",
    "porcentaje": "60%",
    "proximoPartido": ""
  },
  {
    "equipo": "Atletico Guemes Sgo del Estero",
    "porcentaje": "60%",
    "proximoPartido": ""
  },
  {
    "equipo": "Patronato",
    "porcentaje": "60%",
    "proximoPartido": ""
  },
  {
    "equipo": "Social Y Deportivo Madryn",
    "porcentaje": "59%",
    "proximoPartido": ""
  },
  {
    "equipo": "Estudiantes de Caseros",
    "porcentaje": "59%",
    "proximoPartido": ""
  },
  {
    "equipo": "Almirante Brown",
    "porcentaje": "59%",
    "proximoPartido": ""
  },
  {
    "equipo": "San Telmo",
    "porcentaje": "59%",
    "proximoPartido": ""
  },
  {
    "equipo": "Crucero del Norte",
    "porcentaje": "59%",
    "proximoPartido": ""
  },
  {
    "equipo": "Chacarita Juniors",
    "porcentaje": "59%",
    "proximoPartido": ""
  },
  {
    "equipo": "Talleres Remedio de Escalada",
    "porcentaje": "59%",
    "proximoPartido": ""
  },
  {
    "equipo": "Almagro",
    "porcentaje": "56%",
    "proximoPartido": ""
  },
  {
    "equipo": "Atletico Mitre",
    "porcentaje": "56%",
    "proximoPartido": ""
  },
  {
    "equipo": "Colegiales",
    "porcentaje": "55%",
    "proximoPartido": ""
  },
  {
    "equipo": "Gimnasia Y Tiro",
    "porcentaje": "54%",
    "proximoPartido": ""
  },
  {
    "equipo": "Agropecuario",
    "porcentaje": "54%",
    "proximoPartido": ""
  },
  {
    "equipo": "Gimnasia y Esgrima Mendoza",
    "porcentaje": "54%",
    "proximoPartido": ""
  },
  {
    "equipo": "Chaco For Ever",
    "porcentaje": "54%",
    "proximoPartido": ""
  },
  {
    "equipo": "Los Andes",
    "porcentaje": "53%",
    "proximoPartido": ""
  },
  {
    "equipo": "Ferro Carril Oeste",
    "porcentaje": "53%",
    "proximoPartido": ""
  },
  {
    "equipo": "Colón de Santa Fe",
    "porcentaje": "53%",
    "proximoPartido": ""
  },
  {
    "equipo": "Alvarado Mar del Plata",
    "porcentaje": "53%",
    "proximoPartido": ""
  },
  {
    "equipo": "Gimnasia y Esgrima de Jujuy ",
    "porcentaje": "50%",
    "proximoPartido": ""
  },
  {
    "equipo": "Quilmes AC",
    "porcentaje": "50%",
    "proximoPartido": ""
  },
  {
    "equipo": "CD Morón",
    "porcentaje": "49%",
    "proximoPartido": ""
  },
  {
    "equipo": "CSyD Tristán Suárez",
    "porcentaje": "49%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Defensores de Belgrano",
    "porcentaje": "47%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA All Boys",
    "porcentaje": "47%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Defensores Unidos  ",
    "porcentaje": "47%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Temperley",
    "porcentaje": "43%",
    "proximoPartido": ""
  },
  {
    "equipo": "CA Atlanta",
    "porcentaje": "42%",
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

// Cargar datos de Primera Nacional
document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.getElementById('primeraNacionalTableBody');
  
  if (tableBody) {
    tableBody.innerHTML = "";
    
    primeraNacionalData.forEach((team, index) => {
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
