var Booking = (function (){
   var pub = {};

   function addBooking(e){
      var selectedDog = $(e.target).closest(".dogInfo").find(".dogId");
      var currentBooking = JSON.parse(window.localStorage.getItem("currentBooking"));
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

      window.localStorage.setItem("currentBooking", JSON.stringify(items));
   }

   function viewBooking(e){
      $("#bookingDetails").append(
          "<p>Pickup time: "+window.localStorage.getItem("time")+"</p>"+
          "<p>Number of hours: "+window.localStorage.getItem("hours")+"</p>"+
          "<p>Items: </p>"
      );

      var itemsDiv = document.createElement('div');
      $(itemsDiv).addClass("items");

      loadItems(itemsDiv);

      $("#bookingDetails").append(itemsDiv);
   }

   function loadItems(itemsDiv){

      var items = JSON.parse(window.localStorage.getItem("currentBooking"));
      console.log(Array.isArray(items));
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
      var items = JSON.parse(window.localStorage.getItem("currentBooking"));

      items.splice(index,1);
      window.localStorage.setItem("currentBooking", JSON.stringify(items));

      location.reload();
   }

   function saveBooking(e){
      var booking;
      if($("bookingNameError").html()!== ""){
         booking = {
            items:  JSON.parse(window.localStorage.getItem("currentBooking")),
            name: $("#bookingName").val(),
            pickup: window.localStorage.getItem("time"),
            numHours: window.localStorage.getItem("hours")
         };

         window.localStorage.clear();
         window.localStorage.setItem("booking", JSON.stringify(booking));
         alert("Saving Successful");
      }
   }

   pub.setup = function (){
      $("main").on("click", ".chooseDog", addBooking);
      $("#bookingDetails").onload = viewBooking();
      $("#bookingDetails").on("click", ".remove", removeBooking);
      $("#bookingInfo").submit(saveBooking);
   }

   return pub;
}());

$(document).ready(Booking.setup);