'use strict'


// wrapping the express server into the native server
const app = require('express')()
// this is the native (raw) node running server -- like express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000

// jade compiler
app.set('view engine', 'jade')



app.get('/', (req,res) => {
  res.render('index')
})







server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})


