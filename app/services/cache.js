const redis = require('redis');

const client = redis.createClient();

// since v4 of node-redis, all functions are promise-based
// therefore no need for promisify in the Node util module 
(async () => {
    await client.connect();
})();

const PREFIX = 'oblog:';
const PEREMPTION = 60 * 10; // 30 minutes

const keysIndex = [];

// We add a flush middleware to empty the cache (we will apply it ont POST route for posts)
// We turn the cache object into a middleware to reuse it as needed on different routes in the router, with the possibility to use a custom expiration time or the time by default

const flush = async (req, res, next) => {
    // emptying everything in cache

    for (const key of keysIndex) {
        await client.del(key);
    }
    keysIndex.length = 0;

    // calling the next middleware function
    next();
};

const cache = (duration = PEREMPTION) => async (req, res, next) => {
    const urlKey = PREFIX + req.url;

    // step 0 : check if the data is present in the cache
    // with EXISTS oblog:/v1/posts/24
    if (await client.exists(urlKey)) {
        // we fetch data in the cache
        const cachedValue = await client.get(urlKey);

        // the cachedValue is a JSON string, not a JS object
        const value = JSON.parse(cachedValue);
        res.json(value);
    } else {
        // we add data to the cache
        // to do so, we need the data
        // to have the data, we would need for the controller midleware to have been already called

        // the solution would be to use a method that is sytematically used in all controllers and to which we systematically pass the data which we return
        // the res.json() method

        // we put aside the original res.json method
        const originalResDotJson = res.json.bind(res);

        res.json = async (responseData) => {
            const jsonData = JSON.stringify(responseData);

            await client.setEx(urlKey, duration, jsonData);

            // after caching, we save the key
            keysIndex.push(urlKey);

            originalResDotJson(responseData);
        };

        next();
    }
};

module.exports = { flush, cache };