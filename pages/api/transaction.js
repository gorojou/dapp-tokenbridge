import { ethers } from "ethers";
import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
const web3To = new Web3();
const web3From = new Web3();
export default async function transaction(req, res) {
  try {
    const { net, blockNumber } = req.body;
    const providerTo = new HDWalletProvider(
      "3996049a3275c629f46099e28f658b88e74577c9622260b5301e26b47a263bdd",
      net.to.provider
    );
    web3To.setProvider(providerTo);
    const providerFrom = new HDWalletProvider(
      "3996049a3275c629f46099e28f658b88e74577c9622260b5301e26b47a263bdd",
      net.from.provider
    );
    web3From.setProvider(net.from.provider);
    const bridge = await new web3From.eth.Contract(
      net.from.bridgeAbi,
      net.from.bridge
    );
    const event = await bridge.getPastEvents("Bridge", {
      fromBlock: blockNumber,
    });

    const { data, amount } = event[0].returnValues;
    console.log(event[0].returnValues);
    let nonce = web3To.eth.getTransactionCount(
      "0x1925f2B3f3f8148C6B62dB1c2046DCc4cf67F795"
    );
    console.log(web3To.utils.toHex(nonce));
    const token = await new web3To.eth.Contract(net.to.proxyAbi, net.to.proxy);
    console.log("transfiriendo");
    const tx = await token.methods.transfer(data, amount).send({
      from: "0x1925f2B3f3f8148C6B62dB1c2046DCc4cf67F795",
      // nonce: web3To.utils.toHex(nonce),
    });
    console.log(tx);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
