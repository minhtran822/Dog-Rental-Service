/*global Booking, $*/
// noinspection RedundantIfStatementJS

/**
 * Validation functions for the Dog Rental Service site.
 *
 * Created by: Minh Tran, 04/09/2021
 * Some checks function taken from: Steven Mills - CheckoutValidator in provided lab files
 */

/**
 * Module to validate all inputs
 */
let InputValidator = (function (){
    "use strict";
    let pub={};

    /**
     * Check to see if a string is empty.
     *
     * Leading and trailing whitespace are ignored.
     * Functions are taken in provided lab files
     * @param textValue The string to check.
     * @return True if textValue is not just whitespace, false otherwise.
     */
    function checkNotEmpty(textValue) {
        return textValue.trim().length > 0;
    }

    /**
     * Check to see if a string's length is in a given range.
     *
     *
     * This checks to see if the length of a string lies within [minLength, maxLength].
     * If no maxLength is given, it checks to see if the string's length is exactly minLength.
     * Functions are taken in provided lab files
     * @param textValue The string to check.
     * @param minLength The minimum acceptable length
     * @param maxLength [optional] The maximum acceptable length
     * @return True if textValue is an acceptable length, false otherwise.
     */
    function checkLength(textValue, minLength, maxLength) {
        let length = textValue.length;
        if (maxLength === undefined) {
            maxLength = length+1;
        }
        return (length >= minLength && length <= maxLength);
    }

    /**
     * Check if a key-press is a digit or not
     *
     * Functions are taken in provided lab files
     * @param event The event representing the key-press
     * @return True (accept) if key is a digit, False (reject) otherwise
     */
    function checkKeyIsDigit(event) {
        // Cross-browser key recognition - see http://stackoverflow.com/questions/1444477/keycode-and-charcode
        let characterPressed, zero, nine;
        zero = "0";
        nine = "9";
        characterPressed = event.keyCode || event.which || event.charCode;
        if (characterPressed < zero.charCodeAt(0)) {
            return false;
        }

        if (characterPressed > nine.charCodeAt(0)) {
            return false;
        }
        return true;
    }

    /**
     * Check if the name input is empty or less than length 2 or not
     *
     * @return True (accept) if key is a digit, False (reject) otherwise
     */
    function checkBookingName(){
        let bookingName = $("#bookingName").val();
        if(!checkNotEmpty(bookingName)){
            $("#bookingNameError").html("Please put in a name of booking");
        }else if(!checkLength(bookingName,2)){
            $("#bookingNameError").html("The name must be 2 or longer");
        }else{
            $("#bookingNameError").html("");
            return true;
        }
        return false;
    }

    /**
     * Calling all the check functions before saving
     *
     * @param e The event representing the button clicked
     */
    function readyToSave(e){
        if(checkBookingName()) {
            //Call to Bookings module to save the file
            Booking.saveBooking(e);
        } else {
            e.preventDefault();
        }
        //return true;
    }

    pub.setup=function (){
        $("#numHours").keypress(checkKeyIsDigit);
        $("#bookingInfo").submit(readyToSave);
    };

    return pub;
}());

$(document).ready(InputValidator.setup);