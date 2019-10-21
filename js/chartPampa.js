var chart = c3.generate({
    bindto: '#chartPampa',
    data: {
      x: 'x',
      columns: [
        ['x','Todo reforestado','Zonas priorizadas','Cercana a las vias'],
        
        ['Reducción de sedimentos (5 años)',34.76,6.91,6.87],
        ['Reducción de sedimentos (20 años)',42.63,14.84,10.61],
        ['Carbono almacenado (5 años)', 8.5,41.9,40.7],
        ['Carbono almacenado (20 años)',6.4,32.5,31.7],
        
      ],
      axes: {
        'Reducción de sedimentos (5 años)': 'y2',
        'Reducción de sedimentos (20 años)': 'y2'
      },
      type:'bar',
      colors: {
        'Carbono almacenado (20 años)': '#2da9ba',
        'Reducción de sedimentos (20 años)':'#ba6c1e',
        'Carbono almacenado (5 años)': '#8bc4cc',
        'Reducción de sedimentos (5 años)':'#c28e5b'
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
        /*max: 40,
        min: 0,*/
        label: { 
          text: 'Cambio en Carbono almacenado (%)',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true, 
        /*max: 40,
        min: 0,*/
        label: { 
          text: 'Calidad de agua (% Sedimentos)' ,// (Mt Sedimentos)',
          position: 'outer-middle' 
        },
      }
    }
});
