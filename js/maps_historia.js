// - - - - - - -
// Basemaps 
// - - - - - - -

var basemap = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
    {attribution: "OpenStreetMap"}
);


// - - - - - - -
// Launch maps
// - - - - - - -

var map = L.map("mapa", {
  layers: [basemap],
  center: [-11.0067, -68.746],
  zoom: 14
});



// - - - - - - -
// Add Labels
// - - - - - - -

map.createPane('labels');
map.getPane('labels').style.zIndex = 2000;
map.getPane('labels').style.pointerEvents = 'none';
var labels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    pane: 'labels'
}).addTo(map);

// Add scale
L.control.scale({position: 'bottomleft'}).addTo(map)


// - - - - - - -
// Shapefiles
// - - - - - - -

// Add shapefile or area AOI de enfoque
var layers = []
map_styling();
////// Shapefile layers -- make Styles in mapUtils.js/////
function shapefileLayer(layerName, shapefileName,style=shpStyle){
    layers[layerName] = new L.Shapefile("data/shapefiles/"+shapefileName+".zip",{
        style: style,
        onEachFeature: function(feature, layer) {
          layer.bindTooltip("Flood extent"); 
        }
        });
    }; 

// - - - - - - -
// Indice Flood
// - - - - - - -

shapefileLayer("CBE_flood_2015","mapa6",floodBaseStyle);
shapefileLayer("I_flood_2015","mapa12",floodBaseStyle);

shapefileLayer("CBE_flood_levels_0","Nivel_179msnm",floodBaseStyle);
shapefileLayer("I_flood_levels_0","I_1metro",floodBaseStyle);
shapefileLayer("CBE_flood_levels_1","Nivel_181msnm",floodBaseStyle);
shapefileLayer("I_flood_levels_1","I_4metros",floodBaseStyle);
shapefileLayer("CBE_flood_levels_2","Nivel_186msnm",floodBaseStyle);
shapefileLayer("I_flood_levels_2","I_6metros",floodBaseStyle);
shapefileLayer("CBE_flood_levels_3","Nivel_188msnm",floodBaseStyle);
shapefileLayer("I_flood_levels_3","I_8metros",floodBaseStyle);
shapefileLayer("CBE_flood_levels_4","Nivel_190msnm",floodBaseStyle);
shapefileLayer("I_flood_levels_4","I_10metros",floodBaseStyle);
shapefileLayer("CBE_flood_levels_5","Nivel_192msnm",floodBaseStyle);
shapefileLayer("I_flood_levels_5","I_12metros",floodBaseStyle);
shapefileLayer("CBE_flood_levels_6","Nivel_193.5msnm",floodBaseStyle);



// - - - - - - - - - - - -
// Functions to switch Maps
// - - - - - - - - - - - - 

function changeArea(area){

  // Remove layers
  map.eachLayer(function(layer) {
    if (layer._url !="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
    ) {
      map.removeLayer(layer);
    }
  });
  labels.addTo(map);

  switch(area) {
    case "CBE":
      map.panTo(new L.LatLng(-11.0067, -68.746));
      document.getElementById("mapText").innerHTML = 'Cobija, capital del Departamento Pando, Bolivia está ubicado en la margen derecha del Río Acre, limitando con los municipios brasileños de Epitaciolândia y Brasiléia.  La ciudad cuenta con una densidad actual de 166 habitantes por km².Otro tanto sucedió en las ciudades de Brasiléia y Epitaciolândia, Acre, Brasil, donde los niveles de inundación superaron los 13 m como dan cuenta diversas fuentes informativas. (El Comercio, América Noticias, Acre Noticias, Reliefweb, Ejutv, RPP Noticias, Acre Alerta, Agencia Brasil, Folha de S. Paulo, O alto Acre).<br><br> Esta gran inundación, considerada “histórica” en la región, permitió una aproximación de estudio de caso, que culminó en la elaboración de una base de datos en un sistema de información geográfica (SIG). Este instrumento ilustra los niveles que alcanzó el agua.';
      break;
    default: // Iñapari
      map.panTo(new L.LatLng(-10.94, -69.57));
      document.getElementById("mapText").innerHTML = 'En la localidad de Iñapari, Madre de Dios, Perú, el 19 de febrero de ese año, a consecuencia de intensas lluvias, se registró el incremento del caudal de los ríos Acre y Yaverija. Posteriormente, el desborde de ambos ríos inundó viviendas, locales públicos, vías de comunicación y áreas de cultivo en el distrito y ciudad de Iñapari. Para el día 24 se tenía 1.050 damnificados y más de 240 viviendas dañadas. (INDECI/COEN 2015).<br><br> Esta gran inundación, considerada “histórica” en la región, permitió una aproximación de estudio de caso, que culminó en la elaboración de una base de datos en un sistema de información geográfica (SIG). Este instrumento ilustra los niveles que alcanzó el agua';
    }

  let type = $('input[name=type]:checked').val();
  if(type == "flood_levels"){
    layers[area+"_"+type+"_"+document.getElementById("flood_range").value].addTo(map);
    document.getElementById("flood_range").max = (area == "CBE") ? 6:5;
  }
  else{
    layers[area+"_"+type].addTo(map);
  }
}

function updateMap(type){
  // Remove layers
  map.eachLayer(function(layer) {
    if (layer._url !="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
    ) {
      map.removeLayer(layer);
    }
  });
  labels.addTo(map);

  let area = $('input[name=area]:checked').val();
  
  if(type == "flood_levels"){
    floodRangeSlider.addTo(map);
    layers[area+"_"+type+"_3"].addTo(map);

    // Disable dragging when user's cursor enters the element
    floodRangeSlider.getContainer().addEventListener('mouseover', function () {
        map.dragging.disable();
    });

    // Re-enable dragging when user's cursor leaves the element
    floodRangeSlider.getContainer().addEventListener('mouseout', function () {
        map.dragging.enable();
    });

    let slider = document.getElementById("flood_range");
    slider.oninput = function() {
      changeFloodLevel(this.value);
    }
  }
  else{
    map.removeControl(floodRangeSlider);
    layers[area+"_"+type].addTo(map);
  }

}

// Range slider for flood levels
let floodRangeSlider = L.control({position: 'bottomright'});

floodRangeSlider.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

floodRangeSlider.update = function (props) {
    let area = $('input[name=area]:checked').val();
    if (area == "CBE"){
      this._div.innerHTML = '<div id="slider" ><p id="slider_value"><span id="flood_m">8</span> m</p><input type="range" min="0" max="6" value="2" class="slider" id="flood_range"></div>';
    }
    else{
      this._div.innerHTML = '<div id="slider" ><p id="slider_value"><span id="flood_m">8</span> m</p><input type="range" min="0" max="5" value="3" class="slider" id="flood_range"></div>';
    }
};

function changeFloodLevel(value){
  let area = $('input[name=area]:checked').val();
  let flood_levels = (area=="CBE") ? [1,3,8,10,12,14,15.5]: [1,4,6,8,10,12] ;
  var output = document.getElementById("flood_m");
  output.innerHTML = flood_levels[value];

   // Remove layers
   map.eachLayer(function(layer) {
    if (layer._url !="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
    ) {
      map.removeLayer(layer);
    }
  });
  labels.addTo(map);

  layers[area+"_flood_levels_" + value].addTo(map);
}


// - - - - - - - -
// Initialization
// - - - - - - - - 

// ---
$( document ).ready(function() {
    //switchMode('Flood');
    layers["CBE_flood_2015"].addTo(map);

});


