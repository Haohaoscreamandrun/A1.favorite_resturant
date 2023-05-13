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

// 引用 body-parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

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

// Handel searching
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  if(!keyword){
    return res.redirect('/')
  }
  
  return Favor.find()
    .lean()
    .then((restaurant) => {
      
      const filterRestaurantData = restaurant.filter((data) => {
          return data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
        })
      res.render('index',{restaurant: filterRestaurantData, keyword})
    })
    .catch(err => console.error(err))
})

// Handle New page and add, url is same as get details, need to be put in front of get details
app.get('/restaurants/new',(req,res)=>{
  res.render('new')
})
app.post('/restaurants',(req,res)=>{
  const data = req.body
  console.log(data)
  return Favor.create(data)
    .then(()=> res.redirect('/'))
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

// Handle Edit
app.get('/restaurants/:id/edit',(req,res)=>{
  const id = req.params.id
  return Favor.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.error(err))
})
app.post('/restaurants/:id',(req,res)=>{
  const id = req.params.id
  const data = req.body
  console.log(id,data)
  return Favor.findByIdAndUpdate(id, data)
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(err => console.error(err))
})

// Handel delete
app.post('/restaurants/:id/delete',(req,res)=>{
  const id = req.params.id
  return Favor.findById(id)
    .then(restaurant=>restaurant.remove())
    .then(()=> res.redirect('/'))
    .catch(err => console.error(err))
})

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})