<?php
session_start();
include('db_connection.php');

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $pass = $_POST['pass'];

    $stmt = $conn->prepare("SELECT id_usuario, pass FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if ($pass === $user['pass']) {
            $_SESSION['user_id'] = $user['id_usuario'];
            
            // Cargar datos del usuario
            $userData = loadUserData($user['id_usuario']);
            
            echo json_encode([
                "success" => true, 
                "message" => "Inicio de sesión exitoso",
                "userData" => $userData
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Método de solicitud no válido"]);
}

$conn->close();

function loadUserData($userId) {
    global $conn;
    $userData = [];

    // Cargar datos del perfil
    $stmt = $conn->prepare("SELECT * FROM datos_perfil WHERE id_usuario = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $userData[$row['titulo']] = $row['contenido'];
    }

    // Cargar habilidades
    $stmt = $conn->prepare("SELECT * FROM habilidades WHERE id_usuario = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $userData['skills'] = [];
    while ($row = $result->fetch_assoc()) {
        $userData['skills'][] = [
            'name' => $row['nombre'],
            'percentage' => $row['porcentaje']
        ];
    }

    return $userData;
}
?>