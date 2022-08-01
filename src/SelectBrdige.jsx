import React, { useState } from "react";
import { useBlockChainContext } from "./BlockChainContext2";
function SelectBrdige({ setBridgeSelected }) {
  const { nets } = useBlockChainContext();
  return (
    <>
      <div className="select-bridge-container">
        <h1>
          <span className="purple">CSD</span> Bridge Selection
        </h1>
        <div className="brdige-selection-grid">
          <div
            className="bridge-selection-item"
            onClick={() => setBridgeSelected({ from: 0, to: 1 })}
          >
            <h2>Binance Smart Chain</h2>
            <img src={nets[0].logo} className="token-logo" alt="" />
            <span className="material-icons">swap_horiz</span>
            <img src={nets[1].logo} className="token-logo" alt="" />
            <h2>Ethereum Mainnet</h2>
          </div>
          <div
            className="bridge-selection-item"
            onClick={() => setBridgeSelected({ from: 1, to: 0 })}
          >
            <h2>Ethereum Mainnet</h2>
            <img src={nets[1].logo} className="token-logo" alt="" />
            <span className="material-icons">swap_horiz</span>
            <img src={nets[0].logo} className="token-logo" alt="" />
            <h2>Binance Smart Chain</h2>
          </div>
          <div className="bridge-selection-item">
            <h2>Ethereum Mainnet</h2>
            <img src={nets[1].logo} className="token-logo" alt="" />
            <span className="material-icons">swap_horiz</span>
            <img src={nets[2].logo} className="token-logo" alt="" />
            <h2>Fantom</h2>
            <div className="blocked-net-list-item"></div>
          </div>
          <div className="bridge-selection-item">
            <h2>Ethereum Mainnet</h2>
            <img src={nets[1].logo} className="token-logo" alt="" />
            <span className="material-icons">swap_horiz</span>
            <img src={nets[3].logo} className="token-logo" alt="" />
            <h2>Avalanche</h2>
            <div className="blocked-net-list-item"></div>
          </div>
          <div className="bridge-selection-item">
            <h2>Ethereum Mainnet</h2>
            <img src={nets[1].logo} className="token-logo" alt="" />
            <span className="material-icons">swap_horiz</span>
            <img src={nets[4].logo} className="token-logo" alt="" />
            <h2>Matic</h2>
            <div className="blocked-net-list-item"></div>
          </div>
          <div className="bridge-selection-item">
            <h2>Ethereum Mainnet</h2>
            <img src={nets[1].logo} className="token-logo" alt="" />
            <span className="material-icons">swap_horiz</span>
            <img src={nets[5].logo} className="token-logo" alt="" />
            <h2>Tron</h2>
            <div className="blocked-net-list-item"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectBrdige;
