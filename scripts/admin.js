var AdminView = (function (){
    var pub={};

    function getBooking(e){
        console.log("Get Bookings called");
        var target = $(".reviews")
        var jsonSource = "../src/bookings.json";


        $.ajax({
            type: "GET",
            url: jsonSource,
            cache: false,
            success: function(data) {
                loadBookings(data, target);
            },
            error: function() {
                alert("Can't connect to the json");
            }
        });
    }

    function loadBookings(data, target){
        var bookingCollection = [];
        var bookingTable = $(".bookings tbody");

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
                        "</tr>"
                    );

                } else {
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