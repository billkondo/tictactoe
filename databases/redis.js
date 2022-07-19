const { createClient } = require('redis');


const URL = 'redis://@localhost:6379';


const redis = createClient({ url: URL });


module.exports = redis;
