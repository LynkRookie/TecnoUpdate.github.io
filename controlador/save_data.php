<?php
session_start();
require_once 'db_connection.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
    exit;
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

// Actualizar datos del perfil
$stmt = $conn->prepare("INSERT INTO datos_perfil (id_usuario, titulo, contenido) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE contenido = ?");

foreach (['name', 'title', 'about'] as $key) {
    if (isset($data[$key])) {
        $stmt->bind_param("isss", $user_id, $key, $data[$key], $data[$key]);
        $stmt->execute();
    }
}

// Actualizar habilidades
$stmt = $conn->prepare("DELETE FROM habilidades WHERE id_usuario = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();

$stmt = $conn->prepare("INSERT INTO habilidades (id_usuario, nombre, porcentaje) VALUES (?, ?, ?)");

if (isset($data['skills']) && is_array($data['skills'])) {
    foreach ($data['skills'] as $skill) {
        $percentage = intval(str_replace('%', '', $skill['percentage']));
        $stmt->bind_param("isi", $user_id, $skill['name'], $percentage);
        $stmt->execute();
    }
}

echo json_encode(['success' => true, 'message' => 'Datos guardados correctamente']);

$stmt->close();
$conn->close();
?>