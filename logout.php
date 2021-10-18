<?php
session_start();
$scriptList = array('helpers/jQuery/jquery-3.6.0.min.js');
include("functions/header.php");
?>
<main>
    <p> Logout </p>
    <?php include("functions/validationFunctions.php");
    unset($_SESSION['username']);

    if ($_SESSION['currentWindow'] === "admin.php"){
        echo "<script> window.location.href='index.php'</script>";
    } else {
        echo "<script> window.location.href='" . $_SESSION['currentWindow'] . "'</script>";
    }
    ?>
</main>

</body>
</html>