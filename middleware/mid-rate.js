const rateLimit = require('express-rate-limit')

const result = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: "Too many requests from this IP, please try again later.",
    statusCode: 429
})

module.exports = {
    result
}