// Datos de Liga Argentina - Gol Primer Tiempo
/*const ligaArgentinaData = [
  {
    "equipo": "",
    "porcentaje": "",
    "proximoPartido": ""
  },
  {
    "equipo": "",
    "porcentaje": "",
    "proximoPartido": ""
  },
  {
    "equipo": "",
    "porcentaje": "",
    "proximoPartido": ""
  },
  {
    "equipo": "",
    "porcentaje": "",
    "proximoPartido": ""
  },
  {
    "equipo": "",
    "porcentaje": "",
    "proximoPartido": ""
  },
];*/

// Mientras no arranca el campeonato
const ligaArgentinaData = [];

// Función para determinar la clase de estado según el porcentaje
function getStatusClass(percentage) {
  if (percentage >= 85) return 'status-very-high';
  if (percentage >= 70) return 'status-high';
  if (percentage >= 50) return 'status-mid';
  return 'status-low';
}

// Cargar datos de la Liga Argentina
document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('ligaArgentinaTableBody');

  if (tableBody) {
    tableBody.innerHTML = "";

    ligaArgentinaData.forEach((team, index) => {
      const percentageNum = parseFloat(team.porcentaje.replace('%', ''));
      const statusClass = getStatusClass(percentageNum);

      const row = `
        <tr class="${statusClass}">
          <td><strong>${index + 1}</strong></td>
          <td>${team.equipo}</td>
          <td>${team.proximoPartido || 'Sin partido próximo'}</td>
          <td>
            <div class="percentage-bar-container">
              <div class="percentage-bar">
                <div class="percentage-fill" style="width:${percentageNum}%;"></div>
              </div>
              <span class="percentage-value">${team.porcentaje}</span>
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
    btn.onclick = function (e) {
      e.preventDefault();
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

  // El menú hamburguesa ahora es manejado por Bootstrap (data-bs-toggle="collapse")
});
