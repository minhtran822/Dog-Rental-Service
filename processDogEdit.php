<?php
if (isset($_POST['index'])){
    echo "Received ".$_POST['index'];
    $i = $_POST['index'];


//Get the json file
    $json_input = file_get_contents('src/animals.json');
    $json_object = json_decode($json_input);
    unset($json_object->animals->dogs[$i]);
    $json_object->animals->dogs = array_values($json_object->animals->dogs);

    //print_r($json_object->bookings->booking);
    $json_output = json_encode($json_object,JSON_PRETTY_PRINT)."\n";

    if(file_put_contents('src/animals.json',$json_output)){
        echo "JSON file created successfullly";
    } else {
        print_r(error_get_last(), true);
    }
}
else {
    echo "Try again";
}


?>