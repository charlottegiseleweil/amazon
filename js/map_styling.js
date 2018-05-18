'use strict';

function map_styling(){

    function getColor(d) {
    return d > 200  ? '#E31A1C' :
           d > 100   ? '#FED976' :
                      '#FFEDA0';
    };

    function watershedStyle(d) {
    return d > 100000  ? '#5ADBFF' :
           d > 35000  ? '#3C6997' :
           d > 12000   ? '#62B6CB' :
           d > 9000   ? '#7E78D2' :
           d > 5000   ? '#CAE9FF' :
                      '#1B4965';
    }


    function stylee(feature) {
    return {
        fillColor: watershedStyle(feature.properties.AREA),
        weight: 2,
        opacity: 2,
        color: 'white',
        Array: '2',
        fillOpacity: 0.7
        };
    }  

    function AOIstyle(feature) {
    return {
        fillColor: 'None',
        weight: 2,
        opacity: 2,
        color: 'black',
        Array: '5',
        fillOpacity: 0.7
        };
    } 


    window.stylee = stylee;
    window.AOIstyle = AOIstyle;
}; 
