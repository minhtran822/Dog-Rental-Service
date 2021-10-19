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
            unset($_SESSION['numHours']);
            unset($_SESSION['bookingName']);
            unset($_SESSION['pickupDate']);
            unset($_SESSION['pickupTime']);
        } else {
            echo "<script>alert('Check the input again')</script>";
            echo $_SESSION['numHours'];
        }

        ?>
    </main>

