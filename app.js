// Include express from node_modules
const express = require('express')
const app = express()
// Define server related variables
const port = 3000
// require express-handlebars here
const exphbs = require('express-handlebars')
// Include method-override
const methodOverride = require('method-override')
// Include body-parser
const bodyParser = require('body-parser')
// Include router
const routes = require('./routes')
// require mongoose
require('./config/mongoose')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// Ask every request use methodOverride
app.use(methodOverride('_method'))
// Direct request to router
app.use(routes)

// Start and listen the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
