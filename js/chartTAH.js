var chart = c3.generate({
    bindto: '#chartPEM',
    data: {
      x: 'x',
      columns: [
        ['x','Sostenible','Peor'],
        ['Carbono', 14395616,  -40316184],
        ['Sedimentos_Iberia', 6719, 495291],
        ['Sedimentos_Inapari', -6649, 488327]
      ],
      axes: {
        Sedimentos_Iberia: 'y2',
        Sedimentos_Inapari: 'y2'
      },
      types: {
        Carbono: 'bar',
        Sedimentos_Iberia: 'bar',
        Sedimentos_Inapari: 'bar' 
      }
    },
    axis: {
      x:{
        type : 'category',
      },
      y: {
        max: 40316184,
        min: -40316184,
        label: { 
          text: 'Cambio en Almacenamiento de Carbono [Mg]',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true, 
        max: 495291,
        min: -495291,
        label: { 
          text: 'Cambio en cantidad de Sedimentos [tonaledas]',
          position: 'outer-middle'
        }
      }
    }
});

