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
 * Check to see if the length of a string is a given value, ignoring leading
 * and trailing whitespace.
 *
 * @param string $str The string to check.
 * @param integer $len The expected length of $str.
 * @result True if $str has length $len, false otherwise.
 */
function checkMinLength($str, $len) {
    return strlen(trim($str)) >= $len;
}

function checkNumHours($numHours){
    return isDigits($numHours) && !isEmpty($numHours);
}

function checkPickUp($pickupDate, $pickupTime){
    return !isEmpty($pickupDate) && !isEmpty($pickupTime);
}

function checkCustomerDetails($bookingName){
    return checkMinLength($bookingName,2) && !isEmpty($bookingName);
}
