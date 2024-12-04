import React from 'react';
import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    TimeScale,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';
//import { faker } from '@faker-js/faker';
import Checkbox from './Checkbox'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    TimeScale,
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

function Details2(props) {
    const [checkTemp, setCheckTemp] = useState(true);
    const [checkHum, setCheckHum] = useState(false);

    console.log("props", props);
    if (props.data === undefined) return <div>no data</div>; else {
        if (props.data.readings === undefined) return <div>no data</div>; else {
            if (props.data.readings[0].dt === undefined) return <div>no data</div>; else {
                const minValue = props.data.readings[0].dt;
                const maxValue = props.data.readings[props.data.readings.length].dt;

                const handleChangeTemp = () => {
                    setCheckTemp(!checkTemp);
                }
                const handleChangeHum = () => {
                    setCheckHum(!checkHum);
                }

                const options = {
                    responsive: true,
                    // maintainAspectRatio: false,
                    aspectRatio: 1,
                    interaction: {
                        mode: 'nearest',
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
                        x: {
                            type: 'time',
                            time: {
                                unit: 'hour',
                                tooltipFormat: 'DD H',
                                displayFormats: {
                                    hour: 'DD H'
                                },
                                ticks: {
                                    min: minValue,
                                    max: maxValue,
                                }
                            }
                        },
                        y: {
                            type: 'linear',
                            display: checkTemp,
                            position: 'left',
                            beginAtZero: false,
                        },
                        y2: {
                            type: 'linear',
                            display: checkHum,
                            position: 'right',
                            beginAtZero: false,
                            grid: {
                                display: false,
                            },
                        },
                    },
                };
                const readings = props.data.readings;
                const labels = readings.map(e => { const d = new Date(e.dt); return d.getHours() + ":" + d.getMinutes() });
                const data = {
                    labels,
                    datasets: [
                        checkTemp && {
                            label: 'Temperature',
                            data: readings.map(e => { return e.t; }),
                            pointRadius: 0,
                            borderWidth: 1,
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            yAxisID: 'y',
                        },
                        checkHum && {
                            label: 'Humidity',
                            data: readings.map(e => { return e.h; }),
                            pointRadius: 0,
                            borderWidth: 1,
                            borderColor: 'rgb(99, 255, 132)',
                            backgroundColor: 'rgba(99, 255, 132, 0.5)',
                            yAxisID: 'y2',
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
                        <Checkbox label="temp" value={checkTemp} onChange={handleChangeTemp} />
                        <Checkbox label="hum" value={checkHum} onChange={handleChangeHum} />
                        <div style={{ position: "relative", height: "700" }}>
                            <Line data={data} options={options} />
                        </div>
                    </div>
                )
            };
        };
    };
};
export default Details2;
