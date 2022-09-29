import { ethers } from "ethers";
import Web3 from "web3";
const web3From = new Web3();
export default async function transaction(req, res) {
  try {
    const { net, blockNumber } = req.body;
    console.log("processing transfer");
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
    const providerTo = await new ethers.providers.StaticJsonRpcProvider(
      net.to.provider
    );
    console.log(net.to.provider);
    const signer = new ethers.Wallet(
      "0x3996049a3275c629f46099e28f658b88e74577c9622260b5301e26b47a263bdd",
      providerTo
    );
    const token = await new ethers.Contract(
      net.to.proxy,
      net.to.proxyAbi,
      signer
    );
    const tx = await token.transfer(data, amount);
    console.log(tx);
    res.status(200).end();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
