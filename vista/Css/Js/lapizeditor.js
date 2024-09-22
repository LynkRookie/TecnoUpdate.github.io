// Variable para llevar el control de la visibilidad de los lápices
let lapicesVisibles = false;

// Función para alternar la visibilidad de los lápices y los botones
function toggleLapices() {
    const secciones = ['datos-sobre-mi', 'intereses', 'habilidades-profesionales', 'redes-sociales', 'lenguajes-programacion'];

    secciones.forEach(id => {
        const div = document.getElementById(id);
        if (div) {
            if (!lapicesVisibles) {
                // Crear lápiz
                const lapiz = document.createElement('i');
                lapiz.classList.add('lapiz-icono', 'fa', 'fa-pencil');
                lapiz.style.position = 'absolute';
                lapiz.style.top = '0';
                lapiz.style.right = '30px';
                lapiz.style.cursor = 'pointer';
                lapiz.id = `lapiz-${id}`;
                
                // Evento para hacer el div editable
                lapiz.addEventListener('click', () => {
                    div.setAttribute('contenteditable', 'true');
                    div.focus();
                });

                // Crear contenedor para los botones
                const contenedorBotones = document.createElement('div');
                contenedorBotones.style.textAlign = 'center';
                contenedorBotones.style.position = 'absolute';
                contenedorBotones.style.bottom = '10px';
                contenedorBotones.style.width = '100%';

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
                    // Aquí podrías hacer la lógica para guardar en la base de datos
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
                    // Limpiar el contenido si se desea
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
                contenedorBotones.appendChild(btnGuardar);
                contenedorBotones.appendChild(btnCancelar);
                contenedorBotones.appendChild(btnEliminar);

                // Añadir el lápiz y el contenedor de botones al div
                div.style.position = 'relative';
                div.appendChild(lapiz);
                div.appendChild(contenedorBotones);

                // Guardar el contenido original para restablecer en Cancelar
                div.dataset.originalContent = div.innerHTML;
            } else {
                // Si los lápices están visibles, quitarlos
                const lapizExistente = document.getElementById(`lapiz-${id}`);
                if (lapizExistente) lapizExistente.remove();
                div.querySelector('div').remove(); // Eliminar el contenedor de botones
                div.removeAttribute('contenteditable'); // Desactivar la edición
            }
        }
    });

    lapicesVisibles = !lapicesVisibles;
}

// Escuchar el evento click en el botón de configuración
document.getElementById('configuracion-btn').addEventListener('click', toggleLapices);
