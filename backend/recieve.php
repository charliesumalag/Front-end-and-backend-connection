<?php
require 'database.php';
// cross origin
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['name']) && isset($data['email'])) {
    $name = htmlspecialchars($data['name']);
    $email = htmlspecialchars($data['email']);

    $stmt = $pdo->prepare('INSERT INTO user (name, email) VALUES (:name, :email)');
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    echo "New record created successfully!";
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid data recieved'
    ]);
}
