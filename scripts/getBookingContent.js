/* global $, console*/
// noinspection JSUnusedLocalSymbols

/**
 * Get Booking Content module to export into json files
 * through generating a post request
 *
 * Created by: Minh Tran, 17/10/2021
 */
let GetBookingContent = (function(){
    "use strict";
    let pub={};

    pub.setup = function(){
        let booking = JSON.stringify(window.localStorage.getItem('booking'));

        $.ajax({
            type: "POST",
            url: 'processBookingContent.php',
            cache: false,
            data: booking,
            datatype: 'json',
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                console.log(data);
                window.localStorage.clear();
                window.sessionStorage.clear();
                window.location.href="newBooking.php";
            },
            error: function(data){
                console.log("Ajax failed");
            }
        });

    };

    return pub;
}());

$(document).ready(GetBookingContent.setup);