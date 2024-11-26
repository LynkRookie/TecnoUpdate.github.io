document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById("login-container");
    const registerContainer = document.getElementById("register-container");
    const registerToggle = document.getElementById("register-toggle");
    const loginToggle = document.getElementById("login-toggle");

    // Manejo del formulario de inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);

            fetch('../controlador/procesar_login.php', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    window.location.href = '../vista/inicio_gestor_cv.php';
                } else {
                    alert(data.message || 'Error desconocido al iniciar sesión');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert(`Error en el proceso de inicio de sesión. Por favor, inténtelo de nuevo.`);
            });
        });
    }

    // Alternar entre el formulario de inicio de sesión y registro
    if (registerToggle && loginToggle && loginContainer && registerContainer) {
        registerToggle.addEventListener("click", (event) => {
            event.preventDefault();
            loginContainer.classList.add("hidden");
            registerContainer.classList.remove("hidden");
        });

        loginToggle.addEventListener("click", (event) => {
            event.preventDefault();
            registerContainer.classList.add("hidden");
            loginContainer.classList.remove("hidden");
        });
    }
     // Social login buttons
     setupSocialLogin('google-login', 'google');
     setupSocialLogin('github-login', 'github');
     setupSocialLogin('linkedin-login', 'linkedin');
});
function handleLoginSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch('../controlador/procesar_login.php', {
        method: 'POST',
        body: formData
    })
    .then(handleResponse)
    .then(handleLoginSuccess)
    .catch(handleLoginError);
}

function setupSocialLogin(buttonId, provider) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = `../controlador/oauth_${provider}.php`;
        });
    }
}

function toggleForms(event) {
    event.preventDefault();
    loginContainer.classList.toggle("hidden");
    registerContainer.classList.toggle("hidden");
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

function handleLoginSuccess(data) {
    if (data.success) {
        window.location.href = '../vista/inicio_gestor_cv.php';
    } else {
        alert(data.message || 'Error desconocido al iniciar sesión');
    }
}

function handleLoginError(error) {
    console.error('Error en la solicitud:', error);
    alert(`Error en el proceso de inicio de sesión. Por favor, inténtelo de nuevo.`);
}