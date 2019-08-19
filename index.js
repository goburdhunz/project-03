const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {port, dbURI} = require('./config/environment')
const router = require('./config/routes')
const queryHandler = require('./lib/queryHandler')
const errorHandler = require('./lib/errorHandler')



const app = express()

mongoose.connect(dbURI, { useNewUrlParser: true })

app.use(express.static(`${__dirname}/dist`)) //look for static files in the 'dist' folder, static files are files like index.html, images, fonts...

app.use(bodyParser.json())

app.use(queryHandler)

app.use('/api',router)

app.use(errorHandler)


app.listen(port, () => console.log('Change made on port 4000'))

module.exports = app
