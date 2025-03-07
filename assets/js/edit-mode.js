document.addEventListener('DOMContentLoaded', () => {
    const configButton = document.querySelector('.sidebar-footer button:nth-child(2)');
    const sidebar = document.querySelector('.sidebar');
    let editMode = false;
    let previousContent = '';
    function toggleEditMode(event) {
        
        event.preventDefault();
        event.stopPropagation();
        
        editMode = !editMode;
        document.body.classList.toggle('edit-mode', editMode);
        
        const buttonText = configButton.querySelector('span');
        if (buttonText) {
            buttonText.textContent = editMode ? 'Salir de Configuración' : 'Configuración';
        }

        if (editMode) {
            toggleEditableElements(true);
        } else {
            Swal.fire({
                title: "¿Estás seguro de salir de la configuración?",
                text: "Los cambios no guardados se perderán.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, salir",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    toggleEditableElements(false);
                } else {
                    editMode = true;
                    document.body.classList.add('edit-mode');
                    buttonText.textContent = 'Salir de Configuración';
                }
            });
        }
    }
    function toggleEditableElements(enable = true) {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            if (enable) {
                addEditControls(card);
                const textArea = card.querySelector('textarea');
                if (textArea) {
                    textArea.removeAttribute('readonly'); // Permitir edición
                    textArea.contentEditable = "true"; // Hacerlo editable
                }
            } else {
                removeEditControls(card);
                const titleElement = card.querySelector('h2');
                const contentElement = card.querySelector('p');
                if (titleElement && contentElement) {
                    titleElement.contentEditable = false; // Desactivar edición
                    contentElement.contentEditable = false; // Desactivar edición
                }
            }
        });
    }
    configButton.addEventListener('click', toggleEditMode);

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
    function saveChanges(){
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
            Swal.fire({
                title: "¿Estás seguro de guardar?",
                text: "Esta acción guardará los cambios realizados.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, guardar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    element.innerHTML = `<h2>${newTitle}</h2><p>${newContent}</p>`;
                    Swal.fire({
                        title: "Guardado",
                        text: "Los datos se han guardado correctamente en la base de datos",
                        icon: "success"
                    });
                    removeEditControls(element);
                    addEditControls(element);
                }
            });
        } else {
            Swal.fire({
                title: "Error",
                text: "Por favor, complete todos los campos antes de guardar.",
                icon: "error"
            });
        }
    }

    function exitEditMode(element) {
        Swal.fire({
            title: "¿Estás seguro de salir de la edición?",
            text: "Los cambios no guardados se perderán.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                element.innerHTML = previousContent;
                removeEditControls(element);
                addEditControls(element);
            }
        });
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
        Swal.fire({
            title: "¿Estás seguro de eliminar?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                element.remove();
                Swal.fire({
                    title: "Eliminado",
                    text: "Los datos se han eliminado correctamente de la base de datos",
                    icon: "success"
                });
            }
        });
    }


    function removeEditControls(element) {
        const controls = element.querySelector('.edit-controls');
        if (controls) {
            controls.remove();
        }
    }

    function showNotification(message, icon = 'info') {
        Swal.fire({
            title: message,
            icon: icon,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });
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

document.addEventListener("DOMContentLoaded", function () {
    const configBtn = document.getElementById("configBtn");
    const skills = document.querySelectorAll(".skill");
    const skillsContainer = document.querySelector('.skills');

    // Crear el botón "Agregar Habilidad" dinámicamente
    const addSkillBtn = document.createElement("button");
    addSkillBtn.textContent = "Agregar Habilidad";
    addSkillBtn.classList.add("btn-3", "add-skill-btn");
    addSkillBtn.style.display = "none";

    configBtn.addEventListener("click", () => {
        const isEditMode = configBtn.classList.toggle("edit-mode");
        skills.forEach(skill => {
            const editButtons = skill.querySelector(".edit-buttons");
            editButtons.style.display = isEditMode ? "block" : "none";
        });
        addSkillBtn.style.display = isEditMode ? "inline-block" : "none";
    });

    skills.forEach(skill => {
        addSkillEventListeners(skill);
        // Añadir el botón "Agregar Habilidad" después de cada conjunto de botones de edición
        const editButtons = skill.querySelector(".edit-buttons");
        editButtons.appendChild(addSkillBtn.cloneNode(true));
    });

    // Funcionalidad para agregar habilidades
    skillsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-skill-btn")) {
            const newSkillDiv = createSkillElement();
            event.target.closest(".skill").insertAdjacentElement('afterend', newSkillDiv);
            addSkillEventListeners(newSkillDiv);
        }
    });

    function createSkillElement() {
        const newSkillDiv = document.createElement("div");
        newSkillDiv.classList.add("skill");
        newSkillDiv.innerHTML = `
            <div class="skill-header">
                <span class="new-skill-title">Nuevo Título</span>
                <span class="percentage">0%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%"></div>
            </div>
            <div class="edit-buttons" style="display: block;">
                <input type="text" class="edit-title" placeholder="Nuevo Título">
                <input type="number" class="edit-percentage" placeholder="Nuevo Porcentaje">
                <button class="save-btn">Guardar</button>
                <button class="delete-btn">Borrar Porcentaje</button>
                <button class="btn-3 add-skill-btn">Agregar Habilidad</button>
            </div>
        `;
        return newSkillDiv;
    }

    function addSkillEventListeners(skill) {
        const saveBtn = skill.querySelector(".save-btn");
        const deleteBtn = skill.querySelector(".delete-btn");
        const percentageSpan = skill.querySelector(".percentage");
        const skillProgress = skill.querySelector(".skill-progress");
        const titleSpan = skill.querySelector(".new-skill-title");

        saveBtn.addEventListener("click", () => {
            const newTitle = skill.querySelector(".edit-title").value;
            const newPercentage = skill.querySelector(".edit-percentage").value;

            if (newTitle) {
                titleSpan.textContent = newTitle;
            }

            if (newPercentage && newPercentage >= 0 && newPercentage <= 100) {
                percentageSpan.textContent = `${newPercentage}%`;
                skillProgress.style.width = `${newPercentage}%`;
            } else {
                alert("Porcentaje debe ser entre 0 y 100.");
            }
        });

        deleteBtn.addEventListener("click", () => {
            if (confirm("¿Estás seguro de que quieres eliminar esta habilidad?")) {
                skill.remove();
            } else {
                percentageSpan.textContent = "0%";
                skillProgress.style.width = "0%";
                skill.querySelector(".edit-percentage").value = "";
            }
        });
    }

    // Función para aplicar estilos a los botones (si es necesario)
    function styleButton(button) {
        button.style.display='inline';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = '#2196F3';
        button.style.color = 'white';
    }

    // Aplicar estilos a todos los botones de "Agregar Habilidad"
    document.querySelectorAll('.add-skill-btn').forEach(styleButton);
});