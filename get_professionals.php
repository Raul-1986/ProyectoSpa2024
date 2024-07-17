<?php
include 'db.php';

$result = $conn->query("SELECT * FROM professionals");

$professionals = array();
while ($row = $result->fetch_assoc()) {
    $professionals[] = $row;
}

echo json_encode($professionals);

$conn->close();
?>
