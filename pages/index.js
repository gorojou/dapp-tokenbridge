import React, { useState, useEffect } from "react";
import Bridge from "../components/Bridge";
import SelectBrdige from "../components/SelectBrdige";
import Particles from "../components/Particles";
export default function Home() {
  const [bridgeSelected, setBridgeSelected] = useState();

  return (
    <>
      <div className="App">
        <Particles />
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
    </>
  );
}
