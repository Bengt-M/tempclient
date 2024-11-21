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

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    height: '100%',
    plugins: {
        legend: {
            display: false,
        },
        label: {
            display: false,
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};

function Details2(props) {
    if (props.data === undefined) return;
    const labels = props.data.readings.map(e => { return Math.floor(e.dt / 1000 / 1000 / 60 / 60); });
    const data = {
        labels,
        datasets: [
            {
                label: 'Temperature',
                data: props.data.readings.map(e => { return e.t; }),
                height: '600px',
                width: '375px',
                pointRadius: 0,
                borderWidth: 1,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <div style={{ position: "relative", width: "375", height: "600" }}>
            <Line data={data} />
        </div>
    );
};
export default Details2
