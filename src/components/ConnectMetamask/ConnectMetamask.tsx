import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';
import BigNumber from 'bignumber.js';
import { Wrapper } from './ConnectMetamask.styled';

interface IProps {}

const isMainnet = false;
// main 0x6B175474E89094C44Da98b954EedeAC495271d0F DAI
// test 0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa DAI

// main 0xd26114cd6EE289AccF82350c8d8487fedB8A0C07 OMG
// test 0xdB7ec4E4784118D9733710e46F7C83fE7889596a OMG

const TOKEN_ABI = JSON.parse(
    '[\n' +
        '    {\n' +
        '        "constant": true,\n' +
        '        "inputs": [],\n' +
        '        "name": "name",\n' +
        '        "outputs": [\n' +
        '            {\n' +
        '                "name": "",\n' +
        '                "type": "string"\n' +
        '            }\n' +
        '        ],\n' +
        '        "payable": false,\n' +
        '        "stateMutability": "view",\n' +
        '        "type": "function"\n' +
        '    },\n' +
        '    {\n' +
        '        "constant": false,\n' +
        '        "inputs": [\n' +
        '            {\n' +
        '                "name": "_spender",\n' +
        '                "type": "address"\n' +
        '            },\n' +
        '            {\n' +
        '                "name": "_value",\n' +
        '                "type": "uint256"\n' +
        '            }\n' +
        '        ],\n' +
        '        "name": "approve",\n' +
        '        "outputs": [\n' +
        '            {\n' +
        '                "name": "",\n' +
        '                "type": "bool"\n' +
        '            }\n' +
        '        ],\n' +
        '        "payable": false,\n' +
        '        "stateMutability": "nonpayable",\n' +
        '        "type": "function"\n' +
        '    },\n' +
        '    {\n' +
        '        "constant": true,\n' +
        '        "inputs": [],\n' +
        '        "name": "totalSupply",\n' +
        '        "outputs": [\n' +
        '            {\n' +
        '                "name": "",\n' +
        '                "type": "uint256"\n' +
        '            }\n' +
        '        ],\n' +
        '        "payable": false,\n' +
        '        "stateMutability": "view",\n' +
        '        "type": "function"\n' +
        '    },\n' +
        '    {\n' +
        '        "constant": false,\n' +
        '        "inputs": [\n' +
        '            {\n' +
        '                "name": "_from",\n' +
        '                "type": "address"\n' +
        '            },\n' +
        '            {\n' +
        '                "name": "_to",\n' +
        '                "type": "address"\n' +
        '            },\n' +
        '            {\n' +
        '                "name": "_value",\n' +
        '                "type": "uint256"\n' +
        '            }\n' +
        '        ],\n' +
        '        "name": "transferFrom",\n' +
        '        "outputs": [\n' +
        '            {\n' +
        '                "name": "",\n' +
        '                "type": "bool"\n' +
        '            }\n' +
        '        ],\n' +
        '        "payable": false,\n' +
        '        "stateMutability": "nonpayable",\n' +
        '        "type": "function"\n' +
        '    },\n' +
        '    {\n' +
        '        "constant": true,\n' +
        '        "inputs": [],\n' +
        '        "name": "decimals",\n' +
        '        "outputs": [\n' +
        '            {\n' +
        '                "name": "",\n' +
        '                "type": "uint8"\n' +
        '            }\n' +
        '        ],\n' +
        '        "payable": false,\n' +
        '        "stateMutability": "view",\n' +
        '        "type": "function"\n' +
        '    },\n' +
        '    {\n' +
        '        "constant": true,\n' +
        '        "inputs": [\n' +
        '            {\n' +
        '                "name": "_owner",\n' +
        '                "type": "address"\n' +
        '            }\n' +
        '        ],\n' +
        '        "name": "balanceOf",\n' +
        '        "outputs": [\n' +
        '            {\n' +
        '                "name": "balance",\n' +
        '                "type": "uint256"\n' +
        '            }\n' +
        '        ],\n' +
        '        "payable": false,\n' +
        '        "stateMutability": "view",\n' +
        '        "type": "function"\n' +
        '    },\n' +
        '    {\n' +
        '        "constant": true,\n' +
        '        "inputs": [],\n' +
        '        "name": "symbol",\n' +
        '        "outputs": [\n' +
        '            {\n' +
        '                "name": "",\n' +
        '                "type": "string"\n' +
        '            }\n' +
        '        ],\n' +
        '        "payable": false,\n' +
        '        "stateMutability": "view",\n' +
        '        "type": "function"\n' +
        '    },\n' +
        '    {\n' +
        '        "constant": false,\n' +
        '        "inputs": [\n' +
        '            {\n' +
        '                "name": "_to",\n' +
        '                "type": "address"\n' +
        '            },\n' +
        '            {\n' +
        '                "name": "_value",\n' +
        '                "type": "uint256"\n' +
        '            }\n' +
        '        ],\n' +
        '        "name": "transfer",\n' +
        '        "outputs": [\n' +
        '            {\n' +
        '                "name": "",\n' +
        '                "type": "bool"\n' +
        '            }\n' +
        '        ],\n' +
        '        "payable": false,\n' +
        '        "stateMutability": "nonpayable",\n' +
        '        "type": "function"\n' +
        '    },\n' +
        '    {\n' +
        '        "constant": true,\n' +
        '        "inputs": [\n' +
        '            {\n' +
        '                "name": "_owner",\n' +
        '                "type": "address"\n' +
        '            },\n' +
        '            {\n' +
        '                "name": "_spender",\n' +
        '                "type": "address"\n' +
        '            }\n' +
        '        ],\n' +
        '        "name": "allowance",\n' +
        '        "outputs": [\n' +
        '            {\n' +
        '                "name": "",\n' +
        '                "type": "uint256"\n' +
        '            }\n' +
        '        ],\n' +
        '        "payable": false,\n' +
        '        "stateMutability": "view",\n' +
        '        "type": "function"\n' +
        '    },\n' +
        '    {\n' +
        '        "payable": true,\n' +
        '        "stateMutability": "payable",\n' +
        '        "type": "fallback"\n' +
        '    },\n' +
        '    {\n' +
        '        "anonymous": false,\n' +
        '        "inputs": [\n' +
        '            {\n' +
        '                "indexed": true,\n' +
        '                "name": "owner",\n' +
        '                "type": "address"\n' +
        '            },\n' +
        '            {\n' +
        '                "indexed": true,\n' +
        '                "name": "spender",\n' +
        '                "type": "address"\n' +
        '            },\n' +
        '            {\n' +
        '                "indexed": false,\n' +
        '                "name": "value",\n' +
        '                "type": "uint256"\n' +
        '            }\n' +
        '        ],\n' +
        '        "name": "Approval",\n' +
        '        "type": "event"\n' +
        '    },\n' +
        '    {\n' +
        '        "anonymous": false,\n' +
        '        "inputs": [\n' +
        '            {\n' +
        '                "indexed": true,\n' +
        '                "name": "from",\n' +
        '                "type": "address"\n' +
        '            },\n' +
        '            {\n' +
        '                "indexed": true,\n' +
        '                "name": "to",\n' +
        '                "type": "address"\n' +
        '            },\n' +
        '            {\n' +
        '                "indexed": false,\n' +
        '                "name": "value",\n' +
        '                "type": "uint256"\n' +
        '            }\n' +
        '        ],\n' +
        '        "name": "Transfer",\n' +
        '        "type": "event"\n' +
        '    }\n' +
        ']',
);
const CONSTANTS = {
    INC_CONTRACT_ABI: JSON.parse(
        '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"string","name":"incognitoAddress","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newIncognitoProxy","type":"address"}],"name":"UpdateIncognitoProxy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"assets","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"UpdateTokenTotal","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"ETH_TOKEN","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"incognitoAddress","type":"string"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"incognitoAddress","type":"string"}],"name":"depositERC20","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"recipientToken","type":"address"},{"internalType":"address","name":"exchangeAddress","type":"address"},{"internalType":"bytes","name":"callData","type":"bytes"},{"internalType":"bytes","name":"timestamp","type":"bytes"},{"internalType":"bytes","name":"signData","type":"bytes"}],"name":"execute","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getDecimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"getDepositedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_prevVault","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"}],"name":"isSigDataUsed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"}],"name":"isWithdrawed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"migration","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"notEntered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"inst","type":"bytes"}],"name":"parseBurnInst","outputs":[{"components":[{"internalType":"uint8","name":"meta","type":"uint8"},{"internalType":"uint8","name":"shard","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"addresspayable","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32","name":"itx","type":"bytes32"}],"internalType":"structVault.BurnInstData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"prevVault","outputs":[{"internalType":"contractWithdrawable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"incognitoAddress","type":"string"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"signData","type":"bytes"},{"internalType":"bytes","name":"timestamp","type":"bytes"}],"name":"requestWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"sigDataUsed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signData","type":"bytes"},{"internalType":"bytes32","name":"hash","type":"bytes32"}],"name":"sigToAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes","name":"inst","type":"bytes"},{"internalType":"uint256","name":"heights","type":"uint256"},{"internalType":"bytes32[]","name":"instPaths","type":"bytes32[]"},{"internalType":"bool[]","name":"instPathIsLefts","type":"bool[]"},{"internalType":"bytes32","name":"instRoots","type":"bytes32"},{"internalType":"bytes32","name":"blkData","type":"bytes32"},{"internalType":"uint256[]","name":"sigIdxs","type":"uint256[]"},{"internalType":"uint8[]","name":"sigVs","type":"uint8[]"},{"internalType":"bytes32[]","name":"sigRs","type":"bytes32[]"},{"internalType":"bytes32[]","name":"sigSs","type":"bytes32[]"}],"name":"submitBurnProof","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalDepositedToSCAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"assets","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"updateAssets","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"inst","type":"bytes"},{"internalType":"uint256","name":"heights","type":"uint256"},{"internalType":"bytes32[]","name":"instPaths","type":"bytes32[]"},{"internalType":"bool[]","name":"instPathIsLefts","type":"bool[]"},{"internalType":"bytes32","name":"instRoots","type":"bytes32"},{"internalType":"bytes32","name":"blkData","type":"bytes32"},{"internalType":"uint256[]","name":"sigIdxs","type":"uint256[]"},{"internalType":"uint8[]","name":"sigVs","type":"uint8[]"},{"internalType":"bytes32[]","name":"sigRs","type":"bytes32[]"},{"internalType":"bytes32[]","name":"sigSs","type":"bytes32[]"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"withdrawRequests","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"withdrawed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"string","name":"incognitoAddress","type":"string"},{"internalType":"address","name":"token","type":"address"},{"internalType":"bytes","name":"timestamp","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawBuildData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"exchangeAddress","type":"address"},{"internalType":"bytes","name":"callData","type":"bytes"},{"internalType":"bytes","name":"timestamp","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"executeBuildData","outputs":[],"stateMutability":"payable","type":"function"}]',
    ),
    INC_CONTRACT_ADDRESS: isMainnet
        ? '0x97875355ef55ae35613029df8b1c8cf8f89c9066'
        : '0x7c7e371D1e25771f2242833C1A354dCE846f3ec8',
    INC_ADDRESS: isMainnet
        ? '12RufEV3txPvSPpogbJLuS3f4oKWzV9cMnybyoGh3LrsLgMSjmyGnJ2yDN7AEMygS7YmcvwocRY6Qh7Qm6EgmWj3T9RTuFuH15fpAPk'
        : '12Rz88sw6FfFKuKdioLe74kiANT4UXTbC5YZ4Ycm17tkvB2W7hAS8YjWuHJnsTB9RPZFsZpE9E5N469fSa2tA79skT8RJBhVMzQHsWK',
    TOKEN_CONTRACT_ID: isMainnet
        ? '0x6B175474E89094C44Da98b954EedeAC495271d0F'
        : '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa',
};

