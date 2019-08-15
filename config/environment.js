const env = process.env.NODE_ENV || 'development'
const dbURI = `mongodb://localhost:27017/burgerator-db-${env}`

module.exports = { dbURI }
