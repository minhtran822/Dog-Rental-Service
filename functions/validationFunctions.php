<?php
/**
 * Validation functions for the Dog Rental Service site.
 *
 * Some checks function taken from: Steven Mills - Validation Functions in provided lab files
 */


/**
 * Check to see if a string is composed entirely of the digits 0-9.
 * Note that this is different to checking if a string is numeric since
 * +/- signs and decimal points are not permitted.
 *
 * This is acquired from the lab files.
 *
 * @param string $str The string to check.
 * @return Boolean true if $str is composed entirely of digits, false otherwise.
 */
function isDigits($str) {
    $pattern='/^[0-9]+$/';
    return preg_match($pattern, $str);
}

/**
 * Check to see if a string contains any content or not.
 * Leading and trailing whitespace are not considered to be 'content'.
 *
 * This is acquired from the lab files.
 *
 * @param string $str The string to check.
 * @return Boolean true if $str is empty, false otherwise.
 */
function isEmpty($str) {
    return strlen(trim($str)) == 0;
}

/**
 * Check to see if the length of a string above the given value
 *
 * @param string $str The string to check.
 * @param integer $len The expected min length of $str.
 * @return Boolean true if $str is longer than $len, false otherwise.
 */
function checkMinLength($str, $len) {
    return strlen(trim($str)) >= $len;
}

/**
 * Check to see the format of the numHours input
 *
 * @param string $numHours the input to be checked
 * @return Boolean True if $numHours is not empty and make of digits
 * false otherwise.
 */
function checkNumHours($numHours){
    return isDigits($numHours) && !isEmpty($numHours);
}

/**
 * Check to see the format of the date and time input
 *
 * @param string $pickupdate the input to be checked
 * @param string $pickupTime the input to be checked
 * @return Boolean True if both are not empty
 * false otherwise.
 */
function checkPickUp($pickupDate, $pickupTime){
    return !isEmpty($pickupDate) && !isEmpty($pickupTime);
}

/**
 * Check to see the format of the customer details
 *
 * @param string $bookingName the input to be checked
 * @return Boolean true if $bookingName is not empty and longer than 2
 * false otherwise.
 */
function checkCustomerDetails($bookingName){
    return checkMinLength($bookingName,2) && !isEmpty($bookingName);
}
