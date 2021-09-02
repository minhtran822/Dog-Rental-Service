var ViewDog = (function (){
    var pub ={};

    function loadView(){
        var dogDiv = document.createElement('div');
        $(dogDiv).addClass("dogs");
        if (window.localStorage.getItem("view")!== null){
            $(dogDiv).append(JSON.parse(window.localStorage.getItem("view")));
        } else {
            alert("Go back to dog view to choose a dog");
        }

        $("main").empty();
        $("main").append(dogDiv);
        $("main").append("<input type='button' onclick=\"window.location.href='../GUI/animals.html'\" style='float:right' value='Return'>");
    }

    pub.setup = function (){
        loadView();
    };

    return pub;
}());

$(document).ready(ViewDog.setup);