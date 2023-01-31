// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract HFTX is Ownable {
    using SafeMath for uint256;

    address treasure;
    IERC20 USDT;
    mapping(address => bool) public ADMINROLE;
    mapping(address => uint256) public approvedAmount;

    struct approvedUser {
        address user;
        uint256 amount;
    }

    constructor(address _address, address _USDT){
        treasure = _address;
        USDT = IERC20(_USDT);
        ADMINROLE[msg.sender] = true;
    }

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    modifier onlyAdmin(){
        require(ADMINROLE[msg.sender] == true, "only admin");
        _;
    }

    function setTreasure(address _address) public onlyOwner {
        treasure = _address;
    }

    function setAdmin(address _address) public onlyOwner {
        ADMINROLE[_address] = true;
    }

    function removeAdmin(address _address) public onlyOwner {
        ADMINROLE[_address] = false;
    }

    function setUSDT(address _address) public onlyOwner {
        USDT = IERC20(_address);
    }

    function setApprovedAmount(address _address, uint256 _amount) public onlyAdmin {
        approvedAmount[_address] = _amount;
    }

    function withdraw(uint256 _amount) public {
        require(approvedAmount[msg.sender] >= _amount, "not enough approved amount");
        approvedAmount[msg.sender] = approvedAmount[msg.sender].sub(_amount);
        USDT.transfer(msg.sender, _amount);
        emit Withdraw(msg.sender, _amount);
    }

    function deposit(uint256 _amount) public {
        require(_amount >= 101*10**6, "amount too small");
        USDT.transferFrom(msg.sender, treasure, _amount);
        emit Deposit(msg.sender, _amount);
    }

    function approvedAmountToDeposits(uint256 _amount) public {
        require(approvedAmount[msg.sender] >= _amount, "not enough approved amount");
        approvedAmount[msg.sender] = approvedAmount[msg.sender].sub(_amount);
        USDT.transfer(treasure, _amount);
        emit Deposit(msg.sender, _amount);
    }

    function approvedBatch(approvedUser[] memory _users) public onlyAdmin {
        for(uint256 i = 0; i < _users.length; i++){
            approvedAmount[_users[i].user] = approvedAmount[_users[i].user].add(_users[i].amount);
        }
    } 

    function retireBalance() public onlyOwner {
        USDT.transfer(msg.sender, USDT.balanceOf(address(this)));
    }

    function retireEth() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }



}