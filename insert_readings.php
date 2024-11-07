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

$reading_date = date('Y-m-d');
$total_reading = $_POST['totalReading'];
$family1_reading = $_POST['family1Reading'];

$sql = "INSERT INTO readings (reading_date, total_reading, family1_reading)
VALUES ('$reading_date', '$total_reading', '$family1_reading')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
