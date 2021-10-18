<?php
session_start();
require ('functions/dbconnect.php');

$inName = $_POST['loginUser'];
$inPassword = $_POST['loginPassword'];

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

<main>
    <p> Logout </p>
    <?php
    echo "<script> window.location.href='".$_SESSION['currentWindow']."'</script>";
    ?>
</main>

</body>
</html>
