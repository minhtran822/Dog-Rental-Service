/*global $, console, alert */
// noinspection JSUnresolvedVariable

/**
 * Review module to show all the reviews from files
 *
 * Created by: Minh Tran, 04/09/2021
 */
let Reviews = (function (){
    "use strict";
    let pub ={};

    /**
     * Establish a connection to the reviews.json files.
     */
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

    /**
     * Load the data read from file onto the target variable.
     *
     * @param data The data read from file to be loaded.
     * @param target The target container in html file to display all the data
     */
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