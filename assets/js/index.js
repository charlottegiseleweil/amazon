let firstLoad = true;
let topoLayer = [];
let map;

window.onload = () => {
    const maxBounds = [
        [13.39029, -16.33247], //Southwest
        [-59.450451, -109.47493] //Northeast
    ];
    map = new L.map("map", {
        center: [-10.95, -69.59],
        zoom: 7,
        maxBounds: maxBounds,
        maxBoundsViscosity: 1.0,
        zoomSnap: 1,
        zoomDelta: 1,
        wheelPxPerZoomLevel: 150,
        attributionControl: false
    });
    const layerOptions = {
        maxZoom: 13,
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

function loadMapFiles() {
    readJsonFile("assets/data/amazon/simplified_geo_LU_Agricultura.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[0] = new L.TopoJSON();
        topoLayer[0].addData(data);
        topoLayer[0].eachLayer(handleLayer);
        topoLayer[0].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Agua.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[1] = new L.TopoJSON();
        topoLayer[1].addData(data);
        topoLayer[1].eachLayer(handleLayer);
        topoLayer[1].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Aguajal.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[2] = new L.TopoJSON();
        topoLayer[2].addData(data);
        topoLayer[2].eachLayer(handleLayer);
        topoLayer[2].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Bosque_inundable.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[3] = new L.TopoJSON();
        topoLayer[3].addData(data);
        topoLayer[3].eachLayer(handleLayer);
        topoLayer[3].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Bosque_montano.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[4] = new L.TopoJSON();
        topoLayer[4].addData(data);
        topoLayer[4].eachLayer(handleLayer);
        topoLayer[4].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Bosque_no_inundable.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[5] = new L.TopoJSON();
        topoLayer[5].addData(data);
        topoLayer[5].eachLayer(handleLayer);
        topoLayer[5].addTo(map);
    }); //weird
    readJsonFile("assets/data/amazon/simplified_geo_LU_Carreteras_no_pavimentadas.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[6] = new L.TopoJSON();
        topoLayer[6].addData(data);
        topoLayer[6].eachLayer(handleLayer);
        topoLayer[6].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Carreteras_pavimentadas.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[7] = new L.TopoJSON();
        topoLayer[7].addData(data);
        topoLayer[7].eachLayer(handleLayer);
        topoLayer[7].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Glaciar.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[8] = new L.TopoJSON();
        topoLayer[8].addData(data);
        topoLayer[8].eachLayer(handleLayer);
        topoLayer[8].addTo(map);
    });
    // readJsonFile("assets/data/amazon/simplified_geo_LU_Herbazal.geojson", function (text) {
    //     let data = JSON.parse(text);
    //     topoLayer[9] = new L.TopoJSON();
    //     topoLayer[9].addData(data);
    //     topoLayer[9].eachLayer(handleLayer);
    //     topoLayer[9].addTo(map);
    // }); // EMPTY???
    readJsonFile("assets/data/amazon/simplified_geo_LU_Humedales.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[10] = new L.TopoJSON();
        topoLayer[10].addData(data);
        topoLayer[10].eachLayer(handleLayer);
        topoLayer[10].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Matorral.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[11] = new L.TopoJSON();
        topoLayer[11].addData(data);
        topoLayer[11].eachLayer(handleLayer);
        topoLayer[11].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Mineria.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[12] = new L.TopoJSON();
        topoLayer[12].addData(data);
        topoLayer[12].eachLayer(handleLayer);
        topoLayer[12].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Pajonal_andino.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[13] = new L.TopoJSON();
        topoLayer[13].addData(data);
        topoLayer[13].eachLayer(handleLayer);
        topoLayer[13].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Pasto-Agricultura.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[14] = new L.TopoJSON();
        topoLayer[14].addData(data);
        topoLayer[14].eachLayer(handleLayer);
        topoLayer[14].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Pasto-Herbazal.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[15] = new L.TopoJSON();
        topoLayer[15].addData(data);
        topoLayer[15].eachLayer(handleLayer);
        topoLayer[15].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Pasto.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[16] = new L.TopoJSON();
        topoLayer[16].addData(data);
        topoLayer[16].eachLayer(handleLayer);
        topoLayer[16].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Pedregales.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[17] = new L.TopoJSON();
        topoLayer[17].addData(data);
        topoLayer[17].eachLayer(handleLayer);
        topoLayer[17].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Sabana_humedales.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[18] = new L.TopoJSON();
        topoLayer[18].addData(data);
        topoLayer[18].eachLayer(handleLayer);
        topoLayer[18].addTo(map);
    });
    // readJsonFile("assets/data/amazon/simplified_geo_LU_Sabana.geojson", function (text) {
    //     let data = JSON.parse(text);
    //     topoLayer[19] = new L.TopoJSON();
    //     topoLayer[19].addData(data);
    //     topoLayer[19].eachLayer(handleLayer);
    //     topoLayer[19].addTo(map);
    // }); // EMPTY?
    readJsonFile("assets/data/amazon/simplified_geo_LU_Suelo_desnudo.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[20] = new L.TopoJSON();
        topoLayer[20].addData(data);
        topoLayer[20].eachLayer(handleLayer);
        topoLayer[20].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Urbano.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[21] = new L.TopoJSON();
        topoLayer[21].addData(data);
        topoLayer[21].eachLayer(handleLayer);
        topoLayer[21].addTo(map);
    });
    readJsonFile("assets/data/amazon/simplified_geo_LU_Vegetacion_secundaria.geojson", function (text) {
        let data = JSON.parse(text);
        topoLayer[22] = new L.TopoJSON();
        topoLayer[22].addData(data);
        topoLayer[22].eachLayer(handleLayer);
        topoLayer[22].addTo(map);
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
