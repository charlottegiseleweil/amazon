let firstLoad = true;
let topoLayer = [];
let map;

let COLORS_Files = { // Dictionary to select the color of the map 
    Agricultura: "#cbde67", //verde
    Agua: "#004392", //azul
    Aguajal: "#84a4ff", // azul
    Bosque_inundable: "#0038a2", //azul
    Bosque_montano: "#e9cc40", //amarillo
    Bosque_no_inundable: "#440b47", // cafe
    Carreteras_no_pavimentadas: "#ab2e05", // rojo
    Carreteras_pavimentadas: "#cf2f3b", // rojo
    Glaciar: "#c12e96", //morado
    Humedales: "#251469", //lila
    Matorral: "#6d69ad", // lila
    Mineria: "#ffa458", // anaranjado
    Pajonal_andino: "#8c003d", // cafe 
    Pasto_Agricultura: "#44d372", //verde
    Pasto_Herbazal: "#01e4ab", // verde
    Pasto: "#3e5300", // verde
    Pedregales: "#701200", // cafe
    Sabana_humedales: "#ff5e71", // rojo
    Suelo_desnudo: "#f188fb", // rosado
    Urbano: "#ff8ce5", // rosado
    Vegetacion_secundaria: "#d77686", // rosado
}


window.onload = () => {
    const maxBounds = [
        [13.39029, -16.33247], //Southwest
        [-59.450451, -109.47493] //Northeast
    ];
    map = new L.map("map", {
        center: [-11.60, -69.59],
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
        'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
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
    readJsonFile("assets/data/amazon/simplified_geo_LU_Agricultura.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[0] = new L.TopoJSON();
        topoLayer[0].addData(data);
        topoLayer[0].eachLayer(handleLayer_1);
        // topoLayer[0].addTo(map);           

    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Agua.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[1] = new L.TopoJSON();
        topoLayer[1].addData(data);
        topoLayer[1].eachLayer(handleLayer_2);
        // topoLayer[1].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Aguajal.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[2] = new L.TopoJSON();
        topoLayer[2].addData(data);
        topoLayer[2].eachLayer(handleLayer_3);
        // topoLayer[2].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Bosque_inundable.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[3] = new L.TopoJSON();
        topoLayer[3].addData(data);
        topoLayer[3].eachLayer(handleLayer_4);
        // topoLayer[3].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Bosque_montano.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[4] = new L.TopoJSON();
        topoLayer[4].addData(data);
        topoLayer[4].eachLayer(handleLayer_5);
        // topoLayer[4].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Bosque_no_inundable.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[5] = new L.TopoJSON();
        topoLayer[5].addData(data);
        topoLayer[5].eachLayer(handleLayer_6);
        // topoLayer[5].addTo(map);
    }); //weird
    readJsonFile("assets/data/amazon/simplified_geo_LU_Carreteras_no_pavimentadas.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[6] = new L.TopoJSON();
        topoLayer[6].addData(data);
        topoLayer[6].eachLayer(handleLayer_7);
        // topoLayer[6].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Carreteras_pavimentadas.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[7] = new L.TopoJSON();
        topoLayer[7].addData(data);
        topoLayer[7].eachLayer(handleLayer_8);
        // topoLayer[7].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Glaciar.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[8] = new L.TopoJSON();
        topoLayer[8].addData(data);
        topoLayer[8].eachLayer(handleLayer_9);
        // topoLayer[8].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Herbazal.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[9] = new L.TopoJSON();
        topoLayer[9].addData(data);
        topoLayer[9].eachLayer(handleLayer);
        // topoLayer[9].addTo(map);
    }); // EMPTY???
    readJsonFile("assets/data/amazon/simplified_geo_LU_Humedales.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[10] = new L.TopoJSON();
        topoLayer[10].addData(data);
        topoLayer[10].eachLayer(handleLayer_10);
        // topoLayer[10].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Matorral.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[11] = new L.TopoJSON();
        topoLayer[11].addData(data);
        topoLayer[11].eachLayer(handleLayer_11);
        // topoLayer[11].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Mineria.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[12] = new L.TopoJSON();
        topoLayer[12].addData(data);
        topoLayer[12].eachLayer(handleLayer_12);
        // topoLayer[12].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Pajonal_andino.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[13] = new L.TopoJSON();
        topoLayer[13].addData(data);
        topoLayer[13].eachLayer(handleLayer_13);
        // topoLayer[13].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Pasto-Agricultura.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[14] = new L.TopoJSON();
        topoLayer[14].addData(data);
        topoLayer[14].eachLayer(handleLayer_14);
        // topoLayer[14].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Pasto-Herbazal.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[15] = new L.TopoJSON();
        topoLayer[15].addData(data);
        topoLayer[15].eachLayer(handleLayer_15);
        // topoLayer[15].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Pasto.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[16] = new L.TopoJSON();
        topoLayer[16].addData(data);
        topoLayer[16].eachLayer(handleLayer_16);
        // topoLayer[16].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Pedregales.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[17] = new L.TopoJSON();
        topoLayer[17].addData(data);
        topoLayer[17].eachLayer(handleLayer_17);
        // topoLayer[17].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Sabana.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[18] = new L.TopoJSON();
        topoLayer[18].addData(data);
        topoLayer[18].eachLayer(handleLayer);
        // topoLayer[19].addTo(map);
    }); // EMPTY?
    readJsonFile("assets/data/amazon/simplified_geo_LU_Sabana_humedales.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[19] = new L.TopoJSON();
        topoLayer[19].addData(data);
        topoLayer[19].eachLayer(handleLayer_18);
        // topoLayer[18].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Suelo_desnudo.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[20] = new L.TopoJSON();
        topoLayer[20].addData(data);
        topoLayer[20].eachLayer(handleLayer_19);
        // topoLayer[20].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Urbano.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[21] = new L.TopoJSON();
        topoLayer[21].addData(data);
        topoLayer[21].eachLayer(handleLayer_20);
        // topoLayer[21].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Vegetacion_secundaria.json", function (text) {
        let data = JSON.parse(text);
        topoLayer[22] = new L.TopoJSON();
        topoLayer[22].addData(data);
        topoLayer[22].eachLayer(handleLayer_21);
        // topoLayer[22].addTo(map);
    });
}

