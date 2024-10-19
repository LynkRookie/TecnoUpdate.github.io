document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const toggleThemeBtn = document.getElementById('toggleTheme');
    const toggleSidebarBtn = document.getElementById('toggleSidebar');

    // Initialize Lucide icons
    lucide.createIcons();

    // Toggle dark mode
    toggleThemeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        toggleThemeBtn.innerHTML = `
            <i data-lucide="${isDarkMode ? 'sun' : 'moon'}"></i>
            <span>${isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
        `;
        lucide.createIcons();
    });

    // Toggle sidebar
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const isExpanded = !sidebar.classList.contains('collapsed');
        toggleSidebarBtn.innerHTML = `
            <i data-lucide="${isExpanded ? 'minimize' : 'maximize'}"></i>
            <span>${isExpanded ? 'Contraer' : 'Expandir'}</span>
        `;
        lucide.createIcons();
    });
});