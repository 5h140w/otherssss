// Import the WebSocket module
const WebSocket = require('ws');

// List of cryptocurrency coins to track
const Coins = ['XRP', 'LTC', 'XLM', 'DOGE', 'ADA', 'ALGO', 'BCH', 'DGB', 'BTC', 'ETH', 'FIL', 'USDC', 'ARB', 'AVAX', 'BNB', 'MATIC', 'SOL'];

// Object to store trade data for each coin
let tradesBinance = {};
let volumesBinance = {};

// Flag to monitor the connection status
let isConnectionHealthy = false;

// Initialize trade data structures for each coin
function resetTradesBinance() {
    for (let cn of Coins) {
        tradesBinance[cn] = [];
        volumesBinance[cn] = [];
    }
}

// Reset trades on script initialization
resetTradesBinance();

// Object to store price memory for each coin
let priceMemoryBinance = {};

// WebSocket connection object
let conn;

// Function to establish WebSocket connection
function connectWebSocket() {
    try {
        // Construct the WebSocket stream URL for Binance
        const streams = Coins.map((x) => `${x.toLowerCase()}usdt@ticker`).join("/");
        conn = new WebSocket(`wss://data-stream.binance.com/stream?streams=${streams}`);
        
        // Setup WebSocket event handlers
        conn.onopen = onWebSocketOpen;
        conn.onmessage = onWebSocketMessage;
        conn.onerror = onWebSocketError;
        conn.on('ping', () => {
            conn.pong(); // Respond to ping with pong to keep the connection alive
        });
        conn.onclose = onWebSocketClose;
    } catch (e) {
        console.error("WS-BINANCE: Error establishing WebSocket connection:", e); // Log any connection errors
    }
}

// Event handler for successful WebSocket connection
function onWebSocketOpen() {
    console.log("WS-BINANCE: Binance WebSocket connected");
    isConnectionHealthy = true;
}

// Event handler for incoming WebSocket messages
function onWebSocketMessage(data) {
    const msg = JSON.parse(data.data).data;

    if (msg.e === "24hrTicker") {
        isConnectionHealthy = true;
        const cn = msg.s.split("USDT")[0];
        priceMemoryBinance[cn] = {
            price: (parseFloat(msg.a) + parseFloat(msg.b)) / 2,
            qV: parseFloat(msg.q),
            bid: parseFloat(msg.b),
            ask: parseFloat(msg.a),
        };
        // Optionally log price memory for debugging
        // console.log(priceMemoryBinance)
    } else {
        console.log("WS-BINANCE: Unexpected message:", msg); // Log unexpected messages
    }
}

// Event handler for WebSocket errors
function onWebSocketError(e) {
    console.error("WS-BINANCE: Binance WebSocket error:", e);
    isConnectionHealthy = false;
    reconnectWebSocket(); // Attempt to reconnect on error
}

// Event handler for WebSocket closure
function onWebSocketClose() {
    console.error("WS-BINANCE: Binance WebSocket closed");
    isConnectionHealthy = false;
    reconnectWebSocket(); // Attempt to reconnect on closure
}

// Function to reconnect WebSocket with a delay
function reconnectWebSocket() {
    console.log("WS-BINANCE: Reconnecting Binance WebSocket in 5 seconds...");
    setTimeout(connectWebSocket, 5000); // Reconnect after 5 seconds
}

// Initialize WebSocket connection
connectWebSocket();

// Export the module's functionality
module.exports = {
    stream: priceMemoryBinance,
    unit: "USDT",
    trades: { prices: tradesBinance, volumes: volumesBinance, resetTrades: resetTradesBinance },
    isConnectionHealthy: () => isConnectionHealthy,
    usedCoins: Coins
};
