const env = process.env.NODE_ENV || 'development'
const dbURI = `mongodb://localhost:27017/burgerator-db-${env}`
const secret = 'N&nd05_15_TH3+I3e5t'

module.exports = { dbURI, secret }
