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
        <h1> Dog Rental Service</h1>
        <div id="user">
            <div id="login">
                <form id="loginForm">
                    <label for="loginUser">Username: </label>
                    <input type="text" name="loginUser" id="loginUser"><br>
                    <label for="loginPassword">Password: </label>
                    <input type="text" name="loginPassword" id="loginPassword"><br>
                    <input type="submit" id="loginSubmit" value="Login"><br>
                    <input type="button" id="loginAdmin" value="Login as Admin" onclick="location.href='admin.html'">
                </form>
            </div>
        </div>

    </header>

    <nav id="sidebar">
        <ul>
            <li><a href="index.php">Home</a>
            <li class="current">View Dogs
            <li><a href="tracks.php">Points of Interest</a></li>
        </ul>
    </nav>
    <main>
        <form id="pickupSelect">
            <label for="pickupDate">Date: </label>
            <input type="date" id="pickupDate" name="pickupDate"
                   value="2021-07-22"
                   min="2021-01-01" max="2022-12-31" required>
            <br>
            <label for="pickupTime">Time:</label>
            <input type="time" id="pickupTime" name="pickupTime"
                   value="14:00"
                   min="09:00" max="18:00" required>
            <small> Office hours are between 9:00 and 16:00</small>
            <br>
            <label for="numHours">Number of Hours: </label>
            <input type="text" id="numHours" required>
            <small id="numHoursError">Please put in number of hours.</small>
            <br>
            <input type="submit" id="applyPickup" value="See Available dogs">
        </form>
        <div id="bookingDetails"></div>
        <form id="bookingInfo">
            <label for="bookingName">Name: </label>
            <input type="text" id="bookingName" required>
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