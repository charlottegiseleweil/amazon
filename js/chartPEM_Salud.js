var chart = c3.generate({
  bindto: '#chartPEM_Salud',
  padding: { left: 60, right: 0, bottom:-10 },
  data: {
    x: 'x',
    columns: [
      ['x','Sostenible','Eco-turismo','Peor'],
      
      ['Mayor riesgo',449,222,2359],
      ['Riesgo disminuido',9,15,58],
      
    ],
    
    type:'bar',
    colors: {
      'Mayor riesgo': '#ff0400',
      'Riesgo disminuido':'#3caf3c',
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
      max: 2359,
      min: 0,
      label: { 
        text: 'Área total (km^2)',
        position: 'outer-middle'
      },
      ticks: 3,
  }
}});


