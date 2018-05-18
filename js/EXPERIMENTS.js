/*experiments as I'd like to make it interactive as here:
https://leafletjs.com/examples/choropleth/
*/
var landuse; 


function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
function resetHighlight(e) {
    landuse.resetStyle(e.target);
}
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeaturee(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}


landuse = new L.Shapefile("./data/watersheds.zip",{
            style: stylee},{
            onEachFeature: onEachFeaturee
          });
