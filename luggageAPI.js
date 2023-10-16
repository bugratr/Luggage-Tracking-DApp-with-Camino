const Web3 = require('web3');

// Connect to the Camino network
const web3 = new Web3('YOUR_CAMINO_NETWORK_RPC_URL');

// ABI of the LuggageContract (This is an array that you get when you compile your Solidity contract)
const contractABI = []; // YOUR_ABI_ARRAY_HERE

// The address of the deployed LuggageContract
const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to register a new luggage
async function registerLuggage(luggageID, fromAddress) {
    try {
        const tx = await contract.methods.registerLuggage(luggageID).send({ from: fromAddress });
        return tx;
    } catch (error) {
        console.error("Error while registering luggage:", error);
        throw error;
    }
}

// Function to get luggage details
async function getLuggageDetails(luggageID) {
    try {
        const luggage = await contract.methods.getLuggageDetails(luggageID).call();
        return luggage;
    } catch (error) {
        console.error("Error while getting luggage details:", error);
        throw error;
    }
}

// Function to update luggage status
async function updateLuggageStatus(luggageID, status, fromAddress) {
    try {
        const tx = await contract.methods.updateLuggageStatus(luggageID, status).send({ from: fromAddress });
        return tx;
    } catch (error) {
        console.error("Error while updating luggage status:", error);
        throw error;
    }
}

module.exports = {
    registerLuggage,
    getLuggageDetails,
    updateLuggageStatus
};
