const express = require('express')
const ejs = require("ejs")
const app =  express()
const server = require('http').Server(app)
const io =require('socket.io')(server)
const PORT = process.env.PORT || 3000
const { v4: uuid } = require('uuid')


app.set("view engine", "ejs")
app.use(express.static('public'))

app.get("/", (req, res) => {
   res.redirect(`/${uuid()}`)
})
app.get("/:room", (req, res) => {

   res.render('room', {roomId: req.params.room })
})
io.on('connection', socket => {
   socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.broadcast
      .to(roomId)
      .emit(
        "user-connected",
        userId
      );
      soctek.on('disconnect', () => {
         socket.to(roomId).broadcast.emit('user-disconnected', userId)
      })
   })
})

server.listen(PORT, () => {
   console.log("Server is started at 3000")
})