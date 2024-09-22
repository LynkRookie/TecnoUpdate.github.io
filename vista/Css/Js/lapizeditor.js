// Variable para llevar el control de la visibilidad de los lápices
let lapicesVisibles = false;

// Función para alternar la visibilidad de los lápices
function toggleLapices() {
    // Lista de los ids de los divs donde se deben agregar o quitar los lápices
    const secciones = ['datos-sobre-mi', 'intereses', 'habilidades-profesionales', 'redes-sociales', 'lenguajes-programacion'];

    // Iterar sobre cada div
    secciones.forEach(id => {
        const div = document.getElementById(id);
        if (div) {
            if (!lapicesVisibles) {
                // Si los lápices no están visibles, agregarlos
                const lapiz = document.createElement('i');
                lapiz.classList.add('lapiz-icono', 'fa', 'fa-pencil'); // Agregar clases para el ícono (FontAwesome, por ejemplo)
                lapiz.style.position = 'absolute';
                lapiz.style.top = '0';
                lapiz.style.right = '0';
                lapiz.style.cursor = 'pointer';
                lapiz.id = `lapiz-${id}`; // Asignar un id único al lápiz

                // Hacer que el div sea editable al hacer clic en el lápiz
                lapiz.addEventListener('click', () => {
                    div.setAttribute('contenteditable', 'true');
                    div.focus(); // Poner el foco en el div para editar
                });

                // Añadir el lápiz al div
                div.style.position = 'relative'; // Para que el lápiz se ubique dentro del div
                div.appendChild(lapiz);
            } else {
                // Si los lápices están visibles, quitarlos
                const lapizExistente = document.getElementById(`lapiz-${id}`);
                if (lapizExistente) {
                    lapizExistente.remove();
                }
                div.removeAttribute('contenteditable'); // Desactivar la edición cuando se quitan los lápices
            }
        }
    });

    // Alternar el estado de visibilidad
    lapicesVisibles = !lapicesVisibles;
}

// Escuchar el evento click en el botón de configuración
document.getElementById('configuracion-btn').addEventListener('click', toggleLapices);