const INC_CONTRACT_ABI = JSON.parse(
    '[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"string","name":"incognitoAddress","type":"string"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newIncognitoProxy","type":"address"}],"name":"UpdateIncognitoProxy","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address[]","name":"assets","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"UpdateTokenTotal","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"ETH_TOKEN","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"incognitoAddress","type":"string"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"incognitoAddress","type":"string"}],"name":"depositERC20","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"recipientToken","type":"address"},{"internalType":"address","name":"exchangeAddress","type":"address"},{"internalType":"bytes","name":"callData","type":"bytes"},{"internalType":"bytes","name":"timestamp","type":"bytes"},{"internalType":"bytes","name":"signData","type":"bytes"}],"name":"execute","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getDecimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"owner","type":"address"}],"name":"getDepositedBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_prevVault","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isInitialized","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"}],"name":"isSigDataUsed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"hash","type":"bytes32"}],"name":"isWithdrawed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"migration","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"notEntered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"inst","type":"bytes"}],"name":"parseBurnInst","outputs":[{"components":[{"internalType":"uint8","name":"meta","type":"uint8"},{"internalType":"uint8","name":"shard","type":"uint8"},{"internalType":"address","name":"token","type":"address"},{"internalType":"addresspayable","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes32","name":"itx","type":"bytes32"}],"internalType":"structVault.BurnInstData","name":"","type":"tuple"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"prevVault","outputs":[{"internalType":"contractWithdrawable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"incognitoAddress","type":"string"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"signData","type":"bytes"},{"internalType":"bytes","name":"timestamp","type":"bytes"}],"name":"requestWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"sigDataUsed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"signData","type":"bytes"},{"internalType":"bytes32","name":"hash","type":"bytes32"}],"name":"sigToAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"bytes","name":"inst","type":"bytes"},{"internalType":"uint256","name":"heights","type":"uint256"},{"internalType":"bytes32[]","name":"instPaths","type":"bytes32[]"},{"internalType":"bool[]","name":"instPathIsLefts","type":"bool[]"},{"internalType":"bytes32","name":"instRoots","type":"bytes32"},{"internalType":"bytes32","name":"blkData","type":"bytes32"},{"internalType":"uint256[]","name":"sigIdxs","type":"uint256[]"},{"internalType":"uint8[]","name":"sigVs","type":"uint8[]"},{"internalType":"bytes32[]","name":"sigRs","type":"bytes32[]"},{"internalType":"bytes32[]","name":"sigSs","type":"bytes32[]"}],"name":"submitBurnProof","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalDepositedToSCAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"assets","type":"address[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"name":"updateAssets","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"inst","type":"bytes"},{"internalType":"uint256","name":"heights","type":"uint256"},{"internalType":"bytes32[]","name":"instPaths","type":"bytes32[]"},{"internalType":"bool[]","name":"instPathIsLefts","type":"bool[]"},{"internalType":"bytes32","name":"instRoots","type":"bytes32"},{"internalType":"bytes32","name":"blkData","type":"bytes32"},{"internalType":"uint256[]","name":"sigIdxs","type":"uint256[]"},{"internalType":"uint8[]","name":"sigVs","type":"uint8[]"},{"internalType":"bytes32[]","name":"sigRs","type":"bytes32[]"},{"internalType":"bytes32[]","name":"sigSs","type":"bytes32[]"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"withdrawRequests","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"withdrawed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"},{"inputs":[{"internalType":"string","name":"incognitoAddress","type":"string"},{"internalType":"address","name":"token","type":"address"},{"internalType":"bytes","name":"timestamp","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawBuildData","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"exchangeAddress","type":"address"},{"internalType":"bytes","name":"callData","type":"bytes"},{"internalType":"bytes","name":"timestamp","type":"bytes"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"executeBuildData","outputs":[],"stateMutability":"payable","type":"function"}]',
);

