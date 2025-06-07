## Objective: Build a basic blockchain with 3 linked blocks using code.

### Task :
- Create a Block class with:

    - index, timestamp, data, previousHash, hash, and nonce

- Implement a simple hash generator using SHA-256
- Link 3 blocks by chaining their previousHash
- Display all blocks with their hashes


### Challenge :
- Change the data of Block 1 and recalculate its hash.

- Observe how all following blocks become invalid unless hashes are recomputed.


### Run :
```bash
node blockchain.js
```

### Output :
```
Initial Blockchain:

Block 1
Timestamp: 1749314505451
Data: Genesis Block
Previous Hash: 0000000000000000000000000000000000000000000000000000000000000000
Hash: 005b2b6a2610e503bd8cf6612d833b6101b3c65a1c914523d98578ba95e2e625
Nonce: 516

Block 2
Timestamp: 1749314505452
Data: Second Block
Previous Hash: 005b2b6a2610e503bd8cf6612d833b6101b3c65a1c914523d98578ba95e2e625
Hash: 00ec3a68d348c7d29e1f5e039ddaacd9b7f69deca0fd6c6afca6ee7cd6ea9725
Nonce: 156

Block 3
Timestamp: 1749314505453
Data: Third Block
Previous Hash: 00ec3a68d348c7d29e1f5e039ddaacd9b7f69deca0fd6c6afca6ee7cd6ea9725
Hash: 004a1281cbf3f471da482b01bca91b9c4a862ee2eff9cd96419d9fa932ad60e5
Nonce: 36

Tampering with Block 1...

After Tampering:

Block 1
Timestamp: 1749314505451
Data: Genesis Block
Previous Hash: 0
Hash: 005b2b6a2610e503bd8cf6612d833b6101b3c65a1c914523d98578ba95e2e625
Nonce: 516

Block 2
Timestamp: 1749314505452
Data: Hacked Data
Previous Hash: 005b2b6a2610e503bd8cf6612d833b6101b3c65a1c914523d98578ba95e2e625
Hash: 5a87bda2b5ece2f7f61e8c666ed83158d43af1361e2e2ebe80fbf124f52c1aa6
Nonce: 156

Block 3
Timestamp: 1749314505453
Data: Third Block
Previous Hash: 00ec3a68d348c7d29e1f5e039ddaacd9b7f69deca0fd6c6afca6ee7cd6ea9725
Hash: 004a1281cbf3f471da482b01bca91b9c4a862ee2eff9cd96419d9fa932ad60e5
Nonce: 36

Is blockchain valid : false.
The block which is not valid is : Third Block
```

 