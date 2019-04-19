const pixelValuesAtPoint = (
  map,
  tileSize,
  callback = pixelValues => undefined
) => e => {
  var layerPoint = map.project(e.latlng).floor();
  var tilePoint = layerPoint.divideBy(tileSize).floor();
  var pointInTile = layerPoint.subtract(tilePoint.multiplyBy(tileSize));
  tilePoint.z = map.getZoom();
  // the tile data block
  const key = tilePoint.x + ":" + tilePoint.y + ":" + tilePoint.z;
  const pixelValues = Object.entries(map._layers).map(([k, layer]) => {
    return L.pixelInTile[key](pointInTile);
  });
  callback({ pixelValues, latlng: e.latlng });
};

// example usage
// const exampleHandler = pixelValuesAtPoint(
//   map,
//   256,
//   ({ pixelValues, latlng: { lat, lng } }) =>
//     (document.getElementById("mouse_tip").innerHTML = `(${Number(lat).toFixed(
//       3
//     )}, ${Number(lng).toFixed(3)})
//       pixelValues)`)
// );

// map.addEventListener("mousemove", exampleHandler, false);
