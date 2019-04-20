const layers = [
  {
    id: "sost",
    map: 2,
    attribution: "Co-desarollado Escenario Sostenible [PRO-Agua]",
    urlTemplate:
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Sostenible/{z}/{x}/{y}.png"
  },
  {
    id: "hoy",
    map: 1,
    attribution: "Current Land Cover Map [PRO-Agua]",
    urlTemplate:
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_MAP/{z}/{x}/{y}.png"
  },
  {
    id: "peor",
    map: 2,
    attribution: "Co-desarollado Escenario Peor [PRO-Agua]",
    urlTemplate:
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Peor/{z}/{x}/{y}.png"
  },
  {
    id: "real",
    map: 2,
    attribution: "Co-desarollado Escenario Eco-turismo [PRO-Agua]",
    urlTemplate:
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Rea/{z}/{x}/{y}.png"
  }
]
  .map(({ map, attribution, urlTemplate, id }) => ({
    id,
    map,
    layer: new L.CanvasLayer(urlTemplate, {
      attribution,
      id,
      crossOrigin: "anonymous"
    })
  }))
  .reduce((all, { id, layer }) => {
    all[id] = layer;
    return all;
  }, {});

var basemap = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
  {
    attribution: "OpenStreetMap",
    id: "base"
  }
);

var basemap2 = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
  {
    attribution: "OpenStreetMap",
    id: "base"
  }
);

var [labels, labels2] = [1, 2].map(id =>
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
    {
      subdomains: "abcd",
      id: "label",
      maxZoom: 19
    }
  )
);

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
  layers: [basemap, LULC_MAP_Hoy, labels],
  center: [-12.85, -69.7],
  zoom: 10
});

var map2 = L.map("map2", {
  layers: [basemap2, LULC_PEM_Sost, labels2],
  center: [-12.85, -69.7],
  zoom: 10,
  zoomControl: false
});

map1.sync(map2);
map2.sync(map1);

// Add scale
L.control.scale().addTo(map2);

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

  var map1 = L.map("map1", {
    layers: [basemap, layers["hoy"], labels],
    center: [-12.85, -69.7],
    zoom: 10
  });

  var map2 = L.map("map2", {
    layers: [basemap2, layers["sost"], labels2],
    center: [-12.85, -69.7],
    zoom: 10,
    zoomControl: false
  });

  map1.sync(map2);
  map2.sync(map1);

  var handler = pixelValuesAtPoint(
    map2,
    256,
    ({ pixelValues, latlng: { lat, lng } }) =>
      (document.getElementById("mouse_tip").innerHTML = getNameForPixelValues(
        pixelValues
      ))
  );

  document.addEventListener("mousemove", function(e) {
    document
      .getElementById("mouse_tip")
      .setAttribute("style", `left:${e.pageX + 5}px; top: ${e.pageY - 55}px`);
  });

  map2.addEventListener("mousemove", handler);

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
    layers[scenario.toLowerCase()].addTo(map2);
  }
}
