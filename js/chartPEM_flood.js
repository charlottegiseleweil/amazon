var chart = c3.generate({
    bindto: '#chartPEM_flood',
    padding: { left: 60, right: 0, bottom:-10 },
    data: {
      x: 'x',
      columns: [
        ['x','Baseline','Sostenible','Eco-turismo','Peor'],
        
        ['Infraestructura',342.8667,283.1985,666.2259,1466.6868],
        ['Agricultura', 950.3172,1288.1952,1054.044,3313.9827],
        ['Vegetación natural', 9566.4096,9288.9207,9131.8569,6080.6277],
        
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
  chart.unload({
    ids: ['Infraestructura'],
    ids: ['Agricultura'],
    ids: ['Vegetación natural'],
    });

    let col;

  switch(year) {
    case "10":
     col = [
        ['Infraestructura',263.5002,218.4759,500.6763,1095.7419],
        ['Agricultura', 854.0162,1164.4641,951.8013,2982.6495],
        ['Vegetación natural', 7983.9774,7719.4098,7649.0298,5024.5506],
      ]
      break;
    case "50":
      col = [
        ['Infraestructura',342.8667,283.1985,666.2259,1466.6868],
        ['Agricultura', 950.3172,1288.1952,1054.044,3313.9827],
        ['Vegetación natural', 9566.4096,9288.9207,9131.8569,6080.6277],
      ]
      break;
    case "100":
      col = [
        ['Infraestructura',364.6593,296.5554,704.7531,1539.0252],
        ['Agricultura', 974.4292,1318.3677,1079.4753,3447.4644],
        ['Vegetación natural', 9921.9933,9646.8948,9476.8569,6276.3552],
      ]
      break;
    default: 
  }

  chart.load({
    columns: col,
    type: 'bar'
    
});
 
}
