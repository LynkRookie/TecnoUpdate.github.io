<?php
class Conexion {
    public function conectar() {
        require "../config/config.php";

        $conexion = new mysqli($host, $user, $pass, $bdname);

        if ($conexion->connect_errno) {
            echo "Fallo la conexión a MySQL: (" . $conexion->connect_errno . ") " . $conexion->connect_error;
            return null; // Retorna null si falla la conexión
        } else {
            return $conexion; // Retorna la conexión si es exitosa
        }
    }
}
?>
