// TODO: encapsulate this, such that it doesn't clutter the global namespace
// :handle the preload mouseHover issue
// :handle changing layers

// export, and should be better encapsulated

const canvasLayer = (urlTemplate, options) => {
  /**
   * (LayerId, tileId, point)
   */
  let pointToPixelMapper = {};
  function imageReceived(tile, { x, y, z }) {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = this.getTileSize().x;
    canvas.height = this.getTileSize().y;

    const key = x + ":" + y + ":" + z;
    context.drawImage(tile, 0, 0);

    pointToPixelMapper[key] = ({ x, y }) => {
      return context.getImageData(x, y, 1, 1).data;
    };
  }
  let layer = new (L.TileLayer.extend({
    createTile: function(coords, done) {
      let tile = new Image();
      tile.crossOrigin = "Anonymous";

      tile.addEventListener(
        "load",
        imageReceived.bind(this, tile, coords),
        false
      );
      L.DomEvent.on(
        tile,
        "load",
        L.Util.bind(this._tileOnLoad, this, done, tile, coords)
      );
      L.DomEvent.on(
        tile,
        "error",
        L.Util.bind(this._tileOnError, this, done, tile)
      );

      tile.alt = "";
      tile.setAttribute("role", "presentation");
      tile.src = this.getTileUrl(coords);

      return tile;
    },

    _tileOnLoad: function(done, tile, { x, y, z }) {
      // For https://github.com/Leaflet/Leaflet/issues/3332
      if (L.Browser.ielt9) {
        setTimeout(L.Util.bind(done, this, null, tile), 0);
      } else {
        done(null, tile);
      }
    },
    _onTileRemove: function(e) {
      e.tile.onload = null;
    }
  }))(urlTemplate, options);

  return { layer, pointToPixelMapper };
};

const pixelValuesAtPoint = (
  inspectableMap,
  tileSize,
  callback = pixelValues => undefined
) => e => {
  // const pointToPixelMapper = pointToPixelMappers.reduce((agg, val) => {
  //   return { ...agg, ...val };
  // }, {});
  const { map, pointToPixelMapper } = inspectableMap;

  var layerPoint = map.project(e.latlng).floor();
  var tilePoint = layerPoint.divideBy(tileSize).floor();
  var pointInTile = layerPoint.subtract(tilePoint.multiplyBy(tileSize));
  tilePoint.z = map.getZoom();
  // the tile data block
  const key = tilePoint.x + ":" + tilePoint.y + ":" + tilePoint.z;
  const pixelValues = Object.entries(map._layers).map(([k, layer]) => {
    return (
      pointToPixelMapper[layer.options.id] &&
      pointToPixelMapper[layer.options.id][key](pointInTile)
    );
  });
  callback({ pixelValues, latlng: e.latlng });
};

// the pixel mapper has become layer specific. we keep the layer of indirection to facilitate merging.
// I think the ergonomics of creating a list of layers with IDs is better than doing it down the line.

// write a merge function for

//private

//export, well encapsulated

//export, needs access to