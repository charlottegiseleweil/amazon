var chart = c3.generate({
    bindto: '#chartPEM_Salud',
    data: {
      x: 'x',
      columns: [
        ['x','Sostenible','Eco-turismo','Peor'],
        
        ['Área de hábitat del mosquito (ha) [Lluvioso]',-17251,-16701, 39358 ],
        ['Área de hábitat del mosquito (ha) [Seco]', -32575,-32535, 14646],

        ['Incremento % población en riesgo [Lluvioso]', 5,5,7],
        ['Incremento % población en riesgo [Seco]', 4,4,6],
        
      ],
      axes: {
        'Área de hábitat del mosquito (ha) [Seco]': 'y2',
        'Área de hábitat del mosquito (ha) [Lluvioso]': 'y2'
      },
      type:'bar',
      colors: {
        'Área de hábitat del mosquito (ha) [Seco]': '#c970cc',
        'Área de hábitat del mosquito (ha) [Lluvioso]':'purple',
        'Incremento % población en riesgo [Seco]':'red',
        'Incremento % población en riesgo [Lluvioso]':'darkred'
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
        max: 6,
        min: -6,
        label: { 
          text: 'Población en riesgo (%)',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true, 
        max: 3700,
        min: -3700,
        label: { 
          text: 'Área de hábitat (ha)' ,// (Mt Sedimentos)',
          position: 'outer-middle' 
        },
      }
    }
});

