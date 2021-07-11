// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./SimpleToken.sol";

/// @title SimpleBankERC20
/// @author pete

/* 'contract' has similarities to 'class' in other languages (class variables,
inheritance, etc.) */
contract SimpleBankERC20 is Ownable { // CamelCase
    using SafeMath for uint256;
    // Declare state variables outside function, persist through life of contract

    // token
    SimpleToken token;

    // dictionary that maps addresses to balances
    mapping (address => uint256) private balances;
    
    // Users in system
    address[] accounts;
    
    // Interest rate
    uint256 rate = 3;

    // "private" means that other contracts can't directly query balances
    // but data is still viewable to other parties on blockchain

    // address public owner;
    // 'public' makes externally readable (not writeable) by users or contracts

    // Events - publicize actions to external listeners
    event DepositMade(address accountAddress, uint amount);

    // Constructor, can receive one or many variables here; only one allowed
    constructor(address _token) public {
        // msg provides details about the message that's sent to the contract
        // msg.sender is contract caller (address of contract creator)
        // owner = msg.sender;
        token = SimpleToken(_token);
    }

    /// @notice Deposit ether into bank
    /// @return The balance of the user after the deposit is made
    function deposit(uint amount) public payable returns (uint256) {
        // Record account in array for looping
        if (0 == balances[msg.sender]) {
            accounts.push(msg.sender);
        }

        token.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] = balances[msg.sender].add(amount);
        // balances[msg.sender] = balances[msg.sender].add(msg.value);
        // no "this." or "self." required with state variable
        // all values set to data type's initial value by default

        emit DepositMade(msg.sender, msg.value); // fire event

        return balances[msg.sender];
    }

    /// @notice Withdraw ether from bank
    /// @dev This does not return any excess ether sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @return remainingBal The balance remaining for the user
    function withdraw(uint withdrawAmount) public returns (uint256 remainingBal) {
        require(balances[msg.sender] >= withdrawAmount);
        balances[msg.sender] = balances[msg.sender].sub(withdrawAmount);

        // Revert on failed
        token.transfer(msg.sender, withdrawAmount);
        // msg.sender.transfer(withdrawAmount);
        
        return balances[msg.sender];
    }

    /// @notice Get balance
    /// @return The balance of the user
    // 'constant' prevents function from editing state variables;
    // allows function to run locally/off blockchain
    function balance() public view returns (uint256) {
        return balances[msg.sender];
    }

    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    fallback () external {
        revert(); // throw reverts state to before call
    }
    
    function calculateInterest(address user, uint256 _rate) private view returns(uint256) {
        uint256 interest = balances[user].mul(_rate).div(100);
        return interest;
    }
    
    function increaseYear() public onlyOwner {
        uint totalInterest = 0;
        for(uint256 i = 0; i < accounts.length; i++) {
            address account = accounts[i];
            uint256 interest = calculateInterest(account, rate);
            balances[account] = balances[account].add(interest);
            totalInterest = totalInterest.add(interest);
        }
        token.mint(totalInterest);
    }
    
    function systemBalance() public view returns(uint256) {
        return token.balanceOf(address(this));
    }
}
// ** END EXAMPLE **
