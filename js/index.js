let firstLoad = true;
let topoLayer = [];
let map;

let COLORS_Files = {
  // Dictionary to select the color of the map
  Agricultura: "#085E12", //verde
  Pasto: "#0E6D18    ", // verde
  Pasto_Agricultura: "#157D1E    ", //verde
  Pasto_Herbazal: "#1C8C24    ", // verde
  Aguajal: "#239C2B    ", // verde
  Bosque_montano: "#30BB37    ", //verde
  Bosque_no_inundable: "#3EDA44    ", // verde
  Vegetacion_secundaria: "#4CFA51    ", // verde

  Matorral: "#6B4001    ", // cafe
  Pajonal_andino: "#A16D26    ", // cafe
  Pedregales: "#F2B15F    ", // cafe

  Agua: "#04059A    ", //azul
  Glaciar: "#1D1FAB    ", //azul
  Humedales: "#363ABC    ", //azul
  Sabana_humedales: "#4F55CD    ", // azul
  Bosque_inundable: "#6870DE    ", //azul

  Mineria: "#000000", // negro

  Carreteras_no_pavimentadas: "#B8050B    ", // rojo
  Carreteras_pavimentadas: "#C31A1B    ", // rojo
  Suelo_desnudo: "#CF2F2C    ", // rojo
  Urbano: "#DA453D    " // rojo
};

window.onload = () => {
  const maxBounds = [
    [13.39029, -16.33247], //Southwest
    [-59.450451, -109.47493] //Northeast
  ];
  map = new L.map("map", {
    center: [-11.6, -69.59],
    zoom: 7,
    maxBounds: maxBounds,
    maxBoundsViscosity: 1.0,
    zoomSnap: 1,
    zoomDelta: 1,
    wheelPxPerZoomLevel: 150,
    attributionControl: false
  });
  const layerOptions = {
    maxZoom: 12,
    minZoom: 5
  };

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
    layerOptions
  ).addTo(map);

  const corners = map._controlCorners;
  const container = map._controlContainer;

  corners["bottomRight"] = L.DomUtil.create(
    "div",
    "leaflet-horizontal-right",
    container
  );

  L.TopoJSON = L.GeoJSON.extend({
    addData: function(jsonData) {
      if (jsonData.type === "Topology") {
        for (key in jsonData.objects) {
          geojson = topojson.feature(jsonData, jsonData.objects[key]);
          L.GeoJSON.prototype.addData.call(this, geojson);
        }
      } else {
        L.GeoJSON.prototype.addData.call(this, jsonData);
      }
    }
  });
  loadMapFiles();
  setFilterEvents();
};

