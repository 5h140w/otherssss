// Load environment variables
require('dotenv').config();

// Initialize variables for storing WebSocket functions
let getBinancePrice;
let getKucoinPrice;

// Retrieve the list of exchanges from environment variables
const exchanges = process.env.EXCHANGES.split(',');

// Check if Binance exchange is included in the list of exchanges
if (exchanges.includes('binance')) {
    try {
        // Attempt to load Binance price function
        getBinancePrice = require('../websockets/binance');
    } catch (error) {
        // Log error if loading Binance price function fails
        console.error('Failed to load Binance price function:', error);
    }
}

// Check if Kucoin exchange is included in the list of exchanges
if (exchanges.includes('kucoin')) {
    try {
        // Attempt to load Kucoin price function
        getKucoinPrice = require('../websockets/kucoin');
    } catch (error) {
        // Log error if loading Kucoin price function fails
        console.error('Failed to load Kucoin price function:', error);
    }
}

// Export WebSocket functions for Binance and Kucoin exchanges
module.exports = {
    binance: getBinancePrice,
    kucoin: getKucoinPrice,
};
