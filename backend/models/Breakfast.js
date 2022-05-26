const mongoose = require('mongoose')

const breakfastSchema = new mongoose.Schema({
  name: String,
  image: String,
  calories: Number,
  hadThisWeek: Boolean,
  vegetarian: Boolean,
  good: Boolean
})

module.exports = mongoose.model('Breakfast', breakfastSchema)
