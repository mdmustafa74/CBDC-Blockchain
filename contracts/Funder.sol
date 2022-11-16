// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;


contract Funder {
    uint256 public numOfFunder;

    mapping(uint256 => address) private funders;
    // function  receive() external payable {}

    function transfer() external payable {
        funders[numOfFunder] = msg.sender;
    }

    function withdraw(uint256 withdrawAmount) external {
        require(
            withdrawAmount <= 2000000000000000000,
            "Cannot withdraw more than 2 ether"
        );
payable (
    msg.sender).transfer(withdrawAmount);
    }
}
