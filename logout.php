<?php
session_start();
$scriptList = array('helpers/jQuery/jquery-3.6.0.min.js');
include("functions/header.php");
?>
<main>
    <p> Logout </p>
    <?php include("functions/validationFunctions.php");
    include ("functions/logoutFunction.php");
    ?>
</main>

</body>
</html>