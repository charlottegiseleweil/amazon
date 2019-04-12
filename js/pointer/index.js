L.CursorHandler = L.Handler.extend({
  addHooks: function() {
    this._popup = new L.Popup();
    this._map.on("mouseover", this._open, this);
    this._map.on("mousemove", this._update, this);
    this._map.on("mouseout", this._close, this);
  },

  removeHooks: function() {
    this._map.off("mouseover", this._open, this);
    this._map.off("mousemove", this._update, this);
    this._map.off("mouseout", this._close, this);
  },

  _open: function(e) {
    this._update(e);
    this._popup.openOn(this._map);
  },

  _close: function() {
    this._map.closePopup(this._popup);
  },

  _update: function(e) {
    this._popup.setLatLng(e.latlng).setContent(e.latlng.toString());
  }
});

L.Map.addInitHook("addHandler", "cursor", L.CursorHandler);

// var map = new L.Map("leaflet", {
//   center: [0, 0],
//   zoom: 0,
//   cursor: true,
//   layers: [
//     new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
//     })
//   ]
// });

// TODO: how to check for map cursor truth
const togglePointer = map => () =>
  map.cursor ? map.cursor.enable() : map.cursor.disable();
