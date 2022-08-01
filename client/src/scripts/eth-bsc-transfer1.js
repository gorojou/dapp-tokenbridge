const Web3 = require('web3');
const BridgeEth = require('../contracts/BridgeEth.json');
const web3Eth = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const privKey = '0x3996049a3275c629f46099e28f658b88e74577c9622260b5301e26b47a263bdd';

export var  Ethtransfer = async () => {
module.exports = async done => {
  let nonce = 1;//Need to increment this for each new transfer
  const accounts = await Web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  let amount;
  const message = Web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: accounts[0]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');
  const { signature } = Web3.eth.accounts.sign(
    message, 
    privKey
  ); 
  await bridgeEth.burn(accounts[0], amount, nonce, signature);
  done();
}
return Ethtransfer;
}
