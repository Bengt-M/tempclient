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
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

function Details2(props) {
    if (props.data === undefined) return;
    const labels = props.data.readings.map(e => { return e.dt; });
    const data = {
        labels,
        datasets: [
            {
                label: 'Temperature',
                data: props.data.readings.map(e => { return e.t; }),
                pointRadius: 0,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <div>
            <Line data={data} />
        </div>
    );
};
export default Details2
