/*global console, $, alert*/
// noinspection JSUnresolvedVariable

let Dogs = (function(){
    "use strict";
    let pub = {};

    function getDogs(e) {
        e.preventDefault();
        console.log("Get Dogs called");
        let target = $(".availableDogs");
        let jsonSource = "../src/animals.json";
        let pickupTime = $("input[type=time]#pickupTime").val();
        let pickupDate = new Date($("input[type=date]#pickupDate").val());
        let numHours = $("#numHours").val();

        window.sessionStorage.setItem("time", pickupTime +","+pickupDate.getDate()+"/"+pickupDate.getMonth()+'/'+pickupDate.getFullYear());
        window.sessionStorage.setItem("hours", numHours);

        $.ajax({
            type: "GET",
            url: jsonSource,
            cache: false,
            success: function(data) {
                insertDog(data, target);
            },
            error: function() {
                alert("Can't connect to the json");
            }
        });

        $("form#pickupSelect *").attr('disabled', true);
    }

    function insertDog(data, target){
        let dogs, i, dog, undefinedError;
        let imageName;


        console.log($("input[type=time]#pickupTime").val());
        undefinedError = false;

        //Reset the dogs area
        $(target).empty();

        //TODO: Expand to other animals if possible
        if (data.animals && data.animals.dogs) {
            dogs = data.animals.dogs;

            for (i = 0; i < dogs.length; i++) {
                dog = dogs[i];

                //Check if the dog object keys exist in the structure of json
                if (dog.dogName && dog.dogId && dog.dogSize && dog.description && dog.pricePerHour) {

                    //generate image source
                    imageName = dog.dogSize.toLowerCase();

                    let dogDiv = document.createElement('div');
                    let dogInfoDiv = document.createElement('div');
                    $(dogDiv).addClass("dogs");
                    $(dogInfoDiv).addClass("dogInfo");

                    //Create image from image source
                    $(dogDiv).append("<img src='../images/" + imageName + ".jpg' alt='" + dog.dogType + "'>");

                    //Create div dog info
                    $(dogInfoDiv).append("<h3>" + dog.dogName + "</h3>");
                    $(dogInfoDiv).append("<p> ID: <span class=\"dogId\">"+dog.dogId+"</span></p>");
                    $(dogInfoDiv).append("<p> Breed: " + dog.dogType + "</p>");
                    $(dogInfoDiv).append("<p> Size: " + dog.dogSize + "</p>");
                    $(dogInfoDiv).append("<p> " + dog.description + "</p>");
                    $(dogInfoDiv).append("<p> Price: $<span class=\"price\">" + dog.pricePerHour + "</span>" +
                        "<br><input type=\"button\" class=\"chooseDog\" value=\"Add To Booking\"></p>");
                    $(dogDiv).append(dogInfoDiv);

                    $(target).append(dogDiv);

                } else {
                    undefinedError = true;
                    break;
                }

            }
        } else {
            undefinedError = true;
        }

        //The debug to report different format file
        if (undefinedError === true){
            alert("Please check the data structure of the animals.json file");
        }


    }

    pub.setup = function (){
        $("#pickupSelect").submit(getDogs);
        /*$(".availableDogs").on("click", ".viewDog", viewADog);*/
    };

    return pub;
}());

$(document).ready(Dogs.setup);