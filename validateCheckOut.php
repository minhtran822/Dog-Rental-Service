<?php
session_start();
$scriptList = array('helpers/jQuery/jquery-3.6.0.min.js');
include("functions/header.php");
?>
    <main>
        <p> Placeholder for checkout validation </p>
        <?php include("functions/validationFunctions.php");
        unset($_SESSION['bookingName']);

        $_SESSION['bookingName'] = htmlentities($_POST['bookingName']);

        if(checkNumHours($_SESSION['numHours']) && checkCustomerDetails($_SESSION['bookingName'])
            && checkPickUp($_SESSION['pickupDate'], $_SESSION['pickupTime'])){
            echo "Success";
            echo "<script src=\"scripts/getBookingContent.js\"></script>";
        } else {
            echo "Try again";
            echo $_SESSION['numHours'];
        }

        ?>
    </main>

