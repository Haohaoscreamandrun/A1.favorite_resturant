const express = require('express')
const router = express.Router()
//  Direct routes 
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
router.use('/', home)
router.use('/restaurants',restaurants)
router.use('/search', search)
//  Export router
module.exports = router