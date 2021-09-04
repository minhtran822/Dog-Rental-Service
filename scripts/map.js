var Map = (function() {
    var pub ={};
    var map;
    var dataPoint;

    /* connect and open the geojson file */
    function getCoordinates(){
        var jsonSource = "../src/POI.geojson";

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

    /* Load the data entry from the geojson file into map*/
    function loadPOI(data){
        var i;

        dataPoint=[];
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
                dataPoint[i].bindPopup("<h3>"+data.features[i].properties.name+"</h3>"
                    +"<p>"+data.features[i].properties.type+"</p>");

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

    /* Show or hide the marker using the checkbox */
    function showHideMarker(e){
        var index = $(this).parent().parent().index();
            if($(this).is(':checked')){
                map.addLayer(dataPoint[index]);
            } else {
                map.removeLayer(dataPoint[index]);
            }
    }

    /* Output the coordinate of the point clicked in the map
    Mainly for finding out coordinate
    */
    function onMapClick(e){
        console.log(e.latlng);
    }

    /* Focus on the marker selected on the map */
    function centreMap(e){
        var index = $(this).parent().parent().index();

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

        $("#pointsOfInterest").on("change",".showHide",showHideMarker);
        $("#pointsOfInterest").on("click",".showOnMap",centreMap);
    };

    return pub;
}());

$(document).ready(Map.setup);