<?php
session_start();

/**
 * Logout function to handle the logout interactions on server-side
 * Stored in protected directories
 */

unset($_SESSION['username']);

if ($_SESSION['currentWindow'] === "adminBooking.php" ||
$_SESSION['currentWindow'] === "adminDog.php"){
echo "<script> window.location.href='index.php'</script>";
} else {
echo "<script> window.location.href='" . $_SESSION['currentWindow'] . "'</script>";
}
?>
