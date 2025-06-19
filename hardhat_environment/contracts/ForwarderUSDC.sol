// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract ForwarderUSDC {
    address private immutable recipient; 
    address private immutable relayer;
    IERC20 private immutable usdc;

    event ForwardDone(uint256 amount, address indexed to);

    constructor(address _recipient, address _usdc, address _relayer) {
        require(_recipient != address(0), "Invalid Recipient");
        require(_usdc != address(0), "Invalid USDC Address");
        require(_relayer != address(0), "Invalid Relayer");

        recipient = _recipient;
        usdc = IERC20(_usdc);
        relayer = _relayer;
    }

    modifier onlyRelayer() {
        require(msg.sender == relayer, "Not allowed, only for relayer");
        _;
    }

    function ForwardUSDC() external onlyRelayer {
        uint256 balance = usdc.balanceOf(address(this));
        require(balance > 0, "No USDC to send to recipient");

        bool sent = usdc.transfer(recipient, balance);
        require(sent, "USDC forward failed");

        emit ForwardDone(balance, recipient);
    }


}