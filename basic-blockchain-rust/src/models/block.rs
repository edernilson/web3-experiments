use super::blockchain::Blockchain;
use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Block {
    // O índice em que o bloco atual será armazenado.
    pub index: u64,
    // O horário em que o bloco atual foi criado.
    pub timestamp: u64,
    // A prova de trabalho(proof of work) do bloco.
    pub proof_of_work: u64,
    // O *hash* do bloco anterior.
    pub previous_hash: String,
    // O *hash* do bloco atual..
    pub hash: String,
}
impl Block {
    pub fn new(index: u64, previous_hash: String) -> Self {
        // Current block to be created.
        let block = Block {
            index,
            timestamp: Utc::now().timestamp_millis() as u64,
            proof_of_work: u64::default(),
            previous_hash,
            hash: String::default(),
        };

        block
    }

    // Mine block hash.
    pub fn mine(&mut self, blockchain: Blockchain) {
        loop {
            if !self.hash.starts_with(&"0".repeat(blockchain.difficulty)) {
                self.proof_of_work += 1;
                self.hash = self.generate_block_hash();
            } else {
                break;
            }
        }
    }

    // Calculate block hash.
    pub fn generate_block_hash(&self) -> String {
        let mut block_data = self.clone();
        block_data.hash = String::default();
        // Convert block to JSON format.
        let serialized_block_data = serde_json::to_string(&block_data).unwrap();

        // Calculate and return SHA-256 hash value.
        let mut hasher = Sha256::new();
        hasher.update(serialized_block_data);

        let result = hasher.finalize();

        format!("{:x}", result)
    }
}
