require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 8000
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require("mongodb")
const handleGigs = require('./modules/handleGigs')
const handleGiggersAssigned = require('./modules/handleGiggersAssigned')
const handleGiggers = require('./modules/handleGiggers')
const handleGigger = require('./modules/handleGigger')

// Database config
const connectionUrl = process.env.DATABASE
const dbClient = new MongoClient(connectionUrl)
const databaseName = "gigchain"
const db = dbClient.db(databaseName)
dbClient.connect()
console.log('Database Connected successfully to server')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:5173'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.get('/', (req, res) => res.send('Server is Up!'))
app.get('/api/v1/gigs', (req, res) => handleGigs(req, res, db))
app.get('/api/v1/gigs/:id', (req, res) => handleGiggersAssigned(req, res, db))
app.get('/api/v1/giggers', (req, res) => handleGiggers(req, res, db))

app.post('/api/v1/gigger', (req, res) => handleGigger(req, res, db))


app.listen(port, () => console.log(`App is listening on port: ${port}`))

module.exports = app