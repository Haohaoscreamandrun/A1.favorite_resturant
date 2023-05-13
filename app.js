// Include express from node_modules
const express = require('express')
const app = express()
// Define server related variables
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// include dotenv only in informal environment
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
} 

// include mongoose, connect to database under recommend method
const mongoose = require('mongoose')
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

// setting static files 
app.use(express.static('public'))
// require database
const restaurantList = require('./restaurant.json')

// Handle request and response here
app.get('/', (req, res) => {
    res.render('index',{restaurant: restaurantList.results})
})

// Handle show
app.get('/restaurants/:restaurant_id',(req,res)=>{
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  
  res.render('show', {restaurant: restaurant})
})

// Handel searching
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  const restaurant = restaurantList.results.filter(function(r){
    return r.name.toLowerCase().includes(keyword) || r.name_en.toLowerCase().includes(keyword) || r.category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurant: restaurant, keyword: keyword})
})

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})