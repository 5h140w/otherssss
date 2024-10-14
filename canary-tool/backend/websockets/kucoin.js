const WebSocket = require('ws');
const axios = require('axios');

const Coins = ['XRP', 'LTC', 'XLM', 'DOGE', 'ADA', 'ALGO', 'BCH', 'DGB', 'BTC', 'ETH', 'FIL', 'SGB', 'USDC', 'XDC', 'ARB', 'AVAX', 'BNB', 'MATIC', 'SOL'];

// Health status of the WebSocket connection
let health = {
    "internIsConnectionHealthy": false,
    "isConnectionHealthy": false
};

// Object to store price data for each coin
let priceMemoryKucoin = {};
for (let cn of Coins) {
    priceMemoryKucoin[cn] = {};
}

// Initialize trade data structures for each coin
let tradesKucoin = {};
let volumesKucoin = {};
function resetTradesKucoin() {
    for (let cn of Coins) {
        tradesKucoin[cn] = [];
        volumesKucoin[cn] = [];
    }
}
resetTradesKucoin();

// Define pairs for Kucoin WebSocket subscription
let pairs = Coins.map((x) => x + "-USDT").join(",");
let mapPairs = {};
let pairsKucoin = Coins.map((x) => x + "-USDT");
for (let i = 0; i < Coins.length; i++) {
    mapPairs[pairsKucoin[i]] = Coins[i];
}

// Fetch and update volume data for each coin periodically
setInterval(async () => {
    try {
        let response = await axios.get("https://api.kucoin.com/api/v1/market/allTickers");
        for (let dic of response.data.data.ticker) {
            if (pairsKucoin.includes(dic.symbol)) {
                priceMemoryKucoin[mapPairs[dic.symbol]].qV = dic.volValue;
            }
        }
    } catch (e) {
        console.error("WS-KUCOIN: Kucoin WebSocket error:", e);
    }
}, 10000);

let id = 1;
let client_id_kucoin = 1;
let last_ping_id_kucoin = client_id_kucoin;
let last_pong_id_kucoin = client_id_kucoin;
let token;
let endpoint;

// Function to initialize WebSocket connection
async function initialize_connection(conn) {
    try {
        conn.onopen = function () {
            console.log("WS-KUCOIN: Kucoin WebSocket connected");
            // Subscribe to ticker and trade match channels
            conn.send(JSON.stringify({
                "type": "subscribe",
                "topic": "/market/ticker:" + pairs,
                "privateChannel": false,
                "response": true,
                "id": id
            }));
            conn.send(JSON.stringify({
                "type": "subscribe",
                "topic": "/market/match:" + pairs,
                "privateChannel": false,
                "response": true,
                "id": id
            }));
            health.isConnectionHealthy = true;
        }
        conn.onmessage = function (data) {
            message = JSON.parse(data.data);
            // Handle ticker messages
            if (message.subject == "trade.ticker") {
                cn = message.topic.split(":")[1].split("-")[0];
                // Update price, bid, and ask data for the coin
                priceMemoryKucoin[cn].price = (parseFloat(message.data.bestAsk) + parseFloat(message.data.bestBid)) / 2;
                priceMemoryKucoin[cn].bid = parseFloat(message.data.bestBid);
                priceMemoryKucoin[cn].ask = parseFloat(message.data.bestAsk);
            }
            // Handle trade match messages
            if (message.subject == "trade.l3match") {
                cn = message.topic.split(":")[1].split("-")[0];
                // Push trade prices and volumes for the coin
                tradesKucoin[cn].push(parseFloat(message.data.price));
                volumesKucoin[cn].push(parseFloat(message.data.size));
            }
            if (message.type == "pong") {
                // Update internal connection health status on receiving pong
                health.internIsConnectionHealthy = true;
                last_pong_id_kucoin = message.id;
            }
        }
        conn.onerror = function (e) {
            console.error("WS-KUCOIN: Kucoin WebSocket error:", e);
            health.isConnectionHealthy = false;
            if (conn.OPEN) {
                conn.close();
            }
        }
        conn.onclose = async function (data) {
            console.log("WS-KUCOIN: CONNECTION CLOSED:");
            launch_connection();
        }
    } catch (e) {
        console.error("WS-KUCOIN: Error initializing WebSocket connection:", e);
    }
}

// Function to launch WebSocket connection
async function launch_connection() {
    try {
        // Fetch token and endpoint for WebSocket connection
        if (token == undefined || endpoint == undefined) {
            await axios.post("https://api.kucoin.com/api/v1/bullet-public").then(response => {
                token = response.data.data.token;
                endpoint = response.data.data.instanceServers[0].endpoint;
            });
        }
        // Initialize WebSocket connection
        conn = new WebSocket(endpoint + "?token=" + token + "&[connectId=" + id + "]");
        initialize_connection(conn);
        // Ping WebSocket connection periodically
        setInterval(async () => {
            try {
                health.internIsConnectionHealthy = false;
                conn.send(JSON.stringify({
                    "type": "ping",
                    "id": ++client_id_kucoin,
                    params: []
                }));
                // Set connection health status to false if pong not received after ping
                setTimeout(() => {
                    if (!health.internIsConnectionHealthy) {
                        health.isConnectionHealthy = false;
                    }
                }, 3000);
                last_ping_id_kucoin = client_id_kucoin;
            } catch (e) {
                if (e.message.includes("not opened")) {
                    console.error("WS-KUCOIN: Connection down for Kucoin");
                    if (conn.OPEN) {
                        conn.close();
                    }
                } else {
                    console.error("WS-KUCOIN: Kucoin WebSocket error:", e);
                }
            }
        }, 15 * 1000);
    } catch (e) {
        console.error("WS-KUCOIN: Error launching WebSocket connection:", e);
    }
}

// Launch WebSocket connection
launch_connection();

module.exports = {
    stream: priceMemoryKucoin,
    unit: "USDT",
    trades: { prices: tradesKucoin, volumes: volumesKucoin, resetTrades: resetTradesKucoin },
    isConnectionHealthy: () => health.isConnectionHealthy,
    usedCoins: Coins
};
