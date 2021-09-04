var Dogs = (function(){
    var pub = {};

    function getDogs(e) {
        e.preventDefault();
        console.log("Get Dogs called");
        var target = $(".availableDogs");
        var jsonSource = "../src/animals.json";
        var pickupTime = $("input[type=time]#pickupTime").val();
        var pickupDate = new Date($("input[type=date]#pickupDate").val());
        var numHours = $("#numHours").val();

        window.localStorage.setItem("time", pickupTime +","+pickupDate.getDate()+"/"+pickupDate.getMonth()+'/'+pickupDate.getFullYear());
        window.localStorage.setItem("hours", numHours);

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
    }

    function insertDog(data, target){
        var animals, dogs, i, dog, undefinedError;
        var imageName;


        console.log($("input[type=time]#pickupTime").val());
        undefinedError = false;

        //Reset the dogs area
        $(target).empty();
        console.log("Ok here");

        if(Object.keys(data).includes("animals")) {

            animals = data.animals;


            //TODO: Expand to other animals if possible
            if (Object.keys(animals).includes("dogs")) {
                dogs = animals.dogs;

                for (i = 0; i < dogs.length; i++) {
                    dog = dogs[i];

                    //Check if the dog object keys exist in the structure of json
                    var dogKeys = ["dogName", "dogId", "dogSize", "description", "pricePerHour"];
                    if (dogKeys.every(i => Object.keys(dog).includes(i))) {

                        //generate image source
                        imageName = dog.dogSize.toLowerCase();

                        var dogDiv = document.createElement('div');
                        var dogInfoDiv = document.createElement('div');
                        $(dogDiv).addClass("dogs");
                        $(dogInfoDiv).addClass("dogInfo")

                        //Create image from image source
                        $(dogDiv).append("<img src='../images/" + imageName + ".jpg' alt='" + dog.dogType + "'>");

                        //Create div dog info
                        $(dogInfoDiv).append("<h3>" + dog.dogName + "</h3>");
                        $(dogInfoDiv).append("<p> ID: <span class=\"dogId\">"+dog.dogId+"</span></p>");
                        $(dogInfoDiv).append("<p> Breed: " + dog.dogType + "</p>");
                        $(dogInfoDiv).append("<p> Size: " + dog.dogSize + "</p>");
                        $(dogInfoDiv).append("<p> " + dog.description + "</p>");
                        $(dogInfoDiv).append("<p> Price: $<span class=\"price\">" + dog.pricePerHour + "</span>" +
                            "<br> <input type=\"button\" class=\"viewDog\" value=\"More Info\">" +
                            "&nbsp&nbsp<input type=\"button\" class=\"chooseDog\" value=\"Add To Booking\"></p>");
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
        } else {
            undefinedError = true;
        }

        //The debug to report different format file
        if (undefinedError === true){
            alert("Please check the data structure of the animals.json file");
        }


    }

    function viewADog(e){
        var selectedDog = $(e.target).closest(".dogs");

        $(".viewDog").remove();
        window.localStorage.setItem("view", JSON.stringify($(selectedDog).html()));
        window.location.href = "../GUI/view.html";
    }

    pub.setup = function (){
        $("#pickupSelect").submit(getDogs);
        $(".availableDogs").on("click", ".viewDog", viewADog);
    };

    return pub;
}());

$(document).ready(Dogs.setup);