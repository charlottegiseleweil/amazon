// - - - - - - -
// Define Layers
// - - - - - - -

    var tileset_LULC_PEM_Sost = 
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Sostenible/{z}/{x}/{y}.png"

    var tileset_LULC_MAP_Hoy =
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_MAP/{z}/{x}/{y}.png";

    var tileset_LULC_PEM_Peor =
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Peor/{z}/{x}/{y}.png";
    
    var tileset_LULC_PEM_Real =
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Rea/{z}/{x}/{y}.png";

    var basemap = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
      {
        attribution: "OpenStreetMap"
      }
    );

    var basemap2 = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
      {
        attribution: "OpenStreetMap"
      }
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
// Maps 1 & 2 
// - - - - - - -


    var map1 = L.map("map1", {
      layers: [basemap, LULC_MAP_Hoy,labels],
      center: [-12.85, -69.7],
      zoom: 10
    });

    var map2 = L.map("map2", {
      layers: [basemap2, LULC_PEM_Sost,labels2],
      center: [-12.85, -69.7],
      zoom: 10,
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
    shapefileLayer("AOI_PEM");
    layers["AOI_PEM"].addTo(map2);

// - - - - - - -
// Update Map 2
// - - - - - - -

    function updateMap2(scenario) {
      console.log("Updating map2 with scenario " + scenario);

      map2.eachLayer(function(layer) {
        if (
          layer._url !=
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        ) {
          map2.removeLayer(layer);
          console.log('(Removed layer ',layer._url, ' )');
        }
      });

      /*map2.eachLayer(function(layer) {
        if  (layer._url) {
          console.log(layer._url);
          if (layer._url.toString().startsWith("https://charlottegiseleweil\
                                    .github.io/tiles/amazon/Usodelsuelo")){
            map2.removeLayer(layer);
            console.log('removed layer ');
          }
        };
      });*/

      if (scenario == "Peor") {
        var lyr = LULC_PEM_Peor;
      } else if (scenario == "Real") {
        var lyr = LULC_PEM_Real;
      } else if (scenario == "Sost") {
        var lyr = LULC_PEM_Sost;
      }

      lyr.addTo(map2);
      labels2.addTo(map2);
      layers["AOI_PEM"].addTo(map2);

    }


// - - - - - - - -
// Pointer things
// - - - - - - - - 


/// ....

