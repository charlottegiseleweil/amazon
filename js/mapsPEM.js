var tileset_LULC_MAP_Hoy =
      "https://earthengine.googleapis.com/map/d1db03125fe15eaa6346ddc7e0d68c49/{z}/{x}/{y}?token=04f8d91483c5fd3f1cdbe36682c70e1b";

    var tileset_LULC_PEM_Sost =
      "https://earthengine.googleapis.com/map/6fec32bd05c5b890c7592e2ff672907e/{z}/{x}/{y}?token=e82968ddf69c4ba9a0aac9d44be8c0a1";

    var tileset_LULC_PEM_Peor =
      "https://earthengine.googleapis.com/map/ed6617d31bb27aba07eb2fe678afa7fd/{z}/{x}/{y}?token=a3a72ebc27bfd4b072d24ceb3177e639";

    var tileset_LULC_PEM_Real =
      "https://earthengine.googleapis.com/map/d8949b95a266e40ddc1fcdce6f403dc5/{z}/{x}/{y}?token=98768ed906bcbdaac9b2f6436aa33784";

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

    function updateMap2(scenario) {
      console.log("Updating map2 with scenario " + scenario);

      map2.eachLayer(function(layer) {
        if (
          layer._url !=
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
        ) {
          map2.removeLayer(layer);
        }
      });

      if (scenario == "Peor") {
        var lyr = LULC_PEM_Peor;
      } else if (scenario == "Real") {
        var lyr = LULC_PEM_Real;
      } else if (scenario == "Sost") {
        var lyr = LULC_PEM_Sost;
      }

      lyr.addTo(map2);
    }
  