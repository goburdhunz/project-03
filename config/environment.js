const port = process.env.PORT || 4000
const env = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGODB_URI ||`mongodb://localhost:27017/burgerator-db-${env}`
const secret = process.env.SECRET || 'N&nd05_15_TH3+I3e5t'


module.exports = { port, env, dbURI, secret}
