var Dogs = (function(){
    var pub = {};

    function getDogs() {
        console.log("Get Dogs called");
        var target = $("main")
        var imgSource = $($(this).parent().find('img')[0]).attr('src');
        var jsonSource = "../src/animals.json";


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
        var imageSource, imageName;

        undefinedError = false;

        //Reset the dogs area
        $(target).empty();
        console.log("Ok here");

        animals = data.animals;

        //TODO: Expand to other animals if possible
        if(animals.dogs!==undefined) {
            dogs = animals.dogs;

            for (i = 0; i < dogs.length; i++) {
                dog = dogs[i];

                if(dog.dogName !== undefined &&
                        dog.dogId!== undefined &&
                        dog.dogSize!==undefined &&
                        dog.dogType!== undefined &&
                        dog.description !== undefined &&
                        dog.pricePerHour!== undefined) {

                    //generate image source
                    imageName = dog.dogSize.toLowerCase();

                    var dogDiv = document.createElement('div');
                    var dogInfoDiv = document.createElement('div');
                    $(dogDiv).addClass("dogs");
                    $(dogInfoDiv).addClass("dogInfo")

                    //Create image from image source
                    $(dogDiv).append("<img src='../images/"+ imageName+".jpg' alt='" +dog.dogType + "'>");

                    //Create div dog info
                    $(dogInfoDiv).append("<h3>" + dog.dogName + "</h3>");
                    $(dogInfoDiv).append("<p> ID: " + dog.dogId + "</p>");
                    $(dogInfoDiv).append("<p> Breed: " + dog.dogType + "</p>");
                    $(dogInfoDiv).append("<p> Size: " + dog.dogSize + "</p>");
                    $(dogInfoDiv).append("<p> " + dog.description + "</p>");
                    $(dogInfoDiv).append("<p> Price: $<span class=\"price\">" + dog.pricePerHour + "</span>" +
                        " <input type=\"button\" class=\"chooseDog\" value=\"Select\"></p>");
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
        $("main").onload=getDogs();
    };

    return pub;
}());

$(document).ready(Dogs.setup);