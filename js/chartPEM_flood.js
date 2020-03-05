
var chart = c3.generate({
    bindto: '#chartPEM_flood',
    data: {
      x: 'x',
      columns: [
        ['x','Baseline','Sostenible','Eco-turismo','Peor'],
        
        ['Infrastructure: Cities, Roads, Mines',342.8667,283.1985,666.2259,1466.6868],
        ['Agriculture: Pasture, Farmland, Agroforestry', 950.3172,1288.1952,1054.044,3313.9827],
        ['Natural: Natural vegetation and restoration areas', 9566.4096,9288.9207,9131.8569,6080.6277],
        
      ],
      
      type:'bar',
      colors: {
        'Infrastructure: Cities, Roads, Mines': '#a6a6a6',
        'Agriculture: Pasture, Farmland, Agroforestry':'#ffd633',
        'Natural: Natural vegetation and restoration areas':'#009933',
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
    ids: ['Infrastructure: Cities, Roads, Mines'],
    ids: ['Agriculture: Pasture, Farmland, Agroforestry'],
    ids: ['Natural: Natural vegetation and restoration areas'],
    });

    let col;

  switch(year) {
    case "10":
     col = [
        ['Infrastructure: Cities, Roads, Mines',263.5002,218.4759,500.6763,1095.7419],
        ['Agriculture: Pasture, Farmland, Agroforestry', 854.0162,1164.4641,951.8013,2982.6495],
        ['Natural: Natural vegetation and restoration areas', 7983.9774,7719.4098,7649.0298,5024.5506],
      ]
      break;
    case "50":
      col = [
        ['Infrastructure: Cities, Roads, Mines',342.8667,283.1985,666.2259,1466.6868],
        ['Agriculture: Pasture, Farmland, Agroforestry', 950.3172,1288.1952,1054.044,3313.9827],
        ['Natural: Natural vegetation and restoration areas', 9566.4096,9288.9207,9131.8569,6080.6277],
      ]
      break;
    case "100":
      col = [
        ['Infrastructure: Cities, Roads, Mines',364.6593,296.5554,704.7531,1539.0252],
        ['Agriculture: Pasture, Farmland, Agroforestry', 974.4292,1318.3677,1079.4753,3447.4644],
        ['Natural: Natural vegetation and restoration areas', 9921.9933,9646.8948,9476.8569,6276.3552],
      ]
      break;
    default: 
  }

  chart.load({
    columns: col,
    type: 'bar'
    
});
 
}
