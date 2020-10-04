export default (player, socket) => {
  document.onkeydown = e => {
    let dir
    if (e.key === 'd') {
      dir = 'right'
    }
    if (e.key === 's') {
      dir = 'down'
    }
    if (e.key === 'a') {
      dir = 'left'
    }
    if (e.key === 'w') {
      dir = 'up'
    }
    player.move(dir)
    socket.emit('move-player', dir)
  }
  document.onkeyup = e => {
    let dir
    if (e.key === 'd') {
      dir = 'right'
    }
    if (e.key === 's') {
      dir = 'down'
    }
    if (e.key === 'a') {
      dir = 'left'
    }
    if (e.key === 'w') {
      dir = 'up'
    }
    player.move(dir)
    socket.emit('stop-player', dir)
  }
}
