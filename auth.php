<?php
session_start();
include ("functions/authFunction.php");
?>

<main>
    <p> Authentication </p>
    <?php
    echo "<script> window.location.href='".$_SESSION['currentWindow']."'</script>";
    ?>
</main>

</body>
</html>
