const db = require('../../config/mongoose')
const Favor = require('../favor')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const restaurantList = require('./restaurant.json').results

db.once('open', () => {
  Favor.create(restaurantList)
    .then(() => {
      console.log('Seed done!')
      db.close()
    })
    .catch(error => console.error(error))
})
