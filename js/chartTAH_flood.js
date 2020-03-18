var chart = c3.generate({
    bindto: '#chartTAH_flood',
    padding: { left: 60, right: 0, bottom:-10 },
    data: {
      x: 'x',
      columns: [
        ['x','Baseline','Sostenible','Peor'],
        
        ['Infraestructura',11.574,23.0823,64.7388],
        ['Agricultura', 263.088,432.4419,918.1269],
        ['Vegetación natural', 4091.3325,3910.0095,3229.9974],
        
      ],
      
      type:'bar',
      colors: {
        'Infraestructura': '#a6a6a6',
        'Agricultura':'#ffd633',
        'Vegetación natural':'#009933',
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
        max: 4500,
        min: 0,
        label: { 
          text: 'Área expuesta(km^2)',
          position: 'outer-middle'
        },
        ticks: 4,
    }
}});

function changeData(year){

    let col;

  switch(year) {
    case "10":
     col = [
        ['Infraestructura',8.7408,16.8804,51.4728],
        ['Agricultura', 205.1739,332.4744,687.6603],
        ['Vegetación natural', 3009.0582,2873.1537,2383.7823],
      ]
      break;
    case "50":
      col = [
        ['Infraestructura',11.574,23.0823,64.7388],
        ['Agricultura', 263.088,432.4419,918.1269],
        ['Vegetación natural', 4091.3325,3910.0095,3229.9974],
      ]
      break;
    case "100":
      col = [
        ['Infraestructura',12.8259,26.127,66.618],
        ['Agricultura', 288.6435,474.201,1012.725],
        ['Vegetación natural', 4503.5577,4304.2383,3548.018],
      ]
      break;
    default: 
  }

  chart.load({
    columns: col,
    type: 'bar'
    
});
 
}
