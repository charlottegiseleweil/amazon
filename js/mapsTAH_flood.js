// - - - - - - -
// Land use maps
// - - - - - - -

var tileset_LULC_TAH_Sost = 
    "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_TAH_Sostenible/{z}/{x}/{y}.png"

var tileset_LULC_MAP_Hoy =
    "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_MAP/{z}/{x}/{y}.png";

var tileset_LULC_TAH_Peor =
    "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_TAH_Peor/{z}/{x}/{y}.png";


var LULC_MAP_Hoy = L.tileLayer(tileset_LULC_MAP_Hoy, {
    attribution: "Current Land Cover Map [PRO-Agua]"
});

var LULC_MAP_Hoy_background = L.tileLayer(tileset_LULC_MAP_Hoy, {
    attribution: "Current Land Cover Map [PRO-Agua]"
});

var LULC_TAH_Sost = L.tileLayer(tileset_LULC_TAH_Sost, {
    attribution: "Co-desarollado Escenario Sostenible [PRO-Agua]"
});

var LULC_TAH_Peor = L.tileLayer(tileset_LULC_TAH_Peor, {
    attribution: "Co-desarollado Escenario Peor [PRO-Agua]"
});

    
// - - - - - - -
// Basemaps
// - - - - - - -

var basemap = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
);

var basemap2 = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
    {attribution: "OpenStreetMap"}
);

// - - - - - - -
// Launch maps
// - - - - - - -
var map1 = L.map("map1", {
    layers: [basemap],// LULC_MAP_Hoy,labels],
    center: [-11.27, -70.29],
    zoom: 8
});

var map2 = L.map("map2", {
    layers: [basemap2],// LULC_PEM_Sost,labels2],
    center: [-11.27, -70.29],
    zoom: 8,
    zoomControl: false
});

// - - - - - - -
// Add labels
// - - - - - - -
map1.createPane('labels');
map1.getPane('labels').style.zIndex = 2000;
map1.getPane('labels').style.pointerEvents = 'none';
var labels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    pane: 'labels'
});

map2.createPane('labels');
map2.getPane('labels').style.zIndex = 2000;
map2.getPane('labels').style.pointerEvents = 'none';
var labels2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    pane: 'labels'
});



map1.sync(map2);
map2.sync(map1);

// Add scale
L.control.scale({position: 'bottomleft'}).addTo(map1)


// - - - - - - -
// Shapefiles
// - - - - - - -

// Add shapefile or area AOI de enfoque
var layers = []
map_styling();
////// Shapefile layers -- make Styles in mapUtils.js/////
function shapefileLayer(layerName, shapefileName,style=shpStyle){
    layers[layerName] = new L.Shapefile("data/shapefiles/"+shapefileName+".zip",{
        style: style},{
        onEachFeature: function(feature, layer) {}
        });
    }; 


// Rivers
shapefileLayer("corrientes","corrientes",riverStyle);
layers["rivers"] = layers["corrientes"];

// - - - - - - -
// Indice Flood
// - - - - - - -

shapefileLayer("Flood10yrBase","Floodplain_10yr_return_from_DEM_TAH",floodBaseStyle);
shapefileLayer("Flood10yr","Floodplain_10yr_return_from_DEM_TAH",floodBaseStyle);
shapefileLayer("Flood50yrBase","Floodplain_50yr_return_from_DEM_TAH",floodBaseStyle);
shapefileLayer("Flood50yr","Floodplain_50yr_return_from_DEM_TAH",floodBaseStyle);
shapefileLayer("Flood100yrBase","Floodplain_100yr_return_from_DEM_TAH",floodBaseStyle);
shapefileLayer("Flood100yr","Floodplain_100yr_return_from_DEM_TAH",floodBaseStyle);

//AOI box
shapefileLayer("AOI_box_bl","AOI_TAH",AOIBaseStyle);
shapefileLayer("AOI_box","AOI_TAH",AOIBaseStyle);

    
    


