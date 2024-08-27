<?php
require "../modelo/modelo.php"; // Asegúrate que la ruta sea correcta.

class ValidarUserPassword {
    private $conexion;

    // Constructor que recibe la conexión a la base de datos
    public function __construct($dbConnection) {
        $this->conexion = $dbConnection;
    }

    // Método para validar el usuario y la contraseña
    public function validar($user, $pass) {
        $stmt = $this->conexion->prepare("SELECT * FROM usuarios WHERE user = ? AND password = ?");
        $stmt->bind_param("ss", $user, $pass); // Se cambia a bind_param para usar mysqli y asegurar la seguridad.
        $stmt->execute();

        $result = $stmt->get_result(); // Obtener el resultado de la consulta

        if ($result->num_rows > 0) {
            // Usuario y contraseña correctos
            header("Location: ../vista/inicio.html");
            exit;
        } else {
            // Usuario o contraseña incorrectos
            header("Location: index.php?error=1");
            exit;
        }
    }
}

// Verifica si el formulario ha sido enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Crear instancia de la conexión
    $conexion = (new Conexion())->conectar();
    
    // Crea una instancia de la clase ValidarUserPassword
    $validador = new ValidarUserPassword($conexion);

    // Obtiene los datos del formulario
    $user = $_POST['user'];
    $pass = $_POST['password'];

    // Llama al método validar
    $validador->validar($user, $pass);
}
?>
