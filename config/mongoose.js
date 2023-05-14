// include mongoose, connect to database under recommend method
const mongoose = require('mongoose')
// include dotenv only in informal environment
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
} 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// access connection
const db = mongoose.connection
  // deviate
  db.on('error',()=>{
    console.log('mongodb error!')
  })
  // success
  db.once('open',()=>{
    console.log('mongodb connected!')
  })

module.exports = db