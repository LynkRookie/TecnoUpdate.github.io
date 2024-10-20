document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const registerToggle = document.getElementById('register-toggle');
    const loginToggle = document.getElementById('login-toggle');
    const loginBox = document.querySelector('.login-box');
    const registerBox = document.querySelector('.register-box');
    const loginThemeToggle = document.getElementById('login-theme-toggle');

    registerToggle.addEventListener('click', (e) => {
        e.preventDefault();
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
    });

    loginToggle.addEventListener('click', (e) => {
        e.preventDefault();
        registerBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí iría la lógica de autenticación
        console.log('Iniciando sesión...');
        window.location.href = 'index.html'; // Redirige al index después del login
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aquí iría la lógica de registro
        console.log('Registrando usuario...');
        window.location.href = 'index.html'; // Redirige al index después del registro
    });

    loginThemeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        updateLoginThemeIcon();
    });

    function updateLoginThemeIcon() {
        const icon = loginThemeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Funciones para manejar el login con redes sociales (simuladas)
    document.querySelectorAll('.social-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const network = e.currentTarget.classList[1];
            console.log(`Iniciando sesión con ${network}...`);
            // Aquí iría la lógica de autenticación con la red social correspondiente
            window.location.href = 'index.html';
        });
    });
});