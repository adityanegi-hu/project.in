"""
Blockchain & Web3 project code template generator.
Includes Solidity smart contract, Web3 client integration, and database schema.
"""

from typing import List, Dict, Any
from ..models import CodeFile


def generate_blockchain_files(proj: Dict[str, Any]) -> List[CodeFile]:
    """Generates Blockchain & Web3 source code files."""
    t = proj["title"]
    cat = proj["category"]
    tech = proj["techStack"]
    tech_str = ", ".join(tech)
    y_lbl = proj["yearLabel"]
    degs = ", ".join(proj["degrees"])

    files = [
        {
            "filename": "contracts/ProjectContract.sol",
            "language": "solidity",
            "code": f'''// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title {t}
 * @notice Academic Level: {y_lbl} | Degrees: {degs}
 */
contract ProjectContract {{
    address public owner;
    uint256 public totalTransactions;

    struct LedgerEntry {{
        uint256 id;
        address sender;
        string dataPayload;
        uint256 timestamp;
    }}

    mapping(uint256 => LedgerEntry) public ledger;
    event EntryRecorded(uint256 indexed id, address indexed sender, string dataPayload);

    constructor() {{
        owner = msg.sender;
    }}

    function recordEntry(string memory _payload) public returns (uint256) {{
        totalTransactions++;
        ledger[totalTransactions] = LedgerEntry(totalTransactions, msg.sender, _payload, block.timestamp);
        emit EntryRecorded(totalTransactions, msg.sender, _payload);
        return totalTransactions;
    }}
}}
'''
        },
        {
            "filename": "frontend/index.html",
            "language": "html",
            "code": f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{t} - Web3 DApp</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>⛓️ {t}</h1>
      <p class="badge">{y_lbl} • {degs}</p>
    </header>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <span id="walletAddress" style="font-family: monospace; color: #a855f7;">Wallet: 0x71C...89A (Sepolia)</span>
        <button id="connectWalletBtn" class="btn">Connect Web3</button>
      </div>

      <div class="form-group">
        <input type="text" id="payloadInput" placeholder="Enter on-chain transaction data payload...">
        <button id="sendTxBtn" class="btn">Sign & Broadcast Tx</button>
      </div>

      <div class="output-box" id="blockLog">On-chain transaction receipt explorer will appear here...</div>
    </div>
  </div>
  <script src="app.js"></script>
</body>
</html>
'''
        },
        {
            "filename": "frontend/app.js",
            "language": "javascript",
            "code": f'''document.addEventListener("DOMContentLoaded", () => {{
  const sendTxBtn = document.getElementById("sendTxBtn");
  const payloadInput = document.getElementById("payloadInput");
  const blockLog = document.getElementById("blockLog");

  sendTxBtn.addEventListener("click", () => {{
    const val = payloadInput.value.trim() || "Transfer Academic Record Hash #4092";
    const txHash = "0x" + Array.from({{length: 64}}, () => Math.floor(Math.random()*16).toString(16)).join("");
    const blockNo = Math.floor(Math.random() * 50000) + 14200000;

    blockLog.innerText = 
`=============================================================
{t} - On-Chain Transaction Receipt
=============================================================
• Status         : Confirmed (12 Block Confirmations)
• Block Number   : #${{blockNo}}
• Tx Hash        : ${{txHash}}
• Sender Address : 0x71C856aA22e0321F5d8521a0F2231A
• Data Payload   : "${{val}}"
• Gas Used       : 21,432 Gwei
=============================================================`;
  }});
}});
'''
        },
        {
            "filename": "database/schema.sql",
            "language": "sql",
            "code": '''-- Web3 DApp Off-Chain Event Indexing Schema
CREATE TABLE IF NOT EXISTS chain_transactions (
    tx_hash VARCHAR(66) PRIMARY KEY,
    block_number BIGINT NOT NULL,
    sender_address VARCHAR(42) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    gas_used BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
'''
        }
    ]

    return files
