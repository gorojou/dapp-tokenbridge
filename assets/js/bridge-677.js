import { contracts } from "../js/contractsAbis";
import { ethers } from "ethers";
import axios from "axios";
import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
const web3 = new Web3();
export const Bridge677 = async (amount, provider, net) => {
  try {
    const account = await provider.eth.getAccounts();
    if (
      net.from.byteCode !==
      ethers.utils.hexValue(await provider.eth.getChainId())
    )
      throw { message: "Select correct network" };
    const bridgeContract = await new provider.eth.Contract(
      net.from.bridgeAbi,
      net.from.bridge
    );
    const ethToken = await new provider.eth.Contract(
      net.from.proxyAbi,
      net.from.proxy
    );
    console.log("Processing Tranfer");
    const tx = await ethToken.methods
      .transferAndCall(net.from.bridge, web3.utils.toWei(amount), account[0])
      .send({ from: account[0] });
    console.log(tx);
    await axios.post("/api/transaction", {
      net: net,
      blockNumber: tx.blockNumber,
    });
    return;
  } catch (err) {
    console.log(err);
    throw err.message;
  }
};
