const layerOptions = [
  {
    id: "label",
    canvas: false,
    urlTemplate:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
    subdomains: "abcd",
    maxZoom: 19
  },
  {
    id: "label2",
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
    id: "base2",
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
    attribution: "Co-desarollado Escenario Real [PRO-Agua]",
    urlTemplate:
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Rea/{z}/{x}/{y}.png"
  }
];

const mapOptions = [
  { layerIds: "base hoy label".split(" ") },
  { layerIds: "base2 sost label2".split(" "), options: { zoomControl: false } }
];

const layers = toInspectableLayers(layerOptions);

var inspectableMaps = layerIDsToInspectableMaps(layers, mapOptions);

// this should be the same stuff that you wrote previously here
const [map1, map2] = inspectableMaps.map(m => m.map);

map1.sync(map2);
map2.sync(map1);

// Add scale
L.control.scale().addTo(map1);

// Add shapefile or area AOI de enfoque
var shpLayers = []
map_styling();
////// Shapefile layers /////
function shapefileLayer(variable,style=shpStyle){
    shpLayers[variable] = new L.Shapefile("data/shapefiles/"+variable+".zip",{
        style: style},{
        onEachFeature: function(feature, layer) {}
      });
  }; 
shapefileLayer("AOI_PEM");
shpLayers["AOI_PEM"].addTo(map2);

/**
 * @typedef {{}} layer
 * @param {Object.<string, InspectableLayer>} inspectableLayers dictionary of layers
 * @param {(string|layer|InspectableLayer)[]} layerOrdering
 *   array specifying ordering of layers.
 *   '$' indicates position of the togglAble layer.
 *   Layers before this character will not be
 *   removed. Items in this list can be ids of layers in the
 *   above dictionary or layer objects.
 * @param {*} inspectableMap
 *   will be toggled!
 */
const toggleMap = (
  inspectableLayers,
  layerOrdering = [],
  inspectableMap
) => scenarioId => {
  const { map } = inspectableMap;
  console.log(`Updating ${map} with scenario ` + scenarioId);
  //remove layers
  map.eachLayer(layer => {
    const id = layer.options.id;
    const keep = layerOrdering.slice(0, layerOrdering.indexOf("$"));
    if (!keep.includes(id)) removeFromInspectableMap(inspectableMap, layer);
  });

  const newId = scenarioId.toLowerCase();
  const newLayer = inspectableLayers[newId];
  // put the layers back!
  layerOrdering.forEach(orderedLayer => {
    const realLayer =
      typeof orderedLayer === "string"
        ? orderedLayer === "$"
          ? newLayer
          : inspectableLayers[orderedLayer]
        : orderedLayer;
    addToInspectableMap(inspectableMap, realLayer);
  });
};

const updateMap2 = toggleMap(
  layers,
  ["base2", "$", "label2", shpLayers["AOI_PEM"]],
  inspectableMaps[1]
);


