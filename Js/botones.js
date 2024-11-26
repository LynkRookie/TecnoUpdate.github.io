document.addEventListener("DOMContentLoaded", function () {
    const configBtn = document.getElementById("configBtn");
    const skillContainer = document.getElementById("skillContainer");
    const addSkillBtn = document.getElementById("addSkillBtn");

    // Muestra u oculta los botones de edición de las habilidades al hacer clic en Configuración
    configBtn.addEventListener("click", () => {
        const skills = document.querySelectorAll(".skill");
        skills.forEach(skill => {
            const editButtons = skill.querySelector(".edit-buttons");
            editButtons.style.display = editButtons.style.display === "none" ? "block" : "none";
        });

        // Crear y mostrar el botón "Agregar Habilidad" si no existe
        if (!addSkillBtn) {
            createAddSkillButton();
        }
        addSkillBtn.style.display = addSkillBtn.style.display === "none" ? "inline-block" : "none";
    });

    // Función para crear un nuevo botón "Agregar Habilidad"
    function createAddSkillButton() {
        const addSkillBtn = document.createElement("button");
        addSkillBtn.id = "addSkillBtn";
        addSkillBtn.textContent = "Agregar Habilidad";
        addSkillBtn.classList.add("btn-3");
        styleButton(addSkillBtn);
        configBtn.insertAdjacentElement('afterend', addSkillBtn);

        // Evento para agregar una nueva habilidad
        addSkillBtn.addEventListener("click", () => {
            createSkillElement();
        });
    }

    // Función para crear una nueva habilidad
    function createSkillElement() {
        const skillDiv = document.createElement("div");
        skillDiv.classList.add("skill");

        skillDiv.innerHTML = `
            <div class="skill-header">
                <span class="skill-title">Nueva Habilidad</span>
                <span class="percentage">0%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" style="width: 0%"></div>
            </div>
            <div class="edit-buttons" style="display: block;">
                <input type="text" class="edit-title" placeholder="Título de la habilidad">
                <input type="number" class="edit-percentage" placeholder="Porcentaje" min="0" max="100">
                <button class="save-btn">Guardar</button>
                <button class="delete-btn">Borrar Porcentaje</button>
            </div>
        `;
        skillContainer.appendChild(skillDiv);
        addSkillEventListeners(skillDiv);
    }

    // Función para agregar eventos de guardar y borrar en cada habilidad
    function addSkillEventListeners(skill) {
        const saveBtn = skill.querySelector(".save-btn");
        const deleteBtn = skill.querySelector(".delete-btn");
        const percentageSpan = skill.querySelector(".percentage");
        const skillProgress = skill.querySelector(".skill-progress");

        // Guardar cambios en la habilidad
        saveBtn.addEventListener("click", () => {
            const newTitle = skill.querySelector(".edit-title").value;
            const newPercentage = skill.querySelector(".edit-percentage").value;

            if (newTitle) {
                skill.querySelector(".skill-title").textContent = newTitle;
            }

            if (newPercentage && newPercentage >= 0 && newPercentage <= 100) {
                percentageSpan.textContent = `${newPercentage}%`;
                skillProgress.style.width = `${newPercentage}%`;
            } else {
                alert("El porcentaje debe ser entre 0 y 100.");
            }
        });

        // Borrar porcentaje y restablecer la habilidad
        deleteBtn.addEventListener("click", () => {
            percentageSpan.textContent = "0%";
            skillProgress.style.width = "0%";
            skill.querySelector(".edit-percentage").value = "";
        });
    }

    // Función para aplicar estilos a los botones
    function styleButton(button) {
        button.style.padding = '5px 10px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = '#2196F3';
        button.style.color = 'white';
    }

    // Eventos para editar y eliminar habilidades existentes
    const initialSkills = document.querySelectorAll(".skill");
    initialSkills.forEach(skill => addSkillEventListeners(skill));

    // Lógica para agregar una nueva habilidad con un botón adicional
    if (addSkillBtn) {
        addSkillBtn.addEventListener("click", () => {
            const newSkillDiv = document.createElement("div");
            newSkillDiv.classList.add("skill");

            const titleInput = document.createElement("input");
            titleInput.classList.add("edit-title");
            titleInput.placeholder = "Título de la habilidad";

            const percentageInput = document.createElement("input");
            percentageInput.classList.add("edit-percentage");
            percentageInput.type = "number";
            percentageInput.placeholder = "Porcentaje";

            const saveNewBtn = document.createElement("button");
            saveNewBtn.textContent = "Guardar Habilidad";
            saveNewBtn.classList.add("save-btn");

            const deleteNewBtn = document.createElement("button");
            deleteNewBtn.textContent = "Eliminar Habilidad";
            deleteNewBtn.classList.add("delete-btn");

            const editNewBtn = document.createElement("button");
            editNewBtn.textContent = "Editar";
            editNewBtn.classList.add("edit-btn");
            editNewBtn.style.display = "inline-block"; // Mostrar el botón de edición por defecto para nuevas habilidades

            const percentageSpan = document.createElement("span");
            percentageSpan.classList.add("percentage");
            percentageSpan.textContent = "0%";

            const skillProgress = document.createElement("div");
            skillProgress.classList.add("skill-progress");
            skillProgress.style.width = "0%";

            newSkillDiv.appendChild(titleInput);
            newSkillDiv.appendChild(percentageInput);
            newSkillDiv.appendChild(saveNewBtn);
            newSkillDiv.appendChild(deleteNewBtn);
            newSkillDiv.appendChild(editNewBtn);
            newSkillDiv.appendChild(percentageSpan);
            newSkillDiv.appendChild(skillProgress);
            skillContainer.appendChild(newSkillDiv);

            // Lógica para editar la nueva habilidad
            editNewBtn.addEventListener("click", () => {
                const newTitle = prompt("Editar título de habilidad:", titleInput.value);
                const newPercentage = prompt("Editar porcentaje:", parseInt(percentageSpan.textContent, 10));
                if (newTitle) {
                    titleInput.value = newTitle;
                }
                if (newPercentage && newPercentage >= 0 && newPercentage <= 100) {
                    percentageSpan.textContent = `${newPercentage}%`;
                    skillProgress.style.width = `${newPercentage}%`;
                } else {
                    alert("Porcentaje debe ser entre 0 y 100.");
                }
            });

            // Lógica para guardar la nueva habilidad
            saveNewBtn.addEventListener("click", () => {
                const newTitle = titleInput.value;
                const newPercentage = percentageInput.value;
                if (newTitle) {
                    titleInput.value = "";
                    percentageSpan.textContent = newTitle;
                }
                if (newPercentage && newPercentage >= 0 && newPercentage <= 100) {
                    percentageSpan.textContent = `${newPercentage}%`;
                    skillProgress.style.width = `${newPercentage}%`;
                } else {
                    alert("Porcentaje debe ser entre 0 y 100.");
                }
            });

            // Lógica para eliminar la nueva habilidad
            deleteNewBtn.addEventListener("click", () => {
                newSkillDiv.remove();
            });
        });
    }
});
