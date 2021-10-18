/*global $, alert, confirm, console */
// noinspection JSUnusedLocalSymbols,JSUnresolvedVariable,JSJQueryEfficiency

/**
 * Admin Dogs module to show administrative view of the dogs
 * and allow adding, editing and removing.
 *
 * Created by: Minh Tran, 17/10/2021
 */

let DogAdmin = (function(){
    "use strict";
    let pub= {};

    /**
     * Establish a connection to the booking.json files
     * to populate the table
     *
     * @param e The event representing the loading
     */
    function getDogTable() {
        console.log("Get DogTable called");
        let target = $(".dogTable");
        let jsonSource = "src/animals.json";
        $.ajax({
            type: "GET",
            url: jsonSource,
            cache: false,
            success: function(data) {
                loadDogTable(data, target);
            },
            error: function() {
                alert("Can't connect to the json");
            }
        });

        $("#editDogDiv *").attr('disabled', true);
    }

    /**
     * Load all the files in the data onto the admin page
     * Append the data into a table.
     *
     * @param data The data read from connected file
     * @param target the targeting table placeholder
     */
    function loadDogTable(data, target){
        let dogs, i, dog, undefinedError;
        let imageName;

        undefinedError = false;

        //Reset the dogs area
        $(target).empty();

        if (data.animals && data.animals.dogs) {
            dogs = data.animals.dogs;

            for (i = 0; i < dogs.length; i++) {
                dog = dogs[i];

                //Check if the dog object keys exist in the structure of json
                if (dog.dogName && dog.dogId && dog.dogSize && dog.description && dog.pricePerHour) {

                    //generate image source
                    imageName = dog.dogSize.toLowerCase();

                    let dogRow = document.createElement('tr');

                    //Create image from image source
                    $(dogRow).append("<td class='dogId'>"+dog.dogId+"</td>");
                    $(dogRow).append("<td>"+dog.dogName+"</td>");
                    $(dogRow).append("<td>"+dog.dogType+"</td>");
                    $(dogRow).append("<td>"+dog.dogSize+"</td>");
                    $(dogRow).append("<td>"+dog.description+"</td>");
                    $(dogRow).append("<td>"+dog.pricePerHour+"</td>");
                    $(dogRow).append("<td><button class='editDog'>Edit</button></td>");
                    $(dogRow).append("<td><button class='removeDog'>Remove</button></td>");

                    $(target).append(dogRow);

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

    /**
     * Enable and populate the div for editing the dog details
     *
     * @param e The event representing the loading
     */
    function editDog(e){
        $("#editDogDiv *").attr('disabled', false);
        $("#editDogBtn").attr('disabled', false);
        $("#addDogBtn").attr('disabled', true);
        let selectedDog = $(e.target).closest("tr");

        $("#dogId").val($(selectedDog).find("td:nth-child(1)").html())
            .attr('readonly', true)
            .addClass('readonly');
        $("#dogName").val($(selectedDog).find("td:nth-child(2)").html());
        $("#dogType").val($(selectedDog).find("td:nth-child(3)").html());
        $("#dogSize").val($(selectedDog).find("td:nth-child(4)").html());
        $("#dogDescription").val($(selectedDog).find("td:nth-child(5)").html());
        $("#dogPrice").val($(selectedDog).find("td:nth-child(6)").html());
    }

    /**
     * Remove a dog by redirecting booking index to another page.
     *
     * @param e The event representing the loading
     */
    function removeDog(e){
        $("#editDogDiv *").attr('disabled', true);
        let selectedDog = $(e.target).closest("tr").index();

        let action = 'processDogRemove.php';
        let data = { "indexDog": selectedDog};

        if(confirm("Are you sure you want to remove the selected dog?")) {
            $.post(action, data, function(response) {
                console.log(response);
                window.location.reload();
            });
        } else {
            console.log("uh");
        }
    }

    /**
     * Enable and populate the div for adding the dog details
     *
     * @param e The event representing the loading
     */
    function addDog(e){
        $("#editDogDiv *").attr('disabled', false);
        $("#editDogBtn").attr('disabled', true);
        $("#addDogBtn").attr('disabled', false);

        $("#dogId").val("").attr('readonly', false).removeClass('readonly');
        $("#dogName").val("");
        $("#dogType").val("");
        $("#dogSize").val("");
        $("#dogDescription").val("");
        $("#dogPrice").val("");
    }

    pub.setup = function () {
        getDogTable();

        $(".dogTable").on("click", ".editDog", editDog);
        $(".dogTable").on("click", ".removeDog", removeDog);
        $("#addDog").on("click", addDog);
    };
    return pub;
}());

$(document).ready(DogAdmin.setup);