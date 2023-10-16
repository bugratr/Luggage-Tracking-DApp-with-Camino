const express = require('express');
const Web3 = require('web3');

const app = express();
const port = 3000;

// Connect to the Camino network
const web3 = new Web3('YOUR_CAMINO_NETWORK_RPC_URL');

// The address of the deployed LuggageContract
const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';

// ABI of the LuggageContract (This is an array that you get when you compile your Solidity contract)
const contractABI = []; // YOUR_ABI_ARRAY_HERE

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use(express.json());

app.post('/registerLuggage', async (req, res) => {
    const { luggageID } = req.body;
    const fromAddress = 'YOUR_ADDRESS'; // This should ideally be from an unlocked account or you need to handle private key signing

    try {
        const tx = await contract.methods.registerLuggage(luggageID).send({ from: fromAddress });
        res.json(tx);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/luggage/:luggageID', async (req, res) => {
    const luggageID = req.params.luggageID;

    try {
        const luggage = await contract.methods.getLuggageDetails(luggageID).call();
        res.json(luggage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
