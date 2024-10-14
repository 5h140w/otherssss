const WebSocketAPI = require('./ws.middleware');
const coins = process.env.COINS.split(',');

/**
 * Fetches prices via WebSocket for specified coins and exchanges.
 * @param {number} collectionTime - The collection time.
 * @param {number} epochId - The epoch ID.
 * @param {string[]} exchanges - An array of exchange names.
 * @returns {Promise<Array>} - A promise that resolves to an array of collected data.
 */
async function fetchPricesWS(collectionTime, epochId, exchanges) {
    const collectedData = [];

    try {
        if (!collectionTime || !epochId || !exchanges || !Array.isArray(exchanges) || exchanges.length === 0) {
            throw new Error('Invalid parameters provided.');
        }

        for (const coin of coins) {
            for (const exchange of exchanges) {
                if (!WebSocketAPI[exchange] || !WebSocketAPI[exchange].stream[coin]) {
                    continue;
                }
                const price = WebSocketAPI[exchange].stream[coin].price;
                const unit = WebSocketAPI[exchange].unit;
                const data = {
                    "EXCHANGE": exchange,
                    "PRICE": coin,
                    "EPOCH_ID": epochId,
                    "COLLECTION_TIME": collectionTime,
                    "PRICE_VALUE": price,
                    "UNIT": unit
                };
                collectedData.push(data);
            }
        }
    } catch (error) {
        console.error(`Error fetching prices: ${error.message}`);
    }

    return collectedData;
}

module.exports = {
    fetchPricesWS
};
