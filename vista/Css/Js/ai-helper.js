document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('help-modal');
    const btn = document.getElementById('help-button');
    const span = document.getElementsByClassName('close')[0];
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');

    btn.onclick = () => modal.style.display = 'block';
    span.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    sendButton.onclick = () => {
        const userMessage = userInput.value;
        if (userMessage.trim() !== '') {
            appendMessage('Usuario', userMessage);
            // Simulando respuesta de IA
            setTimeout(() => {
                appendMessage('IA', 'Lo siento, aún no puedo responder preguntas. Estoy en desarrollo.');
            }, 1000);
            userInput.value = '';
        }
    };

    function appendMessage(sender, message) {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});
