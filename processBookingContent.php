<?php
//This is the file in the string form (not as an object but not stringified)
$arr = json_decode(file_get_contents("php://input"));

//Translate from string into object
//Use this value for bookings details i.e: $val->numHours, pickup, items, name
$val = json_decode($arr);

$json_input = file_get_contents('src/bookings.json');
$json_object = json_decode($json_input);

//Append onto the current existing booking array
$json_object->bookings->booking[] =  $val;

$json_output = json_encode($json_object,JSON_PRETTY_PRINT)."\n";
if(file_put_contents('src/bookings.json',$json_output)){
    echo "JSON file created successfullly";
} else {
    print_r(error_get_last(), true);
}

?>