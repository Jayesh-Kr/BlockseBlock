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


const difficulty = 6;

const block = new Block(1, Date.now().toString(), "Genesis Block", "0");
let startTime = Date.now();
block.mineBlock(difficulty);

console.log(`Result when difficulty is : ${difficulty}`)
console.log(`Nonce of the block : ${block.nonce}`);
console.log(`Time used : ${(Date.now() - startTime) /1000} seconds`);
console.log(`Hash of the block : ${block.hash}\n`);


