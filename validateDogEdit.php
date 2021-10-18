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

    if(isset($_POST['editDogBtn'])){}

    //$index to keep the dog index or error
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

    switch($index) {
        case -3:
            echo "Some field may have not been recorded successfully/ Please check again.";
            break;
        case -2:
            if (isset($_POST['addDogBtn']))
                echo "Dog with ID " .$_SESSION['dogId']. " already existed.";
            break;
        case -1:
            if (isset($_POST['editDogBtn']))
                echo "Can't find dog with ID " .$_SESSION['dogId']. " in the database";

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
                    echo "JSON file created successfullly";
                } else {
                    print_r(error_get_last(), true);
                }
            }
            break;
        default:
            if ($index<0){
                echo "Some unknown indexing have occurred";
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
                        echo "JSON file created successfullly";
                    } else {
                        print_r(error_get_last(), true);
                    }
                }
            }
    }




        if(isset($_POST['addDogBtn'])){
            if(checkDogExist($_SESSION['dogId'])) echo "Dog already existed";
        }

        echo "Cool";
        echo $_SESSION['numHours'];


    ?>
</main>

