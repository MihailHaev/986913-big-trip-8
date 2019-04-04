import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import createElement from './element';

let itHaveChart = false;

const reloadCanvas = (ctx, addedClass) => {
  ctx.remove();
  ctx = createElement(`<canvas class="statistic__${addedClass}" width="900"></canvas>`);
  return ctx;
};

export default (evt, initialPoints) => {
  evt.preventDefault();
  const allTypes = {
    '✈️ FLY': {}, '🏨 STAY': {}, '🚗 DRIVE': {}, '🏛️ LOOK': {}, '🍴 EAT': {}, '🚕 RIDE': {}, '🛳️ SAIL': {}, '🚌 MOTION': {}, '🚂 TRAIN': {}, '🚊 TRAM': {},
  };
  const BAR_HEIGHT = 55;
  let moneyCtx = document.querySelector(`.statistic__money`);
  let transportCtx = document.querySelector(`.statistic__transport`);
  let timeSpendCtx = document.querySelector(`.statistic__time-spend`);
  const statisticMoneyWrap = document.querySelector(`.statistic__item--money`);
  const statisticTransportWrap = document.querySelector(`.statistic__item--transport`);
  const labels = [];
  const moneyData = [];
  const transportData = [];

  document.querySelector(`#table`).classList.add(`visually-hidden`);
  document.querySelector(`a[href="#table"]`).classList.remove(`view-switch__item--active`);

  document.querySelector(`#stats`).classList.remove(`visually-hidden`);
  document.querySelector(`a[href="#stats"]`).classList.add(`view-switch__item--active`);

  for (let point of initialPoints) {
    for (let type in allTypes) {
      if (allTypes.hasOwnProperty(type)) {
        const typeIcon = type.split(` `)[0];
        if (point.type.icon === typeIcon) {
          if (!allTypes[type].money) {
            allTypes[type].money = point.price;
          } else {
            allTypes[type].money = allTypes[type].money + point.price;
          }
          if (!allTypes[type].count) {
            allTypes[type].count = 1;
          } else {
            allTypes[type].count = allTypes[type].count + 1;
          }
        }
      }
    }
  }

  for (let type in allTypes) {
    if (allTypes.hasOwnProperty(type)) {
      if (Object.keys(allTypes[type]).length !== 0) {
        labels.push(type);
        moneyData.push(allTypes[type].money);
        transportData.push(allTypes[type].count);
      }
    }
  }
  const multiplier = labels.length;

  if (itHaveChart) {
    moneyCtx = reloadCanvas(moneyCtx, `money`);
    statisticMoneyWrap.appendChild(moneyCtx);

    transportCtx = reloadCanvas(transportCtx, `transport`);
    statisticTransportWrap.appendChild(transportCtx);
  }
  // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
  moneyCtx.height = BAR_HEIGHT * multiplier;
  transportCtx.height = BAR_HEIGHT * multiplier;
  timeSpendCtx.height = BAR_HEIGHT * multiplier;


  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: moneyData,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

  const transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data: transportData,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
  itHaveChart = true;

  return [moneyChart, transportChart];
};
