document.getElementById('logout-button').addEventListener('click', function (e) {
    e.preventDefault();

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
            fetch('../controlador/logout.php')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            title: "Sesión cerrada",
                            text: "Se ha cerrado sesión satisfactoriamente",
                            icon: "success"
                        }).then(() => {
                            window.location.href = '../vista/login_cv.php';
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "Hubo un problema al cerrar sesión. Inténtalo nuevamente.",
                            icon: "error"
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrió un error al intentar cerrar sesión. Por favor, intenta de nuevo.",
                        icon: "error"
                    });
                });
        } else {
            Swal.fire({
                title: "Operación cancelada",
                text: "No se ha cerrado sesión",
                icon: "info"
            });
        }
    });
});