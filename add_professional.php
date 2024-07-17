<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $profession = $_POST['profession'];
    $services = $_POST['services']; // Array of service IDs

    $stmt = $conn->prepare("INSERT INTO professionals (name, phone, profession) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $phone, $profession);

    if ($stmt->execute()) {
        $professional_id = $stmt->insert_id;

        foreach ($services as $service_id) {
            $stmt_service = $conn->prepare("INSERT INTO professional_services (professional_id, service_id) VALUES (?, ?)");
            $stmt_service->bind_param("ii", $professional_id, $service_id);
            $stmt_service->execute();
            $stmt_service->close();
        }

        echo "Professional added successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
