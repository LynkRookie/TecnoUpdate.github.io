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