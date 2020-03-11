var chart = c3.generate({
    bindto: '#chartTAH_flood',
    padding: { left: 60, right: 0, bottom:-10 },
    data: {
      x: 'x',
      columns: [
        ['x','Baseline','Sostenible','Peor'],
        
        ['Infraestructura',11.574,283.1985,1466.6868],
        ['Agricultura', 263.088,1288.1952,3313.9827],
        ['Vegetación natural', 4091.3325,9750.3786,6419.1942],
        
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
        max: 9000,
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
        ['Infraestructura',8.7408,218.4759,1095.7419],
        ['Agricultura', 205.1739,1164.4641,2982.6495],
        ['Vegetación natural', 3009.0582,8131,5328.0315],
      ]
      break;
    case "50":
      col = [
        ['Infraestructura',11.574,283.1985,1466.6868],
        ['Agricultura', 263.088,1288.1952,3313.9827],
        ['Vegetación natural', 4091.3325,9750.3786,6419.1942],
      ]
      break;
    case "100":
      col = [
        ['Infraestructura',12.8259,296.5554,1539.0252],
        ['Agricultura', 288.6435,1318.3677,3447.4644],
        ['Vegetación natural', 4503.5577,10117.521,6621.5448],
      ]
      break;
    default: 
  }

  chart.load({
    columns: col,
    type: 'bar'
    
});
 
}
