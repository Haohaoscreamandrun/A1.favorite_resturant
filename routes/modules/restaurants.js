const express = require('express')
const router = express.Router()
const Favor = require('../../models/favor')


// Handle New page and add, url is same as get details, need to be put in front of get details
router.get('/new',(req,res)=>{
  res.render('new')
})
router.post('/',(req,res)=>{
  const data = req.body
  console.log(data)
  return Favor.create(data)
    .then(()=> res.redirect('/'))
    .catch(err => console.error(err))
})

// Handle show
router.get('/:restaurant_id',(req,res)=>{
  const id = req.params.restaurant_id
  return Favor.findById(id)
    .lean()
    .then((restaurant) => res.render('show', {restaurant: restaurant}))
    .catch(err => console.error(err))
})

// Handle Edit
router.get('/:id/edit',(req,res)=>{
  const id = req.params.id
  return Favor.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(err => console.error(err))
})
router.put('/:id',(req,res)=>{
  const id = req.params.id
  const data = req.body
  return Favor.findByIdAndUpdate(id, data)
    .then(()=> res.redirect(`/restaurants/${id}`))
    .catch(err => console.error(err))
})

// Handel delete
router.delete('/:id',(req,res)=>{
  const id = req.params.id
  return Favor.findById(id)
    .then(restaurant=>restaurant.remove())
    .then(()=> res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router
