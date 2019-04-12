var map = L.map("mapid", {
  center: [0, 0],
  zoom: 2,
  minZoom: 3,
  maxZoom: 9
});
$(".leaflet-container").css("cursor", "crosshair");
var toner = L.tileLayer("http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png", {
  attribution:
    'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
}).addTo(map);
var active_layer = L.tileLayer(
  "./workspace/tiles/worldclim_2050_ssp1_n_export_compressed_md5_47c237fb127bc52cbb3228621cabe143/{z}/{x}/{y}.png",
  { tms: true, opacity: 0.9, attribution: "" }
).addTo(map);
var active_ecoshard =
  "worldclim_2050_ssp1_n_export_compressed_md5_47c237fb127bc52cbb3228621cabe143";
var esri_minimap_layer = L.esri.basemapLayer("DarkGray");
var miniMap = new L.Control.MiniMap(esri_minimap_layer, {
  width: 100,
  height: 100,
  zoomLevelFixed: 0,
  position: "bottomleft",
  aimingRectOptions: {
    weight: 1,
    stroke: true,
    color: "red",
    interactive: false
  }
}).addTo(map);

$(document).bind("mousemove", function(e) {
  $("#mouse_tip").css({
    left: e.pageX + 5,
    top: e.pageY - 55
  });
});

$(function() {
  $("#accordion").accordion({
    active: false,
    collapsible: true
  });
});
$("a").click(function(e) {
  e.preventDefault();
  map.removeLayer(active_layer);
  active_ecoshard = this.text;
  active_layer = L.tileLayer(
    "./workspace/tiles/" + active_ecoshard + "/{z}/{x}/{y}.png",
    { tms: true, opacity: 0.9, attribution: "" }
  ).addTo(map);
  $("div#accordion h3").html("Viewing: " + active_ecoshard);
  $("a").css("font-weight", "normal");
  $(this).css("font-weight", "Bold");
});
var ajax_processing = false;
map.addEventListener("mousemove", function(ev) {
  lat = ev.latlng.lat;
  lng = ev.latlng.lng;
  if (!ajax_processing) {
    ajax_processing = true;
    $.ajax({
      url: "/" + active_ecoshard,
      type: "POST",
      contentType: "application/json;charset=UTF-8",
      dataType: "json",
      data: JSON.stringify([1.169, -53.642]),
      success: function(data) {
        console.log(data);
        1.169, -53.642;
        var pixel_val = data["pixel_val"];
        if (!isNaN(pixel_val)) {
          pixel_val = Number(data["pixel_val"]).toFixed(5);
        }
        $("#mouse_tip").html(
          "(" +
            Number(lat).toFixed(3) +
            ", " +
            Number(lng).toFixed(3) +
            ")<br>" +
            pixel_val
        );
        ajax_processing = false;
      }
    });
  }
});
