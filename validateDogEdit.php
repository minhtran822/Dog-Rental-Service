<?php
session_start();
$scriptList = array('helpers/jQuery/jquery-3.6.0.min.js');
include("functions/header.php");
?>
<main>
    <p> Placeholder for checkout validation </p>
    <?php include("functions/validationFunctions.php");

    $_SESSION['dogId'] = htmlentities($_POST['dogId']);
    $_SESSION['dogName'] = htmlentities($_POST['dogName']);
    $_SESSION['dogType'] = htmlentities($_POST['dogType']);
    $_SESSION['dogSize'] = htmlentities($_POST['dogSize']);
    $_SESSION['dogDescription'] = htmlentities($_POST['dogDescription']);
    $_SESSION['dogPrice'] = htmlentities($_POST['dogPrice']);

    //$index to keep index of selected dog or the error
    $index = -1;

    //Get the json file
    $json_input = file_get_contents('src/animals.json');
    $json_object = json_decode($json_input);
    $dogArray = $json_object->animals->dogs;

    //Check if there is any empty input
    if(isEmpty($_SESSION['dogId']) || isEmpty($_SESSION['dogName']) ||
        isEmpty($_SESSION['dogType']) || isEmpty($_SESSION['dogDescription']) ||
        isEmpty($_SESSION['dogSize']) || isEmpty($_SESSION['dogPrice'])){
        $index= -3;
    } else {
        //Look for index of the current item
        for ($x = 0; $x < count($dogArray); $x++){
            if ($dogArray[$x]->dogId === $_SESSION['dogId']){
                if(isset($_POST['editDogBtn'])){
                    $index = $x;
                    break;
                }

                //Check if dog existed
                if(isset($_POST['addDogBtn'])){
                    $index = -2;
                    break;
                }
            }
        }
    }

    echo "Index ".$index;

    echo "<script>";

    switch($index) {
        /* -3 is error Empty field
         */
        case -3:
            echo "alert('Some field may have not been recorded successfully/ Please check again.');";
            break;
        /* -2 is error Dog Existed
           For edit, this is unnecessary
           For adding, this is error
         */
        case -2:
            if (isset($_POST['addDogBtn']))
                echo "alert('Dog with ID " .$_SESSION['dogId']. " already existed.');";
            break;
        /* -1 is error Dog Not Found
           For edit, this is error
           For adding, this is wanted case
         */
        case -1:
            if (isset($_POST['editDogBtn']))
                echo "alert('Can't find dog with ID " .$_SESSION['dogId']. " in the database');";

            if (isset($_POST['addDogBtn'])) {
                $newDog = array("dogId" => $_SESSION['dogId'],
                    "dogName" => $_SESSION['dogName'],
                    "dogType" => $_SESSION['dogType'],
                    "dogSize" => $_SESSION['dogSize'],
                    "description" => $_SESSION['dogDescription'],
                    "pricePerHour" => $_SESSION['dogPrice']);

                $json_object->animals->dogs[] = $newDog;

                $addDog = json_encode($json_object,JSON_PRETTY_PRINT)."\n";

                if(file_put_contents('src/newBooking.json',$addDog)){
                    echo "console.log('JSON file created successfullly');";
                    unset($_SESSION['dogId']);
                    unset($_SESSION['dogName']);
                    unset($_SESSION['dogType']);
                    unset($_SESSION['dogSize']);
                    unset($_SESSION['dogDescription']);
                    unset($_SESSION['dogPrice']);
                } else {
                    echo "alert('";
                    print_r(error_get_last(), true);
                    echo "');";
                }
            }
            break;
        /* Positive index means the dog exists in array
            Other negative index means unknown error
         */
        default:
            if ($index<0){
                echo "alert('Some unknown indexing have occurred');";
            } else {
                if (isset($_POST['editDogBtn'])){
                    $json_object->animals->dogs[$index]->dogId = $_SESSION['dogId'];
                    $json_object->animals->dogs[$index]->dogName = $_SESSION['dogName'];
                    $json_object->animals->dogs[$index]->dogType = $_SESSION['dogType'];
                    $json_object->animals->dogs[$index]->dogSize = $_SESSION['dogSize'];
                    $json_object->animals->dogs[$index]->description = $_SESSION['dogDescription'];
                    $json_object->animals->dogs[$index]->pricePerHour = $_SESSION['dogPrice'];

                    $json_output = json_encode($json_object,JSON_PRETTY_PRINT)."\n";

                    if(file_put_contents('src/newBooking.json',$json_output)){
                        echo "console.log('JSON file created successfullly');";
                        unset($_SESSION['dogId']);
                        unset($_SESSION['dogName']);
                        unset($_SESSION['dogType']);
                        unset($_SESSION['dogSize']);
                        unset($_SESSION['dogDescription']);
                        unset($_SESSION['dogPrice']);
                    } else {
                        echo "alert('";
                        print_r(error_get_last(), true);
                        echo "');";
                    }
                }
            }
    }

    //Reload the page
    echo "
          window.location.href='adminDog.php'</script>";
    ?>
</main>