const ConnectMetamask = React.memo((props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { ethereum, web3 } = window;
    const isMetaMaskInstalled = Boolean(ethereum && ethereum?.isMetaMask);
    const [accounts, setAccounts] = useState<string[]>([]);
    const currentWeb3 = new Web3(web3.currentProvider);

    const fetchTokenABI = async (tokenContractID: string) => {
        const prefix = `https://api${isMainnet ? '' : '-kovan'}.etherscan.io/`;
        const url = `${prefix}api?module=contract&action=getabi&address=${tokenContractID}&apikey=V2D1M8Q73F6ZCPA4DQIU9YNUBQ95M4GEN4`;
        console.log(url);
        const contractTokenABI = await fetch(url)
            .then((response) => response.json())
            .then((data) => data.result);
        return JSON.parse(contractTokenABI);
    };

    const getStatusTransaction = async (txHashId: string) => {
        await currentWeb3.eth.getTransactionReceipt(
            txHashId,
            (error: Error, transactionReceipt: TransactionReceipt) => {
                if (error) {
                    // Todo: Transaction error
                    console.log('error: ', error);
                }
                currentWeb3.eth.getBlockNumber((error: Error, currentBlock: number) => {
                    const { status, blockNumber: txBlock } = transactionReceipt;
                    const blockRange = currentBlock - txBlock;
                    if (status && blockRange > 15) {
                        // Todo: Transaction finish
                    }
                });
            },
        );
    };

    const requestDepositERC20 = async () => {
        const tokenContractID = CONSTANTS.TOKEN_CONTRACT_ID;
        const approveMax = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
        const valueTransfer = currentWeb3.utils.toHex(0.0001 * 1e18);

        console.log(valueTransfer);

        /** fetch Token ABI */
        const contractTokenABI = await fetchTokenABI(tokenContractID);

        if (contractTokenABI) {
            /** approve */
            const tokenInstance = new currentWeb3.eth.Contract(TOKEN_ABI, tokenContractID);
            const approvedBalance = await tokenInstance.methods
                .allowance(accounts[0], CONSTANTS.INC_CONTRACT_ADDRESS)
                .call();
            const approveData = await tokenInstance.methods
                .approve(CONSTANTS.INC_CONTRACT_ADDRESS, approveMax)
                .send({ from: accounts[0] });

            /** deposit ERC20 */
            const incInstance = new currentWeb3.eth.Contract(INC_CONTRACT_ABI, CONSTANTS.INC_CONTRACT_ADDRESS);
            const depData = incInstance.methods
                .depositERC20(tokenContractID, valueTransfer, CONSTANTS.INC_ADDRESS)
                .encodeABI();

            /** confirm transaction */
            const sendObject = {
                from: accounts[0],
                to: CONSTANTS.INC_CONTRACT_ADDRESS,
                value: 0,
                data: depData,
            };
            const txId = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [sendObject],
            });
            console.log(txId);
        }
    };

    const requestDepositETH = async () => {
        const ethAmt = `0x${(0.000001 * 1e18).toString(16)}`;
        const incInstance = new currentWeb3.eth.Contract(INC_CONTRACT_ABI);

        /** deposit ETH */
        const depData = incInstance.methods.deposit(CONSTANTS.INC_ADDRESS).encodeABI();

        /** confirm send ETH  */
        const sendObject = {
            from: accounts[0],
            value: ethAmt,
            to: CONSTANTS.INC_CONTRACT_ADDRESS,
            data: depData,
        };
        const txHashId = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [sendObject],
        });
        // '0x312d0396a9b1891041546c4757259fc8507ef2b4911cc9e76ad516bc429b96a8'
        console.log(txHashId);
        await getStatusTransaction(txHashId);
    };

    const onRequestUnShield = async () => {
        try {
            const isERC20 = true;
            if (isERC20) {
                return await requestDepositERC20();
            }
            await requestDepositETH();
        } catch (e) {
            // Todo: UnShield fail
            console.log(e);
        }
    };

    const onRequestConnect = async () => {
        const accounts: string[] =
            (await ethereum.request({
                method: 'eth_requestAccounts',
            })) || [];
        setAccounts(accounts);
    };
    const onPress = async () => {
        if (!isMetaMaskInstalled) {
            // Todo: Please install metamask
        } else if (isEmpty(accounts)) {
            onRequestConnect().then();
        } else {
            onRequestUnShield().then();
        }
    };

    const checkConnectAccount = async () => {
        const accounts = (await ethereum.request({ method: 'eth_accounts' })) || [];
        setAccounts(accounts);
    };

    const handleAccountsChanged = (accounts: string[]) => setAccounts(accounts);

    const handleDisconnectAccount = () => setAccounts([]);

    React.useEffect(() => {
        if (typeof ethereum === 'undefined') return;
        checkConnectAccount().then();
        ethereum.on('disconnect', handleDisconnectAccount);
        ethereum.on('accountsChanged', handleAccountsChanged);
    }, []);

    return <Wrapper onClick={onPress} {...props} />;
});

export default ConnectMetamask;
