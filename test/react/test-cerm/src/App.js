import React, {useEffect} from "react";
import cerm               from 'cermjs';
import logo               from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    cerm.addEventListener(document.body, "keypress", function (event) {
      console.debug("Test 04 - Document body on keypress Event Listener");
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
