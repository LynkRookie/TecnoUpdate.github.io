// Variable para llevar el control de la visibilidad de los lápices
let lapicesVisibles = false;

// Función para alternar la visibilidad de los lápices y los botones
function toggleLapices() {
    const secciones = ['datos-sobre-mi', 'intereses', 'habilidades-profesionales', 'redes-sociales', 'lenguajes-programacion'];

    secciones.forEach(id => {
        const div = document.getElementById(id);
        if (div) {
            const lapiz = document.getElementById(`lapiz-${id}`);
            const contenedorBotones = div.querySelector('div');

            if (!lapicesVisibles) {
                if (!lapiz) {
                    // Crear lápiz
                    const nuevoLapiz = document.createElement('i');
                    nuevoLapiz.classList.add('lapiz-icono', 'fa', 'fa-pencil');
                    nuevoLapiz.style.position = 'absolute';
                    nuevoLapiz.style.top = '0';
                    nuevoLapiz.style.right = '11px';
                    nuevoLapiz.style.cursor = 'pointer';
                    nuevoLapiz.id = `lapiz-${id}`;

                    // Evento para hacer el div editable
                    nuevoLapiz.addEventListener('click', () => {
                        div.setAttribute('contenteditable', 'true');
                        div.focus();
                    });

                    // Crear contenedor para los botones
                    const botonesContenedor = document.createElement('div');
                    botonesContenedor.style.textAlign = 'center';
                    botonesContenedor.style.position = 'sticky';
                    botonesContenedor.style.bottom = '-40px';
                    botonesContenedor.style.width = '100%';
                    botonesContenedor.style.marginTop = '10px'; // Espacio entre el contenido y los botones

                    // Crear botón Guardar
                    const btnGuardar = document.createElement('button');
                    btnGuardar.textContent = 'Guardar';
                    btnGuardar.style.padding = '10px';
                    btnGuardar.style.margin = '5px';
                    btnGuardar.style.border = 'none';
                    btnGuardar.style.backgroundColor = '#4CAF50'; // Color verde
                    btnGuardar.style.color = 'white';
                    btnGuardar.style.borderRadius = '5px'; // Esquinas redondeadas
                    btnGuardar.style.cursor = 'pointer';

                    btnGuardar.addEventListener('click', () => {
                        const contenido = div.innerHTML;
                        console.log(`Guardado en ${id}: ${contenido}`);
                        div.removeAttribute('contenteditable'); // Desactivar edición
                    });

                    // Crear botón Cancelar
                    const btnCancelar = document.createElement('button');
                    btnCancelar.textContent = 'Cancelar';
                    btnCancelar.style.padding = '10px';
                    btnCancelar.style.margin = '5px';
                    btnCancelar.style.border = 'none';
                    btnCancelar.style.backgroundColor = '#f44336'; // Color rojo
                    btnCancelar.style.color = 'white';
                    btnCancelar.style.borderRadius = '5px';
                    btnCancelar.style.cursor = 'pointer';

                    btnCancelar.addEventListener('click', () => {
                        div.removeAttribute('contenteditable'); // Desactivar edición
                        div.innerHTML = div.dataset.originalContent || div.innerHTML; // Reestablecer contenido original
                    });

                    // Crear botón Eliminar
                    const btnEliminar = document.createElement('button');
                    btnEliminar.textContent = 'Eliminar';
                    btnEliminar.style.padding = '10px';
                    btnEliminar.style.margin = '5px';
                    btnEliminar.style.border = 'none';
                    btnEliminar.style.backgroundColor = '#ff9800'; // Color naranja
                    btnEliminar.style.color = 'white';
                    btnEliminar.style.borderRadius = '5px';
                    btnEliminar.style.cursor = 'pointer';

                    btnEliminar.addEventListener('click', () => {
                        div.remove(); // Eliminar el div
                    });

                    // Añadir los botones al contenedor
                    botonesContenedor.appendChild(btnGuardar);
                    botonesContenedor.appendChild(btnCancelar);
                    botonesContenedor.appendChild(btnEliminar);

                    // Añadir el lápiz y el contenedor de botones al div
                    div.style.position = 'relative';
                    div.appendChild(nuevoLapiz);
                    div.appendChild(botonesContenedor);

                    // Guardar el contenido original para restablecer en Cancelar
                    div.dataset.originalContent = div.innerHTML;
                }
            } else {
                // Si los lápices están visibles, quitarlos
                if (lapiz) lapiz.remove();
                if (contenedorBotones) contenedorBotones.remove(); // Eliminar el contenedor de botones
                div.removeAttribute('contenteditable'); // Desactivar la edición
            }
        }
    });

    lapicesVisibles = !lapicesVisibles; // Cambiar el estado de visibilidad
}

// Escuchar el evento click en el botón de configuración
document.getElementById('configuracion-btn').addEventListener('click', toggleLapices);
