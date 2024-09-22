// Función para agregar lápices a los divs indicados
function agregarLapices() {
    // Lista de los ids de los divs donde se deben agregar los lápices
    const secciones = ['datos-sobre-mi', 'intereses', 'habilidades-profesionales', 'redes-sociales', 'lenguajes-programacion'];

    // Iterar sobre cada div y agregar el ícono de lápiz
    secciones.forEach(id => {
        const div = document.getElementById(id);
        if (div) {
            // Crear el icono de lápiz
            const lapiz = document.createElement('i');
            lapiz.classList.add('lapiz-icono', 'fa', 'fa-pencil'); // Agregar clases para el ícono (FontAwesome, por ejemplo)
            lapiz.style.position = 'absolute';
            lapiz.style.top = '0';
            lapiz.style.right = '0';
            lapiz.style.cursor = 'pointer';

            // Hacer que el div sea editable al hacer clic en el lápiz
            lapiz.addEventListener('click', () => {
                div.setAttribute('contenteditable', 'true');
                div.focus(); // Poner el foco en el div para editar
            });

            // Añadir el lápiz al div
            div.style.position = 'relative'; // Para que el lápiz se ubique dentro del div
            div.appendChild(lapiz);
        }
    });
}

// Escuchar el evento click en el botón de configuración
document.getElementById('configuracion-btn').addEventListener('click', agregarLapices);
