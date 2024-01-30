const sha256 = require('crypto-js/sha256');

module.exports = class Block {

    constructor(index = 0, previousHash = null, data = 'Genesis Block', difficulty = "") {
        this.index = index;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = new Date();
        this.proofOfWork = 0;

        // this.hash = this.generateHash();
        this.mine(difficulty);
    }

    mine(prefix) { // complexidade
        do {
            this.proofOfWork++;
            this.hash = this.generateHash()
            // console.log('hash', this.hash);
        } while (!this.hash.startsWith(prefix));
    }

    generateHash() {
        return sha256(this.index + this.previousHash + JSON.stringify(this.data) + this.timestamp + this.proofOfWork).toString();
    }
}