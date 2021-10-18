<?php
session_start();
$_SESSION["currentWindow"] = basename($_SERVER["SCRIPT_FILENAME"]);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <link rel="stylesheet" href="stylesheet.css">
    <script src="helpers/jQuery/jquery-3.6.0.min.js"></script>
</head>
<body>
    <header>
        <h1> Dog Rental Service</h1>
        <?php
            include ('functions/header.php');
            addHeader();
        ?>
    </header>

    <nav id="sidebar">
        <?php addNavBar();?>
    </nav>

    <main>
        <section class="welcome">
            <h2> Welcome to Dog Rental Service</h2>
            <p> Here, we have a variety of dog breeds with various size for your every needs.
            From a small lap poodle to a huge cuddly Retriever.</p>
            <p> You can select up to 3 of these beautiful pets in a booking.</p>
            <p> So what are you waiting for? Come browse our collection of man's best friends</p>
            <p> Don't forget to check out our <a href="tracks.php">points of interest</a> list of possible walking tracks to give these guys a
                bit of exercises.</p>
        </section>
        <section class="reviews">
            <h2> Check out what the other customers say about us </h2>
        </section>
    </main>
    <footer>

    </footer>


    <script src="scripts/reviews.js"></script>
</body>
</html>