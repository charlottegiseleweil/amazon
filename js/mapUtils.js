'use strict';

function map_styling(){

  function shpStyle(feature) {
    return {
        fillColor: 'white',
        weight: 3,
        opacity: 2,
        color: '#aa0a1f',
        Array: '0',
        fillOpacity: 0
        };
    }

    function blueShpStyle(feature) {
    return {
        fillColor: 'lightblue',
        weight: 3,
        opacity: 2,
        color: 'blue',
        Array: '0',
        fillOpacity: .2
        };
    }

    window.shpStyle = shpStyle;
    window.blueShpStyle = blueShpStyle;



    // Below this is old stuffs

    function getColor(d) {
    return d > 200  ? '#E31A1C' :
           d > 100   ? '#FED976' :
                      '#FFEDA0';
    };

//Watersheds

    function watershedStyle(d) {
    return d > 100000  ? '#5ADBFF' :
           d > 35000  ? '#3C6997' :
           d > 12000   ? '#62B6CB' :
           d > 9000   ? '#7E78D2' :
           d > 5000   ? '#CAE9FF' :
                      '#1B4965';
    }


    function WSHEDstyle(feature) {
    return {
        fillColor: watershedStyle(feature.properties.AREA),
        weight: 2,
        opacity: 2,
        color: 'white',
        Array: '2',
        fillOpacity: 0.7
        };
    }

//AOI
    function AOIstyle(feature) {
    return {
        fillColor: 'None',
        weight: 2,
        opacity: 2,
        color: 'black',
        Array: '5',
        fillOpacity: 0.7
        };
    } 


//Rec
    function recStyle(d) {
    return d > 3  ? 'black' :
           d > 1  ? '#3f007d' :
           d > 0.1   ? '#7261ab' :
           d > 0.01   ? '#b3b3d6' :
           d > 0   ? '#edecf4' :
                      'None';
    }

    function RECstyle(feature) {
    return {
        fillColor: recStyle(feature.properties.PUD_YR_AVG),
        weight: 0,
        opacity: 2,
        color: 'None',
        Array: '0',
        fillOpacity: 0.7
        };
    }
// LULC
    function LuStyle(d) {
    return d == 17  ? '#a5bfdd' : // water
           d == 2  ? '#3bb461' :  // bosque
           d == 1   ? '#0f6837' : // bosque
                      '#fdbf6f';    // None is orange
    }

    function LUstyle(feature) {
    return {
        fillColor: LuStyle(feature.properties.LU_Code),
        weight: 0,
        opacity: 2,
        color: 'None',
        Array: '0',
        fillOpacity: 0.7
        };
    }


    window.WSHEDstyle = WSHEDstyle;
    window.AOIstyle = AOIstyle;
    window.RECstyle = RECstyle;
    window.LUstyle = LUstyle;
}; 



/*function mapLayers(){
    
    var layers = []
	map_styling()


	function shapefileLayer(variable,style=shpStyle){
        layers[variable] = new L.Shapefile("../data/shapefiles/"+variable+".zip",{
            style: style},{
            onEachFeature: function(feature, layer) {}
          });
    };

    var tileset = "None"
    function tilesetLayer(variable, attribution){
        tileset = "https://charlottegiseleweil.github.io/tiles/amazon/"+variable+"/{z}/{x}/{y}.png";
        layers[variable] = L.tileLayer(tileset, {
            attribution: attribution});
    };

    window.shapefileLayer = shapefileLayer;
    window.tilesetLayer = tilesetLayer;
    window.mapLayers = mapLayers;
};*/