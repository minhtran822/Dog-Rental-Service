<?php
session_start();
$_SESSION["currentWindow"] = basename($_SERVER["SCRIPT_FILENAME"]);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Track</title>
    <link rel="stylesheet" href="stylesheet.css">
    <link rel="stylesheet" href="helpers/leaflet/leaflet.css"/>
    <?php
    $scriptList = array('helpers/jQuery/jquery-3.6.0.min.js', 'helpers/leaflet/leaflet.js', 'scripts/map.js');
    include ('functions/header.php');
    ?>
</head>
<body>

    <header>
        <?php
        addHeader();
        ?>
    </header>

    <nav id="sidebar">
        <?php addNavBar();?>
    </nav>

    <main>
        <div id="map">

        </div>
        <ul id="pointsOfInterest">

            <li>
                <p class="location"> Car Rental Office
                <i> - campsite</i>
                <input type="button" class="showOnMap" value="Show on map">
                <!--suppress HtmlFormInputWithoutLabel -->
                    <input type="checkbox" class="showHide" name="checkbox" checked></p>
            </li>
        </ul>
    </main>
    <footer></footer>


</body>
</html>