<?php
$servername = "localhost";
$username = "root";
$password = ""; // Cambia esto si tu contraseña es diferente
$dbname = "spa_management";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
