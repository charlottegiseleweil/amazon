const layers = [
  {
    id: "label",
    canvas: false,
    urlTemplate:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    maxZoom: 19
  },
  {
    id: "base",
    canvas: true,
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
      ? canvasLayer(urlTemplate, {
          ...options,
          crossOrigin: "anonymous"
        })
      : { layer: new L.TileLayer(urlTemplate, options) };
    return {
      id,
      layer
    };
  })
  .reduce((all, { id, layer }) => {
    all[id] = layer;
    return all;
  }, {});

let inspectableMaps = [
  { layerIds: "base hoy label".split(" ") },
  { layerIds: "base sost label".split(" "), options: { zoomControl: false } }
].map(({ layerIds, options }, i) => {
  const mapLayers = layerIds.map(id => ({
    id,
    layer: layers[id].layer,
    ppm: layers[id].pointToPixelMapper
  }));

  const pointToPixelMapper = mapLayers.reduce((agg, { id, ppm }) => {
    agg[id] = ppm;
    return agg;
  }, {});

  return {
    map: L.map(`map${i + 1}`, {
      layers: mapLayers.map(l => l.layer),
      center: [-12.85, -69.7],
      zoom: 10,
      ...options
    }),
    pointToPixelMapper
  };
});

// this should be the same stuff that you wrote previously here
const [map1, map2] = inspectableMaps.map(m => m.map);

map1.sync(map2);
map2.sync(map1);

// Add scale
L.control.scale().addTo(map2);

function toggleMap(map, scenarioId) {
  console.log(`Updating ${map} with scenario ` + scenario);
}
function updateMap2(scenario) {
  map2.eachLayer(function(layer) {
    if (
      layer._url !=
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
    ) {
      map2.removeLayer(layer);
    }
  });
  const { layer, pointToPixelMapper } = layers[scenario.toLowerCase()];
  layer.addTo(map2);
}
