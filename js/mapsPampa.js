
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
// Uso del suelo
// - - - - - - -

    // OLD USO DE SUELO. 2019 UPDATED IN Escenario Nada.
    /*var tileset_LULC_MAP_Hoy =
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_MAP/{z}/{x}/{y}.png";*/

    var tileset_LULC_Pampa_CERCA_VIAS = 
      "https://charlottegiseleweil.github.io/tiles/amazon/laPampa_escenarios/LULC_CERCA_VIAS/{z}/{x}/{y}.png"

    var tileset_LULC_Pampa_NADA_REFORESTADO =
      "https://charlottegiseleweil.github.io/tiles/amazon/laPampa_escenarios/LULC_NADA_REFORESTADO/{z}/{x}/{y}.png";

    var tileset_LULC_Pampa_PRIORIZADO =
      "https://charlottegiseleweil.github.io/tiles/amazon/laPampa_escenarios/LULC_PRIORIZADO/{z}/{x}/{y}.png";

    var tileset_LULC_Pampa_TODO_REFORESTADO =
      "https://charlottegiseleweil.github.io/tiles/amazon/laPampa_escenarios/LULC_TODO_REFORESTADO/{z}/{x}/{y}.png";
    



    /*var LULC_MAP_Hoy = L.tileLayer(tileset_LULC_MAP_Hoy, {
      attribution: "Current Land Cover Map [PRO-Agua]"
    });*/

    var LULC_MAP_Hoy = L.tileLayer(tileset_LULC_Pampa_NADA_REFORESTADO, {
      attribution: "Land Cover Map in 2019 [PRO-Agua]"
    });

    var LULC_Pampa_CERCA_VIAS = L.tileLayer(tileset_LULC_Pampa_CERCA_VIAS, {
      attribution: "Escenario Reforestacion Cerca Vias [PRO-Agua]"
    });

    var LULC_Pampa_NADA_REFORESTADO = L.tileLayer(tileset_LULC_Pampa_NADA_REFORESTADO, {
      attribution: "Escenario NADA REFORESTADO [PRO-Agua]"
    });

    var LULC_Pampa_PRIORIZADO = L.tileLayer(tileset_LULC_Pampa_PRIORIZADO, {
      attribution: "Escenario Reforestacion PRIORIZADO [PRO-Agua]"
    });

    var LULC_Pampa_TODO_REFORESTADO = L.tileLayer(tileset_LULC_Pampa_TODO_REFORESTADO, {
      attribution: "Escenario Todo REFORESTADO [PRO-Agua]"
    });


    var map1 = L.map("map1", {
      layers: [basemap, LULC_MAP_Hoy,labels],
      center: [-12.9, -69.99771],
      zoom: 11
    });

    var map2 = L.map("map2", {
      layers: [basemap2, LULC_Pampa_TODO_REFORESTADO,labels2],
      zoom: 11,
      zoomControl: false
    });

    map1.sync(map2);
    map2.sync(map1);

    // Add scale
    L.control.scale().addTo(map1)


    // Add shapefile or area AOI de enfoque
    var layers = []
    map_styling();
    ////// Shapefile layers /////
    function shapefileLayer(variable,style=shpStyle){
        layers[variable] = new L.Shapefile("data/shapefiles/"+variable+".zip",{
            style: style},{
            onEachFeature: function(feature, layer) {}
          });
      }; 
    /*shapefileLayer("AOI_TAH");
    layers["AOI_TAH"].addTo(map2);*/

    function updateMap2(scenario) {
      console.log("Updating map2 with scenario " + scenario);

      map2.eachLayer(function(layer) {
        if (
          layer._url != "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
          &&
          layer._url != "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_MAP/{z}/{x}/{y}.png"
        ) {
          map2.removeLayer(layer);
        }
      });

      if (scenario == "Cerca") {
        var lyr = LULC_Pampa_CERCA_VIAS;
      } else if (scenario == "Nada") {
        var lyr = LULC_Pampa_NADA_REFORESTADO;
      } else if (scenario == "Todo") {
        var lyr = LULC_Pampa_TODO_REFORESTADO;
      } else if (scenario == "Prio") {
        var lyr = LULC_Pampa_PRIORIZADO;
      }

      lyr.addTo(map2);
      labels2.addTo(map2);
      

    }
  