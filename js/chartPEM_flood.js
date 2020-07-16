var chart = c3.generate({
    bindto: '#chartPEM_flood',
    padding: { left: 60, right: 60, bottom:-10 },
    data: {
      x: 'x',
      columns: [
        ['x','Sostenible','Real','Peor'],
        
        ['Infraestructura',-68.1,340.1,1174.4],
        ['Agricultura', 343.9,105.1,2473.0],
        ['Vegetación natural',-275.1,-445.1,-3645.6],
        ['Aumento de Personas al riesgo',5100,6000,8500 ],
        
      ],

      axes: {
        'Aumento de Personas al riesgo': 'y2',
      },
      
      type:'bar',
      colors: {
        'Infraestructura': '#a6a6a6',
        'Agricultura':'#ffd633',
        'Vegetación natural':'#009933',
        'Aumento de Personas al riesgo':'#c28e5b'
      },
    },
    legend: {
        position: 'inner-bottom'
    },
    axis: {
      x:{
        type : 'category',
      },
      y: {
        max: 3500,
        min: -3500,
        label: { 
          text: 'Área expuesta(km^2)',
          position: 'outer-middle'
        },
        ticks: 4,
    },
      y2: {
        show: true, 
        max: 8000,
        min: -8000,
        label: { 
          text: 'Aumento de Personas al riesgo' ,
          position: 'outer-middle' 
        },
        tick: {
          values: [0, 2000,4000,6000,8000]
        },
      }
}});

function changeData(year){

    let col;

  switch(year) {
    case "10":
     col = [
        ['Infraestructura',-45.0,237.2,832.2],
        ['Agricultura',310.4,97.8,2128.6 ],
        ['Vegetación natural',-264.6,-334.9,-2959.4],
        ['Personas al riesgo',4600,5300, 7300 ],
      ]
      break;
    case "50":
      col = [
        ['Infraestructura',-59.7,323.4,1123.8],
        ['Agricultura', 337.9,103.7,2363.7],
        ['Vegetación natural',-277.5,-427.1,-3485.8],
        ['Personas al riesgo',4900,5900, 8300 ],
      ]
      break;
    case "100":
      col = [
        ['Infraestructura',-68.1,340.1,1174.4],
        ['Agricultura', 343.9,105.1,2473.0],
        ['Vegetación natural',-275.1,-445.1,-3645.6],
        ['Personas al riesgo',5100,6000,8500 ],
      ]
      break;
    default: 
  }

  chart.load({
    columns: col,
    type: 'bar',

});
 
}


