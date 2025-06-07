import React, { useState, useEffect } from 'react';
import crypto from 'crypto-js';


const Block = ({ blockId, previousHash, onHashChange, isValid, initialData="", initialNonce=0, difficulty }) => {
  const [nonce, setNonce] = useState(initialNonce);
  const [data, setData] = useState(initialData);
  const [hash, setHash] = useState("");
  const [mining, setMining] = useState(false);
 

  const calculateHash = (currentNonce) => {
    return crypto.SHA256(blockId + data + previousHash + currentNonce).toString();
  };

  useEffect(() => {
    const newHash = calculateHash(nonce);
    setHash(newHash);

    onHashChange(blockId, newHash, false); 

  }, [blockId, data, previousHash]);

  useEffect(() => {
    const newHash = calculateHash(nonce);
    setHash(newHash);
    if (!mining) {
        onHashChange(blockId, newHash, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce]);

  const handleDataChange = (e) => {
    setData(e.target.value);
  };

  const handleNonceChange = (e) => {
    setNonce(parseInt(e.target.value) || 0);
  };

  const mineBlock = () => {
    setMining(true);
    setTimeout(() => {
      let currentNonce = 0;
      let currentHashValue = calculateHash(currentNonce);

      while (!currentHashValue.startsWith('0'.repeat(difficulty))) {
        currentNonce++;
        currentHashValue = calculateHash(currentNonce);
      }
      setNonce(currentNonce);
      setMining(false);
      onHashChange(blockId, currentHashValue, true); 
    }, 50);
  };

  return (
    <div className={`block-card ${isValid ? 'valid' : 'invalid'}`}>
      <div className="block-header">
        <h3>Block {blockId}</h3>
        <span className={`status-indicator ${isValid ? 'valid' : 'invalid'}`}></span>
      </div>

      <div className="input-group">
        <label>Nonce:</label>
        <input 
          type="number" 
          value={nonce} 
          onChange={handleNonceChange}
          className="block-input" 
        />
      </div>

      <div className="input-group">
        <label>Data:</label>
        <textarea 
          value={data} 
          onChange={handleDataChange}
          className="block-textarea"
          placeholder="Enter block data..."
        />
      </div>

      <div className="hash-group">
        <label>Prev Hash:</label>
        <div className="hash-display">{previousHash}</div>
      </div>

      <div className="hash-group">
        <label>Hash:</label>
        <div className="hash-display">{hash}</div>
      </div>

      <button 
        className="mine-button" 
        onClick={mineBlock}
        disabled={mining}
      >
        {mining ? "Mining..." : "Mine"}
      </button>
    </div>
  );
};

export default Block;