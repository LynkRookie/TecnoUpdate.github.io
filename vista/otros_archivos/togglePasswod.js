document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword.addEventListener('click', function () {
        // Alternar el tipo de input entre contraseña y texto
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        // Alternar el icono entre ojo y ojo tachado
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });
});
