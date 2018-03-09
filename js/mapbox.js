var lngClicked;
var latClicked;
mapboxgl.accessToken = 'pk.eyJ1IjoibGluZGF5dTA0MDgiLCJhIjoiY2pheDJkcXBlMHU3ZDJ2bWt3anRwYjlsYSJ9.ZK0gnYjN1c3KmgCHsgVSPA';

// var bounds = [
//     [-118.57595008433506,33.7646377460411], // Southwest coordinates
//     [-118.10162253119124,34.32597494499382]  // Northeast coordinates
// ];

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    zoom: 9,
    center: [-118.2437, 34.0522],
    //maxBounds: bounds
});

map.on('load', function () {
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    LoadLayer();

    // map.addLayer({
    //     'id': 'MapLayer',
    //     'type': 'fill',
    //     'source': {
    //         'type': 'geojson',
    //         'data': 'http://jonsnow.usc.edu/airnow.php?type=GEOJSON&timeString=2017-05-08%2009:00:00'
    //     },
    //     'layout': {},
    //     'paint': {
    //         "fill-color": {
    //             "property": "z",
    //             "type": "exponential",
    //             "stops": [
    //                 [40, "rgb(0,0,0)"],
    //
    //                 [48, "rgb(100,100,100)"],
    //                 [49, "rgb(150,150,150)"],
    //                 [50, "rgb(200,200,200)"],
    //                 [60, "rgb(255,255,255)"]
    //             ]
    //         }
    //     },
    //     'visibility':'none'
    //     // This is the important part of this example: the addLayer
    //     // method takes 2 arguments: the layer as an object, and a string
    //     // representing another layer's name. if the other layer
    //     // exists in the stylesheet already, the new layer will be positioned
    //     // right before that layer in the stack, making it possible to put
    //     // 'overlays' anywhere in the layer stack.
    //     // Insert the layer beneath the first symbol layer.
    // }, firstSymbolId);
    // map.setLayoutProperty('MapLayer', 'visibility', 'none');
});
//Add zoom and rotation controls to the map.

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('click', 'MapLayer', function (e) {
    // get location
    //console.log(e);
    //console.log(e.features);
    var lngClicked = e.lngLat.lng;
    var latClicked = e.lngLat.lat;
    var timeClicked = document.getElementById("timeSelected").innerHTML;
    var aqiValue = e.features[0].properties.result;

    //var url = "http://jonsnow.usc.edu/airnow.php?latitude="+latClicked+"&longitude="+lngClicked+"&timeString=\""+timeClicked+"\"";
    //console.log(e.lngLat.lng, e.lngLat.lat, e.features[0].properties.z);

    if (map.getLayer('MapLayer')){
        msgPopup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML("Longitude: "+lngClicked.toFixed(3)+"<br />" + "Latitude: "+latClicked.toFixed(3)+"<br />" +
                "Time: " + timeClicked + "<br />" + "Result: "+aqiValue)
            .addTo(map);
    }

    //console.log(url);
    // var xmlhttp;
    // if (window.XMLHttpRequest)
    // {// code for IE7+, Firefox, Chrome, Opera, Safari
    //     xmlhttp=new XMLHttpRequest();
    // }
    // else
    // {// code for IE6, IE5
    //     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    // }
    // xmlhttp.onreadystatechange=function()
    // {
    //     if (xmlhttp.readyState==4 && xmlhttp.status==200)
    //     {
    //         console.log(xmlhttp.responseText);
    //         jsonObj = JSON.parse(xmlhttp.responseText);
    //         result = jsonObj["result"];
    //         if(result == ""){
    //             result = "No data at this time";
    //         }
    //         new mapboxgl.Popup()
    //             .setLngLat(e.lngLat)
    //             .setHTML("longitude: "+e.lngLat.lng.toFixed(3)+"<br />" + "latitude: "+e.lngLat.lat.toFixed(3)+"<br />" + "result: "+result)
    //             .addTo(map);
    //     }
    // };
    // xmlhttp.open("GET",url,true);
    // xmlhttp.send();
});