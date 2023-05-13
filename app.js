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
const Favor = require('./models/favor.js')

// Handle request and response here
app.get('/', (req, res) => {
    Favor.find() //get all data from Favor model
    .lean()
    .then(restaurant => res.render('index',{restaurant}))
    .catch(err => console.error(err))
})

// Handle show
app.get('/restaurants/:restaurant_id',(req,res)=>{
  const id = req.params.restaurant_id
  return Favor.findById(id)
    .lean()
    .then((restaurant) => res.render('show', {restaurant: restaurant}))
    .catch(err => console.error(err))
})

// Handel searching
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  const restaurant = restaurantList.results.filter(function(r){
    return r.name.toLowerCase().includes(keyword) || r.name_en.toLowerCase().includes(keyword) || r.category.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurant: restaurant, keyword: keyword})
})

// Handle Adding Restaurant
app.get("/restaurants/new",(req,res)=>{

})

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})