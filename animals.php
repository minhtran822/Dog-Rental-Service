<?php
session_start();
$_SESSION["currentWindow"] = basename($_SERVER["SCRIPT_FILENAME"]);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>View Dogs</title>
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
        <form id="pickupSelect" action="validatePickUp.php" method="post" novalidate>
            <label for="pickupDate">Date: </label>
            <input type="date" id="pickupDate" name="pickupDate"
                   value="<?php echo date('Y-m-d'); ?>"
                   min="2021-01-01" max="2022-12-31" required />
            <br>
            <label for="pickupTime">Time:</label>
            <input type="time" id="pickupTime" name="pickupTime"
                   value="14:00"
                   min="09:00" max="18:00" required>
            <small> Office hours are between 9:00 and 16:00</small>
            <br>
            <label for="numHours">Number of Hours: </label>
            <input type="text" id="numHours" name="numHours" required>
            <small id="numHoursError">Please put in number of hours.</small>
            <br>
            <input type="submit" id="applyPickup" name="applyPickup" value="See Available dogs">
        </form>
        <div id="bookingDetails"></div>
        <form id="bookingInfo" action="validateCheckOut.php" method="post" novalidate>
            <label for="bookingName">Name: </label>
            <input type="text" id="bookingName" name="bookingName"required>
            <small id="bookingNameError"></small>
            <br>
            <input type="submit" id="bookingSave" value="Save">
            <input type="button" id="newBooking" value="New Booking">
            <small id="bookingSaveError"></small>
        </form>
        <div class="availableDogs">
            <div class="dogs">
                <img src="images/small.jpg" alt="Poodle">
                <div class="dogInfo">
                    <h3>Fido</h3>
                    <p>ID: <span class="dogId">DW-001</span></p>
                    <p>Breed: Poodle</p>
                    <p>Size: Small</p>
                    <p>Excellant lap dog, doesn't shed.</p>
                    <p>Price: $
                        <span class="price">3.0</span>
                    </p>
                </div>
            </div>
            <div class="dogs">
                <img src="images/medium.jpg" alt="Springer Spanial">
                <div class="dogInfo">
                    <h3>Rover</h3>
                    <p>ID: <span class="dogId">DW-002</span></p>
                    <p>Breed: Springer Spanial</p>
                    <p>Size: Medium</p>
                    <p>Very energetic, loves water. Good with kids</p>
                    <p>Price: $
                        <span class="price">5.0</span>
                    </p>
                </div>
            </div>
            <div class="dogs">
                <img src="images/large.jpg" alt="Retreiver">
                <div class="dogInfo">
                    <h3>Rex</h3>
                    <p>ID: <span class="dogId">DW-003</span></p>
                    <p>Breed: Retreiver</p>
                    <p>Size: Large</p>
                    <p>Eats everything, very friendly. Slobbers a lot.</p>
                    <p>Price: $
                        <span class="price">5.0</span>
                    </p>
                </div>
            </div>
            <div class="dogs">
                <img src="images/huge.jpg" alt="St. Bernard">
                <div class="dogInfo">
                    <h3>Digby</h3>
                    <p>ID: <span class="dogId">DW-004</span></p>
                    <p>Breed: St. Bernard</p>
                    <p>Size: Huge</p>
                    <p>Excellant horse replacement</p>
                    <p>Price: $
                        <span class="price">10.0</span>
                    </p>
                </div>
            </div>
        </div>
    </main>

    <footer>

    </footer>


    <script src="scripts/dogs.js"></script>
    <script src="scripts/booking.js"></script>
    <script src="scripts/inputValidator.js"></script>


</body>
</html>
