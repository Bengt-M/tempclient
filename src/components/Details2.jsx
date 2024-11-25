import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
//import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const age = (t) => {
    const diff = new Date() - new Date(t);
    const h = Math.floor(diff / 1000 / 60 / 60);
    const diff_corr = diff - h * 1000 * 60 * 60;
    const m = Math.round(diff_corr / 1000 / 60);
    return h + "h " + m + "m ";
}

export const options = {
    responsive: true,
   // maintainAspectRatio: false,
    aspectRatio: 1,
    interaction: {
        mode: 'index',
        intersect: true,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Sensor history',
        },
    },
    scales: {
        xAxis: {
            display: false,
        },
        xAxis2: {
            display: false,
        },
        yAxis: {
            type: 'linear',
            display: true,
            position: 'left',
            beginAtZero: false,
        },
        yAxis2: {
            type: 'linear',
            display: true,
            position: 'right',
            beginAtZero: false,
            grid: {
                display: false,
            },
        },
    },
};

function Details2(props) {
    if (props.data === undefined) return <div>no data</div>;
    /*
        let maxValue = -10000;
        let minValue = 10000;
         for (var i = 0, len = readings.length; i < len; i++) {
            maxValue = Math.max(maxValue, readings[i].t);
            minValue = Math.min(minValue, readings[i].t);
        };
        const dataMin = minValue - 0.5;
        const dataMax = maxValue + 0.5;
     */
    const readings = props.data.readings;
    const labels = readings.map(e => { return new Date(e.dt).getHours(); });
    const data = {
        labels,
        datasets: [
            {
                label: 'Temperature',
                data: readings.map(e => { return e.t; }),
                pointRadius: 0,
                borderWidth: 1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'yAxis',
            },
            {
                label: 'Humidity',
                data: readings.map(e => { return e.h; }),
                pointRadius: 0,
                borderWidth: 1,
                borderColor: 'rgb(99, 255, 132)',
                backgroundColor: 'rgba(99, 255, 132, 0.5)',
                yAxisID: 'yAxis2',
            },
        ],
    };
    return (
        <div>
            <p>
                Last server read {new Date(props.time).toLocaleString('sv-SE', { timeZone: 'CET' })}
                <br />
                {readings.length} samples between {new Date(readings[0].dt).toLocaleString('sv-SE', { timeZone: 'CET' })}
                <br />
                and {new Date(readings[readings.length - 1].dt).toLocaleString('sv-SE', { timeZone: 'CET' })}
                <br />Last sensor data is {age(new Date(readings[readings.length - 1].dt))} old
            </p>

            <div style={{ position: "relative", height: "600" }}>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};
export default Details2
