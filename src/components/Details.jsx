import React from 'react';
import { ScatterChart, Tooltip, Legend, Scatter, CartesianGrid, XAxis, YAxis } from 'recharts';


const formatXAxis = (tickItem) => {
    const d = new Date(tickItem);
    return d.getHours();
}

const age = (t) => {
    const diff = new Date() - new Date(t);
    const h = Math.floor(diff / 1000 / 60 / 60);
    const diff_corr = diff - h * 1000 * 60 * 60;
    const m = Math.round(diff_corr / 1000 / 60);
    return h + "h " + m + "m ";
}

function Details(props) {
    const data = props.data;
    console.log("Reading: ", data);


if (data) {    let maxTemp = -10000;
    let minTemp = 10000;
    const readings = data.readings;
    for (var i = 0, len = readings.length; i < len; i++) {
        maxTemp = Math.max(maxTemp, readings[i].t);
        minTemp = Math.min(minTemp, readings[i].t);
    };
    const dataMin = minTemp - 0.5;
    const dataMax = maxTemp + 0.5;


    const data00 = [{ "t": "17.9", "h": "58", "vcc": "3.285", "dt": 1700510564235 },
    { "t": "17.9", "h": "58", "vcc": "3.284", "dt": 1700510780238 },
    { "t": "17.9", "h": "58", "vcc": "3.285", "dt": 1700510996230 },];

    const data01 = [
        {
            "x": 100,
            "y": 200,
            "z": 200
        },
        {
            "x": 120,
            "y": 100,
            "z": 260
        },
        {
            "x": 170,
            "y": 300,
            "z": 400
        },
        {
            "x": 140,
            "y": 250,
            "z": 280
        },
        {
            "x": 150,
            "y": 400,
            "z": 500
        },
        {
            "x": 110,
            "y": 280,
            "z": 200
        }
    ];
    const data02 = [
        {
            "x": 200,
            "y": 260,
            "z": 240
        },
        {
            "x": 240,
            "y": 290,
            "z": 220
        },
        {
            "x": 190,
            "y": 290,
            "z": 250
        },
        {
            "x": 198,
            "y": 250,
            "z": 210
        },
        {
            "x": 180,
            "y": 280,
            "z": 260
        },
        {
            "x": 210,
            "y": 220,
            "z": 230
        }
    ];

    return (
        <div>
            <p>
                Last server read {new Date(props.time).toLocaleString('sv-SE', { timeZone: 'CET' })}
                <br />
                {readings.length} samples between {new Date(readings[0].dt).toLocaleString('sv-SE', { timeZone: 'CET' })}
                <br />
                and {new Date(readings[readings.length - 1].dt).toLocaleString('sv-SE', { timeZone: 'CET' })}
                . Last sensor data is {age(new Date(readings[readings.length - 1].dt))} old
            </p>
            <ScatterChart
                width={730}
                height={250}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 10,
                    left: 10,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dt" type="number" name="stature" unit="h" tickFormatter={formatXAxis} domain={[1700510564235, 1700510564235]}/>
                <YAxis dataKey="t" type="number" name="weight" unit="deg" domain={[dataMin, dataMax]}/>
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="A school" data={data00} fill="#8884d8" />
            </ScatterChart>
        </div >
    )
} else
    return <div>no data</div>;
}

export default Details
