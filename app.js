require('dotenv').config({ path: '.env' })
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { urlencoded } = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
// const __dirname = path.resolve(path.dirname(decodeURI(new URL(import.meta.url).pathname)))

app.enable('trust proxy')
app.use(urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '/')))

require('./src/routes')(app, io)
server.listen(process.env.PORT, () => console.log('Server Started on port:' + process.env.PORT))

module.exports = (server, io)
