'use strict';

function map(){

	////////////////////////////////////////////
    // Basemaps ////////////////////////////////


    var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    {
    attribution: 'Interface Charlotte Gisèle Weil, with <a href="https://www.naturalcapitalproject.org/" target="_blank">The Natural Capital Project</a>. Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 12
    });

    var ESRIImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
    });

    var CartoLight = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    });

    var MapboxStreets = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.afb8c76d/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>' });

    var MapboxTerrain = L.tileLayer('http://a.tiles.mapbox.com/v3/geointerest.e4qjes5f/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZ2VvaW50ZXJlc3QiLCJhIjoiQ2czbnlDMCJ9.pQ-_LxzHCL6WqMm5rJrEWw', { attribution: '&copy; <a href="http://www.mapbox.com">Mapbox</a>' });

    var ESRIOcean = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}.png', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, GEBCO, NOAA, and DeLorme'
    });

    ////////////////////////////////////////////

    map_styling();
    ////////////////////////////////////////////
    ////// Data ////////////////////////////////

	var geosur = new L.Shapefile("./data/geosur.zip",{
	        onEachFeature: function(feature, layer) {}
	      });


    /*var LU = new L.Shapefile("./data/LU_merged.zip",{
            onEachFeature: function(feature, layer) {}
          });

    {
    style: function(feature) {
        switch (feature.properties.LU_Code) {
            case '1': return {color: "#ff0000"};
            case '3':   return {color: "#0000ff"};
        }
    }
}*/

    var rec = new L.Shapefile("./data/rec_results.zip",{
            onEachFeature: function(feature, layer) {}
          });

    

 var aoi = new L.Shapefile("./data/aoi.zip",{
            style: AOIstyle},{
            onEachFeature: function(feature, layer) {}
          });



/*var landuse = new L.Shapefile("./data/LU_merged.zip",{
            style: stylee},{
            onEachFeature: function(feature, layer) {}
          });
          */

var watersheds = new L.Shapefile("./data/watersheds.zip",{
            style: stylee},{
            onEachFeature: function(feature, layer) {}
          });

	
    var raster = './data/Geobosque_2013_2016.jpeg',
    imageBounds = [[-10.99, -69.7], [-10.9, -69.5]];

    var geobosque = L.imageOverlay(raster, imageBounds);

	////////////////////////////////////////////


	    // set base map and controls
    var map = new L.Map('map', {
        zoomControl: false,
        layer_selector: false,
        layers: [Esri_NatGeoWorldMap],
        center: [-10.95, -69.59],
        zoom: 7,
        maxZoom:13
    });

    // scale
    L.control.scale({ position: 'bottomright' }).addTo(map);

    // zoom
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Mini-map
    var tileUrl='https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
	var mb = new L.TileLayer(tileUrl, {minZoom: 0, maxZoom: 14});
    var miniMap = new L.Control.MiniMap(mb, { toggleDisplay: true }).addTo(map); 


// Functions to toggle layers
function layerOnOff(layer, shouldAddLayer){
  if (shouldAddLayer) {
  	setTimeout(() => layer.addTo(map), 0);
  } else {
    map.removeLayer(layer)      
  }
}

function createCheckboxForLayer(cssSelector, layer) {
  $(cssSelector).change(function() {
    layerOnOff(layer, this.checked);       
  });
}

// Layers per checkbox
createCheckboxForLayer('#rivers', geosur)
createCheckboxForLayer('#checkbox2', rec)
createCheckboxForLayer('#wildlife', geobosque)
createCheckboxForLayer('#landuse', landuse)
createCheckboxForLayer('#watersheds', watersheds)
createCheckboxForLayer('#aoi', aoi)


};