// noinspection JSUnusedLocalSymbols,HttpUrlsUsage
/* global $, L, alert, console */

/**
 * Map module create an interactive map
 * Allowing loading map data from file, show/hide map data and focus on a data point
 *
 * Created by: Minh Tran, 04/09/2021
 */

let InteractiveMap = (function() {
    "use strict";
    let pub ={};
    let map;
    let dataPoint;

    /**
     * Establish a connection to the geojson files.
     */
    function getCoordinates(){
        let jsonSource = "../src/POI.geojson";

        $.ajax({
            type: "GET",
            url: jsonSource,
            cache: false,
            success: function(data) {
                loadPOI(data);
            },
            error: function() {
                alert("Can't connect to the json");
            }
        });
    }

    /** Load the data entry from the geojson file into map
     *
     * @param data The data from the geojson
     */
    function loadPOI(data){
        let i;

        dataPoint=[];
        // noinspection JSJQueryEfficiency
        $("#pointsOfInterest").empty();

        //Look for the key in the file
        if(data.features){
            /* Going through all the location stored
            Looping by each item to synchronise the index of the location stored with the marker
            as in an array.
             */
            for (i = 0; i < data.features.length; i++){
                //Append the markers onto the map
                dataPoint[i] = L.geoJSON(data.features[i]).addTo(map);
                dataPoint[i].bindPopup("<h3>"+data.features[i].properties.name+"</h3>"+
                    "<p>"+data.features[i].properties.type+"</p>");

                //Append location and its html elements onto the list
                $("#pointsOfInterest").append("<li><p class=\"location\">" + data.features[i].properties.name +
                    "<i> - "+data.features[i].properties.type+"</i>"+
                    "<input type=\"button\" class=\"showOnMap\" value=\"Show on map\">"+
                    "<input type=\"checkbox\" class=\"showHide\" name=\"checkbox\" checked></p></li>");
            }
        } else {
            alert("Please check that your geojson file has correct structure");
        }
    }

    /** Show or hide the marker using the checkbox
     *
     * @param e The event representing the checkbox change
     */
    function showHideMarker(e){
        let index = $(e.target).parent().parent().index();
            if($(e.target).is(':checked')){
                map.addLayer(dataPoint[index]);
            } else {
                map.removeLayer(dataPoint[index]);
            }
    }

    /** Output the coordinate of the point clicked in the map
     * Mainly for finding out coordinate in developmental process
     *
     * @param e The event representing the mouse click
    */
    function onMapClick(e){
        console.log(e.latlng);
    }

    /** Focus on the marker selected on the map
     *
     * @param e The event representing the button click
     */
    function centreMap(e){
        let index = $(e.target).parent().parent().index();

        map.flyTo(dataPoint[index].getBounds().getCenter(),15);
    }

    pub.setup = function(){
        //Create the map
        map = L.map('map').setView([-45.865, 170.516], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18,
                attribution: 'Map data &copy; '+
                    '<a href="http://www.openstreetmap.org/copyright">' +
                    'OpenStreetMap contributors</a> CC-BY-SA'
            }).addTo(map);

        //Call the function to load from the file
        getCoordinates();

        //Calling this function is for developmental purpose only, comment out of final product
        //map.on('click',onMapClick);


        // noinspection JSJQueryEfficiency
        $("#pointsOfInterest").on("change",".showHide",showHideMarker);
        // noinspection JSJQueryEfficiency
        $("#pointsOfInterest").on("click",".showOnMap",centreMap);
    };

    return pub;
}());

$(document).ready(InteractiveMap.setup);