---
source: deepdives/backend_systems/blockchain/blockchain.html
title: BitHeat – Blockchain Built From Scratch in Node.js
type: page
---

deepdives/backend_systems/blockchain/blockchain.html

# BitHeat – Blockchain Built From Scratch in Node.js
BitHeat – Blockchain Built From Scratch in Node.js
← Back to Projects
Backend & Distributed Logic
BitHeat – Blockchain Built From Scratch in Node.js
A full peer-to-peer blockchain system implemented from scratch in
Node.js. Includes Proof-of-Work mining, dynamic difficulty, a wallet
with ECDSA signatures, a transaction pool, block validation, and a
WebSocket-based P2P network for chain replication.

### Tech Stack
Tech Stack:
Node.js, WebSockets, SHA-256 hashing,
ECDSA (elliptic), crypto utilities
High-level architecture: wallet → transaction pool → miner → block
creation → P2P broadcast → chain sync.

## Quick insights
Quick insights

### Goal
Goal:
Understand blockchain fundamentals by
re-creating the full system i.e. ledger, consensus, networking,
wallets, and mining—from first principles.

### Scope
Scope:
Implemented Proof-of-Work, dynamic
difficulty, transaction signing, mempool validation, longest-chain
rule, peer discovery, and full chain synchronization.

### Outcome
Outcome:
A locally distributed blockchain where
multiple nodes mine, broadcast, and converge on the same chain using
deterministic validation rules.

## System overview
System overview
BitHeat is composed of four major components working together to
maintain a consistent decentralized ledger. Each node exposes an HTTP
API for wallets and a WebSocket P2P layer for block propagation.

### 1. Blockchain
1. Blockchain
Each block stores timestamp, last hash, hash, transaction list,
nonce, and difficulty.
Block validation ensures correct linkage, hash correctness, and
Proof-of-Work compliance.
Chain validation ensures the entire history is valid before
accepting any peer chain.

### 2. Wallet & Transactions
2. Wallet & Transactions
Wallet generates ECDSA public/private key pairs using elliptic curve
cryptography.
Transactions are signed using the private key and verified on every
node.
TransactionPool keeps only valid, non-conflicting transactions.

### 3. Mining
3. Mining
Miner gathers valid transactions from the pool.
Runs Proof-of-Work: increment nonce until hash has required leading
zeros.
Difficulty adjusts up/down based on time it took to mine the last
block.

### 4. Peer-to-Peer Network
4. Peer-to-Peer Network
Nodes communicate through WebSockets using p2p-server.js.
Newly mined blocks broadcast to all peers.
Nodes automatically replace their chain if a longer valid chain is
received.

## Block mining code snippet
Block mining code snippet
//Basic attributes
constructor(timestamp, last_hash, hash, data, nonce, difficulty) {
this.timestamp = timestamp
this.last_hash = last_hash
this.hash = hash
this.data = data
//Random number for hashing problems
this.nonce = nonce
//Setting up difficulty to adjust mining time
this.difficulty = typeof difficulty === 'number' ? difficulty : DIFFICULTY
}
Block structure: header references, payload, nonce, and difficulty.
//Building new blocks with hashes of previous block
static mineBlock(last_block, data) {
let timestamp, hash
let { difficulty } = last_block
let nonce = 0
const last_hash = last_block.hash
//Rehash until the leading-zero difficulty target is met
do {
nonce++
timestamp = Date.now()
difficulty = Block.adjustDifficulty(last_block, timestamp)
hash = Block.hash(timestamp, last_hash, data, nonce, difficulty)
} while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))
return new Block(timestamp, last_hash, hash, data, nonce, difficulty)
}
//performing the hash
static hash(timestamp, last_hash, data, nonce, difficulty) {
return util.hash(`${timestamp}${last_hash}${JSON.stringify(data)}${nonce}${difficulty}`)
}
Mining flow: iterate nonce, adjust difficulty, and hash until the
target is satisfied.

## Helpful Visualizations
Helpful Visualizations
Transaction pool lifecycle and validation flow.

## Why it matters
Why it matters
Implementing a blockchain from scratch provides hands-on experience in
decentralized system design, distributed consensus, validation logic,
and cryptographic integrity. It is a practical demonstration of how
modern blockchains maintain trust without a central authority.

### Consensus understanding
Consensus understanding:
Proof-of-Work, difficulty
retargeting, fork resolution.

### Distributed systems
Distributed systems:
WebSocket messaging, chain replication,
and peer sync rules.

### Security concepts
Security concepts:
Digital signatures, transaction integrity,
deterministic validation.
