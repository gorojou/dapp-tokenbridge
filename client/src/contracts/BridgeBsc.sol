// SPDX-License-Identifier: UNLICENSED


//pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.6.4;

import './BridgeBase.sol';

contract BridgeBsc is BridgeBase {
  constructor(address token) BridgeBase(token) public {}
}
