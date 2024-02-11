import express, { Application } from 'express'
import http from 'http'
import { Server } from 'socket.io'

class App {
  private app: Application
  private http: http.Server
  private io: Server

  constructor() {
    this.app = express()
    this.http = http.createServer(this.app)
    this.io = new Server(this.http)
    this.listenSocket()
    this.setupRoutes()
  }

  listenServer(): void {
    this.http.listen(3000, () => console.log('server running in port 3000'))
  }

  listenSocket(): void {
    this.io.on('connection', (socket) => {
      console.log('user connected', socket.id)

      socket.on('move', () => {})
    })
  }

  setupRoutes() {
    this.app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
    })
  }
}

const app = new App()

app.listenServer()
