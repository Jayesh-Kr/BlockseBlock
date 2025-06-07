const crypto = require('crypto');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const value = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce;
    return crypto.createHash('sha256').update(value).digest('hex');
  }

  mineBlock(difficulty) {
    while (!this.hash.startsWith('0'.repeat(difficulty))) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}




// Creating Blockchain
const difficulty = 2;
let blockchain = [];

// Genesis Block
const block0 = new Block(1, Date.now().toString(), "Genesis Block", "0");
block0.mineBlock(difficulty);
blockchain.push(block0);

// Block 1
const block1 = new Block(2, Date.now().toString(), "Second Block", block0.hash);
block1.mineBlock(difficulty);
blockchain.push(block1);

// Block 2
const block2 = new Block(3, Date.now().toString(), "Third Block", block1.hash);
block2.mineBlock(difficulty);
blockchain.push(block2);




function printBlockchain(chain) {
  chain.forEach(block => {
    console.log(`\nBlock ${block.index}`);
    console.log(`Timestamp: ${block.timestamp}`);
    console.log(`Data: ${block.data}`);
    console.log(`Previous Hash: ${block.previousHash}`);
    console.log(`Hash: ${block.hash}`);
    console.log(`Nonce: ${block.nonce}`);
  });
}

console.log("Initial Blockchain:");
printBlockchain(blockchain);



// Tampering with Block 1
console.log("\nTampering with Block 1...");
blockchain[1].data = "Hacked Data";
blockchain[1].hash = blockchain[1].calculateHash();

console.log("\nAfter Tampering:");
printBlockchain(blockchain);

// Validation Function
function isChainValid(chain) {
    let i;
  for (i = 1; i < chain.length; i++) {
    const current = chain[i];
    const previous = chain[i - 1];

    if (current.hash !== current.calculateHash()) return [false,i];
    if (current.previousHash !== previous.hash) return [false,i];
  }
  return true;
}

const isValid = isChainValid(blockchain);
console.log(`\nIs blockchain valid : ${isValid[0]}.`);
console.log(`The block which is not valid is : ${blockchain[isValid[1]].data}`)
