const mongoose = require('mongoose');

const collectedDataSchema = new mongoose.Schema({
    exchange: String,
    price: String,
    epochId: Number,
    collectionTime: Number,
    priceValue: Number,
    unit: String
});

const CollectedData = mongoose.model('CollectedData', collectedDataSchema);

module.exports = CollectedData;
