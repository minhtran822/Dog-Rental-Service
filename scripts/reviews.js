var Reviews = (function (){
    var pub ={};

    function getReviews(){
        console.log("Get Reviews called");
        var target = $(".reviews")
        var jsonSource = "../reviews/reviews.json";


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
        var reviewKeys = ["title", "author", "reviewcontent"];
        console.log("OK");
        $.each(data, function (key, review){
            if(reviewKeys.every(i => Object.keys(review).includes(i))){
                var reviewDiv = document.createElement('div');
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