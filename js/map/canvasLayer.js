L.CanvasLayer = L.TileLayer.extend({
  pixelInTile: {},
  createTile: function(coords, done) {
    let tile = new Image();
    tile.crossOrigin = "Anonymous";

    function imageReceived() {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      canvas.width = tile.width;
      canvas.height = tile.height;
      context.drawImage(tile, 0, 0);
      console.log(context.getImageData(10, 10, 1, 1).data);
      this.pixelInTile;
    }

    tile.addEventListener("load", imageReceived.bind(this), false);
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
    var canvas = L.DomUtil.create("canvas");
    canvas.width = this.getTileSize().x;
    canvas.hieght = this.getTileSize().y;
    const key = x + ":" + y + ":" + z;
    ctx = canvas.getContext("2d");
    ctx.drawImage(tile, 0, 0);
    this.pixelInTile[key] = ({ offsetX, offsetY }) =>
      ctx.getImageData(offsetX, offsetY, 1, 1).data;

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
  //   (getValueAt: function(x, y, z) {
  //     var pixelData = this.canvas.getContext("2d").getImageData(offX, offY, 1, 1)
  //       .data;
  //     console.log(pixelData);
  //   })
});
