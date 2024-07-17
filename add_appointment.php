<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $service = $_POST['service'];
    $professional = $_POST['professional'];
    $date = $_POST['date'];
    $time = $_POST['time'];

    $stmt = $conn->prepare("INSERT INTO appointments (service_id, professional_id, date, time) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iiss", $service, $professional, $date, $time);

    if ($stmt->execute()) {
        echo "Appointment added successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
