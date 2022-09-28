import React, { useContext, useEffect, useState } from "react";
import { ethers, Signer } from "ethers";

import Web3Modal from "web3modal";
import Authereum from "authereum";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { contracts } from "../assets/js/contractsAbis";
import Web3 from "web3";
import bnb from "../assets/images/networks/bnb.png";
import eth from "../assets/images/networks/eth.png";
import phantom from "../assets/images/networks/phantom.png";
import avalanche from "../assets/images/networks/avalanche.png";
import matic from "../assets/images/networks/matic.png";
import tron from "../assets/images/networks/tron.png";

const BCContext = React.createContext();

export function useBlockChainContext() {
  return useContext(BCContext);
}

export function BlockchainContext({ children }) {
  //Setting Variables
  const nets = [
    {
      name: "Binance Smart Chain",
      logo: bnb,
      byteCode: "0x61",
      proxy: "0x35120EcE61fCc1c68518BC426005058D2c249EE5",
      bridge: "0x92B71EaE998148577882f0978e21b6649EdCc9Fb",
      provider: "https://data-seed-prebsc-1-s1.binance.org:8545",
      bridgeAbi: contracts.BridgeAbi,
      proxyAbi: contracts.Contract677TokenEth,
    },
    {
      name: "ETH Mainnet",
      logo: eth,
      byteCode: "0x3",
      proxy: "0x6202D3F88499684e10aC31FCAC0CE7dfA359CFD5",
      bridge: "0x86822D0f6281a159356C77fcDf0228C7d07E317C",
      provider:
        "wss://ropsten.infura.io/ws/v3/04bfa7d48b3e4d0e87bf5c8c7e15b4c3",
      bridgeAbi: contracts.BridgeAbi,
      proxyAbi: contracts.Contract677TokenEth,
    },
    {
      name: "Fantom",
      logo: phantom,
    },
    {
      name: "Avalanche",
      logo: avalanche,
    },
    {
      name: "Matic",
      logo: matic,
    },
    {
      name: "Tron",
      logo: tron,
    },
  ];

  const [account, setAccount] = useState();
  const [instance, setInstance] = useState();
  const [provider, setProvider] = useState();
  const [net, setNet] = useState({
    from: { ...nets[0] },
    to: { ...nets[1] },
  });
  const [amount, setamount] = useState(0.0);
  const [locked, setLocked] = useState(false);
  const [message, setMessage] = useState();
  //Setting web3modal
  const providerOptions = {
    metamask: {
      id: "injected",
      name: "MetaMask",
      type: "injected",
      check: "isMetaMask",
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "04bfa7d48b3e4d0e87bf5c8c7e15b4c3", // Required
        network: "ropsten",
        qrcodeModalOptions: {
          mobileLinks: [
            "rainbow",
            "metamask",
            "argent",
            "trust",
            "imtoken",
            "pillar",
          ],
        },
      },
    },
    authereum: {
      package: Authereum,
    },
    theme: "dark",
  };

  //Set user in web3Modal
  const connectWeb3Modal = async () => {
    try {
      const web3Modal = await new Web3Modal({
        providerOptions,
      });
      web3Modal.clearCachedProvider();
      const instance = await web3Modal.connect();
      const provider = new Web3(instance);
      setInstance(instance);
      setProvider(provider);
      setAccount(await provider.eth.getAccounts());
    } catch (err) {
      setMessage("Please Connect your wallet");
      console.log(err);
    }
  };

  //Update user's metamask network
  const updateNet = (id) => {
    let match = false;
    nets.map((index) => {
      if (id === index.byteCode) {
        match = true;
        if (net.to.byteCode === index.byteCode)
          return setNet({ to: net.from, from: net.to });
        return setNet({ ...net, from: index });
      }
    });
    if (!match) {
      setMessage("Unknown Network");
      throw "Unknown Network";
    }
  };

  const checkForWeb3 = () => {
    if (!provider) {
      setMessage("Please connect a wallet");
      return false;
    }
    return true;
  };

  //Handle user changes to input
  const handleChange = (e) => {
    const { id, value } = e.target;
    setamount(value);
  };

  useEffect(() => {
    const init = async () => {
      if (instance) {
        //When User Changes Accounts
        instance.on("accountsChanged", async (account) => {
          if (account.length == 0) {
            setAccount("");
            return setMessage("Please connect your wallet");
          }
          const provider = new Web3(instance);
          setAccount(await provider.eth.getAccounts());
          setProvider(provider);
        });

        //When User Changes Chain
        instance.on("chainChanged", async (chainId) => {
          try {
            setProvider(await new Web3(instance));
            updateNet(chainId);
          } catch (err) {
            console.log(err);
          }
        });
        if (provider && provider._network)
          updateNet(ethers.utils.hexValue(provider._network.chainId));
      }
    };
    init();
  }, [instance]);
  return (
    <BCContext.Provider
      value={{
        net,
        nets,
        handleChange,
        setNet,
        connectWeb3Modal,
        provider,
        account,
        locked,
        setLocked,
        amount,
        updateNet,
        setMessage,
        checkForWeb3,
      }}
    >
      {children}
      {message && <Modal message={message} setMessage={setMessage} />}
    </BCContext.Provider>
  );
}

const Modal = ({ message, setMessage }) => {
  const [animation, setAnimation] = useState(false);
  const goBack = () => {
    setTimeout(() => {
      setMessage("");
    }, 400);
  };
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setAnimation(true);
        goBack();
      }, 3000);
    }
  }, [message]);

  return (
    <>
      <div key={message} className={`modal ${animation ? "go-back" : "go-in"}`}>
        {message}
      </div>
    </>
  );
};
