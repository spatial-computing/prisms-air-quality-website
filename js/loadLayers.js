function LoadLayer(){

    document.getElementById("alertMsgTime").innerHTML = "";
    if (map.getLayer('MapLayer')){
        map.removeLayer('MapLayer');
    }
    if (map.getSource('MapLayerSource')){
        map.removeSource('MapLayerSource');
    }

    var timeClicked = document.getElementById("timeSelected");
    var slider = document.getElementById("timeRange");
    var inputString = $(document.getElementById("dateFormat")).combodate('getValue');
    //console.log("this is inputstring" + inputString);
    var tempList = inputString.split('-');
    var newString = tempList[0] + "-" + tempList[1] + "-" + tempList[2] + " " + tempList[3] + ":00:00";
    //console.log(newString); //YYYY-MM-DD-HH-00-00

    var monthDaysNum = [0,31,59,90,120,151,181,212,243,273,304,334];
    sliderValue = (parseInt(tempList[0]) - 2017)*8760+monthDaysNum[parseInt(tempList[1])-1]*24+parseInt(tempList[2])*24+parseInt(tempList[3])+2184;
    console.log(sliderValue);
    if(sliderValue < 0){
        newDate = new Date("2016/10/01 00:00:00");
        $(document.getElementById("dateFormat")).combodate('setValue', newDate);
        slider.value = 0;
        newString = "2016-10-01 00:00:00";
        document.getElementById("alertMsgTime").innerHTML = "Out of the Range!";
    }
    else if(sliderValue > 8760){
        newDate = new Date("2017/10/01 00:00:00");
        $(document.getElementById("dateFormat")).combodate('setValue', newDate);
        slider.value = 8760;
        newString = "2017-10-01 00:00:00";
        document.getElementById("alertMsgTime").innerHTML = "Out of the Range!";
    }
    else{
        slider.value = sliderValue;
    }
    timeClicked.innerHTML = newString;
    //slider.oninput = (parseInt(tempList[0]) *1 + parseInt(tempList[1])* 1 + parseInt(tempList[2]));
    var url_file_exist = 'http://jonsnow.usc.edu/airnow.php?type=GEOJSON&fileExist='+newString;
    //console.log(url_file_exist);
    //var url_file_exist = 'http://jonsnow.usc.edu/airnow.php?type=GEOJSON&fileExist='+timeClicked;
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState===4 && xmlhttp.status===200)
        {
            //console.log(xmlhttp.responseText);
            if(xmlhttp.responseText === "1"){
                //$('#timeRange').popover('hide');
                document.getElementById("alertMsg").innerHTML = "";
                LoadLayerAfter(newString);
            }
            else{
                document.getElementById("alertMsg").innerHTML = "No EPA Data this time.";
                //output.innerHTML += "\nNo Data at this time.";
                //$('#timeRange').popover('show');
            }
        }
    };
    xmlhttp.open("GET",url_file_exist,true);
    xmlhttp.send();
}

function LoadLayerAfter(x) {
    var timeClicked = document.getElementById("timeSelected").innerHTML;


    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    //var url = 'http://jonsnow.usc.edu/airnow.php?type=GEOJSON&timeString='+timeClicked;
    var url = 'http://jonsnow.usc.edu/airnow.php?type=GEOJSON&timeString='+x;
    //console.log(url);

    if (map.getLayer('MapLayer')){
        map.removeLayer('MapLayer');
    }
    if (map.getSource('MapLayerSource')){
        map.removeSource('MapLayerSource');
    }

    map.addSource('MapLayerSource', {
        type: 'geojson',
        data: url
    });
    map.addLayer({
        'id': 'MapLayer',
        'type': 'fill',
        'source': 'MapLayerSource',
        'layout': {},
        'paint': {
            "fill-color": {
                "property": "result",
                "type": "exponential",
                "stops": [
                    [10, "White"],
                    [20, "Green"],
                    [30, "Yellow"],
                    [40, "Orange"],
                    [50, "Red"],
                    [60, "Purple"],
                    [70, "Maroon"]
                ]
            }
        }
        // This is the important part of this example: the addLayer
        // method takes 2 arguments: the layer as an object, and a string
        // representing another layer's name. if the other layer
        // exists in the stylesheet already, the new layer will be positioned
        // right before that layer in the stack, making it possible to put
        // 'overlays' anywhere in the layer stack.
        // Insert the layer beneath the first symbol layer.
    }, firstSymbolId);
    map.setLayoutProperty('MapLayer', 'visibility', 'visible');
    //$('#loadButton').popover('hide')
}