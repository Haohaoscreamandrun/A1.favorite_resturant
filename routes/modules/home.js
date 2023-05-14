const express = require('express')
const router = express.Router()
const Favor = require('../../models/favor')


// Home page route
router.get('/', (req, res) => {
  const sortChoose = req.query.sort
  const sortMethod = {}

  switch (sortChoose) {
    case 'asc': 
      sortMethod.name_en = 'asc';
      break;
    case 'dec':
      sortMethod.name_en = 'desc';
      break;
    case 'category':
      sortMethod.category = 'asc';
      break;
    case 'location':
      sortMethod.location = 'asc';
      break;
  }


  Favor.find() // get all data from Favor model
    .lean()
    .sort(sortMethod)
    .then(restaurant => res.render('index', { restaurant }))
    .catch(err => console.error(err))
})

// export
module.exports = router
