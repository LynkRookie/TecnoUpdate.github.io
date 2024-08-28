/*
document.getElementById('sidebar-toggle').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('sidebar-icon');

    // Alternar clase 'show' para mostrar/ocultar el sidebar
    sidebar.classList.toggle('show');

    // Cambiar el icono en función del estado del sidebar
    if (sidebar.classList.contains('show')) {
        // Cambiar al icono para expandir
        icon.querySelector('path:nth-child(3)').setAttribute('d', 'm16 15-3-3 3-3');
        icon.querySelector('path:nth-child(2)').setAttribute('d', 'M9 3v18');
    } else {
            // Cambiar al icono para contraer
            icon.querySelector('path:nth-child(3)').setAttribute('d', 'M8 15l3-3-3-3');
            icon.querySelector('path:nth-child(2)').setAttribute('d', 'M14 3v18');
    }
});
*/
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const sidebarIcon = document.getElementById('sidebar-icon');
  
    sidebar.classList.toggle('expanded');
  
    if (sidebar.classList.contains('expanded')) {
      sidebarIcon.innerHTML = `
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M9 3v18"></path>
        <path d="M8 15l3-3-3-3"></path>
      `;
    } else {
      sidebarIcon.innerHTML = `
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M9 3v18"></path>
        <path d="m16 15-3-3 3-3"></path>
      `;
    }
  }
  