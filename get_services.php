<?php
include 'db.php';

$result = $conn->query("SELECT * FROM services");

$services = array();
while ($row = $result->fetch_assoc()) {
    $services[] = $row;
}

echo json_encode($services);

$conn->close();
?>
