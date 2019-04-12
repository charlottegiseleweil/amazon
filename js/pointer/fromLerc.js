// create a UI slider for the end user to toggle the pixel range to display
var slider = document.getElementById("slider");
noUiSlider.create(slider, {
  start: [0, 4000],
  step: 100,
  connect: true,
  range: { min: 0, max: 8000 }
});

// When the slider value changes, update the input and span
slider.noUiSlider.on("set", function(values, handle) {
  document.getElementById("min").innerHTML =
    parseInt(values[0], 10) + " meters";
  document.getElementById("max").innerHTML =
    parseInt(values[1], 10) + " meters";

  // redraw the tiles without refetching the from the server
  for (var key in lercElevation._tiles) {
    lercElevation.draw(lercElevation._tiles[key].el);
  }
});

var southWest = L.latLng(-90, -179),
  northEast = L.latLng(90, 179),
  worldBounds = L.latLngBounds(southWest, northEast);

// set up the map
var map = L.map("map", {
  noWrap: true,
  minZoom: 3,
  maxBounds: worldBounds
}).setView([30, 45], 3);

var lercElevation = new LercLayer({
  noWrap: true,
  attribution: 'USGS, <a href="https://github.com/Esri/lerc">LERC</a>',
  tileSize: 256
});

/** usage:
 * map.on(''mouseover', pointCapture(map,
 *  <tileSize>,
 *  <id of displayElement if using default elementSelector>
 *  <function that returns your display element>,
 *  )
 *
 * Only works with tiled maps at this time. I will work on connecting it to others later
 *  */
const pointCapture = (
  map,
  tileSize,
  id = undefined,
  displayElementSelector = id => document.getElementById(id)
) => e => {
  var layerPoint = map.project(e.latlng).floor();
  var tilePoint = layerPoint.divideBy(tileSize).floor();
  tilePoint.z = map.getZoom();
  // the tile data block
  const key = tilePoint.x + ":" + tilePoint.y + ":" + tilePoint.z;
  var block = lercElevation._tiles[key].el.decodedPixels;

  // Read the data value from the block if it exists
  if (block) {
    var pointInTile = layerPoint.subtract(tilePoint.multiplyBy(tileSize));
    displayElementSelector(id).innerHTML =
      "current elevation: " +
      Math.round(block.pixels[0][pointInTile.y * block.width + pointInTile.x]) +
      " meters";
  } else {
    displayElementSelector(id).innerHTML = "Elevation: undefined";
  }
};
