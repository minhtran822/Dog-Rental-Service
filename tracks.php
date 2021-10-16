<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Track</title>
    <link rel="stylesheet" href="stylesheet.css">
    <script src="helpers/jQuery/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="helpers/leaflet/leaflet.css"/>
    <script src="helpers/leaflet/leaflet.js"></script>
    <script src="scripts/map.js"></script>
</head>
<body>
    <header>
        <h1> Dog Rental Service</h1>
        <div id="user">
            <div id="login">
                <form id="loginForm">
                    <label for="loginUser">Username: </label>
                    <input type="text" name="loginUser" id="loginUser"><br>
                    <label for="loginPassword">Password: </label>
                    <input type="text" name="loginPassword" id="loginPassword"><br>
                    <input type="submit" id="loginSubmit" value="Login"><br>
                    <input type="button" id="loginAdmin" value="Login as Admin" onclick="location.href='admin.php'">
                </form>
            </div>
        </div>

    </header>

    <nav id="sidebar">
        <ul>
            <li><a href="index.php">Home</a>
            <li><a href="animals.php">View Dogs</a>
            <li class="current">Points of Interest</li>
        </ul>
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