import React from 'react';
import './App.css';
import Reading from './components/Reading';
import Details from './components/Details';
import Details2 from './components/Details2';
import useScreenSize from './components/useScreenSize';
import { useEffect, useState } from 'react';


function App() {
  const [data, setData] = useState();
  const screenSize = useScreenSize();

  function clear() {
    console.log("click clear");
    if (window.confirm("Really clear ALL data?")) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'POST Request' })
      };
      fetch(process.env.REACT_APP_BACKEND + '/cmd/clear', requestOptions)
        .then(response => response.text())
        .then(d => console.log("server returned ", d));
    }
  }

  // force periodic refresh
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log("useeffect");
    // console.log(process.env.REACT_APP_BACKEND);
    fetch(process.env.REACT_APP_BACKEND)
      .then(response => response.json())
      .then(data => {
        // console.log("server returned ", data);

        let dmi = 100;
        let dma = -100;
        for (var i = 0; i < data.readings.length; i++) {
          dmi = Math.min(dmi, data.readings[i].t);
          dma = Math.max(dma, data.readings[i].t);
        }
        data.dataMin = dmi;
        data.dataMax = dma;
        //console.log("new data ", data);
        setData(data);
      });
  }, [time]);
  console.log(screenSize.height," ",screenSize.width);

  return (
    <div className="App">
      <center>
        <Reading data={data} />
        <Details2 data={data} time={time} />
        <Details data={data} time={time} />
        <button id="btn2" className="button" onClick={clear}>clear</button>
      </center></div>
  );
}

export default App;
