// a little javascript for frontend

/* ify statement, always start with a ';' */
;(function () {
  'use strict'

  const ws = io.connect()

  ws.on('connect', () => {
    console.log('socket connected')
  })

  ws.on('receiveChat', msgs => {
    msgs.forEach(displayChat)
  })

  const form = document.querySelector('form')
  const name = document.querySelector('input[name="name"]')
  const text = document.querySelector ('input[name="text"]')
  const ul = document.querySelector('ul')


// DOM interaction going on
  form.addEventListener('submit', () => {
    const chat = {
      name: name.value,
      text: text.value
    }

    ws.emit('sendChat', chat)
    // displayChat(chat)
    text.value = ''
    event.preventDefault()
  })

  function displayChat (chat) {
    if (!document.querySelector(`[data-id="${chat._id}"]`)) {
      const li = generateLI(chat)

      ul.appendChild(li)
    }
  }

// no DOM interaction going on here
  function generateLI (chat) {
    const li = document.createElement('li')
    const textNode = document.createTextNode(`${chat.name}: ${chat.text}`)
    const dataId = document.createAttribute('data-id')

    dataId.value = chat._ed

    li.setAttributeNode(dataId)
    li.appendChild(textNode)

    return li
  }

// this will generate a new html request happens only once
  function getJSON(url, cb) {
    const request = new XMLHttpRequest()

      request.open('GET', url)

      request.onload = () => {
        cb(JSON.parse(request.responseText))
      }

      request.send()
  }

    // document.addEventListener('DOMContentLoaded', () => {
    //   getJSON('/chats', chats => {
    //     chats.forEach(displayChat)
    //   })
    // })

}());
