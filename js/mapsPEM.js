/*


    Earth Engine scrapped tiles (token work ~48hrs)

    var tileset_LULC_MAP_Hoy =
      "https://earthengine.googleapis.com/map/d1db03125fe15eaa6346ddc7e0d68c49/{z}/{x}/{y}?token=ef24106521754a644b33aa92333f76c9";

    var tileset_LULC_PEM_Sost =
      "https://earthengine.googleapis.com/map/6fec32bd05c5b890c7592e2ff672907e/{z}/{x}/{y}?token=c6eea883df13a494804cd00c113e3007";

    var tileset_LULC_PEM_Peor =
      "https://earthengine.googleapis.com/map/ed6617d31bb27aba07eb2fe678afa7fd/{z}/{x}/{y}?token=819683add916005b9aebf538c213db98";

    var tileset_LULC_PEM_Real =
      "https://earthengine.googleapis.com/map/d8949b95a266e40ddc1fcdce6f403dc5/{z}/{x}/{y}?token=f72bd6e1dfc03ba2f406020f3074bad7";

    */

const pointCapture = (map, tileSize, displayId = undefined) => e => {
  var layerPoint = map.project(e.latlng).floor();
  var tilePoint = layerPoint.divideBy(tileSize).floor();
  var pointInTile = layerPoint.subtract(tilePoint.multiplyBy(tileSize));
  tilePoint.z = map.getZoom();
  // the tile data block
  const key = tilePoint.x + ":" + tilePoint.y + ":" + tilePoint.z;
  const pointVals = Object.entries(map._layers).map(
    ([k, layer]) => layer._tiles[key]
  );
  console.log(pointVals);
};

const layers = [
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
    attribution: "Co-desarollado Escenario Eco-turismo [PRO-Agua]",
    urlTemplate:
      "https://charlottegiseleweil.github.io/tiles/amazon/Usodelsuelo_PEM_Rea/{z}/{x}/{y}.png"
  }
]
  .map(({ map, attribution, urlTemplate, id }) => ({
    id,
    map,
    layer: new L.CanvasLayer(urlTemplate, {
      attribution,
      id,
      crossOrigin: "anonymous"
    })
  }))
  .reduce((all, { id, layer }) => {
    all[id] = layer;
    return all;
  }, {});

var basemap = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
  {
    attribution: "OpenStreetMap",
    id: "base"
  }
);

var basemap2 = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
  {
    attribution: "OpenStreetMap",
    id: "base"
  }
);

var [labels, labels2] = [1, 2].map(id =>
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
    {
      subdomains: "abcd",
      id: "label",
      maxZoom: 19
    }
  )
);

var map1 = L.map("map1", {
  layers: [basemap, layers["hoy"], labels],
  center: [-12.85, -69.7],
  zoom: 10
});

var map2 = L.map("map2", {
  layers: [basemap2, layers["sost"], labels2],
  center: [-12.85, -69.7],
  zoom: 10,
  zoomControl: false
});

map1.sync(map2);
map2.sync(map1);

var pc = pointCapture(map2, 256, "text");
map2.addEventListener("mousemove", pc);

function updateMap2(scenario) {
  console.log("Updating map2 with scenario " + scenario);
  map2.eachLayer(function(layer) {
    if (
      layer._url !=
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
    ) {
      map2.removeLayer(layer);
    }
  });
  layers[scenario.toLowerCase()].addTo(map2);
}
