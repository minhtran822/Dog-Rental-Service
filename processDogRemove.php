<?php
if (isset($_POST['indexDog'])){
    echo "Received ".$_POST['indexDog'];
    $i = $_POST['indexDog'];


    //Get the json file
    $json_input = file_get_contents('src/animals.json');
    $json_object = json_decode($json_input);

    //Remove the selected dog
    unset($json_object->animals->dogs[$i]);
    $json_object->animals->dogs = array_values($json_object->animals->dogs);

    //Print out the result
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