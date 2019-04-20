const layers = [
  {
    urlTemplate:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    id: "label",
    maxZoom: 19,
    canvas: false
  },
  {
    id: "base",
    canvas: false,
    urlTemplate:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
    attribution: "OpenStreetMap"
  },
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
  .map(options => {
    const { id, urlTemplate, canvas = true } = options;
    const layer = canvas
      ? new L.CanvasLayer(urlTemplate, {
          ...options,
          crossOrigin: "anonymous"
        })
      : new L.TileLayer(urlTemplate, options);
    return {
      id,
      layer
    };
  })
  .reduce((all, { id, layer }) => {
    all[id] = layer;
    return all;
  }, {});

// var [basemap, basemap2] = [1, 2].map(() =>
//   L.tileLayer(
//     "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
//     {
//       attribution: "OpenStreetMap",
//       id: "base"
//     }
//   )
// );

var map1 = L.map("map1", {
  layers: [layers["base"], layers["hoy"], layers["label"]],
  center: [-12.85, -69.7],
  zoom: 10
});

var map2 = L.map("map2", {
  layers: [layers["base"], layers["sost"], layers["label"]],
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

  layers[scenario.toLowerCase()].addTo(map2);
}
