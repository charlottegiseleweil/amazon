const optionsToLayersAndPPM = options => {
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
};

const layerListToObject = (all, { id, layer }) => {
  all[id] = layer;
  return all;
};

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
  .map(optionsToLayersAndPPM)
  .reduce(layerListToObject, {});

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




const [map1, map2] = inspectableMaps.map(m => m.map);

map1.sync(map2);
map2.sync(map1);

// Add scale
L.control.scale().addTo(map2);

const toggleMap = ({ map, pointToPixelMapper }) => scenarioId => {
  console.log(`Updating ${map} with scenario ` + scenarioId);
  map.eachLayer(layer => {
    const id = layer.options.id;
    if (!["base", "label"].includes(id)) {
      map.removeLayer(layer);
      pointToPixelMapper[id] = undefined;
    }
  });
  const newId = scenarioId.toLowerCase();
  const { layer, pointToPixelMapper: ppm } = layers[newId];
  pointToPixelMapper[newId] = ppm;
  layer.addTo(map);
};

const updateMap2 = toggleMap(inspectableMaps[1]);
