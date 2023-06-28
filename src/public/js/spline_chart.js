


function mycallback() {

    fetch('http://18.217.30.121:3000/getSplineIntervalo')
        .then(res => res.json())
        .then(data => {

            let temperatura = data.temperatura;
            let humedad_aire = data.humedad_aire;
            let humedad_suelo = data.humedad_suelo;
            let fecha = data.fecha;


            splineChart.updateOptions({
                series: [{ data: temperatura }, { data: humedad_aire }, { data: humedad_suelo }],
                xaxis: {
                    categories: fecha
                }
            });

        });


}


var options = {
    series: [{
        name: 'Temperatura',
        data: [0]
    },
    {
        name: 'Humedad aire',
        data: [0]
    },
    {
        name: 'Humedad suelo',
        data: [0]
    }],
    chart: {
        height: 350,
        type: 'area',
        foreColor: '#fff',
        toolbar: {
            show: false
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'datetime',
        categories: [0],
        labels: {
            formatter: function (value, timestamp) {

                const date = new Date(timestamp);

                var hora = date.getHours();
                var minutos = date.getMinutes();
                var segundos = date.getSeconds();

                var horaCompleta = hora + ":" + minutos + ":" + segundos;

                return horaCompleta // The formatter function overrides format property
            },
        }
    },
    // yaxis: {
    //     min: 10,
    //     max: 30
    // },
    tooltip: {
    },
};

var splineChart = new ApexCharts(document.querySelector("#spline_chart"), options);
splineChart.render();


window.addEventListener('DOMContentLoaded', function () {
    // Tu código aquí
    mycallback();
});

window.setInterval(mycallback, 60000);