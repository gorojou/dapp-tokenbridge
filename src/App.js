import React, { useState, useEffect } from "react";
import "./assets/stylesheets/application.css";
import "./assets/stylesheets/custom.css";
import "./assets/stylesheets/background-animation.css";
import "./App.css";
import NetList from "./NetList.jsx";
import backgroundFinance from "./assets/images/background/lines.png";
import Logo from "./assets/images/logos/logo2.jpg";
import Bridge from "./Bridge.jsx";
import SelectBrdige from "./SelectBrdige";
import "./assets/stylesheets/particles.css";
function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/assets/particles/js/app.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  const [bridgeSelected, setBridgeSelected] = useState();
  return (
    <div className="App">
      <div id="particles-js"></div>
      <div class="count-particles">
        <span class="js-count-particles"></span> particles
      </div>
      <div className="nav">
        <div className="home-icons">
          <span className="material-icons background-home-icon">home</span>
          <span className="material-icons home-icon">home</span>
        </div>
      </div>
      <div
        className="bridge-container-custom"
        title="Token Bridge - Transfer CSD Token"
      >
        {bridgeSelected ? (
          <Bridge to={bridgeSelected.to} from={bridgeSelected.from}></Bridge>
        ) : (
          <SelectBrdige setBridgeSelected={setBridgeSelected}></SelectBrdige>
        )}
      </div>
    </div>
  );
}

export default App;
