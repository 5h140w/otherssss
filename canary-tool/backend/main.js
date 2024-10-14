const dotenv = require('dotenv');
const dataLoaders = require('./middlewares/dataLoaders.middleware');
const { getEpochData } = require('./services/blockchainServices');
const { getCurrentTimeStamp } = require('./services/timeServices');

// Load environment variables synchronously
dotenv.config();

// Get exchanges from environment variables
const exchanges = process.env.EXCHANGES.split(',');

/**
 * Fetches current time stamp and epoch data concurrently.
 * @returns {Promise<{currentTimeStamp: number, epochData: Array}>}
 */
const fetchData = async () => {
    try {
        const [currentTimeStamp, epochData] = await Promise.all([
            getCurrentTimeStamp(),
            getEpochData()
        ]);

        return { currentTimeStamp, epochData };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

/**
 * Starts the data collection process.
 */
const startDataCollection = async () => {
    try {
        const { currentTimeStamp, epochData } = await fetchData();
        const [epochId, epochSubmitEndTime] = epochData;

        const submitVia = epochSubmitEndTime - currentTimeStamp;
        const collectedData = await dataLoaders.fetchPricesWS(submitVia, epochId, exchanges);


        // Save the collected data to the database
        // await CollectedData.insertMany(collectedData);

        // Handle the collected data
        console.log('Collected Data:', collectedData);

    } catch (error) {
        console.error('An error occurred during the data collection process:', error);
    }
};

// Attempt to fetch data every 1 second
setInterval(startDataCollection, 1000);
