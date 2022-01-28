const redis = require('redis');

const client = redis.createClient();

// since v4 of node-redis, all functions are promise-based
// therefore no need for promisify in the Node util module 
(async () => {
    await client.connect();
})();


const PEREMPTION = 60 * 60; // 1 hour in seconds

const cache = {
    /**
     * 
     * @param {Array<Post>} posts 
     */
    setPosts: async (posts, time = PEREMPTION) => {
        const postsString = JSON.stringify(posts);

        // time-based invalidation
        // Raw Redis command name: SETEX
        // to expose the equivalent client method, use a camel-cased version of the command
     await client.setEx('oblog:posts', time, postsString);
    },

    postsExist: async () => await client.exists('oblog:posts'),

    getPosts: async () => {
        const result = await client.get('oblog:posts');
        return JSON.parse(result);
    },

    delPosts: async () => await client.del('oblog:posts')
};

module.exports = cache;