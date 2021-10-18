<?php
session_start();
require ('dbconnect.php');

$inName = htmlentities($_POST['loginUser']);
$inPassword = htmlentities($_POST['loginPassword']);

$query = "SELECT * FROM Users WHERE username = '".$inName."' AND password = SHA('".$inPassword."');";

$result = $conn->query($query);
if ($result->num_rows !== 0) {
    unset($_SESSION['errorLogin']);
    $_SESSION['username'] = $inName;
} else {
    $_SESSION['errorLogin'] = "The username and password does not exist.";
}

$result->free();
$conn->close();
?>