function readJsonFile(filename, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", filename, true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

let test = 0;

function loadMapFiles() {
  readJsonFile("data/amazon/Agricultura.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[0] = new L.TopoJSON();
    topoLayer[0].addData(data);
    topoLayer[0].eachLayer(handleLayer_1);
    topoLayer[0].bindTooltip(
      '<span class="square-tooltip agriculture">&nbsp</span> Agriculture'
    );
    // topoLayer[0].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Agua.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[1] = new L.TopoJSON();
    topoLayer[1].addData(data);
    topoLayer[1].eachLayer(handleLayer_2);
    topoLayer[1].bindTooltip(
      '<span class="square-tooltip water">&nbsp</span> Water'
    );
    // topoLayer[1].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Aguajal.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[2] = new L.TopoJSON();
    topoLayer[2].addData(data);
    topoLayer[2].eachLayer(handleLayer_3);
    topoLayer[2].bindTooltip(
      '<span class="square-tooltip swamp">&nbsp</span> Swamp'
    );
    // topoLayer[2].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Bosque_inundable.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[3] = new L.TopoJSON();
    topoLayer[3].addData(data);
    topoLayer[3].eachLayer(handleLayer_4);
    topoLayer[3].bindTooltip(
      '<span class="square-tooltip floodable_forest">&nbsp</span> Floodable Forest'
    );
    // topoLayer[3].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Bosque_montano.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[4] = new L.TopoJSON();
    topoLayer[4].addData(data);
    topoLayer[4].eachLayer(handleLayer_5);
    topoLayer[4].bindTooltip(
      '<span class="square-tooltip mountain_forest">&nbsp</span> Mountain Forest'
    );
    // topoLayer[4].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Bosque_no_inundable.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[5] = new L.TopoJSON();
    topoLayer[5].addData(data);
    topoLayer[5].eachLayer(handleLayer_6);
    topoLayer[5].bindTooltip(
      '<span class="square-tooltip non_floodable_forest">&nbsp</span> Non Floodable Forest'
    );
    // topoLayer[5].addTo(map);
    fixOrderOfLayers();
  }); //weird
  readJsonFile("data/amazon/Carreteras_no_pavimentadas.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[6] = new L.TopoJSON();
    topoLayer[6].addData(data);
    topoLayer[6].eachLayer(handleLayer_7);
    topoLayer[6].bindTooltip(
      '<span class="square-tooltip unpaved_roads">&nbsp</span> Unpaved Roads'
    );
    // topoLayer[6].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Carreteras_pavimentadas.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[7] = new L.TopoJSON();
    topoLayer[7].addData(data);
    topoLayer[7].eachLayer(handleLayer_8);
    topoLayer[7].bindTooltip(
      '<span class="square-tooltip paved_roads">&nbsp</span> Paved Roads'
    );
    // topoLayer[7].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Glaciar.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[8] = new L.TopoJSON();
    topoLayer[8].addData(data);
    topoLayer[8].eachLayer(handleLayer_9);
    topoLayer[8].bindTooltip(
      '<span class="square-tooltip glacier">&nbsp</span> Glacier'
    );
    // topoLayer[8].addTo(map);
    fixOrderOfLayers();
  });
  // readJsonFile("data/amazon/Herbazal.json", function (text) {
  //     let data = JSON.parse(text);
  //     topoLayer[9] = new L.TopoJSON();
  //     topoLayer[9].addData(data);
  //     topoLayer[9].eachLayer(handleLayer);
  //     topoLayer[9].bindTooltip('<span class="square-tooltip pasture">&nbsp</span> Pasture');
  //     // topoLayer[9].addTo(map);
  //     fixOrderOfLayers();
  // }); // EMPTY???
  readJsonFile("data/amazon/Humedales.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[10] = new L.TopoJSON();
    topoLayer[10].addData(data);
    topoLayer[10].eachLayer(handleLayer_10);
    topoLayer[10].bindTooltip(
      '<span class="square-tooltip wetland">&nbsp</span> Wetland'
    );
    // topoLayer[10].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Matorral.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[11] = new L.TopoJSON();
    topoLayer[11].addData(data);
    topoLayer[11].eachLayer(handleLayer_11);
    topoLayer[11].bindTooltip(
      '<span class="square-tooltip thicket">&nbsp</span> Thicket'
    );
    // topoLayer[11].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Mineria.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[12] = new L.TopoJSON();
    topoLayer[12].addData(data);
    topoLayer[12].eachLayer(handleLayer_12);
    topoLayer[12].bindTooltip(
      '<span class="square-tooltip mining">&nbsp</span> Mining'
    );
    // topoLayer[12].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Pajonal_andino.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[13] = new L.TopoJSON();
    topoLayer[13].addData(data);
    topoLayer[13].eachLayer(handleLayer_13);
    topoLayer[13].bindTooltip(
      '<span class="square-tooltip andean_scrubland">&nbsp</span> Andean Scrubland'
    );
    // topoLayer[13].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Pasto-Agricultura.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[14] = new L.TopoJSON();
    topoLayer[14].addData(data);
    topoLayer[14].eachLayer(handleLayer_14);
    topoLayer[14].bindTooltip(
      '<span class="square-tooltip agriculture_grass">&nbsp</span> Agriculture Grass'
    );
    // topoLayer[14].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Pasto-Herbazal.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[15] = new L.TopoJSON();
    topoLayer[15].addData(data);
    topoLayer[15].eachLayer(handleLayer_15);
    topoLayer[15].bindTooltip(
      '<span class="square-tooltip pasture_grass">&nbsp</span> Pasture Grass'
    );
    // topoLayer[15].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Pasto.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[16] = new L.TopoJSON();
    topoLayer[16].addData(data);
    topoLayer[16].eachLayer(handleLayer_16);
    topoLayer[16].bindTooltip(
      '<span class="square-tooltip grass">&nbsp</span> Grass'
    );
    // topoLayer[16].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Pedregales.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[17] = new L.TopoJSON();
    topoLayer[17].addData(data);
    topoLayer[17].eachLayer(handleLayer_17);
    topoLayer[17].bindTooltip(
      '<span class="square-tooltip rocky_ground">&nbsp</span> Rocky Ground'
    );
    // topoLayer[17].addTo(map);
    fixOrderOfLayers();
  });
  // readJsonFile("data/amazon/Sabana.json", function (text) {
  //     let data = JSON.parse(text);
  //     topoLayer[18] = new L.TopoJSON();
  //     topoLayer[18].addData(data);
  //     topoLayer[18].eachLayer(handleLayer);
  //     topoLayer[18].bindTooltip('<span class="square-tooltip savannah">&nbsp</span> Savannah');
  //     // topoLayer[18].addTo(map);
  //     fixOrderOfLayers();
  // }); // EMPTY?
  readJsonFile("data/amazon/Sabana_humedales.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[19] = new L.TopoJSON();
    topoLayer[19].addData(data);
    topoLayer[19].eachLayer(handleLayer_18);
    topoLayer[19].bindTooltip(
      '<span class="square-tooltip wet_savannah">&nbsp</span> Wet Savannah'
    );
    // topoLayer[19].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Suelo_desnudo.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[20] = new L.TopoJSON();
    topoLayer[20].addData(data);
    topoLayer[20].eachLayer(handleLayer_19);
    topoLayer[20].bindTooltip(
      '<span class="square-tooltip naked_land">&nbsp</span> Naked Land'
    );
    // topoLayer[20].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Urbano.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[21] = new L.TopoJSON();
    topoLayer[21].addData(data);
    topoLayer[21].eachLayer(handleLayer_20);
    topoLayer[21].bindTooltip(
      '<span class="square-tooltip urban">&nbsp</span> Urban'
    );
    // topoLayer[21].addTo(map);
    fixOrderOfLayers();
  });
  readJsonFile("data/amazon/Vegetacion_secundaria.json", function(text) {
    let data = JSON.parse(text);
    topoLayer[22] = new L.TopoJSON();
    topoLayer[22].addData(data);
    topoLayer[22].eachLayer(handleLayer_21);
    topoLayer[22].bindTooltip(
      '<span class="square-tooltip secondary_vegetation">&nbsp</span> Secondary Vegetation'
    );
    // topoLayer[22].addTo(map);
    fixOrderOfLayers();
  });
}

