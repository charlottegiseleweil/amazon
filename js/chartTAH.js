
var chart = c3.generate({
  bindto: '#chartTAH',
  data: {
    x: 'x',
    columns: [
      ['x','Sostenible','Real','Peor'],
      
      ['Escorrentía superficial (%)',1,32],
      ['Flujo durante de la estación seca (%)',-1,-4],
    ],
   
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
      max: 40,
      min: -10,
      tick: {
        values: [-10,0,20,40]
      },
      label: { 
        text: 'Impacto en los flujos (%)',
        position: 'outer-middle'
      }
    },
  }
});


var chart1 = c3.generate({
bindto: '#chartTAH1',
data: {
  x: 'x',
  columns: [
    ['x','Sostenible','Peor'],

    ['Personas rurales con recarga afectada', 11520,42470],
    ['Carga de sedimentos (thousand tons)',15,1052],

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
    max: 42470,
    min: 0,
    tick: {
      values: [1,20000,40000]
    },
    label: { 
      text: 'Aumento de Personas en riesgo',
      position: 'outer-middle'
    }
  },
  y2: {
    show: true, 
    max: 1000,
    min: 0,
    tick: {
      values: [0, 500, 1000]
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
  case "Iberia":
   col = [
      ['Escorrentía superficial (%)',1,32],
      ['Flujo durante de la estación seca (%)',-1,-4],
    ]
    col1=[
      ['Carga de sedimentos (thousand tons)',15,1052],
    ]
    break;
  case "Iñapari":
    col = [
      ['Escorrentía superficial (%)',0.5,45],
      ['Flujo durante de la estación seca (%)', -0.5,-39],
    ]
    col1=[
      ['Carga de sedimentos (thousand tons)', 1,131],
    ]
    break;
  case "CBE":
  col = [
    ['Escorrentía superficial (%)',4,38],
    ['Flujo durante de la estación seca (%)', -0.08,-26],
  ]
  col1=[
    ['Carga de sedimentos (thousand tons)', 20,856],
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





