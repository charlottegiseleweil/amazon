var chart = c3.generate({
    bindto: '#chartPEM',
    data: {
      x: 'x',
      columns: [
        ['x','Sostenible','Eco-turismo','Peor'],
        ['Carbono', -734912, -13201024, -82663712],
        ['Sedimentos_Mazuko', 458056, 974264, 3900108],
        ['Sedimentos_Puerto', 548868, 1599384, 5270184]
      ],
      axes: {
        Sedimentos_Mazuko: 'y2',
        Sedimentos_Puerto: 'y2'
      },
      types: {
        Carbono: 'bar',
        Sedimentos_Mazuko: 'bar',
        Sedimentos_Puerto: 'bar' 
      }
    },
    axis: {
      x:{
        type : 'category',
      },
      y: {
        max: 82663712,
        min: -82663712,
        label: { 
          text: 'Δ Almacenamiento de Carbono [Mg]',
          position: 'outer-middle'
        }
      },
      y2: {
        show: true, 
        max: 5270184,
        min: -5270184,
        label: { 
          text: 'Δ Sedimentos [tonaledas]',
          position: 'outer-middle'
        }
      }
    }
});
