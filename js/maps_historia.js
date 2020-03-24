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
  center: [-11.0058, -68.74],
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
        style: style},{
        onEachFeature: function(feature, layer) {}
        });
    }; 

// - - - - - - -
// Indice Flood
// - - - - - - -

shapefileLayer("CBE_flood_2015","mapa6",floodBaseStyle);
shapefileLayer("I_flood_2015","mapa12",floodBaseStyle);
shapefileLayer("CBE_vulnerable_areas","mapa32",floodBaseStyle);
shapefileLayer("I_vulnerable_areas","mapa33",floodBaseStyle);



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
      map.panTo(new L.LatLng(-11.0058, -68.74));
      layers["CBE_flood_2015"].addTo(map);
      document.getElementById("mapText").innerHTML = 'En Cobija, capital del Departamento Pando, Bolivia, había para esas fechas 2,100 personas instaladas en 12 albergues. (ONU 2015). Otro tanto sucedió en las ciudades de Brasiléia y Epitaciolândia, Acre, Brasil, donde los niveles de inundación superaron los 13 m como dan cuenta diversas fuentes informativas. (El Comercio, América Noticias, Acre Noticias, Reliefweb, Ejutv, RPP Noticias, Acre Alerta, Agencia Brasil, Folha de S. Paulo, O alto Acre). <br><br> Esta gran inundación, considerada “histórica” en la región, permitió una aproximación de estudio de caso, que culminó en la elaboración de una base de datos en un sistema de información geográfica (SIG). Este instrumento ilustra los niveles que alcanzó el agua' 

      break;
    default: // Iñapari
      map.panTo(new L.LatLng(-10.94, -69.57));
      layers["I_flood_2015"].addTo(map);
      document.getElementById("mapText").innerHTML = 'En la localidad de Iñapari, Madre de Dios, Perú, el 19 de febrero de ese año, aconsecuencia de intensas lluvias, se registró el incremento del caudal de los ríos Acre y Yaverija. Posteriormente, el desborde de ambos ríos inundó viviendas, locales públicos, vías de comunicación y áreas de cultivo en el distrito y ciudad de Iñapari. Para el día 24 se tenía 1.050 damnificados y más de 240 viviendas dañadas. (INDECI/COEN 2015).  <br><br> Esta gran inundación, considerada “histórica” en la región, permitió una aproximación de estudio de caso, que culminó en la elaboración de una base de datos en un sistema de información geográfica (SIG). Este instrumento ilustra los niveles que alcanzó el agua' 

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
  console.log(type);
  //layers[area+"_"+type].addTo(map);

  if(type == "flood_levels"){
    floodRangeSlider.addTo(map);

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
    this._div.innerHTML = '<div id="slider" ><p id="slider_value"><span id="flood_m">1</span> m</p><input type="range" min="0" max="3" value="0" class="slider" id="flood_range"></div>';
};

function changeFloodLevel(value){
  let flood_levels = [1,3,6,12];
  var output = document.getElementById("flood_m");
  output.innerHTML = flood_levels[value];
}


// - - - - - - - -
// Initialization
// - - - - - - - - 


// ---
$( document ).ready(function() {
    //switchMode('Flood');
    layers["CBE_flood_2015"].addTo(map);

});


