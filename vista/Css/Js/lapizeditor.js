// Selecciona el icono de configuración
const configIcon = document.getElementById('config-icon');

// Divs donde se agregarán los lápices
const divs = [
    'datos-sobre-mi',
    'intereses',
    'habilidades-profesionales',
    'redes-sociales',
    'lenguajes-programacion'
];

// Función para crear los lápices en los divs
configIcon.addEventListener('click', () => {
    divs.forEach(divId => {
        const div = document.getElementById(divId);

        // Crear el ícono de lápiz
        const pencilIcon = document.createElement('i');
        pencilIcon.classList.add('fa', 'fa-pencil'); // Font Awesome icono de lápiz
        pencilIcon.style.position = 'absolute';
        pencilIcon.style.top = '10px';  // Ajusta la posición
        pencilIcon.style.right = '10px';
        pencilIcon.style.cursor = 'pointer';
        pencilIcon.style.fontSize = '20px';
        pencilIcon.title = 'Editar';

        // Hacer que el div sea editable al hacer clic en el lápiz
        pencilIcon.addEventListener('click', () => {
            div.contentEditable = true;  // Hacer el div editable
            div.style.border = '1px dashed #ccc';  // Agregar estilo visual para la edición
            div.focus();
        });

        // Agregar el ícono al div
        div.style.position = 'relative';  // Asegurarse de que el div tenga posición relativa
        div.appendChild(pencilIcon);
    });
});
