document.getElementById('logout-button').addEventListener('click', function (e) {
    e.preventDefault();

    // Paso 1: Mostrar la alerta de confirmación antes de proceder a la solicitud
    Swal.fire({
        title: "¿Estás seguro de cerrar sesión?",
        text: "Recuerda que no se guardará ningún dato después de cerrarlo.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, quiero cerrar sesión",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            // Paso 2: Si el usuario confirmó, entonces proceder con el cierre de sesión
            fetch('../controlador/logout.php')
                .then(response => {
                    // Verificar si la respuesta HTTP es correcta
                    if (!response.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    // Paso 3: Validar que la respuesta JSON indique éxito
                    if (data.success) {
                        // Paso 4: Mostrar mensaje de sesión cerrada con éxito
                        Swal.fire({
                            title: "Sesión cerrada",
                            text: "Se ha cerrado sesión satisfactoriamente",
                            icon: "success"
                        }).then(() => {
                            // Paso 5: Redirigir a la página de inicio de sesión
                            window.location.href = '../vista/login_cv.php';
                        });
                    } else {
                        // En caso de un error inesperado en el cierre de sesión
                        Swal.fire({
                            title: "Error",
                            text: "Hubo un problema al cerrar sesión. Inténtalo nuevamente.",
                            icon: "error"
                        });
                    }
                })
                .catch(error => {
                    // Manejo de errores en la solicitud fetch
                    console.error('Error:', error);
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrió un error al intentar cerrar sesión. Por favor, intenta de nuevo.",
                        icon: "error"
                    });
                });
        } else {
            // Si el usuario cancela, se muestra un mensaje de cancelación opcional
            Swal.fire({
                title: "Operación cancelada",
                text: "No se ha cerrado sesión",
                icon: "info"
            });
        }
    });
});