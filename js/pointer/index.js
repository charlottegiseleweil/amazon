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
    console.log(L.pixelInTile[key](pointInTile));
    return L.pixelInTile[key](pointInTile);
  });
  callback(pixelValues);
};

// example usage
// const exampleHandler = pixelValuesAtPoint(
//   map,
//   256,
//   (vals => (document.getElementById("displayId").innerHTML = vals))
// );

// map.addEventListener(
//   "mousemove",
//   exampleHandler,
//   false
// );
