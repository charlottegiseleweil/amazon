'use strict';

function map(){

	////////////////////////////////////////////
    // Basemaps ////////////////////////////////


    var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    {
    attribution: 'Webmap Prototype Charlotte Gisèle Weil, <a href="https://www.naturalcapitalproject.org/" target="_blank">The Natural Capital Project</a>. Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 12
    });

    var ESRIImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
    });

    var CartoLight = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    });


    var ESRIOcean = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}.png', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, GEBCO, NOAA, and DeLorme'
    });

    //var Satellite = L.tileLayer(// TODO!!!



    //var ESRIStreets= L.esri.basemapLayer('Streets');

    ////////////////////////////////////////////

    map_styling();
    ////////////////////////////////////////////
    ////// Data ////////////////////////////////

    //L.mapbox.accessToken = 'pk.eyJ1IjoiY2hhcmxvdHRlZ2lzZWxld2VpbCIsImEiOiJjaXZrMGZ5MTAwMmd6MzNtcXY1bnZzN3l4In0.3YJ6A1AYhcA4M4W9hb1DPQ';

    /*var mymap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/charlottegiseleweil.d0vnpeg3/tiles/{z}/{x}/{y}?access_token='+ 'pk.eyJ1IjoiY2hhcmxvdHRlZ2lzZWxld2VpbCIsImEiOiJjaXZrMGZ5MTAwMmd6MzNtcXY1bnZzN3l4In0.3YJ6A1AYhcA4M4W9hb1DPQ',
                            {
                                tileSize: 512,
                                zoomOffset: -1,
                                attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            }).addTo(map);
*/
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
            style: RECstyle},{
            onEachFeature: function(feature, layer) {}
          });

    

 var aoi = new L.Shapefile("./data/aoi.zip",{
            style: AOIstyle},{
            onEachFeature: function(feature, layer) {}
          });

 var geosur = new L.Shapefile("./data/geosur_extract.zip",{
            style: LUstyle},{
            onEachFeature: function(feature, layer) {}
          });


/*var landuse = new L.Shapefile("./data/LU_min.zip",{
            style: stylee},{
            onEachFeature: function(feature, layer) {}
          });*/         

var turismolugares = new L.Shapefile("./data/airports.zip",{
            //style: WSHEDstyle},{
            onEachFeature: function(feature, layer) {}
          });

var watersheds = new L.Shapefile("./data/watersheds.zip",{
            style: WSHEDstyle},{
            onEachFeature: function(feature, layer) {}
          });

var corrientes = new L.Shapefile("./data/corrientes.zip",{
            },{
            onEachFeature: function(feature, layer) {}
          });

	
    var raster = './data/carbon_map.tif',
    imageBounds = [[-10.99, -69.7], [-10.9, -69.5]];

    var geobosque = L.imageOverlay(raster, imageBounds); //zindex here!

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
createCheckboxForLayer('#geosur', geosur,'#LUleyenda')
createCheckboxForLayer('#rec', rec,'#RECleyenda')
createCheckboxForLayer('#landuse', landuse)
createCheckboxForLayer('#corrientes', corrientes)
createCheckboxForLayer('#watersheds', watersheds)
createCheckboxForLayer('#aoi', aoi)
createCheckboxForLayer('#turismolugares', turismolugares)



};