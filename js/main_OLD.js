
  // initialize the map ([])
  var map = L.map('map').setView([-10.95, -69.59], 7); //# -10.95, -69.59

  // load a tile layer
  /*L.tileLayer('http://tiles.mapc.org/basemap/{z}/{x}/{y}.png',
    {
      attribution: 'Tiles by <a href="http://mapc.org">MAPC</a>, Data by <a href="http://mass.gov/mgis">MassGIS</a>',
      maxZoom: 17,
      minZoom: 9
    }).addTo(map);*/

var Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
{
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 12
});

var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

Esri_NatGeoWorldMap.addTo(map);

var geosur = new L.Shapefile("./data/geosur.zip",{
        onEachFeature: function(feature, layer) {}
      });

function toggleLayer(layer, shouldAddLayer){
  if (shouldAddLayer) {
    layer.addTo(map);
  } else {
    map.removeLayer(layer)      
  }
}

function createCheckboxForLayer(cssSelector, layer) {
  $(cssSelector).change(function() {
    toggleLayer(layer, this.checked);       
  });
}

createCheckboxForLayer('#rivers', geosur)


/*$('#wildlife').change(function() {
          if(this.checked) {
              OpenStreetMap_Mapnik.addTo(map);
          }
          else{
               map.removeLayer(OpenStreetMap_Mapnik)
          }
      });
};

$('#rivers').change(function() {
        if(this.checked) {
            //PeruvianRivers.addTo(map);
             $.getJSON('./data/wri_basins/wribasin.geojson',function(data){
  				L.geoJson(data).addTo(map); });
        }
        else{
             //map.removeLayer(PeruvianRivers)
        }
    });*/