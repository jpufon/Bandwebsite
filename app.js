const express = require('express');
let app = express()
app.use(express.static('public'))//static assets go here

app.set('view engine', 'ejs') //ejs engine templates


// setup a routes folder 
//index.js 
//albums.js 

app.use(require('./routes/index'))
app.use(require('./routes/albums'))
app.use(require('./routes/feedback'))
app.use(require('./routes/chat'))


const server = app.listen(3000,()=>{
    console.log(`listening to {3000}`)
})

let io = require('socket.io')(server) 
//emmit event 
let socketsConected = new Set()



io.on('connection',onConnected)

function onConnected(socket){
    console.log( socket.id)
    socketsConected.add(socket.id) //adding this unique ID to the set of connected id 
    io.emit('clients-total', socketsConected.size)//we are emmiting the socket size to the client side from server 

    socket.on('disconnect', () => {
        console.log('Socket disconnected', socket.id)
        socketsConected.delete(socket.id)
        io.emit('clients-total', socketsConected.size)
      })

      
  socket.on('message', (data) => {
    // console.log(data)
    socket.broadcast.emit('chat-message', data)// broadcasting this m
  })

  socket.on('feedback', (data) => {
    socket.broadcast.emit('feedback', data)
  })
}