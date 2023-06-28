data = {
    mes: [
        'enero', 'febrero',
        'marzo', 'abril',
        'mayo', 'junio',
        'julio', 'agosto',
        'septiembre', 'octubre',
        'noviembre', 'diciembre'
    ],
    temperatura: [
        '20.92', '20.52',
        '20.53', '23.09',
        '23.12', '22.50',
        '24.36', '22.00',
        '19.95', '22.18',
        '21.00', '23.09'
    ],
    humedad: [
        '51.14', '50.04',
        '43.22', '48.25',
        '56.79', '41.17',
        '49.14', '52.03',
        '47.59', '56.48',
        '47.09', '55.38'
    ]
}








mes = data.mes;
temperatura = data.temperatura;
humedad = data.humedad;

var areaChartOptions = {
    series: [{
        name: "Temperatura",
        data: temperatura,
    }, {
        name: "Humedad",
        data: humedad,
    }],
    chart: {
        type: "area",
        background: "transparent",
        height: 350,
        stacked: false,
        toolbar: {
            show: false,
        },
    },
    colors: ["#88DC65", "#4FC3F7"],
    labels: mes,
    dataLabels: {
        enabled: false,
    },
    fill: {
        gradient: {
            opacityFrom: 0.4,
            opacityTo: 0.1,
            shadeIntensity: 1,
            stops: [0, 100],
            type: "vertical",
        },
        type: "gradient",
    },
    grid: {
        borderColor: "#55596e",
        yaxis: {
            lines: {
                show: true,
            },
        },
        xaxis: {
            lines: {
                show: true,
            },
        },
    },
    legend: {
        labels: {
            colors: "#f5f7ff",
        },
        show: true,
        position: "top",
    },
    markers: {
        size: 6,
        strokeColors: "#1b2635",
        strokeWidth: 3,
    },
    stroke: {
        curve: "smooth",
    },
    xaxis: {
        axisBorder: {
            color: "#55596e",
            show: true,
        },
        axisTicks: {
            color: "#55596e",
            show: true,
        },
        labels: {
            offsetY: 5,
            style: {
                colors: "#f5f7ff",
            },
        },
    },
    yaxis:
        [
            {
                title: {
                    text: "Temperatura",
                    style: {
                        color: "#f5f7ff",
                    },
                },
                labels: {
                    style: {
                        colors: ["#f5f7ff"],
                    },
                },
            },
            {
                opposite: true,
                title: {
                    text: "Humedad",
                    style: {
                        color: "#f5f7ff",
                    },
                },
                labels: {
                    style: {
                        colors: ["#f5f7ff"],
                    },
                },
            },
        ],
    tooltip: {
        shared: true,
        intersect: false,
        theme: "dark",
    }
};

var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
areaChart.render();
