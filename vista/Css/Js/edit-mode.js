document.addEventListener('DOMContentLoaded', () => {
    const configButton = document.querySelector('.sidebar-footer button:nth-child(2)');
    const sidebar = document.querySelector('.sidebar');
    let editMode = false;
    let previousContent = '';

    // Función para activar el modo de edición
    function activateEditMode() {
        editMode = true;
        document.body.classList.add('edit-mode');
        document.querySelectorAll('.editable').forEach(el => {
            el.contentEditable = true;
            el.classList.add('editing');
        });
        document.getElementById('saveButton').style.display = 'inline-block';
        document.getElementById('addSkillButton').style.display = 'inline-block';
        toggleEditableElements(true);
    }

    // Función para desactivar el modo de edición
    function deactivateEditMode() {
        editMode = false;
        document.body.classList.remove('edit-mode');
        document.querySelectorAll('.editable').forEach(el => {
            el.contentEditable = false;
            el.classList.remove('editing');
        });
        document.getElementById('saveButton').style.display = 'none';
        document.getElementById('addSkillButton').style.display = 'none';
        toggleEditableElements(false);
    }

    // Función para guardar los cambios
    function saveChanges() {
        const data = {
            name: document.getElementById('userName').textContent,
            title: document.getElementById('userTitle').textContent,
            about: document.getElementById('userAbout').textContent,
            skills: []
        };

        document.querySelectorAll('.skill').forEach(skill => {
            data.skills.push({
                name: skill.querySelector('.skill-name').textContent,
                percentage: skill.querySelector('.skill-percentage').textContent
            });
        });

        // Enviar datos al servidor
        fetch('save_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showNotification('Datos guardados correctamente');
                deactivateEditMode();
            } else {
                showNotification('Error al guardar los datos');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            showNotification('Error al guardar los datos');
        });
    }

    // Función para agregar una nueva habilidad
    function addSkill() {
        const skillsContainer = document.getElementById('skillsContainer');
        const newSkill = document.createElement('div');
        newSkill.className = 'skill';
        newSkill.innerHTML = `
            <span class="skill-name editable" contenteditable="true">Nueva Habilidad</span>
            <span class="skill-percentage editable" contenteditable="true">0%</span>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%"></div>
            </div>
            <button class="delete-skill">Eliminar</button>
        `;
        skillsContainer.appendChild(newSkill);

        // Agregar evento para eliminar la habilidad
        newSkill.querySelector('.delete-skill').addEventListener('click', function() {
            newSkill.remove();
        });
    }

    function toggleEditMode(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (!editMode) {
            activateEditMode();
            configButton.querySelector('span').textContent = 'Salir de Configuración';
        } else {
            const shouldExit = confirm('¿Estás seguro de que deseas salir de configuración?');
            if (shouldExit) {
                deactivateEditMode();
                configButton.querySelector('span').textContent = 'Configuración';
            }
        }
    }

    function toggleEditableElements(enable = true) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (enable) {
                addEditControls(card);
            } else {
                removeEditControls(card);
            }
        });
    }

    function addEditControls(element) {
        if (element.querySelector('.edit-controls')) return;

        const controls = document.createElement('div');
        controls.classList.add('edit-controls');
        controls.style.position = 'absolute';
        controls.style.bottom = '10px';
        controls.style.left = '10px';
        controls.style.right = '10px';
        controls.style.display = 'flex';
        controls.style.justifyContent = 'center';
        controls.style.gap = '10px';

        const editButton = createButton('edit-2', 'Editar', () => {
            enterEdit(element);
            controls.remove();
        });
        controls.appendChild(editButton);

        element.style.position = 'relative';
        element.style.paddingBottom = '50px';
        element.appendChild(controls);
        lucide.createIcons();
    }

    function enterEdit(element) {
        previousContent = element.innerHTML;
        const titleTextArea = document.createElement('textarea');
        const currentTitle = element.querySelector('h2') ? element.querySelector('h2').textContent : '';
        titleTextArea.value = currentTitle;
        titleTextArea.placeholder = 'Título';
        titleTextArea.style.width = '100%';
        titleTextArea.style.height = '40px';
        titleTextArea.style.padding = '10px';
        titleTextArea.style.marginBottom = '10px';

        const contentTextArea = document.createElement('textarea');
        const currentContent = element.querySelector('p') ? element.querySelector('p').textContent : '';
        contentTextArea.value = currentContent;
        contentTextArea.style.width = '100%';
        contentTextArea.style.height = '200px';
        contentTextArea.style.padding = '10px';
        contentTextArea.style.marginBottom = '10px';

        element.innerHTML = '';
        element.appendChild(titleTextArea);
        element.appendChild(contentTextArea);
        titleTextArea.focus();

        const saveButton = createButton('save', 'Guardar', () => {
            saveContent(element, titleTextArea.value, contentTextArea.value);
        });
        const deleteButton = createButton('trash-2', 'Borrar Sección', () => deleteElement(element));
        const exitButton = createButton('x-circle', 'Salir de Edición', () => exitEditMode(element));

        const controlsContainer = document.createElement('div');
        controlsContainer.classList.add('edit-controls');
        controlsContainer.style.display = 'flex';
        controlsContainer.style.gap = '10px';
        controlsContainer.appendChild(saveButton);
        controlsContainer.appendChild(deleteButton);
        controlsContainer.appendChild(exitButton);

        element.appendChild(controlsContainer);
        lucide.createIcons();
    }

    function saveContent(element, newTitle, newContent) {
        if (newTitle.trim() !== '' && newContent.trim() !== '') {
            element.innerHTML = `<h2>${newTitle}</h2><p>${newContent}</p>`;
            showNotification('Los datos se han guardado correctamente en la base de datos');
            removeEditControls(element);
            addEditControls(element);
        } else {
            showNotification('Por favor, complete todos los campos antes de guardar.');
        }
    }

    function exitEditMode(element) {
        const shouldExit = confirm('¿No desea guardar los cambios?');
        if (shouldExit) {
            element.innerHTML = previousContent;
            removeEditControls(element);
            addEditControls(element);
        }
    }

    function createButton(icon, text, clickHandler) {
        const button = document.createElement('button');
        button.innerHTML = `<i data-lucide="${icon}"></i> ${text}`;
        button.addEventListener('click', clickHandler);
        button.style.padding = '5px 10px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = icon === 'save' ? '#4CAF50' : icon === 'trash-2' ? '#f44336' : '#2196F3';
        button.style.color = 'white';
        return button;
    }

    function deleteElement(element) {
        if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
            element.remove();
            showNotification('Los datos se han eliminado correctamente de la base de datos');
        }
    }

    function removeEditControls(element) {
        const controls = element.querySelector('.edit-controls');
        if (controls) {
            controls.remove();
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#333';
        notification.style.color = 'white';
        notification.style.padding = '10px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }

    // Event Listeners
    configButton.addEventListener('click', toggleEditMode);
    document.getElementById('saveButton').addEventListener('click', saveChanges);
    document.getElementById('addSkillButton').addEventListener('click', addSkill);
    document.getElementById('logout-button').addEventListener('click', function(e) {
        e.preventDefault();
        fetch('logout.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'login.html';
            } else {
                showNotification('Error al cerrar sesión');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('Error al cerrar sesión');
        });
    });

    // Inicialización
    deactivateEditMode();
});