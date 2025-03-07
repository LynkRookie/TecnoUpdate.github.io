document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggleButton = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');

    sidebarToggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');

        // Cambiar el icono y el texto del botón según el estado del sidebar
        const spanText = sidebarToggleButton.querySelector('span');
        if (spanText) {
            spanText.textContent = sidebar.classList.contains('collapsed') ? 'Expandir' : 'Contraer';
        }
    });
});