// - - - - - - - - - - - -
// Functions to switch Maps
// - - - - - - - - - - - - 

function updateMap1(mode) {
  let year = $('input[name=yr]:checked').val();
  if (mode == 'LU') {
      // remove possibility to see flood
      document.getElementById("controlyr").style.visibility = "hidden";
      // Remove layers
      map1.eachLayer(function(layer) {
        if (layer._url !="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        ) {
          map1.removeLayer(layer);
        }
      });

      // Add layers
      lyr = LULC_MAP_Hoy;
      lyr.addTo(map1);
      labels.addTo(map1);
      let aoi_lyr = layers["AOI_box_bl"];
      aoi_lyr.addTo(map1);
  }
  else if (mode == "Flood") {
    // add possibility to see flood
    document.getElementById("controlyr").style.visibility = "visible";
    // Remove layers
    map1.eachLayer(function(layer) {
      if (layer._url !="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
      ) {
        map1.removeLayer(layer);
        
      }
    });

    // Add layers
    lyr = LULC_MAP_Hoy;
    lyr.addTo(map1);
   

    // Add flood
    // Pick layer to add (according to year)
    if (year == "10") {
      lyr = layers["Flood10yrBase"];
    } else if (year == "50") {
      lyr = layers["Flood50yrBase"];
    } else {//if year = 100
      lyr = layers["Flood100yrBase"];
    }
    
    lyr.addTo(map1);

    let aoi_lyr = layers["AOI_box_bl"];
    aoi_lyr.addTo(map1);

    //Add labels
    labels.addTo(map1);

  }
  else {
    console.log("Unknown mode : "+mode)
  }
};

function updateMap2(mode,scenario,year) {
  scenario = $('input[name=escenarios]:checked').val();
  year = $('input[name=yr]:checked').val();

  console.log("Updating map2 with scenario " + scenario);

  if (mode == 'LU') {
        // Remove layers
        map2.eachLayer(function(layer) {
            if (layer._url !="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
            ) {
            map2.removeLayer(layer);
            }
        });

       // Add Background
        //LULC_MAP_Hoy_background.addTo(map2);
       
        // Pick layer to add (according to scenario)
        if (scenario == "Peor") {
            var lyr = LULC_TAH_Peor;
        } else {//if (scenario == "Sost") {
            var lyr = LULC_TAH_Sost;
        }

        // Add layers
        lyr.addTo(map2);
        labels2.addTo(map2);
        let aoi_lyr = layers["AOI_box"];
        aoi_lyr.addTo(map2);
  }
  else if (mode == "Flood") {
    // Remove layers
    map2.eachLayer(function(layer) {
        if (layer._url !="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        ) {
          map2.removeLayer(layer);
        }
      });

    // Add Background
    //LULC_MAP_Hoy_background.addTo(map2);
    

    // Pick layer to add (according to scenario)
    if (scenario == "Peor") {
        var lyr = LULC_TAH_Peor;
      } else {//if (scenario == "Sost") {
        var lyr = LULC_TAH_Sost;
      }


    // Add LU
    lyr.addTo(map2);

    // Add flood
    // Pick layer to add (according to year)
    if (year == "10") {
      lyr = layers["Flood10yr"];
    } else if (year == "50") {
      lyr = layers["Flood50yr"];
    } else {//if year = 100
      lyr = layers["Flood100yr"];
    }
    
    lyr.addTo(map2);
    labels2.addTo(map2);

    let aoi_lyr = layers["AOI_box"];
    aoi_lyr.addTo(map2);

  }
  else {
    console.log("Unknown mode : "+mode)
  }
};

function changeYr(){
  updateMap1("Flood");
  updateMap2("Flood","Peor","10");

  changeData($('input[name=yr]:checked').val());
  document.getElementById("chart_header").innerHTML = "Área expuesta a inundaciones de "+ $('input[name=yr]:checked').val() + " años";
}


// - - - - - - - -
// Initialization
// - - - - - - - - 


// ---
$( document ).ready(function() {
    switchMode('Flood');

});


