import { ScatterChart, Scatter, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

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
        const readings = data.readings;
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
                    <YAxis type="number" interval={0} tickCount={20} domain={['dataMin - 1.0', 'dataMax + 1.0']} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                </LineChart>

                {/*
                     <ScatterChart width={420} height={400}
                        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                        <CartesianGrid stroke="#ccc" width={420} height={400} />
                        <XAxis dataKey="dt" tickCount={5} style={{ fontSize: '0.6rem' }} tickFormatter={formatXAxis} />
                        <YAxis type="number" dateKey="t" interval={0} tickCount={20} domain={['dataMin - 1.0', 'dataMax + 1.0']} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter data={readings} fill="#8884d8" />
                    </ScatterChart>
 */}
            </div >
        )
    } else
        return <div>no data</div>;
}

export default Details
