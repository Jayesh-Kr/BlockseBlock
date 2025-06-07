function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




// PoW: miners with random computational power
const miners = [
  { id: 'Miner1', power: getRandom(10, 100) },
  { id: 'Miner2', power: getRandom(10, 100) },
  { id: 'Miner3', power: getRandom(10, 100) }
];

// PoS: stakers with random stake amounts
const stakers = [
  { id: 'Staker1', stake: getRandom(100, 1000) },
  { id: 'Staker2', stake: getRandom(100, 1000) },
  { id: 'Staker3', stake: getRandom(100, 1000) }
];

// DPoS: voters vote for a delegate (random votes)
const delegates = ['Delegate1', 'Delegate2', 'Delegate3'];
const voters = [
  { voter: 'Alice', vote: delegates[getRandom(0, 2)] },
  { voter: 'Bob', vote: delegates[getRandom(0, 2)] },
  { voter: 'Charlie', vote: delegates[getRandom(0, 2)] }
];


// PoW Selection
const powWinner = miners.reduce((prev, curr) => curr.power > prev.power ? curr : prev);
console.log("=== Proof of Work (PoW) ===");
console.log("Miners:", miners);
console.log(`Selected Validator: ${powWinner.id} with power ${powWinner.power}`);
console.log("Logic: Miner with the highest computational power wins.\n");

// PoS Selection
const posWinner = stakers.reduce((prev, curr) => curr.stake > prev.stake ? curr : prev);
console.log("=== Proof of Stake (PoS) ===");
console.log("Stakers:", stakers);
console.log(`Selected Validator: ${posWinner.id} with stake ${posWinner.stake}`);
console.log("Logic: Staker with the highest amount of stake is selected.\n");

// DPoS Selection
const voteCount = {};
voters.forEach(v => {
  voteCount[v.vote] = (voteCount[v.vote] || 0) + 1;
});

const topDelegate = Object.entries(voteCount).reduce((a, b) => b[1] > a[1] ? b : a)[0];
console.log("=== Delegated Proof of Stake (DPoS) ===");
console.log("Voters:", voters);
console.log("Vote Counts:", voteCount);
console.log(`Selected Delegate: ${topDelegate}`);
console.log("Logic: Delegates with the most votes are selected to validate. One of them is chosen.\n");
