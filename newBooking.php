<?php
session_start();
$scriptList = array('helpers/jQuery/jquery-3.6.0.min.js');
include("functions/header.php");
?>
    <main>
        <p> Placeholder for checkout validation </p>
        <?php include("functions/validationFunctions.php");
        unset($_SESSION['numHours']);
        unset($_SESSION['pickupDate']);
        unset($_SESSION['pickupTime']);
        unset($_SESSION['bookingName']);

            echo "<script>window.location.href='animals.php'</script>";
        ?>
    </main>