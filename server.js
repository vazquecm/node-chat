'use strict'


// wrapping the express server into the native server
const app = require('express')()
// this is the native (raw) node running server -- like express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000

app.get('/', (req,res) => {
  res.send('hello')
})







server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})


