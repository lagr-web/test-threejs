import {init} from './components/InitDroneLayer.js';
import { useEffect } from 'react';
import './App.css';

function App() {

 useEffect(() => {

init();

 }, [])

  return (
    <div className="app">
   <div className="hero">
   <h1 className="title">NOU ...</h1>
   <h5 className="bread">Testing Three.js with React and how to inrole jsx/html in a three.js structure</h5>
   </div>
   <div id="footer">What the fuck...</div>
    </div>
  );
}

export default App;
