module.exports = {
    isProduction: false || process.env.isProduction,
    mongoDbUrl: 'mongodb://localhost/project4-express-oauth2-server' || process.env.mongoDbUrl,
    salt: '3612f618ad911e96eaf83046896b85af' || process.env.salt
}