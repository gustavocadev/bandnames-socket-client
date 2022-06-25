import Chart from 'chart.js/auto';
import { useEffect, useContext, useState } from 'react';
import { SocketContext } from '../context/socket';
import { Band } from '../types/types';

type Props = {};
const BandChart = (props: Props) => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    let myChart: Chart;

    socket.on('current-bands', (bands) => {
      if (myChart) {
        myChart.destroy();
      }
      myChart = createChart(bands);
    });
  }, [socket]);

  const createChart = (bands: Band[]) => {
    const ctx = document.querySelector<HTMLCanvasElement>('#myChart')!;

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            label: '# of Votes',
            data: bands.map((band) => band.votes),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      },
    });
    return myChart;
  };

  return <canvas id="myChart"></canvas>;
};
export default BandChart;
