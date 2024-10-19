document.addEventListener("DOMContentLoaded", function () {
    const configBtn = document.getElementById("configBtn");
    const skills = document.querySelectorAll(".skill");

    configBtn.addEventListener("click", () => {
        skills.forEach(skill => {
            const editButtons = skill.querySelector(".edit-buttons");
            editButtons.style.display = editButtons.style.display === "none" ? "block" : "none";
        });
    });

    skills.forEach(skill => {
        const saveBtn = skill.querySelector(".save-btn");
        const deleteBtn = skill.querySelector(".delete-btn");
        const percentageSpan = skill.querySelector(".percentage");
        const skillProgress = skill.querySelector(".skill-progress");
        
        saveBtn.addEventListener("click", () => {
            const newTitle = skill.querySelector(".edit-title").value;
            const newPercentage = skill.querySelector(".edit-percentage").value;

            if (newTitle) {
                skill.querySelector("span:first-child").textContent = newTitle;
            }

            if (newPercentage && newPercentage >= 0 && newPercentage <= 100) {
                percentageSpan.textContent = `${newPercentage}%`;
                skillProgress.style.width = `${newPercentage}%`;
            } else {
                alert("Porcentaje debe ser entre 0 y 100.");
            }
        });

        deleteBtn.addEventListener("click", () => {
            percentageSpan.textContent = "0%";
            skillProgress.style.width = "0%";
            skill.querySelector(".edit-percentage").value = "";
        });
    });

    // Nueva funcionalidad para agregar habilidades
    const addSkillBtn = document.getElementById("addSkillBtn");
    addSkillBtn.addEventListener("click", () => {
        const skillContainer = document.getElementById("skillContainer"); // Asegúrate de que este div existe en tu HTML
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
        styleButton(saveNewBtn);

        const deleteNewBtn = document.createElement("button");
        deleteNewBtn.textContent = "Eliminar Habilidad";
        deleteNewBtn.classList.add("delete-btn");
        styleButton(deleteNewBtn);

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
        newSkillDiv.appendChild(percentageSpan);
        newSkillDiv.appendChild(skillProgress);
        skillContainer.appendChild(newSkillDiv);

        // Lógica para guardar la nueva habilidad
        saveNewBtn.addEventListener("click", () => {
            const newTitle = titleInput.value;
            const newPercentage = percentageInput.value;

            if (newTitle) {
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

    // Función para aplicar estilos a los botones
    function styleButton(button) {
        button.style.padding = '5px 10px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = '#2196F3'; // Cambia esto si deseas un color diferente
        button.style.color = 'white';
    }
});
