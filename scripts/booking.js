/*global alert, console, confirm, $ */
// noinspection JSJQueryEfficiency,JSUnusedLocalSymbols

/**
 * Booking module to show all the bookings from files
 *
 * Created by: Minh Tran, 04/09/2021
 */

let Booking = (function (){
   "use strict";
   let pub = {};

   /**
    * Add the selected dogs into the booking list and save the list into sessionStorage
    *
    * @param e The event representing the button clicked
    */
   function addBooking(e){
      let selectedDog = $(e.target).closest(".dogInfo").find(".dogId");
      let currentBooking = JSON.parse(window.sessionStorage.getItem("currentBooking"));
      let items = [];

      if(currentBooking !== null){
         if(Array.isArray(currentBooking)){
            currentBooking.forEach(function (current) {
               items.push(current);
            });
         } else {
            items.push(currentBooking);
         }
      }

      //Prevent more than 3 dogs selected
      if(items.length < 3){
         //Prevent selecting the dog twice in a booking
         if(!items.includes(($(selectedDog).html()))){

            items.push(($(selectedDog).html()));
         } else {
            alert("You have selected this dog");
         }
      } else {
         alert("You have added the full limit of 3 dogs");
      }

      window.sessionStorage.setItem("currentBooking", JSON.stringify(items));

      viewBooking();
   }

   /**
    * Load the data from sessionStorage to view the current booking details
    *
    * @param e The event representing the loading
    */
   function viewBooking(e){
      //Load the pickup details
      $("#bookingDetails").empty().append(
          "<p>Pickup time: "+window.sessionStorage.getItem("time")+"</p>"+
          "<p>Number of hours: "+window.sessionStorage.getItem("hours")+"</p>"+
          "<p>Items: </p>"
      );

      let itemsDiv = document.createElement('div');
      $(itemsDiv).addClass("items");

      //Load the booking list details
      loadItems(itemsDiv);

      $("#bookingDetails").append(itemsDiv);
   }

   /**
    * Load the booking list data from sessionStorage
    *
    * @param itemsDiv Html container to load the items into
    */
   function loadItems(itemsDiv){
      //Access the booking list
      let items = JSON.parse(window.sessionStorage.getItem("currentBooking"));
      $(itemsDiv).empty();
      if(Array.isArray(items)){
         items.forEach(function(item){
            console.log("ok");
            $(itemsDiv).append("<p>"+item+"<input type='button' class='remove' value='remove'></p>");
         });
      }

   }

   /**
    * Remove a dog from the list
    *
    * @param e The event representing the button clicked
    */
   function removeBooking(e){
      let index = $(e.target).parent().index();
      let items = JSON.parse(window.sessionStorage.getItem("currentBooking"));

      items.splice(index,1);

      //Overwrite with new dog list after removal
      window.sessionStorage.setItem("currentBooking", JSON.stringify(items));

      viewBooking();
   }

   /**
    * Clear data for new booking upon confirmation received
    *
    * @param e The event representing the button clicked
    */
   function newBooking(e){
      if(confirm("Are you sure you want to delete current booking and make a new one?")) {
         $("form#pickupSelect *").attr('disabled', false);
         window.sessionStorage.clear();
         window.location.reload();
      } else {
         console.log("uh");
      }
   }

   /**
    * Require confirmation upon redirection of page
    * Used for exiting an existing booking
    *
    * @param e The event representing the button clicked
    */
   function redirectPrevention(e){
      e.preventDefault();
      if(confirm("Are you sure you want to move to a new page? \n The current booking won't be saved")) {
         $("form#pickupSelect *").attr('disabled', false);
         window.sessionStorage.clear();
         window.location.href = $(e.target).attr("href");
      } else {
         console.log("uh");
      }
   }

   /**
    * Save the current booking into the localStorage
    *
    * @param e The event representing the button clicked
    */
   pub.saveBooking= function (e){
      let booking;
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
            //window.location.reload();
         }

      }
   };

   pub.setup = function (){
      $("#pickupSelect").submit(viewBooking);
      $("main").on("click", ".chooseDog", addBooking);
      viewBooking();
      $("#bookingDetails").on("click", ".remove", removeBooking);
      $("#newBooking").click(newBooking);
      $("nav a").click(redirectPrevention);
      $("#loginForm a").click(redirectPrevention);
   };

   return pub;
}());

$(document).ready(Booking.setup);