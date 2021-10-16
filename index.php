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
            <li class="current">Home
            <li><a href="animals.php">View Dogs</a>
            <li><a href="tracks.php">Points of Interest</a></li>
        </ul>
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