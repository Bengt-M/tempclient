import React from 'react';
import { Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

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

    if (data) {
        let maxValue = -10000;
        let minValue = 10000;
        data.readings.forEach(element => {
            maxValue = Math.max(maxValue, element.t);
            minValue = Math.min(minValue, element.t);
        });
        const readings = data.readings;
        const dataMin = minValue - 0.5;
        const dataMax = maxValue + 0.5;

        console.log(dataMin + " " + dataMax)
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
                <LineChart width={420} height={400} data={readings}
                    margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <Line type="monotone" dataKey="t" stroke="#8884d8" strokeWidth={2} dot={false} />
                    <CartesianGrid stroke="#ccc" width={420} height={400} />
                    <XAxis dataKey="dt" tickCount={5} style={{ fontSize: '0.6rem' }} tickFormatter={formatXAxis} />
                    <YAxis type="number" interval={0} tickCount={20} style={{ fontSize: '0.6rem' }} domain={[dataMin, dataMax]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                </LineChart>
            </div >
        )
    } else
        return <div>no data</div>;
}

export default Details
