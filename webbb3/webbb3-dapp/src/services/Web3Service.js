import Web3 from "web3";
import ABI from "./ABI.json";

// Get ABI from Remix Compilation page/At bottom of page, click on "ABI", to copy contents
// Get contract address from Remix Deploy page/Deployed Contracts and click to copy icon on aside contract name
const CONTRACT_ADDRESS = "[CONTRACT_ADDRESS]";

export async function doLogin() {
    if (!window.ethereum) throw new Error("No MetaMask found.");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) throw new Error("Wallet not found/allowed");

    localStorage.setItem("wallet", accounts[0]);
    return accounts[0];
}

function getContract() {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) throw new Error("Unauthorized");

    const web3 = new Web3(window.ethereum);
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: wallet });
}

export async function getCurrentVoting() {
    const contract = getContract();
    return contract.methods.getCurrentVoting().call();
}

export async function addVote(choice) {
    const contract = getContract();
    return contract.methods.vote(choice).send();
}