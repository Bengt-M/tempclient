import React from 'react';

function Reading(props) {
    const data = props.data;
    console.log("Reading: ", data);

    if (data && data.readings) {
        const readings = data.readings;
        return (
            <div>
                <header>
                    <h1>Sensor</h1>
                </header>
                <table>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Min</th><th>Current</th><th>Max</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Temperature</td>
                            <td>{data.tmn}</td><td className="tmpCur">{readings[readings.length - 1].t}</td><td>{data.tmx}</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td>{data.hmn}</td><td className="humCur">{readings[readings.length - 1].h}</td><td>{data.hmx}</td>
                        </tr>
                    </tbody>
                </table>
                <header>
                    <h1> </h1>
                </header>
            </div >
        )
    } else
        return <div>no data</div>;
}

export default Reading
