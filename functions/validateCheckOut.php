<?php
session_start();
$scriptList = array('../helpers/jQuery/jquery-3.6.0.min.js');
include("header.php");
?>
    <main>
        <p> Placeholder for checkout validation </p>
        <?php include("validationFunctions.php");
                //echo "<script src=\"getCartContents.js\"></script>";
        unset($_SESSION['numHours']);
        unset($_SESSION['pickupDate']);
        unset($_SESSION['pickupTime']);
        unset($_SESSION['bookingName']);

        $_SESSION['numHours'] = htmlentities($_POST['numHours']);
        $_SESSION['pickupDate'] = $_POST['pickupDate'];
        $_SESSION['pickupTime'] = $_POST['pickupTime'];
        $_SESSION['bookingName'] = htmlentities($_POST['bookingName']);

        if(checkNumHours($_SESSION['numHours']) && checkCustomerDetails($_SESSION['bookingName'])
            && checkPickUp($_SESSION['pickupDate'], $_SESSION['pickupTime'])){
            echo "Success";
        } else {
            echo "Try again";
            echo htmlentities($_POST['numHours']);
            echo $_SESSION['bookingName'];
            echo $_SESSION['pickupDate'];
            echo $_SESSION['pickupTime'];
            foreach ($_POST as $val){
                echo $val;
            }
        }

        ?>
    </main>

    </body>
    </html>

