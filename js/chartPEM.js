var chart = c3.generate({
    bindto: '#chartPEM',
    padding: { left: 60, right: 60, bottom:-10 },
    data: {
      x: 'x',
      columns: [
        ['x','Sostenible','Real','Peor'],
        
        ['Escorrentía superficial (%)',0.73,4,16],
        ['Flujo durante de la estación seca (%)', -0.08,-0.30,-0.15],
      ],
      axes: {
        'Flujo durante de la estación seca (%)': 'y2',
      },
      type:'bar',
      colors: {
        'Escorrentía superficial (%)': '#2da9ba',
        'Flujo durante de la estación seca (%)':'#6a6ede',
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
        max: 27,
        min: -27,
        tick: {
          values: [-30,-15,0,15,30]
        },
        label: { 
          text: 'ES (%)',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true, 
        max: 0.3,
        min: -0.3,
        tick: {
          values: [-0.3,-0.15,0,0.15,0.3]
        },
        label: { 
          text: 'FES (%)' ,
          position: 'outer-middle' 
        },
      }
    }
});


var chart1 = c3.generate({
  bindto: '#chartPEM1',
  data: {
    x: 'x',
    columns: [
      ['x','Sostenible','Real','Peor'],

      ['Personas rurales con recarga afectada', 1945,2270,7590],
      ['Carga de sedimentos (thousand tons)', 119,972,5706],

    ],
    axes: {
      'Carga de sedimentos (thousand tons)': 'y2',
    },
    type:'bar',
    colors: {

      'Carga de sedimentos (thousand tons)':'#ba6c1e',
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
      max: 7590,
      min: 0,
      tick: {
        values: [0,4000,8000]
      },
      label: { 
        text: 'Aumento de Personas en riesgo',
        position: 'outer-middle'
      }
    },
    y2: {
      show: true, 
      max: 9000,
      min: 0,
      tick: {
        values: [0,4000,8000]
      },
      label: { 
        text: 'Aumento de Carga de sedimentos' ,
        position: 'outer-middle' 
      },
    }
  }
});





function changeCity(){
  changeData($('input[name=city]:checked').val());
}
function changeData(city){
  let col;
  let col1;

  switch(city) {
    case "Puerto":
     col = [
        ['Escorrentía superficial (%)',-0.09,6,27],
        ['Flujo durante de la estación seca (%)',-0.03,-0.03,-0.02],
      ]
      col1=[
        ['Carga de sedimentos (thousand tons)',128,1721,9105],
      ]
      break;
    case "Mazuko":
      col = [
        ['Escorrentía superficial (%)',0.73,4,16],
        ['Flujo durante de la estación seca (%)', -0.08,-0.30,-0.15],
      ]
      col1=[
        ['Carga de sedimentos (thousand tons)', 119,972,5706],
      ]
      break;
    default: 
  }

  chart.load({
    columns: col,
    type: 'bar'
  });
  
  chart1.load({
    columns: col1,
    type: 'bar'
  });

}


