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
         items.push(JSON.stringify($(selectedDog).html()));
      } else {
         alert("You have added the full limit of 3 dogs");
      }

      window.localStorage.setItem("currentBooking", JSON.stringify(items));
   }

   pub.setup = function (){

      $("main").on("click", ".chooseDog", addBooking);
   }

   return pub;
}());

$(document).ready(Booking.setup);