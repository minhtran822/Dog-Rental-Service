var GetBookingContent = (function(){
    var pub={};

    pub.setup = function(){
        var booking = JSON.stringify(window.localStorage.getItem('booking'));

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
            },
            error: function(data){
                console.log("Ajax failed");
            }
        });

    };

    return pub;
}());

$(document).ready(GetBookingContent.setup);