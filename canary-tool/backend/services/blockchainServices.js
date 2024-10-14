// Load environment variables
require('dotenv').config();

// Import necessary libraries and artifacts
const { getCurrentProvider, getXrpContract } = require('./ethereumConnectionServices');

// Define XRP smart contract address from environment variables
const xrpAddress = process.env.XRP_ADDR; // Address of the XRP smart contract

/**
 * Fetches epoch data from the XRP smart contract using the connected provider.
 * @async
 * @returns {Promise<Array<number>>} An array containing epoch ID, submission end time, and reveal end time.
 */
async function getEpochData() {
    try {
        const currentProvider = getCurrentProvider();
        if (!currentProvider) {
            console.error("No current provider available.");
            return [0, 0, 0];
        }
        // Get XRP contract instance
        const xrpContract = getXrpContract();
        // Fetch data
        const data = await xrpContract.getPriceEpochData();
        const [epochId, epochSubmitEndTime, epochRevealEndTime] = Object.values(data).map(Number);
        return [epochId, epochSubmitEndTime, epochRevealEndTime];
    } catch (error) {
        console.error("Error fetching epoch data: " + error);
        return [0, 0, 0];
    }
}

/**
 * Exports the getEpochData function.
 */
module.exports = {
    getEpochData
};
