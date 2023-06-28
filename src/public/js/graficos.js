// ---------- CHARTS ----------
//FETCH 








var options = {
  series: [{
    name: 'Series 1',
    data: [20, 100, 40, 30, 50, 80, 33],
  }],
  chart: {
    height: 350,
    type: 'radar',
  },
  dataLabels: {
    enabled: true
  },
  plotOptions: {
    radar: {
      size: 140,
      polygons: {
        strokeColors: '#e9e9e9',
        fill: {
          colors: ['#f8f8f8', '#fff']
        }
      }
    }
  },
  title: {
    text: 'Radar with Polygon Fill'
  },
  colors: [
    "#2962ff",
    "#d50000",
    "#2e7d32",
    "#ff6d00",
    "#583cb3",
  ],
  markers: {
    size: 4,
    strokeWidth: 2,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val
      }
    }
  },
  xaxis: {
    categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  yaxis: {
    tickAmount: 7,
    labels: {
      formatter: function (val, i) {
        if (i % 2 === 0) {
          return val
        } else {
          return ''
        }
      }
    }
  }
};

var chart = new ApexCharts(document.querySelector("#radar-chart"), options);
chart.render();



let temperatura = []
let humedad = []
let mes = []


//BARRA
fetch('http://localhost:3000/getTemperatura')
  .then(res => res.json())
  .then(data => {
    temperatura = data.temperatura;
    mes = data.mes;

    var barChartOptions = {
      series: [{
        data: temperatura,
        name: "Temperatura promedio",
      }],
      chart: {
        type: "bar",
        background: "transparent",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: [
        "#2962ff",
        "#d50000",
        "#2e7d32",
        "#ff6d00",
        "#583cb3",
      ],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: false,
          columnWidth: "40%",
        }
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
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
        position: "bottom",
      },
      stroke: {
        colors: ["transparent"],
        show: true,
        width: 2
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: "dark",
      },
      xaxis: {
        categories: mes,
        title: {
          style: {
            color: "#f5f7ff",
          },
        },
        axisBorder: {
          show: true,
          color: "#55596e",
        },
        axisTicks: {
          show: true,
          color: "#55596e",
        },
        labels: {
          style: {
            colors: "#f5f7ff",
          },
        },
      },
      yaxis: {
        title: {
          text: "Temperatura",
          style: {
            color: "#f5f7ff",
          },
        },
        axisBorder: {
          color: "#55596e",
          show: true,
        },
        axisTicks: {
          color: "#55596e",
          show: true,
        },
        labels: {
          style: {
            colors: "#f5f7ff",
          },
        },
      }
    };

    var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    barChart.render();
  })

console.log(mes)


// BAR CHART


// SECOND BAR CHART

var barChartOptions2 = {
  series: [{
    data: [10, 8, 6, 4, 2],
    name: "Products",
  }],
  chart: {
    type: "bar",
    background: "transparent",
    height: 350,
    toolbar: {
      show: false,
    },
  },
  colors: [
    "#2962ff",
    "#d50000",
    "#2e7d32",
    "#ff6d00",
    "#583cb3",
  ],
  plotOptions: {
    bar: {
      distributed: true,
      borderRadius: 4,
      horizontal: false,
      columnWidth: "40%",
    }
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: 1,
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
  stroke: {
    colors: ["transparent"],
    show: true,
    width: 2
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: "dark",
  },
  xaxis: {
    categories: ["Laptop", "Phone", "Monitor", "Headphones", "Camera"],
    title: {
      style: {
        color: "#f5f7ff",
      },
    },
    axisBorder: {
      show: true,
      color: "#55596e",
    },
    axisTicks: {
      show: true,
      color: "#55596e",
    },
    labels: {
      style: {
        colors: "#f5f7ff",
      },
    },
  },
  yaxis: {
    title: {
      text: "Count",
      style: {
        color: "#f5f7ff",
      },
    },
    axisBorder: {
      color: "#55596e",
      show: true,
    },
    axisTicks: {
      color: "#55596e",
      show: true,
    },
    labels: {
      style: {
        colors: "#f5f7ff",
      },
    },
  }
};

var barChart2 = new ApexCharts(document.querySelector("#bar-chart2"), barChartOptions2);
barChart2.render();


// areaChart();



// AREA CHART
fetch('http://localhost:3000/getTemperatura')
  .then(res => res.json())
  .then(data => {


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

  });