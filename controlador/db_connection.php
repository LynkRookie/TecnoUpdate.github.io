<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestor_cv";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Función para realizar consultas
function executeQuery($sql) {
    global $conn;
    $result = $conn->query($sql);
    if ($result === TRUE) {
        return true;
    } elseif ($result === FALSE) {
        return false;
    } else {
        return $result;
    }
}

// Función para obtener el último ID insertado
function getLastInsertId() {
    global $conn;
    return $conn->insert_id;
}

// Función para escapar strings (prevenir inyección SQL)
function escapeString($string) {
    global $conn;
    return $conn->real_escape_string($string);
}
?>