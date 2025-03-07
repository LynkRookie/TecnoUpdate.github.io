document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('chat-modal');
    const modalContent = modal.querySelector('.modal-content');
    const btn = document.getElementById('help-button');
    const span = document.getElementsByClassName('close')[0];
    const chatMessages = document.getElementById('chat-messages');
    const questionButtons = document.getElementById('question-buttons');
    const aiThemeToggle = document.getElementById('ai-theme-toggle');

    const faqData = [
        {
            question: "¿Cómo puedo editar mi perfil?",
            answer: "Para editar tu perfil, haz clic en el botón 'Configuración' en la barra lateral. Esto activará el modo de edición, permitiéndote modificar el contenido de las diferentes secciones de tu CV."
        },
        {
            question: "¿Cómo añado una nueva habilidad?",
            answer: "Para añadir una nueva habilidad, ve a la sección 'Lenguajes de Programación Adquiridos' y haz clic en el botón 'Agregar Nueva Habilidad'. Ingresa el nombre de la habilidad y el porcentaje de dominio, luego haz clic en 'Guardar'."
        },
        {
            question: "¿Puedo cambiar el tema del chat?",
            answer: "Sí, puedes cambiar entre el tema claro y oscuro haciendo clic en el botón con el icono de sol/luna en la parte superior del chat de asistencia."
        },
        {
            question: "¿Cómo puedo contactar al soporte?",
            answer: "Para contactar al soporte, puedes utilizar el botón de WhatsApp que se encuentra en la esquina inferior derecha de la página. Esto te llevará directamente a un chat con nuestro equipo de soporte."
        },
        {
            question: "¿Es posible exportar mi CV?",
            answer: "Actualmente, la función de exportar el CV no está disponible. Estamos trabajando en implementar esta característica en futuras actualizaciones. Por ahora, puedes tomar capturas de pantalla de las diferentes secciones de tu CV si necesitas compartirlo."
        }
    ];

    btn.onclick = () => {
        modal.style.display = "block";
        initChat();
    };

    span.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    aiThemeToggle.onclick = () => {
        modalContent.classList.toggle('ai-dark-mode');
        updateAiThemeIcon();
    };

    function updateAiThemeIcon() {
        const icon = aiThemeToggle.querySelector('i');
        if (modalContent.classList.contains('ai-dark-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    function initChat() {
        chatMessages.innerHTML = '';
        addMessage("Asistente", "Hola, ¿en qué puedo ayudarte hoy? Por favor, selecciona una de las siguientes preguntas:", false);
        updateQuestionButtons();
    }

    function updateQuestionButtons() {
        questionButtons.innerHTML = '';
        faqData.forEach(faq => {
            const button = document.createElement('button');
            button.textContent = faq.question;
            button.classList.add('question-button');
            button.onclick = () => handleQuestion(faq.question, faq.answer);
            questionButtons.appendChild(button);
        });
    }

    function handleQuestion(question, answer) {
        addMessage("Usuario", question, true);
        setTimeout(() => {
            addMessage("Asistente", answer, false);
            setTimeout(updateQuestionButtons, 500);
        }, 1000);
    }

    function addMessage(sender, text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chat-message', isUser ? 'user-message' : 'assistant-message');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});