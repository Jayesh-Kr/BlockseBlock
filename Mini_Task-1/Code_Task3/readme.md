## Objective: Simulate and compare PoW, PoS, and DPoS logic in code.

### Task:
- Create mock objects for 3 validators:
  - miner = {power: random value} for PoW
  - staker = {stake: random value} for PoS
  - voters = [3 mock accounts voting] for DPoS


### Simulate:
- For PoW: Select validator with highest power
- For PoS: Select validator with highest stake
- For DPoS: Randomly choose a delegate based on most votes


### Output:
- Print selected validator and consensus method used
- Include a console.log explanation of the selection logic


```
=== Proof of Work (PoW) ===
Miners: [
  { id: 'Miner1', power: 84 },
  { id: 'Miner2', power: 68 },
  { id: 'Miner3', power: 33 }
]
Selected Validator: Miner1 with power 84
Logic: Miner with the highest computational power wins.

=== Proof of Stake (PoS) ===
Stakers: [
  { id: 'Staker1', stake: 735 },
  { id: 'Staker2', stake: 801 },
  { id: 'Staker3', stake: 198 }
]
Selected Validator: Staker2 with stake 801
Logic: Staker with the highest amount of stake is selected.

=== Delegated Proof of Stake (DPoS) ===
Voters: [
  { voter: 'Alice', vote: 'Delegate1' },
  { voter: 'Bob', vote: 'Delegate1' },
  { voter: 'Charlie', vote: 'Delegate2' }
]
Vote Counts: { Delegate1: 2, Delegate2: 1 }
Selected Delegate: Delegate1
Logic: Delegates with the most votes are selected to validate. One of them is chosen.
```