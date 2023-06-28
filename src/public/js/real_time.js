
function getRandom(yrange) {
  return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
}



function mycallback() {

  fetch('http://18.217.30.121:3000/getRealTime')
    .then(res => res.json())
    .then(data => {

      let temperatura = data.temperatura;
      let humedad = data.humedad;
      let humedad_suelo = data.humedad_suelo


      chart_realTime.updateSeries([temperatura, humedad, humedad_suelo])

    });


}

var options = {
  series: [0, 0, 0],
  chart: {
    height: 350,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: '22px',
        },
        value: {
          fontSize: '16px',
          color: '#fff',
          formatter: function (val) {
            return val
          }
        },
        total: {
          show: true,
          label: 'Estado',
          formatter: function (w) {
            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            return 'Planta Buena'
          },
          color: '#fff'
        }
      },
      track: {
        background: '#908E8E',
        strokeWidth: '65%',
        margin: 3, // margin is in pixels
      }
    }
  },
  labels: ['Temperatura °', 'Humedad Aire %', 'Humeda Suelo %'],
};

var chart_realTime = new ApexCharts(document.querySelector("#realTime_chart"), options);
chart_realTime.render();

window.setInterval(mycallback, 2000);