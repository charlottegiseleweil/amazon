var chart = c3.generate({
  bindto: '#chartPampa',
  
  data: {
    x: 'x',
    columns: [
      ['x','Todo reforestado','Zonas priorizadas','Cercana a las vias'],
      
      ['Reducción de sedimentos (5 años)', 81.74, 18.80, 18.63 ],
      ['Reducción de sedimentos (20 años)', 99.98,39.98, 28.53],
      ['Reducción de Escorrentia Superficial (5 años)',16.46,2.87,2.87],
      ['Reducción de Escorrentia Superficial (20 años)',15.77,2.72,2.78],

      
      ['Carbono almacenado (5 años)', 1587401.84, 202365.39, 214438.09],
      ['Carbono almacenado (20 años)', 2148356.45, 304166.20, 316312.60],
      
    ],
    axes: {
      'Carbono almacenado (5 años)': 'y2',
      'Carbono almacenado (20 años)': 'y2'
    },
    
    type:'bar',
    colors: {
      'Carbono almacenado (20 años)': '#2da9ba',
      'Reducción de sedimentos (20 años)':'#ba6c1e',
      'Carbono almacenado (5 años)': '#8bc4cc',
      'Reducción de sedimentos (5 años)':'#c28e5b',
      'Reducción de Escorrentia Superficial (5 años)': '#51d65b',
      'Reducción de Escorrentia Superficial (20 años)':'#2ab834',

      
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

      min: 0,
      label: { 
        text: 'En comparación con nada reforestación (%)',
        position: 'outer-middle'
      },
      ticks: 4,
  },
  y2: {
    show: true,
    min: 0,
    label: { 
      text: 'En comparación con nada reforestación (%)',
      position: 'outer-middle'
    }
  },
}});