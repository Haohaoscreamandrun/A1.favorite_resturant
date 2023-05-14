const express = require('express')
const router = express.Router()
const Favor = require('../../models/favor')


router.get('/', (req, res) => {
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

module.exports = router
