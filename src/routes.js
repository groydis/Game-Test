const path = require('path')
const players = []

module.exports = (server, io) => {
  server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
  })
  // Socket.io
  io.on('connection', async (socket) => {
    console.log(socket.id)

    socket.emit('init', { id: socket.id, plyrs: players })

    socket.on('new-player', (obj) => {
      players.push(obj)
      socket.broadcast.emit('new-player', obj)
    })
    socket.on('move-player', (dir) => {
      socket.broadcast.emit('move-player', { id: socket.id, dir })
    })
    socket.on('stop-player', (dir) => {
      socket.broadcast.emit('stop-player', { id: socket.id, dir })
    })
  })
}
