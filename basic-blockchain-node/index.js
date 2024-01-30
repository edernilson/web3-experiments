// const Block  = require('./Block');
// const bloco1 = new Block();
// console.log(bloco1);

// const bloco2 = new Block();

const Blockchain = require("./Blockchain");

const blockchain = new Blockchain();
blockchain.addBlock({ from: "a", to: "b", amount: 1 });
blockchain.addBlock({ from: "a", to: "c", amount: 2 });

//COINBASE - 6.25 BTC
//fees de transação
//Link sobre mineração

console.log(JSON.stringify(blockchain));
console.log(blockchain.isValid());

// blockchain.blocks[1].data = { from: "a", to: "b", amount: 2, };
// console.log(JSON.stringify(blockchain));
// console.log(blockchain);
// console.log(blockchain.isValid());
