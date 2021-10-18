let DogAdmin = (function(){
    let pub= {};


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

    function editDog(e){
        $("#editDogDiv *").attr('disabled', false);
        $("#editDogBtn").attr('disabled', false);
        $("#addDogBtn").attr('disabled', true);
        let selectedDog = $(e.target).closest("tr");

        $("#dogId").val($(selectedDog).find("td:nth-child(1)").html());
        $("#dogId").attr('readonly', true);
        $("#dogId").addClass('readonly');
        $("#dogName").val($(selectedDog).find("td:nth-child(2)").html());
        $("#dogType").val($(selectedDog).find("td:nth-child(3)").html());
        $("#dogSize").val($(selectedDog).find("td:nth-child(4)").html());
        $("#dogDescription").val($(selectedDog).find("td:nth-child(5)").html());
        $("#dogPrice").val($(selectedDog).find("td:nth-child(6)").html());
    }

    function removeDog(e){
        $("#editDogDiv *").attr('disabled', true);
        let selectedDog = $(e.target).closest("tr").index();

        let action = 'processDogRemove.php';
        let data = { "indexDog": selectedDog};

        $.post(action, data, function(response) {
            console.log(response);
            window.location.reload();
        });
    }

    function addDog(e){
        $("#editDogDiv *").attr('disabled', false);
        $("#editDogBtn").attr('disabled', true);
        $("#addDogBtn").attr('disabled', false);


        $("#dogId").attr('readonly', false);
        $("#dogId").removeClass('readonly');
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