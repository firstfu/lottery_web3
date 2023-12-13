// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Lottery {
    address payable[] public players;
    address public lastWinner;
    address public manager;

    constructor() {
        manager = msg.sender;
    }

    // 進入game
    function enter() public payable {
        require(msg.value == 0.01 ether);
        players.push(payable(msg.sender));
    }

    // 取得game金額
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // 取得game人數
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    // 隨機產生數字(生產環境用預言機)
    function random() public view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        players.length
                    )
                )
            );
    }

    function pickWinner() public {
        require(msg.sender == manager);
        uint256 r = random();
        address payable winner;
        uint256 index = r % players.length;
        winner = players[index];
        lastWinner = winner;
        winner.transfer(getBalance());
        players = new address payable[](0);
    }
}
