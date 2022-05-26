const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Listening...')
})


mongoose.connect('mongodb://localhost:27017/breakfast')
mongoose.connection.once('open', () => {
  console.log('Connected to Mongo...')
})
