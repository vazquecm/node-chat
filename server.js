'use strict'


const express = require('express')
// wrapping the express server into the native server
const app = require('express')()
// this is the native (raw) node running server -- like express()
const server = require('http').createServer(app)
const ws = require('socket.io')(server)

const PORT = process.env.PORT || 3000

// jade compiler
app.set('view engine', 'jade')
// able to use express in public folder
app.use(express.static('public'))

app.get('/', (req,res) => {
  res.render('index')
})

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

// back end -- this is connecting the client to the server
ws.on('connection', socket => {
  console.log('socket connection')

  socket.on('sendChat', (msg) => {
    console.log(msg)
    ws.broadcast.emit('receiveChat', msg)
  })
})
