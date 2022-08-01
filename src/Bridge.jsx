import React, { useState, useEffect } from "react";
import { Ethbridge } from "./scripts/eth-bsc-bridge.js";
import { Bscbridge } from "./scripts/bsc-eth-bridge.js";
import { Ethtransfer } from "./scripts/eth-bsc-transfer.js";
import { Bsctransfer } from "./scripts/bsc-eth-transfer.js";
import { Bridge677 } from "./scripts/bridge-677";
import { useBlockChainContext } from "./BlockChainContext2.jsx";
import NetList from "./NetList.jsx";
import Logo from "./assets/images/logos/logo2.jpg";
import Load from "./Load.jsx";

function Bridge({ to, from }) {
  const [toNetwork, setToNetwork] = useState({});
  const {
    setNet,
    net,
    nets,
    amount,
    handleChange,
    connectWeb3Modal,
    provider,
    account,
    locked,
    checkForWeb3,
    setLocked,
    setMessage,
  } = useBlockChainContext();

  const [netList, setNetList] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    nets.map((index) => {
      if (net.from.name !== index.name) setToNetwork({ ...index });
    });
  }, [net]);

  async function handleClick() {
    setLocked(true);
    setLoading(true);
    try {
      if (!amount) {
        console.log(amount);
        setLocked(false);
        setLoading(false);
        return setMessage("Insert Valid Amount");
      }
      if (!checkForWeb3()) {
        setLoading(false);
        return setLocked(false);
      }
      await Bridge677(amount, provider, net);
      setLoading(false);
      setLocked(false);
      setMessage("All done!");
      //<<<<<<<<<<<<OLD>>>>>>>>>>
      // if (net.from.name == "ETH Mainnet") {
      //   const { ethBridge } = Ethbridge(amount);
      //   const { ethTransfer } = Ethtransfer(amount)
      //     .then(() => {
      //       setLoading(false);
      //       setLocked(false);
      //     })
      //     .catch((err) => {
      //       setLoading(false);
      //       setLocked(false);
      //       setMessage("Something Went Wrong");
      //     });

      //   await ethBridge;
      //   await ethTransfer;
      // } else {
      //   const { bscBridge } = Bscbridge(amount);
      //   const { bscTransfer } = Bsctransfer(amount)
      //     .then(() => {
      //       setLoading(false);
      //       setLocked(false);
      //     })
      //     .catch(() => {
      //       setLoading(false);
      //       setLocked(false);
      //       setMessage("Something Went Wrong");
      //     });

      //   await bscBridge;
      //   await bscTransfer;
      // }
    } catch (err) {
      setMessage(err);
      setLoading(false);
      setLocked(false);
    }
  }

  useEffect(() => {
    setNet({ from: nets[from], to: nets[to] });
  }, []);

  return (
    <>
      {netList ? (
        <NetList setNetList={setNetList} selected={netList}></NetList>
      ) : (
        <></>
      )}
      <div
        title={account ? account : "Connect Wallet"}
        className="button-connect-wallet"
      >
        <button onClick={!account ? connectWeb3Modal : ""}>
          <div className="connect-wallet-text">
            {account ? account : "Connect Wallet"}
          </div>
        </button>
      </div>
      <p className="text-center m-0">
        Select the network and move your <span className="purple">TOKENS</span>{" "}
        to your preferred one
      </p>
      <div className="networks-info">
        <div className="from-network">
          <h3 className="grey">From</h3>
          <h2>{net.from.name}</h2>
        </div>
        <div className="to-network">
          <h3 className="grey">To</h3>
          <h2>{net.to.name}</h2>
        </div>
      </div>
      <div className="bridge-form-container">
        <div className="sm-network left">
          <h3 className="grey">From</h3>
          <h2>{net.from.name}</h2>
        </div>
        <div className="input-area from-input-area">
          <div className="token-selection">
            <div
              title="Network you are swaping liquidity from"
              className="token-selection-button"
            >
              <img
                src={net.from.logo}
                className="token-logo from-token-logo"
                alt=""
              />
              <h3
                className="input-area-network-title"
                onClick={() => setNetList(1)}
              >
                {net.from.name}{" "}
                <span className="material-icons">expand_more</span>
              </h3>
            </div>
            <h5 className="grey right">Balance: 0.000</h5>
          </div>
          amount:
          <input
            name="amount"
            id="amount"
            type="number"
            className="input from-input"
            placeholder="0.000"
            value={amount || ""}
            onChange={handleChange}
            readOnly={locked}
          />
        </div>
        <div className="buttons">
          <div className="top"></div>
          <div className="bottom"></div>
          <button>
            <h3>
              <b>{locked ? "Locked" : "Unlocked"}</b>
            </h3>{" "}
            <span className="material-icons">
              {locked ? "lock" : "lock_open"}
            </span>
          </button>
          <div
            className="swap-button"
            title="Swap from and to networks"
            onClick={() =>
              locked || setNet({ to: { ...net.from }, from: { ...net.to } })
            }
          >
            <span className="material-icons">swap_horiz</span>
          </div>
          <button
            title={`Send liquidity from ${net.from.name} network to ${net.to.name} network`}
            onClick={() => locked || handleClick(amount)}
          >
            <h3>
              <b>Transfer</b>
            </h3>
            <span className="material-icons">arrow_forward</span>
          </button>
        </div>
        <div className="sm-network right">
          <h3 className="grey">To</h3>
          <h2>{net.to.name}</h2>
        </div>
        <div className="input-area to-input-area">
          <div className="token-selection">
            <div
              title="Network you are swaping liquidity to"
              className="token-selection-button"
            >
              <img
                src={net.to.logo}
                className="token-logo from-token-logo"
                alt=""
              />
              <h3
                className="input-area-network-title"
                onClick={() => setNetList(2)}
              >
                {net.to.name}{" "}
                <span className="material-icons">expand_more</span>
              </h3>
            </div>
            <h5 className="grey right">Balance: 0.000</h5>
          </div>
          <input
            type="text"
            className="input to-input"
            readOnly
            value={amount || ""}
            onChange={handleChange}
            placeholder="0.000"
          />
        </div>
      </div>
      {loading && <Load />}
    </>
  );
}

export default Bridge;
