<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];

    $stmt = $conn->prepare("DELETE FROM professionals WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        // Also delete from professional_services
        $stmt_service = $conn->prepare("DELETE FROM professional_services WHERE professional_id = ?");
        $stmt_service->bind_param("i", $id);
        $stmt_service->execute();
        $stmt_service->close();

        echo "Professional deleted successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
