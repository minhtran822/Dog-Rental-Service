<?php
/**
 * Check to see if a string is composed entirely of the digits 0-9.
 * Note that this is different to checking if a string is numeric since
 * +/- signs and decimal points are not permitted.
 *
 * @param string $str The string to check.
 * @return True if $str is composed entirely of digits, false otherwise.
 */
function isDigits($str) {
    $pattern='/^[0-9]+$/';
    return preg_match($pattern, $str);
}

/**
 * Check to see if a string contains any content or not.
 * Leading and trailing whitespace are not considered to be 'content'.
 *
 * @param string $str The string to check.
 * @return True if $str is empty, false otherwise.
 */
function isEmpty($str) {
    return strlen(trim($str)) == 0;
}

/**
 * Check to see if the length of a string above the given value
 *
 * @param string $str The string to check.
 * @param integer $len The expected min length of $str.
 * @result True if $str is longer than $len, false otherwise.
 */
function checkMinLength($str, $len) {
    return strlen(trim($str)) >= $len;
}

/**
 * Check to see the format of the numHours input
 *
 * @param string $numHours the input to be checked
 * @result True if $numHours is not empty and make of digits
 * false otherwise.
 */
function checkNumHours($numHours){
    return isDigits($numHours) && !isEmpty($numHours);
}

/**
 * Check to see the format of the date and time input
 *
 * @param Date $pickupdate the input to be checked
 * @param string $pickupTime the input to be checked
 * @result True if both are not empty
 * false otherwise.
 */
function checkPickUp($pickupDate, $pickupTime){
    return !isEmpty($pickupDate) && !isEmpty($pickupTime);
}

/**
 * Check to see the format of the customer details
 *
 * @param string $bookingName the input to be checked
 * @result True if $bookingName is not empty and longer than 2
 * false otherwise.
 */
function checkCustomerDetails($bookingName){
    return checkMinLength($bookingName,2) && !isEmpty($bookingName);
}
