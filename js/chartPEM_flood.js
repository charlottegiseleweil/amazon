
var chart = c3.generate({
    bindto: '#chartPEM_flood',
    data: {
      x: 'x',
      columns: [
        ['x','Sostenible','Eco-turismo','Peor'],
        
        ['ES en Mazuko (%)',6.53,1.43,80.28],
        
        ['FES en Mazuko (%)', 1.99,9.78,40.48],
        ['Sedimentos en Mazuko (Mt)', 0.08,0.60,3.42],
        ['ES en Puerto (%)',-4.6,8.07,21.64],
        ['FES en Puerto (%)',-1.11,4.1,3.46],
        ['Sedimentos en Puerto (Mt)',0.10,1.11,4.57],
        
      ],
      axes: {
        'Sedimentos en Puerto (Mt)': 'y2',
        'Sedimentos en Mazuko (Mt)': 'y2'
      },
      type:'bar',
      colors: {
        'ES en Puerto (%)': '#2da9ba',
        'FES en Puerto (%)':'#6a6ede',
        'Sedimentos en Puerto (Mt)':'#ba6c1e',
        'ES en Mazuko (%)': '#8bc4cc',
        'FES en Mazuko (%)':'#a9aac9',
        'Sedimentos en Mazuko (Mt)':'#c28e5b'
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
        max: 60,
        min: -60,
        label: { 
          text: 'Impacto en los flujos (%)',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true, 
        max: 3.7,
        min: -3.7,
        label: { 
          text: 'Impacto en calidad de agua (Sedimentos)' ,// (Mt Sedimentos)',
          position: 'outer-middle' 
        },
      }
    }
});
