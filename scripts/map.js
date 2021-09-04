var Map = (function() {
    var pub ={};
    var map;

    function getCoordinates(e){
        console.log("Get Coordinates called");
        var target = $(".reviews")
        var jsonSource = "../src/POI.geojson";


        $.ajax({
            type: "GET",
            url: jsonSource,
            cache: false,
            success: function(data) {
                loadPOI(data, target);
            },
            error: function() {
                alert("Can't connect to the json");
            }
        });
    }

    function loadPOI(data, target){

        var i, dataPoint;

        dataPoint=[];
        if(data.features){
            for (i = 0; i < data.features.length; i++){
                dataPoint[i] = L.geoJSON(data.features[i]).addTo(map);
                dataPoint[i].bindPopup("<h3>"+data.features[i].properties.name+"</h3>"
                    +"<p>"+data.features[i].properties.type+"</p>");
            }
        }
    }

    function onMapClick(e){
        console.log(e.latlng);
    }

    function centreMap(e){

    }

    pub.setup = function(){

        map = L.map('map').setView([-45.865, 170.516], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            { maxZoom: 18,
                attribution: 'Map data &copy; '+
                    '<a href="http://www.openstreetmap.org/copyright">' +
                    'OpenStreetMap contributors</a> CC-BY-SA'
            }).addTo(map);

        getCoordinates();

        map.on('click',onMapClick);
    };

    return pub;
}());

$(document).ready(Map.setup);