function handleLayer(layer) {
  console.log(layer);
  let getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  layer.setStyle({
    color: getRandomColor(),
    fillOpacity: 1,
    weight: 1
  });

  // let colorOfLayer, fillOpacity;
  // if (SELECTION[miningType].categoryLevel === 1) {
  //     colorOfLayer = COLORS[miningType].color;
  //     fillOpacity = SELECTION[miningType].selected ? 1 : 0;
  // } else {
  //     colorOfLayer = COLORS[miningType]["sector"][sector];
  //     fillOpacity = SELECTION[miningType]["sector"][sector] ? 1 : 0;
  // }
  // layer.setStyle({
  //     color: colorOfLayer,
  //     // Uncomment this line to see only the ones with fillOpacity = 1
  //     fillOpacity: fillOpacity,
  //     weight: fillOpacity
  // });
}

function handleLayer_1(layer) {
  //Agricultura: "#cbde67", //verde
  // console.log(layer);

  layer.setStyle({
    color: "#085E12",
    fillOpacity: 1,
    weight: 1
  });
}

function handleLayer_2(layer) {
  //Agua: "#004392", //azul
  // console.log(layer);

  layer.setStyle({
    color: "#04059A",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_3(layer) {
  //Aguajal: "#84a4ff", // azul
  // console.log(layer);

  layer.setStyle({
    color: "#239C2B",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_4(layer) {
  //Bosque_inundable: "#0038a2", //azul
  // console.log(layer);

  layer.setStyle({
    color: "#6870DE",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_5(layer) {
  //Bosque_montano: "#e9cc40", //amarillo
  // console.log(layer);

  layer.setStyle({
    color: "#30BB37",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_6(layer) {
  //Bosque_no_inundable: "#440b47", // cafe
  // console.log(layer);

  layer.setStyle({
    color: "#3EDA44",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_7(layer) {
  //Carreteras_no_pavimentadas: "#ab2e05", // rojo
  // console.log(layer);

  layer.setStyle({
    color: "#B8050B",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_8(layer) {
  //Carreteras_pavimentadas: "#cf2f3b", // rojo
  // console.log(layer);

  layer.setStyle({
    color: "#C31A1B",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_9(layer) {
  //Glaciar: "#c12e96", //morado
  // console.log(layer);

  layer.setStyle({
    color: "#1D1FAB",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_10(layer) {
  //Humedales: "#251469", //lila
  // console.log(layer);

  layer.setStyle({
    color: "#363ABC",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_11(layer) {
  //Matorral: "#6d69ad", // lila
  // console.log(layer);

  layer.setStyle({
    color: "#6B4001",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_12(layer) {
  //Mineria: "#ffa458", // anaranjado
  // console.log(layer);

  layer.setStyle({
    color: "#000000",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_13(layer) {
  //Pajonal_andino: "#8c003d", // cafe
  // console.log(layer);

  layer.setStyle({
    color: "#A16D26",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_14(layer) {
  //Pasto_Agricultura: "#44d372", //verde
  // console.log(layer);

  layer.setStyle({
    color: "#157D1E",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_15(layer) {
  //Pasto_Herbazal: "#01e4ab", // verde
  // console.log(layer);

  layer.setStyle({
    color: "#1C8C24",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_16(layer) {
  //Pasto: "#3e5300", // verde
  // console.log(layer);

  layer.setStyle({
    color: "#0E6D18",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_17(layer) {
  //Pedregales: "#701200", // cafe
  // console.log(layer);

  layer.setStyle({
    color: "#F2B15F",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_18(layer) {
  //Sabana_humedales: "#ff5e71", // rojo
  // console.log(layer);

  layer.setStyle({
    color: "#4F55CD",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_19(layer) {
  //Suelo_desnudo: "#f188fb", // rosado
  // console.log(layer);

  layer.setStyle({
    color: "#CF2F2C",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_20(layer) {
  //Urbano: "#ff8ce5", // rosado
  // console.log(layer);

  layer.setStyle({
    color: "#DA453D",
    fillOpacity: 1,
    weight: 1
  });
}
function handleLayer_21(layer) {
  //Vegetacion_secundaria: "#d77686", // rosado
  // console.log(layer);
  layer.setStyle({
    color: "#4CFA51",
    fillOpacity: 1,
    weight: 1
  });
}

function fixOrderOfLayers() {
  if (topoLayer.length >= 23) {
    topoLayer[5].addTo(map);
    topoLayer[4].addTo(map);
    topoLayer[3].addTo(map);
    topoLayer[2].addTo(map);
    topoLayer[1].addTo(map);
    topoLayer[0].addTo(map);
    topoLayer[6].addTo(map);
    topoLayer[7].addTo(map);
    topoLayer[8].addTo(map);
    topoLayer[10].addTo(map);
    topoLayer[11].addTo(map);
    topoLayer[13].addTo(map);
    topoLayer[14].addTo(map);
    topoLayer[15].addTo(map);
    topoLayer[16].addTo(map);
    topoLayer[17].addTo(map);
    topoLayer[19].addTo(map);
    topoLayer[20].addTo(map);
    topoLayer[21].addTo(map);
    topoLayer[22].addTo(map);
    topoLayer[12].addTo(map);
  }
}
