/**
 * @typedef {{layer, pointToPixelMapper}} InspectableLayer
 */

/**
 * @param {Object.<string, InspectableLayer>} inspectableLayers a dictionary of inspectableLayers,
 * @param {{layerIds: string[], options:{}}[]} mapOptions
 */
const layerIDsToInspectableMaps = (inspectableLayers, mapOptions) => {
  return mapOptions.map(({ layerIds, options }, i) => {
    const mapLayers = layerIds.map(id => ({
      id,
      layer: inspectableLayers[id].layer,
      ppm: inspectableLayers[id].pointToPixelMapper
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
};
/**
 *
 * @param {{ id:string, urlTemplate:string, canvas?:boolean}[]} optionsList
 *  other options will be passed to the underlying layer object
 * @returns {InspectableLayer}
 */
const toInspectableLayers = optionsList => {
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
  return optionsList.map(optionsToLayersAndPPM).reduce(layerListToObject, {});
};
/**
 *
 * @param {{map, pointToPixelMapper}} inspectableMap
 * @param {{layer, pointToPixelMapper} | layer} _layer
 */
const addToInspectableMap = ({ map, pointToPixelMapper }, _layer) => {
  const { layer, pointToPixelMapper: ppm } = _layer.layer
    ? _layer
    : { layer: _layer };
  const id = layer.options.id;
  pointToPixelMapper[id] = ppm;
  layer.addTo(map);
};

/**
 *
 * @param {{map, pointToPixelMapper}} inspectableMap
 * @param {{layer, pointToPixelMapper} | layer} _layer
 */
const removeFromInspectableMap = ({ map, pointToPixelMapper }, _layer) => {
  const layer = _layer.layer || _layer;
  const id = layer.options.id;
  pointToPixelMapper[id] = undefined;
  map.removeLayer(layer);
};

const addPointerListenerToMap = (inspectableMap, callback, tileSize = 256) =>
  inspectableMap.map.addEventListener(
    "mousemove",
    pixelValuesAtPoint(inspectableMap, tileSize, callback)
  );


