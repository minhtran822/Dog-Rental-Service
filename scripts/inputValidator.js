var InputValidator = (function (){
    var pub={};

    function checkNotEmpty(textValue) {
        return textValue.trim().length > 0;
    }

    function checkLength(textValue, minLength, maxLength) {
        var length = textValue.length;
        if (maxLength === undefined) {
            maxLength = minLength;
        }
        return (length >= minLength && length <= maxLength);
    }

    function checkKeyIsDigit(event) {
        // Cross-browser key recognition - see http://stackoverflow.com/questions/1444477/keycode-and-charcode
        var characterPressed, zero, nine;
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

    function checkBookingName(e){
        var bookingName = $("#bookingName").val();
        if(!checkNotEmpty(bookingName)){
            $("#bookingNameError").html("Please put in a name of booking");
        }else if(!checkLength(bookingName,2)){
            $("#bookingNameError").html("The name must be 2 or longer");
        }else{
            $("#bookingNameError").html("");
        }

        console.log(bookingName);
    }

    pub.setup=function (){
        $("#numHours").keypress(checkKeyIsDigit);
        $("#bookingName").change(checkBookingName);
    }

    return pub;
}());

$(document).ready(InputValidator.setup);