<?php
    session_start();
    unset($_SESSION['numHours']);
    unset($_SESSION['pickupDate']);
    unset($_SESSION['pickupTime']);

    $_SESSION['numHours'] = htmlentities($_POST['numHours']);
    $_SESSION['pickupDate'] = date('Y-m-d', strtotime($_POST['pickupDate']));
    $_SESSION['pickupTime'] = $_POST['pickupTime'];
    echo $_SESSION['numHours'];

?>

