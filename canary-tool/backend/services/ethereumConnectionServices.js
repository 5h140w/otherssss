// ethereumConnection.js

const { ethers } = require('ethers');

// Load environment variables
require('dotenv').config();

// Define list of Ethereum nodes from environment variables
const listNodes = process.env.LIST_NODES.split(','); // List of Ethereum nodes to connect to

let currentProvider; // Variable to hold the current Ethereum provider
let xrpContract; // Variable to hold the XRP contract instance

// Connect to Ethereum node automatically upon import
(async function connectToNode() {
    for (const node of listNodes) {
        try {
            console.log("Attempting to connect to node: " + node);
            const provider = new ethers.providers.JsonRpcProvider(node);
            await provider.getBlockNumber(); // This will throw an error if connection fails
            console.log("Connected to node: " + node);
            currentProvider = provider;

            // Create XRP contract instance
            const xrpAbi = require("../artifacts/abi/xrp.abi"); // Import ABI for the XRP smart contract
            const xrpAddress = process.env.XRP_ADDR; // Address of the XRP smart contract
            xrpContract = new ethers.Contract(xrpAddress, xrpAbi, currentProvider);

            return; // Exit loop once connected
        } catch (error) {
            console.error("Error connecting to node: " + node + ". Error: " + error.message);
        }
    }
})();

// Function to get the current provider
function getCurrentProvider() {
    return currentProvider;
}

// Function to get the XRP contract instance
function getXrpContract() {
    return xrpContract;
}

// Export the current provider and the functions
module.exports = {
    getCurrentProvider,
    getXrpContract
};
