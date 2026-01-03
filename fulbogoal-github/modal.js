// Script para el modal de apoyo - Funciona en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById("supportModal");
  const btn = document.getElementById("openSupportModal");
  const span = document.querySelector(".close");

  // Verificar que los elementos existen antes de asignar eventos
  if (btn && modal && span) {
    // Abrir modal
    btn.onclick = function(e) {
      e.preventDefault();
      modal.style.display = "flex";
    };

    // Cerrar modal con la X
    span.onclick = function() {
      modal.style.display = "none";
    };

    // Cerrar modal al hacer clic fuera del contenido
    window.onclick = function(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  }
});
