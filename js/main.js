/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// const Player = require('./player.js')
import Player from './player.js'
import controls from './controls.js'

const socket = io()
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const writeToCanvas = msg => {
  ctx.fillStyle = 'white'
  ctx.font = '20px'
  ctx.fillText(msg, 30, 30)
}
let players = []
socket.on('init', ({ id, plyrs }) => {
  // writeToCanvas('Connected')
  const player = new Player({ id })
  controls(player, socket)

  socket.emit('new-player', player)
  socket.on('new-player', obj => players.push(new Player(obj)))
  socket.on('move-player', ({ id, dir }) => players.find(v => v.id === id).move(dir))
  socket.on('stop-player', ({ id, dir }) => players.find(v => v.id === id).stop(dir))

  players = plyrs.map(v => new Player(v)).concat(player)

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    players.forEach(v => v.draw(ctx))

    requestAnimationFrame(draw)
  }
  draw()
})
