// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleToken is ERC20("Simple Token", "SIM"), Ownable {

  function mint(uint amount) public onlyOwner {
    _mint(owner(), amount);
  }
}
