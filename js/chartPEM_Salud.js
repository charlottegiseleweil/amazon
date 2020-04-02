let chart = c3.generate({
  bindto: '#chartPEM_Salud',
  data: {
    x: 'x',
    columns: [
      ['x','Sostenible','Eco-turismo','Peor'],
      ['Área Riesgo disminuido',9,15,58],
      ['Área Mayor riesgo',449,222,2359],
      
      ['Personas con mayor riesgo de dengue',8172,4883,77290],
      
    ],
    axes: {
      'Personas con mayor riesgo de dengue': 'y2',
    },

    type:'bar',
    colors: {
      'Área Mayor riesgo': '#ff0400',
      'Área Riesgo disminuido':'#3caf3c',
      'Personas con mayor riesgo de dengue':'#c28e5b',
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
      min: 100,
      label: { 
        text: 'Área (km^2)',
        position: 'outer-middle'
      }
    },
    y2: {
      show: true, 
      max: 79000,
      min: 0,
      label: { 
        text: 'Personas' ,
        position: 'outer-middle' 
      },
    }
  }
});


