/*global $, console, alert */
// noinspection JSUnresolvedVariable

let Reviews = (function (){
    "use strict";
    let pub ={};

    function getReviews(){
        console.log("Get Reviews called");
        let target = $(".reviews");
        let jsonSource = "../reviews/reviews.json";


        $.ajax({
            type: "GET",
            url: jsonSource,
            cache: false,
            success: function(data) {
                loadReviews(data, target);
            },
            error: function() {
                alert("Can't connect to the json");
            }
        });
    }

    function loadReviews(data, target) {
        console.log("OK");
        $.each(data, function (key, review){
            if(review.title && review.author && review.reviewcontent){
                let reviewDiv = document.createElement('div');
                $(reviewDiv).addClass("review");
                $(reviewDiv).append("<h3>"+review.title+"</h3>");
                $(reviewDiv).append("<i>" +review.author+ "</i>");
                $(reviewDiv).append("<p>" +review.reviewcontent+ "</p>");
                $(target).append(reviewDiv);
            }
        });
    }

    pub.setup = function (){
        getReviews();
    };

    return pub;
}());

$(document).ready(Reviews.setup);