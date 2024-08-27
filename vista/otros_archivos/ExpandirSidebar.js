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
