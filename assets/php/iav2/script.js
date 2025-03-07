// Obtenemos los elementos del DOM
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Función para agregar un mensaje al chat
function addMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Desplazar el chat hacia abajo
}

// Función para obtener la respuesta del chatbot
function getResponse(input) {
    const lowerInput = input.toLowerCase(); // Convertir a minúsculas para comparación

    // Lógica básica de respuestas
    if (lowerInput.includes("que es html")) {
        return "HTML es el lenguaje de marcado utilizado para crear páginas web.";
    } else if (lowerInput.includes("que es css")) {
        return "CSS es un lenguaje de estilo que describe cómo se presentan los elementos HTML.";
    } else if (lowerInput.includes("que es javascript")) {
        return "JavaScript es un lenguaje de programación que permite crear contenido dinámico en las páginas web.";
    } else if (lowerInput.includes("que es una base de datos")) {
        return "Una base de datos es una colección organizada de información que puede ser accedida y gestionada electrónicamente.";
    } else {
        return "Lo siento, no sé la respuesta a esa pregunta.";
    }
}

// Manejar el evento de clic en el botón de enviar
sendButton.addEventListener('click', () => {
    const inputText = userInput.value.trim(); // Obtener el texto del input
    if (inputText) {
        addMessage('user', inputText); // Agregar el mensaje del usuario al chat
        userInput.value = ''; // Limpiar el input

        // Obtener la respuesta del chatbot y agregarla al chat
        const response = getResponse(inputText);
        addMessage('bot', response);
    }
});

// Manejar el evento de presionar "Enter"
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click(); // Simular clic en el botón de enviar
    }
});
