import { contracts } from "../contractsAbis";
import { ethers } from "ethers";
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
    const event = await bridgeContract.getPastEvents("Bridge", {
      fromBlock: tx.blockNumber,
    });
    console.log(event);
    return await transfer(event, net.to);
  } catch (err) {
    console.log(err);
    throw err.message;
  }
};

const transfer = async (event, net) => {
  const { data, amount } = event[0].returnValues;
  console.log(amount);
  try {
    const provider = new HDWalletProvider(
      "0x3996049a3275c629f46099e28f658b88e74577c9622260b5301e26b47a263bdd",
      net.provider
    );
    await web3.setProvider(provider);
    const token = await new web3.eth.Contract(net.proxyAbi, net.proxy);
    const tx = await token.methods
      .transfer(data, amount)
      .send({ from: "0x1925f2B3f3f8148C6B62dB1c2046DCc4cf67F795" });
    console.log(tx);
    return true;
  } catch (err) {
    console.log(err);
    throw err.message;
  }
};
