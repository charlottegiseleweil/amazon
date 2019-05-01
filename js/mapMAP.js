'use strict';

//function map(){
$(document).ready(function(){
    
	////////////////////////////////////////////
    // Basemaps ////////////////////////////////
    var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    {attribution: 'Webmap Prototype Charlotte Gisèle Weil, <a href="https://www.naturalcapitalproject.org/" target="_blank">The Natural Capital Project</a>. Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 12});

    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    ////////////////////////////////////////////

    

    // Set Basemap + Scale + Zoom
    var map = new L.Map('map', {
        zoomControl: false,
        layer_selector: false,
        layers: [Esri_NatGeoWorldMap],
        center: [-10.95, -69.59],
        zoom: 7,
        maxZoom:13
    });

    L.control.scale({ position: 'bottomright' }).addTo(map);
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Mini-map
    var tileUrl='https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
    var mb = new L.TileLayer(tileUrl, {minZoom: 0, maxZoom: 14});
    var miniMap = new L.Control.MiniMap(mb, { toggleDisplay: true }).addTo(map); 
    // - - - -  - - - -  - - - - - 


    ////////////////////////////////////////////
    ////// Data ////////////////////////////////

   var layers = []
   map_styling();
   // mapLayers();


	////// Shapefile layers /////

   function shapefileLayer(variable,style=shpStyle){
        layers[variable] = new L.Shapefile("data/shapefiles/"+variable+".zip",{
            style: style},{
            onEachFeature: function(feature, layer) {}
          });
    }; 

    shapefileLayer("AOI");
    shapefileLayer("AOI_TAH");
    shapefileLayer("AOI_PEM");
    shapefileLayer("cuencas", blueShpStyle);


    /*
    Delete the below if above works !

    var AOI = new L.Shapefile("../data/shapefiles/AOI.zip",{
            style: shpStyle},{
	        onEachFeature: function(feature, layer) {}
	      });

    var AOI_TAH = new L.Shapefile("../data/shapefiles/AOI_TAH.zip",{
            style: shpStyle},{
            onEachFeature: function(feature, layer) {}
          });

    var AOI_PEM = new L.Shapefile("../data/shapefiles/AOI_PEM.zip",{
            style: shpStyle},{
            onEachFeature: function(feature, layer) {}
          });

    var cuencas = new L.Shapefile("../data/shapefiles/cuencas.zip",{
            style: shpStyle},{
            onEachFeature: function(feature, layer) {}
          });
    */

    ///// Tilesets Layers /////
    
    var tileset = "None"
    
    function tilesetLayer(variable, attribution){
        tileset = "https://charlottegiseleweil.github.io/tiles/amazon/"+variable+"/{z}/{x}/{y}.png";
        layers[variable] = L.tileLayer(tileset, {
            attribution: attribution});
    }; 

    tilesetLayer("Carbon_MAP","Almacenamiento de Carbono modelado con InVEST - PRO Agua");
    tilesetLayer("Sedimentos_MAP","Almacenamiento de Carbono modelado con InVEST - PRO Agua");


	
    /* Rasters diplayed directly ho ho ho ? 

    var raster = './data/carbon_map.tif',
    imageBounds = [[-10.99, -69.7], [-10.9, -69.5]];

    var geobosque = L.imageOverlay(raster, imageBounds); //zindex here! */

	////////////////////////////////////////////



// Functions to toggle layers
function layerOnOff(layer, shouldAddLayer,legendDiv){
  if (shouldAddLayer) {
  	setTimeout(() => layer.addTo(map), 0);
    $(legendDiv).removeClass('hide');
  } else {
    map.removeLayer(layer);
    $(legendDiv).addClass('hide');      
  }
}

function createCheckboxForLayer(cssSelector, layer,legendDiv) {
  $(cssSelector).change(function() {
    layerOnOff(layer, this.checked,legendDiv);       
  });
}



// Layers per checkbox
createCheckboxForLayer('#watersheds', layers["cuencas"])
createCheckboxForLayer('#aoi', layers["AOI"])
createCheckboxForLayer('#AOI_PEM', layers["AOI_PEM"])
createCheckboxForLayer('#AOI_TAH', layers["AOI_TAH"])
createCheckboxForLayer('#Satellite', Esri_WorldImagery)

createCheckboxForLayer('#sed_export', layers["Sedimentos_MAP"],'#sedimentosLeyenda')
createCheckboxForLayer('#Carbon_MAP', layers["Carbon_MAPlayers"],'#carbonLeyenda')


});