/**
 * Attempts to get current time stamp
 * @async
 */
async function getCurrentTimeStamp() {
    currentTimeStamp = await Math.floor(new Date().getTime() / 1000)
    return currentTimeStamp
}

/**
 * Exports the getCurrentTimeStamp function.
 * @exports {Function} getCurrentTimeStamp
 */
module.exports = {
    getCurrentTimeStamp
};
