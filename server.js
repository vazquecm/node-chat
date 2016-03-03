'use strict'


const express = require('express')
// wrapping the express server into the native server
const app = require('express')()
const pg = require('pg').native
// this is the native (raw) node running server -- like express()
const server = require('http').createServer(app)
const ws = require('socket.io')(server)

const PORT = process.env.PORT || 3000

const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://localhost:5432/nodechat'
const db = new pg.Client(POSTGRES_URL)

// jade compiler
app.set('view engine', 'jade')
// able to use express in public folder
app.use(express.static('public'))

app.get('/', (req,res) => {
  res.render('index')
})


app.get('/chats', (req, res) => {
  db.query('SELECT * FROM chats', (err, result) => {
    if (err) throw err

    res.send(result.rows)
  })
})


db.connect((err) => {
  if (err) throw err

  server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
  })
})

// back end -- this is connecting the client to the server
ws.on('connection', socket => {
  console.log('socket connected')

  socket.on('sendChat', (msg) => {
    console.log(msg)
    ws.broadcast.emit('receiveChat', msg)
  })
})
