<?php
//This is the file in the string form (not as an object but not stringified)
$arr = json_decode(file_get_contents("php://input"));

//Translate from string into object
//Use this value for bookings details i.e: $val->numHours, pickup, items, name
$val = json_decode($arr);

$booking = simplexml_load_file('src/order.xml');
$newBooking = $booking->addChild('booking');
$newBooking->addChild('name', $val->name);
$newBooking->addChild('numHours', $val->numHours);

$pickupBooking = $newBooking->addChild('pickup');
$pickupBooking->addChild('time', $val->pickup->time);
$pickupBooking->addChild('day', $val->pickup->day);
$pickupBooking->addChild('month', $val->pickup->month);
$pickupBooking->addChild('year', $val->pickup->year);

$items = $newBooking->addChild('items');
$itemsArr = $val->items;
foreach ($val->items as $item){
    $items->addChild('item', $item);
}

$booking->saveXML('src/order.xml');


$json_input = file_get_contents('src/bookings.json');
$json_object = json_decode($json_input);
$json_object->bookings->booking[] =  $val;
//print_r($json_object->bookings->booking);
$json_output = json_encode($json_object,JSON_PRETTY_PRINT)."\n";

if(file_put_contents('src/newBooking.json',$json_output)){
    echo "JSON file created successfullly";
} else {
    print_r(error_get_last(), true);
}

?>