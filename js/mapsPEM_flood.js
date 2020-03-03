// - - - - - - -
// Land use maps
// - - - - - - -

    var tileset_LULC_PEM_Sost = 
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Sostenible/{z}/{x}/{y}.png"

    var tileset_LULC_MAP_Hoy =
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_MAP/{z}/{x}/{y}.png";

    var tileset_LULC_PEM_Peor =
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Peor/{z}/{x}/{y}.png";
    
    var tileset_LULC_PEM_Real =
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Rea/{z}/{x}/{y}.png";

    var LULC_MAP_Hoy = L.tileLayer(tileset_LULC_MAP_Hoy, {
      attribution: "Current Land Cover Map [PRO-Agua]"
    });

    var LULC_PEM_Sost = L.tileLayer(tileset_LULC_PEM_Sost, {
      attribution: "Co-desarollado Escenario Sostenible [PRO-Agua]"
    });

    var LULC_PEM_Peor = L.tileLayer(tileset_LULC_PEM_Peor, {
      attribution: "Co-desarollado Escenario Peor [PRO-Agua]"
    });

    var LULC_PEM_Real = L.tileLayer(tileset_LULC_PEM_Real, {
      attribution: "Co-desarollado Escenario Eco-turismo [PRO-Agua]"
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

    var labels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    });

    var labels2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    });
    var labels3 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    });

// - - - - - - -
// Launch maps
// - - - - - - -


    var map1 = L.map("map1", {
      layers: [basemap],// LULC_MAP_Hoy,labels],
      center: [-12.85, -69.7],
      zoom: 9
    });

    var map2 = L.map("map2", {
      layers: [basemap2],// LULC_PEM_Sost,labels2],
      center: [-12.85, -69.7],
      zoom: 9,
      zoomControl: false
    });

    map1.sync(map2);
    map2.sync(map1);

    // Add scale
    L.control.scale().addTo(map1)


// - - - - - - -
// Shapefiles
// - - - - - - -

    // Add shapefile or area AOI de enfoque
    var layers = []
    map_styling();
    ////// Shapefile layers -- make Styles in mapUtils.js/////
    function shapefileLayer(shapefileName,style=shpStyle){
        layers[shapefileName] = new L.Shapefile("data/shapefiles/"+shapefileName+".zip",{
            style: style},{
            onEachFeature: function(feature, layer) {}
          });
      }; 

    // AOI
    shapefileLayer("AOI_PEM");
    layers["AOI_PEM"].addTo(map2);

    // Rivers
    shapefileLayer("corrientes",riverStyle);
    layers["rivers"] = layers["corrientes"];

// - - - - - - -
// Indice Flood
// - - - - - - -

    // Make Shapefile layers for Indice Hidrico 
    // TODO: to optimize shapefileLayer and style function there
    
    shapefileLayer("Floodplain_50yr_return_from_DEM_PEM_Base",floodBaseStyle);
    shapefileLayer("Floodplain_50yr_return_from_DEM_PEM",floodBaseStyle);
    





// - - - - - - - - - - - -
// Functions to switch Maps
// - - - - - - - - - - - - 

function updateMap1(mode) {
  if (mode == 'LU') {
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
  }
  else if (mode == "Flood") {

    // Add layers
    lyr = LULC_MAP_Hoy;
    lyr.addTo(map1);
    labels.addTo(map1);

    // Add layers
    lyr = layers["Floodplain_50yr_return_from_DEM_PEM_Base"];
    lyr.addTo(map1);
    labels.addTo(map1);

  }
  else {
    console.log("Unknown mode : "+mode)
  }
};

function updateMap2(mode,scenario) {
  scenario = $('input[name=escenarios]:checked').val();

  console.log("Updating map2 with scenario " + scenario);

  if (mode == 'LU') {
      // Remove layers
      map2.eachLayer(function(layer) {
        if (layer._url !="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        ) {
          map2.removeLayer(layer);
        }
      });

      // Pick layer to add (according to scenario)
      if (scenario == "Peor") {
        var lyr = LULC_PEM_Peor;
      } else if (scenario == "Real") {
        var lyr = LULC_PEM_Real;
      } else {//if (scenario == "Sost") {
        var lyr = LULC_PEM_Sost;
      }

      // Add layers
      lyr.addTo(map2);
      labels2.addTo(map2);
  }
  else if (mode == "Flood") {
    // Remove layers
    map2.eachLayer(function(layer) {
        if (layer._url !="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        ) {
          map2.removeLayer(layer);
        }
      });

    // Pick layer to add (according to scenario)
    if (scenario == "Peor") {
        var lyr = LULC_PEM_Peor;
      } else if (scenario == "Real") {
        var lyr = LULC_PEM_Real;
      } else {//if (scenario == "Sost") {
        var lyr = LULC_PEM_Sost;
      }


    // Add LU
    lyr.addTo(map2);
    labels2.addTo(map2);

    // Add flood
    lyr = layers["Floodplain_50yr_return_from_DEM_PEM"];
    lyr.addTo(map2);
    labels.addTo(map2);

  }
  else {
    console.log("Unknown mode : "+mode)
  }
};


// - - - - - - - -
// Initialization
// - - - - - - - - 


// ---
$( document ).ready(function() {
    switchMode('Flood');

});


