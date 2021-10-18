<?php
session_start();
if (isset($scriptList) && is_array($scriptList)) {
    foreach ($scriptList as $script) {
        echo "<script src='$script'></script>";
    }
}

function addHeader(){
    echo "<h1> Dog Rental Service</h1>";
    if (!isset($_SESSION['username'])) {
        echo "<div id=\"user\">
            <div id=\"login\">
                <form id=\"loginForm\" action='auth.php' method=\"post\">
                    <label for=\"loginUser\">Username: </label>
                    <input type=\"text\" name=\"loginUser\" id=\"loginUser\"><br>
                    <label for=\"loginPassword\">Password: </label>
                    <input type=\"text\" name=\"loginPassword\" id=\"loginPassword\"><br>
                    <input type=\"submit\" id=\"loginSubmit\" value=\"Login\"><br>";

        if(isset($_SESSION['errorLogin'])){
            echo "<p>".$_SESSION['errorLogin']."</p>";
        }

        echo "</form>
            </div>
        </div>";
    } else {
        echo "<div id=\"user\">
            <p> Hello, " .$_SESSION['username']." </p>
            <form id='logout' action='logout.php' method='post'>
                <input type=\"submit\" id=\"logout\" value=\"Logout\"><br>
            </form>
        </div>";
    }
}

function addNavBar(){
    if (isset($_SESSION['currentWindow'])) {
        echo "<ul>";

        if ($_SESSION['currentWindow'] === 'index.php'){
            echo "<li class='current'>Home";
        } else {
            echo "<li><a href='index.php'>Home</a>";
        }

        if ($_SESSION['currentWindow'] === 'animals.php'){
            echo "<li class='current'>View Dogs";
        } else {
            echo "<li><a href='animals.php'>View Dogs</a>";
        }

        if ($_SESSION['currentWindow'] === 'tracks.php'){
            echo "<li class='current'>Points of Interest";
        } else {
            echo "<li><a href='tracks.php'>Points of Interest</a>";
        }

        if (isset($_SESSION['username'])) {
            if ($_SESSION['currentWindow'] === 'adminBooking.php' ||
                $_SESSION['currentWindow'] === "adminDog.php") {
                echo "<li class='admin current'>Admins";
                if ($_SESSION['currentWindow'] === 'adminBooking.php') {
                    echo "<li class='subNav current'>Bookings";
                } else {
                    echo "<li class='subNav'><a href='adminBooking.php'>Bookings</a>";
                }

                if ($_SESSION['currentWindow'] === 'adminDog.php') {
                    echo "<li class='subNav current'>Dogs";
                } else {
                    echo "<li class='subNav'><a href='adminDog.php'>Dogs</a>";
                }
            } else {
                echo "<li><a href='adminBooking.php'>Admins</a>";
            }
        }

        echo "</li>
                </ul>";
    }
}

if (isset($currentPage)){
    echo "
        <nav><ul>";
    if ($currentPage === 'index.php') {
        echo "<li>Home";
    } else {
        echo "<li><a href=\"index.php\">Home</a>";
    }

    if ($currentPage === 'classic.php') {
        echo "<li>Classics";
    } else {
        echo "<li><a href=\"classic.php\">Classics</a>";
    }

    if ($currentPage === 'scifi.php') {
        echo "<li>Sci&nbsp;Fi";
    } else {
        echo "<li><a href=\"scifi.php\">Sci&nbsp;Fi</a>";
    }

    if ($currentPage === 'hitchcock.php') {
        echo "<li>Hitchcock";
    } else {
        echo "<li><a href=\"hitchcock.php\">Hitchcock</a>";
    }

    if ($currentPage === 'contact.php'){
        echo "<li> Contact";
    } else {
        echo "<li><a href=\"contact.php\">Contact</a>";
    }

    if ($currentPage === 'cart.php'){
        echo "<li>View&nbsp;Cart";
    } else {
        echo "<li><a href=\"cart.php\">View&nbsp;Cart</a>";
    }

    echo "
        </ul>
    </nav>";
}
?>