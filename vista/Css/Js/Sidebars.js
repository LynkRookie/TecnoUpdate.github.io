function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  const sidebarIcon = document.getElementById('sidebar-icon');

  sidebar.classList.toggle('expanded');
  mainContent.classList.toggle('expanded-main');

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

function toggleTheme() {
  const body = document.body;
  body.classList.toggle('theme-light');
  body.classList.toggle('theme-dark');
}
