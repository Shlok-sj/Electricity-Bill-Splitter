<?php
$servername = "localhost"; // Change if necessary
$username = "root"; // Your MySQL username
$password = ""; // Your MySQL password
$dbname = "electricity_bills"; // The name of your database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch the latest readings (previous readings)
$sql = "SELECT total_reading, family1_reading FROM readings ORDER BY reading_date DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $readings = $result->fetch_assoc();
    echo json_encode($readings);
} else {
    echo json_encode(["total_reading" => 0, "family1_reading" => 0]);
}

$conn->close();
?>
