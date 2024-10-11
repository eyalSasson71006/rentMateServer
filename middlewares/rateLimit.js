const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, 
    max: 2000, 
    message: "Too many requests, please try again after 24 hours.",
    headers: true,
});

module.exports = limiter