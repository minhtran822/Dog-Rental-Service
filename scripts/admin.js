/*global $, console, alert */
// noinspection JSUnusedLocalSymbols,JSUnresolvedVariable

/**
 * Admin module to show administrative view
 * Currently as required, it is only showing existing bookings
 *
 * Created by: Minh Tran, 04/09/2021
 */

let AdminView = (function (){
    "use strict";
    let pub={};

    /**
     * Establish a connection to the booking.json files
     *
     * @param e The event representing the loading
     */
    function getBooking(e){
        console.log("Get Bookings called");
        let jsonSource = "src/bookings.json";


        $.ajax({
            type: "GET",
            url: jsonSource,
            cache: false,
            success: function(data) {
                loadBookings(data);
            },
            error: function() {
                alert("Can't connect to the json");
            }
        });
    }

    /**
     * Load all the files in the data onto the admin page
     * Append the data into a table.
     *
     * @param data The data read from connected file
     */
    function loadBookings(data){
        let bookingCollection = [];
        let bookingTable = $(".bookings tbody");

        if(data.bookings && data.bookings.booking){
            bookingCollection = data.bookings.booking;
            bookingCollection.forEach(function(booking){
                if(booking.dogId && booking.pickup &&
                booking.name && booking.numHours &&

                booking.pickup.day && booking.pickup.month &&
                booking.pickup.year && booking.pickup.time){
                    $(bookingTable).append(
                        "<tr><td>"+ booking.dogId + "</td>" +
                        "<td>"+ booking.name + "</td>" +
                        "<td>"+ booking.pickup.time + "," + booking.pickup.day + "/" + booking.pickup.month + "/" + booking.pickup.year + "</td>" +
                        "<td>"+ booking.numHours + "</td>" +
                        "<td><button class='cancelBooking'>Cancel</button> </td>" +
                        "</tr>"
                    );

                } else {
                    //If the json file have wrong structure and not enough required keys
                    alert("Wrong structure");
                }
            });
        }
    }

    pub.setup = function (){
        getBooking();
    };

    return pub;
}());

$(document).ready(AdminView.setup);