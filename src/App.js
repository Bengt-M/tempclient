import './App.css';
import Reading from './components/Reading';
import Checkbox from './components/Checkbox';
import Details from './components/Details';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState();
  const [check, setCheck] = useState(false);

  const handleChange = () => {
    setCheck(!check);
  }

  function reset() {
    console.log("click reset");
    if (window.confirm("Really reset?")) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'POST Request' })
      };
      fetch('http://nuc.hemma:3001/cmd/reset', requestOptions)
        .then(response => response.json())
        .then(d => console.log(d));
    }
  }

  function clear() {
    console.log("click clear");
    if (window.confirm("Really clear ALL data?")) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'POST Request' })
      };
      fetch('http://nuc.hemma:3001/cmd/clear', requestOptions)
        .then(response => response.json())
        .then(d => console.log(d));
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
    const URI = 'http://nuc.hemma:3001/';
    fetch(URI)
      .then(response => response.json())
      .then(data => {
        console.log("parsed ", data);
        setData(data);
      });
  }, [time]);

  return (
    <div className="App"> <center>
      <Reading data={data} />
      <button id="btn1" className="button" onClick={reset}>reset</button>
      <Checkbox label="details" value={check} onChange={handleChange} />
      {check && <button id="btn2" className="button" onClick={clear}>clear</button>}
      {check && <Details data={data} time={time} />}
    </center></div>
  );
}

export default App;
