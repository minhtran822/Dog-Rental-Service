/*global $, console, alert, confirm */
// noinspection JSUnusedLocalSymbols,JSUnresolvedVariable

/**
 * Admin Booking module to show administrative view of the bookings
 *
 * Created by: Minh Tran, 17/10/2021
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

    /**
     * Remove a booking by redirecting booking index to another page.
     *
     * @param e The event representing the loading
     */
    function removeBooking(e){
        let selectedBooking = $(e.target).closest("tr").index();

        let action = 'processBookingRemove.php';
        let data = { "indexBooking": selectedBooking};

        if(confirm("Are you sure you want to remove the selected booking?")) {
            $.post(action, data, function(response) {
                console.log(response);
                window.location.reload();
            });
        } else {
            console.log("uh");
        }

    }

    pub.setup = function (){
        getBooking();
        $(".bookings").on("click", ".cancelBooking", removeBooking);
    };

    return pub;
}());

$(document).ready(AdminView.setup);