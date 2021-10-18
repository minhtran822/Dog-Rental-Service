<?php
session_start();
$_SESSION["currentWindow"] = basename($_SERVER["SCRIPT_FILENAME"]);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin</title>
    <link rel="stylesheet" href="stylesheet.css">
    <script src="helpers/jQuery/jquery-3.6.0.min.js"></script>
</head>
<body>
    <header>
        <?php
        include ('functions/header.php');
        addHeader();
        ?>
    </header>

    <nav id="sidebar">
        <?php addNavBar();?>
    </nav>

    <main>
        <h2> Existing bookings</h2>
        <table class="bookings">
            <thead>
                <tr>
                    <th>Dog ID</th><th>Name</th>
                    <th>Pickup</th><th>Num Hours</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </main>

    <script src="scripts/admin.js"></script>
</body>
</html>