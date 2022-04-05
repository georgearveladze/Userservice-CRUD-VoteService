require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./src/routes/user-router')

app.use(express.json())

mongoose.connect(process.env.MONGO_URL, () => console.log('DataBase connected'))

app.listen(process.env.PORT || 3000)

app.use(route)
