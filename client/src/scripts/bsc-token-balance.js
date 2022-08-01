const Token = artifacts.require("BEP20Token"); 
const libAddress = '0xAA78E5E4fc6d22c501E567bDF7c29D8A8C9bd173';
Token.link('Token',libAddress);

module.exports = async done => {
  const [recipient, _] = await web3.eth.getAccounts();
  const tokenBsc = await Token.deployed();
  const balance = await tokenBsc.balanceOf(recipient);
  console.log(balance.toString());
  done();
}
