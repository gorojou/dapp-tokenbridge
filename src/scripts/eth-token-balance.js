const Token = artifacts.require("BEP20Token"); 
const libAddress = '0x12299165697f75c61506d14878E614fed96A85F2';
Token.link('Token',libAddress);

module.exports = async done => {
  const [sender, _] = await web3.eth.getAccounts();
  const tokenEth = await Token.deployed();
  const balance = await tokenEth.balanceOf(sender);
  console.log(balance.toString());
  done();
}
