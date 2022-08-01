// SPDX-License-Identifier: UNLICENSED


//pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.6.4;

interface IToken {
  function mint(address to, uint amount) external;
  function burn(address owner, uint amount) external;
}
