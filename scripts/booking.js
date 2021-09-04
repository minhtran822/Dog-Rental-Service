var Booking = (function (){
   var pub = {};

   function addBooking(e){
      var selectedDog = $(e.target).closest(".dogInfo").find(".dogId");
      var currentBooking = JSON.parse(window.sessionStorage.getItem("currentBooking"));
      var items = [];

      if(currentBooking !== null){
         if(Array.isArray(currentBooking)){
            items.push(...currentBooking);
         } else {
            items.push(currentBooking);
         }
      }

      if(items.length < 3){
         if(!items.includes(JSON.stringify($(selectedDog).html()))){

            items.push(JSON.stringify($(selectedDog).html()));
         } else {
            alert("You have selected this dog");
         }
      } else {
         alert("You have added the full limit of 3 dogs");
      }

      window.sessionStorage.setItem("currentBooking", JSON.stringify(items));

      viewBooking();
   }

   function viewBooking(e){
      $("#bookingDetails").empty().append(
          "<p>Pickup time: "+window.sessionStorage.getItem("time")+"</p>"+
          "<p>Number of hours: "+window.sessionStorage.getItem("hours")+"</p>"+
          "<p>Items: </p>"
      );

      var itemsDiv = document.createElement('div');
      $(itemsDiv).addClass("items");

      loadItems(itemsDiv);

      $("#bookingDetails").append(itemsDiv);
   }

   function loadItems(itemsDiv){

      var items = JSON.parse(window.sessionStorage.getItem("currentBooking"));
      $(itemsDiv).empty();
      if(Array.isArray(items)){
         items.forEach(function(item){
            console.log("ok");
            $(itemsDiv).append("<p>"+item+"<input type='button' class='remove' value='remove'></p>");
         });
      }

   }

   function removeBooking(e){

      var index = $(this).parent().index();
      var items = JSON.parse(window.sessionStorage.getItem("currentBooking"));

      items.splice(index,1);
      window.sessionStorage.setItem("currentBooking", JSON.stringify(items));

      viewBooking();
   }



   function newBooking(e){
      //e
      if(confirm("Are you sure you want to delete current booking and make a new one?")) {
         $("form#pickupSelect *").attr('disabled', false);
         window.sessionStorage.clear();
         window.location.reload();
      } else {
         console.log("uh");
      }
   }

   function redirectPrevention(e){
      e.preventDefault();
      if(confirm("Are you sure you want to move to a new page? \n The current booking won't be saved")) {
         $("form#pickupSelect *").attr('disabled', false);
         window.sessionStorage.clear();
         window.location.href = $(this).attr("href");
      } else {
         console.log("uh");
      }
   }

   pub.saveBooking= function (e){
      var booking;
      if($("bookingNameError").html()!== ""){
         booking = {
            items:  JSON.parse(window.sessionStorage.getItem("currentBooking")),
            name: $("#bookingName").val(),
            pickup: window.sessionStorage.getItem("time"),
            numHours: window.sessionStorage.getItem("hours")
         };

         if(!(booking.items && booking.pickup && booking.numHours)){
            $("#bookingSaveError").html("Please choose date, time and some items before saving");
         } else {
            $("#bookingSaveError").html("");
            window.sessionStorage.clear();
            window.localStorage.setItem("booking", JSON.stringify(booking));
            alert("Booking saved");
            window.location.reload();
         }

      }
   }

   pub.setup = function (){
      $("#pickupSelect").submit(viewBooking);
      $("main").on("click", ".chooseDog", addBooking);
      viewBooking();
      $("#bookingDetails").on("click", ".remove", removeBooking);
      $("#newBooking").click(newBooking);
      $("nav a").click(redirectPrevention);
      $("#loginForm a").click(redirectPrevention);
   }

   return pub;
}());

$(document).ready(Booking.setup);