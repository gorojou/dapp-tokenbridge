import Web3 from 'web3';
import BridgeEth from '../contracts/BridgeEth.json';
import BridgeBsc from '../contracts/BridgeBsc.json';

const web3 = new Web3(window.web3.currentProvider);

const web3Eth = new Web3('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');
const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
//const adminPrivKey = '0x3996049a3275c629f46099e28f658b88e74577c9622260b5301e26b47a263bdd';
const adminPrivKey ='12b83eb821bdd43cd93e19bc84a2ff714f5d98a00c50356db20c68bea48dfdb4';
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);

const bridgeEth = new web3.eth.Contract(BridgeEth.abi, "0x027230dBA001eC0F1Dea3d30292D1e72489E0A39");

const bridgeBsc = new web3.eth.Contract(BridgeBsc.abi, "0x279c4f664eecd154e4130db017c956649b1ee4ae");



export  const Bscbridge = async(amount) =>  {

  const accounts = web3.eth.getAccounts();
  const addressFrom = accounts[0];
  const addressTo = accounts[0];
  amount = document.getElementById('amount').value;
  console.log('<<<<<<<<<<<<Bridge Bsc>>>>>>>>>>');
bridgeBsc.events.Transfer(
  {fromBlock: 0, step: 0}
)
.on('data', async event => {
  const { from, to, amount, date, nonce, signature } = event.returnValues;

  const tx = bridgeEth.methods.mint(from, to, amount, nonce, signature);
  const [gasPrice, gasCost] = await Promise.all([
    web3Bsc.eth.getGasPrice(),
    tx.estimateGas({from: admin}),
  ]);

  const data = tx.encodeABI();
  const txData = {
    from: admin,
    to: bridgeBsc.options.address,
    data,
    gas: gasCost,
    gasPrice
  };
  const receipt = await web3Bsc.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
    - nonce ${nonce}
  `);


});
}
