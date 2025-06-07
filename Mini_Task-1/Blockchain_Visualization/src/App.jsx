import React, { useState, useEffect } from 'react';
import Block from './Block';
import crypto from 'crypto-js';

const App = () => {
  const APP_DIFFICULTY = 4;

  const initializeBlockchain = () => {
    // Genesis block
    const genesisBlock = { 
      id: 0, 
      data: "Genesis Block", 
      nonce: 0, 
      previousHash: '0'.repeat(64),
      hash: '',
      isValid: true
    };
    genesisBlock.hash = calculateBlockHash(genesisBlock.id, genesisBlock.data, genesisBlock.previousHash, genesisBlock.nonce, APP_DIFFICULTY);

    let nonce = genesisBlock.nonce;
    while (!genesisBlock.hash.startsWith('0'.repeat(APP_DIFFICULTY))) {
        nonce++;
        genesisBlock.hash = calculateBlockHash(genesisBlock.id, genesisBlock.data, genesisBlock.previousHash, nonce, APP_DIFFICULTY);
    }
    genesisBlock.nonce = nonce;
    
    // Block 1
    const block1 = {
      id: 1,
      data: "",
      nonce: 0,
      previousHash: genesisBlock.hash,
      hash: '',
      isValid: true
    };
    block1.hash = calculateBlockHash(block1.id, block1.data, block1.previousHash, block1.nonce, APP_DIFFICULTY);
    nonce = block1.nonce;
    while (!block1.hash.startsWith('0'.repeat(APP_DIFFICULTY))) {
        nonce++;
        block1.hash = calculateBlockHash(block1.id, block1.data, block1.previousHash, nonce, APP_DIFFICULTY);
    }
    block1.nonce = nonce;

    // Block 2
    const block2 = {
      id: 2,
      data: "",
      nonce: 0,
      previousHash: block1.hash,
      hash: '',
      isValid: true
    };
    block2.hash = calculateBlockHash(block2.id, block2.data, block2.previousHash, block2.nonce, APP_DIFFICULTY);
    nonce = block2.nonce;
    while (!block2.hash.startsWith('0'.repeat(APP_DIFFICULTY))) {
        nonce++;
        block2.hash = calculateBlockHash(block2.id, block2.data, block2.previousHash, nonce, APP_DIFFICULTY);
    }
    block2.nonce = nonce;
    
    return [genesisBlock, block1, block2];
  };
  
  
  const calculateBlockHash = (blockId, data, previousHash, nonce) => {
    return crypto.SHA256(blockId + data + previousHash + nonce).toString();
  };

  
  const [blockchain, setBlockchain] = useState(initializeBlockchain);

  
  const updateBlockHash = (blockId, newHash, isMined = false) => {
    setBlockchain(prevChain => {
      const newChain = [...prevChain];
      if (newChain[blockId]) {
        newChain[blockId].hash = newHash;
        
        if (isMined && blockId < newChain.length - 1) {
          newChain[blockId + 1].previousHash = newHash;
        }
      }
      return newChain;
    });
  };

  
  const validateBlockchain = () => {
    let chainStillValid = true;
    return blockchain.map((block, index, arr) => {
      let currentBlockIsValid = true;


      if (!block.hash.startsWith('0'.repeat(APP_DIFFICULTY))) {
        currentBlockIsValid = false;
      }


      if (index > 0) {
        if (block.previousHash !== arr[index - 1].hash) {
          currentBlockIsValid = false;
        }
      }
      
      if (!chainStillValid) {
        currentBlockIsValid = false;
      }

      if (!currentBlockIsValid) {
        chainStillValid = false;
      }
      
      return { ...block, isValid: currentBlockIsValid };
    });
  };

 
  const [validatedChain, setValidatedChain] = useState([]);
  
  useEffect(() => {
    setValidatedChain(validateBlockchain());
  }, [blockchain]);

  
  const addBlock = () => {
    const lastBlock = blockchain[blockchain.length - 1];
    let newNonce = 0;
    let newHash = calculateBlockHash(lastBlock.id + 1, "", lastBlock.hash, newNonce);
    
    
    while(!newHash.startsWith('0'.repeat(APP_DIFFICULTY))) {
        newNonce++;
        newHash = calculateBlockHash(lastBlock.id + 1, "", lastBlock.hash, newNonce);
    }

    const newBlock = {
      id: lastBlock.id + 1,
      data: "",
      nonce: newNonce,
      previousHash: lastBlock.hash,
      hash: newHash,
      isValid: true
    };
    setBlockchain([...blockchain, newBlock]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Blockchain Visualization</h1>
        <p>Change a block's data to see how it affects the chain's integrity</p>
      </header>

      <div className="blockchain-container">
        {validatedChain.map((block) => (
          <Block
            key={block.id}
            blockId={block.id}
            previousHash={block.previousHash}
            onHashChange={updateBlockHash}
            isValid={block.isValid}
            initialData={block.data}
            initialNonce={block.nonce}
            difficulty={APP_DIFFICULTY}
          />
        ))}
      </div>

      <button className="add-block-button" onClick={addBlock}>
        Add Block
      </button>
    </div>
  );
};

export default App;