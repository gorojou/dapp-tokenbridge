import Web3 from 'web3';
import BridgeEth from '../contracts/BridgeEth.json';
const web3 = new Web3(window.web3.currentProvider);


 var Tx = require('ethereumjs-tx').Transaction;

 const web3Eth = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
 const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
 const privKey = '0x3996049a3275c629f46099e28f658b88e74577c9622260b5301e26b47a263bdd';
 
export var  Ethtransfer = async (amount) => {
 
  
  const accounts = await web3.eth.getAccounts();
  const addressFrom = accounts[0];
  const addressTo = accounts[0];
  amount = document.getElementById('amount').value;

  let nonce = web3.utils.toHex(web3.eth.getTransactionCount("0x027230dBA001eC0F1Dea3d30292D1e72489E0A39"));
 
  

  const txData = {
    gasLimit: web3.utils.toHex(25000),
    gasPrice: web3.utils.toHex(10e9), 
    to: addressTo,
    from: addressFrom,
    value: web3.utils.toHex(web3.utils.toWei('0.0002', 'ether')) ,
    nonce: nonce
  }
  
  
  

  const options = {
      nonce   : nonce,
      to      : addressTo,
      data    : BridgeEth.abi,
      gas: 2100000,
      //gasPrice: 8000000000,
      gasLimit: web3.utils.toHex(25000), 
      gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')),
  };

  const bridgeEth = new web3.eth.Contract(BridgeEth.abi, "0x027230dBA001eC0F1Dea3d30292D1e72489E0A39", options);

 
  const message = web3.utils.soliditySha3(
    {t: 'address', v: accounts[0]},
    {t: 'address', v: accounts[0]},
    {t: 'uint256', v: amount},
    {t: 'uint256', v: nonce},
  ).toString('hex');


  const { signature } = web3.eth.accounts.sign(
    message, 
    privKey
  ); 
 
  await bridgeEth.methods.burn(accounts[0], amount, nonce, signature).send({from:accounts[0]});

 

}


