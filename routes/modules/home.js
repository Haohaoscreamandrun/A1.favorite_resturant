const express = require('express')
const router = express.Router()
const Favor = require('../../models/favor')

// Home page route
router.get('/', (req, res) => {
    Favor.find() //get all data from Favor model
    .lean()
    .then(restaurant => res.render('index',{restaurant}))
    .catch(err => console.error(err))
})

// export
module.exports = router