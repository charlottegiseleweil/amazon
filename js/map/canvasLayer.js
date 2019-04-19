L.CanvasLayer = L.TileLayer.extend({
  tileData: {},
  createTile: function(coords, done) {
    var tile = document.createElement("img");

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
    if (this.options.crossOrigin || this.options.crossOrigin === "") {
      tile.crossOrigin =
        this.options.crossOrigin === true ? "" : this.options.crossOrigin;
    }
    tile.alt = "";
    tile.setAttribute("role", "presentation");
    tile.src = this.getTileUrl(coords);
    return tile;
  },

  _tileOnLoad: function(done, tile, { x, y, z }) {
    var canvas = L.DomUtil.create("canvas");
    canvas.width = this.getTileSize().x;
    canvas.hieght = this.getTileSize().y;
    console.log(this.getTileUrl({ x, y, z }));
    const key = x + ":" + y + ":" + z;
    ctx = canvas.getContext("2d");
    this.tileData[key];
    ctx.drawImage(tile, 0, 0);
    tile.getPixelData = ({ offsetX, offsetY }) =>
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
