const mongoose = require('mongoose')
const Schema = mongoose.Schema
const favorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: String,
  category: {
    type: String,
    required: true
  },
  image: String,
  location: {
    type: String,
    required: true
  },
  phone: String,
  google_map: String,
  rating: {
    type: Number,
    required: true
  },
  description: String
})
module.exports = mongoose.model('Favor', favorSchema)