function handleLayer(layer) {
    console.log(layer);
    let getRandomColor = ()=>{
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      layer.setStyle({
          color: getRandomColor(),
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

function handleLayer_1(layer) { //Agricultura: "#cbde67", //verde
    // console.log(layer);
  
      layer.setStyle({
          color: "#cbde67",
      });
}

function handleLayer_2(layer) { //Agua: "#004392", //azul
    // console.log(layer);
  
      layer.setStyle({
          color: "#004392",
      });
}
function handleLayer_3(layer) { //Aguajal: "#84a4ff", // azul
    // console.log(layer);
  
      layer.setStyle({
          color: "#84a4ff",
      });
}
function handleLayer_4(layer) { //Bosque_inundable: "#0038a2", //azul
    // console.log(layer);
  
      layer.setStyle({
          color: "#0038a2",
      });
}
function handleLayer_5(layer) { //Bosque_montano: "#e9cc40", //amarillo
    // console.log(layer);
  
      layer.setStyle({
          color: "#e9cc40",
      });
}
function handleLayer_6(layer) { //Bosque_no_inundable: "#440b47", // cafe
    // console.log(layer);
  
      layer.setStyle({
          color: "#440b47",
      });
}
function handleLayer_7(layer) { //Carreteras_no_pavimentadas: "#ab2e05", // rojo
    // console.log(layer);
  
      layer.setStyle({
          color: "#ab2e05",
      });
}
function handleLayer_8(layer) { //Carreteras_pavimentadas: "#cf2f3b", // rojo
    // console.log(layer);
  
      layer.setStyle({
          color: "#cf2f3b",
      });
}
function handleLayer_9(layer) { //Glaciar: "#c12e96", //morado
    // console.log(layer);
  
      layer.setStyle({
          color: "#c12e96",
      });
}
function handleLayer_10(layer) { //Humedales: "#251469", //lila
    // console.log(layer);
  
      layer.setStyle({
          color: "#251469",
      });
}
function handleLayer_11(layer) { //Matorral: "#6d69ad", // lila
    // console.log(layer);
  
      layer.setStyle({
          color: "#6d69ad",
      });
}
function handleLayer_12(layer) { //Mineria: "#ffa458", // anaranjado
    // console.log(layer);
  
      layer.setStyle({
          color: "#ffa458",
      });
}
function handleLayer_13(layer) { //Pajonal_andino: "#8c003d", // cafe 
    // console.log(layer);
  
      layer.setStyle({
          color: "#8c003d",
      });
}
function handleLayer_14(layer) { //Pasto_Agricultura: "#44d372", //verde
    // console.log(layer);
  
      layer.setStyle({
          color: "#44d372",
      });
}
function handleLayer_15(layer) { //Pasto_Herbazal: "#01e4ab", // verde
    // console.log(layer);
  
      layer.setStyle({
          color: "#01e4ab",
      });
}
function handleLayer_16(layer) { //Pasto: "#3e5300", // verde
    // console.log(layer);
  
      layer.setStyle({
          color: "#3e5300",
      });
}
function handleLayer_17(layer) { //Pedregales: "#701200", // cafe
    // console.log(layer);
  
      layer.setStyle({
          color: "#701200",
      });
}
function handleLayer_18(layer) { //Sabana_humedales: "#ff5e71", // rojo
    // console.log(layer);
  
      layer.setStyle({
          color: "#ff5e71",
      });
}
function handleLayer_19(layer) { //Suelo_desnudo: "#f188fb", // rosado
    // console.log(layer);
  
      layer.setStyle({
          color: "#f188fb",
      });
}
function handleLayer_20(layer) { //Urbano: "#ff8ce5", // rosado
    // console.log(layer);
  
      layer.setStyle({
          color: "#ff8ce5",
      });
}
function handleLayer_21(layer) { //Vegetacion_secundaria: "#d77686", // rosado
    // console.log(layer);
    
      layer.setStyle({
          color: "#d77686",
      });
}






