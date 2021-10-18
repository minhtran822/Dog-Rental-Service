<?php
if (isset($_POST['indexBooking'])){
    echo "Received ".$_POST['indexBooking'];
    $i = $_POST['indexBooking'];


//Get the json file
    $json_input = file_get_contents('src/bookings.json');
    $json_object = json_decode($json_input);
    unset($json_object->bookings->booking[$i]);
    $json_object->bookings->booking = array_values($json_object->bookings->booking);

    //print_r($json_object->bookings->booking);
    $json_output = json_encode($json_object,JSON_PRETTY_PRINT)."\n";

    if(file_put_contents('src/bookings.json',$json_output)){
        echo "JSON file created successfullly";
    } else {
        print_r(error_get_last(), true);
    }
}
else {
    echo "Try again";
}


?>