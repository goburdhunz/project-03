const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {dbURI} = require('./config/environment')
const router = require('./config/routes')
const queryHandler = require('./lib/queryHandler')
const errorHandler = require('./lib/errorHandler')



const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true })


app.use(bodyParser.json())

app.user(queryHandler)

app.use('/api',router)

app.user(errorHandler)


app.listen(4000, () => console.log('Change made on port 4000'))

module.exports = app
