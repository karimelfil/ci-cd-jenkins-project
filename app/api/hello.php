<?php
require_once __DIR__ . '/../config/db.php';

$stmt = $pdo->query("SELECT message FROM messages LIMIT 1");
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if ($row) {
    echo $row['message'];
} else {
    http_response_code(404);
    echo "No message found";
}
?>