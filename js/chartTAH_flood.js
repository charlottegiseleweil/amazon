var chart = c3.generate({
    bindto: '#chartTAH_flood',
    padding: { left: 60, right: 0, bottom:-10 },
    data: {
      x: 'x',
      columns: [
        ['x','Sostenible','Peor'],
        
        ['Infraestructura',13.3,55.8],
        ['Agricultura', 185.6,724.1],
        ['Vegetación natural', -199.3,-955.5],
        
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
       min:-1000,
       max:800,
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
        ['Infraestructura',8.1,42.7],
        ['Agricultura', 127.3,482,5],
        ['Vegetación natural', -135.9,-625.3],
      ]
      break;
    case "50":
      col = [
        ['Infraestructura',11.5,53.2],
        ['Agricultura', 169.4, 655.0 ],
        ['Vegetación natural',-181.3,-861.3],
      ]
      break;
    case "100":
      col = [
        ['Infraestructura',13.3,55.8],
        ['Agricultura', 185.6,724.1],
        ['Vegetación natural', -199.3,-955.5],
      ]
      break;
    default: 
  }

  chart.load({
    columns: col,
    type: 'bar'
    
});
 
}
