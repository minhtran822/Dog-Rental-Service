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
    <div id="navAdmin">
        <ul>
            <li><button id="addDog">Add Dog</button></li>
        </ul>

    </div>
    <h2> Existing Dogs</h2>
    <table>
        <thead>
        <tr>
            <th>Dog ID</th><th>Name</th>
            <th>Type</th><th>Size</th>
            <th>Description</th><th>Price</th>
            <th></th><th></th>
        </tr>
        </thead>
        <tbody class="dogTable"></tbody>
    </table>
    <form id="editDogDiv" action="validateDogEdit.php" method="post">
        <h2>Dog Details</h2>
        <label for="dogId">ID: </label>
        <input type="text" id="dogId" name="dogId" required />
        <br>
        <label for="dogName">Name: </label>
        <input type="text" id="dogName" name="dogName" required />
        <br>
        <label for="dogType">Type: </label>
        <input type="text" id="dogType" name="dogType" required />
        <br>
        <label for="dogSize">Size: </label>
        <input type="text" id="dogSize" name="dogSize" required />
        <br>
        <label for="dogDescription">Description: </label>
        <input type="text" id="dogDescription" name="dogDescription" required />
        <br>
        <label for="dogPrice">Price: </label>
        <input type="text" id="dogPrice" name="dogPrice" required />
        <br>
        <input type="submit" id="editDogBtn" name="editDogBtn" value="Edit" disabled>
        <input type="submit" id="addDogBtn" name="addDogBtn" value="Add" disabled>
    </form>
</main>

<script src="scripts/dogAdmin.js"></script>
</body>
</html>