import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import BoardMap from "./model/BoardMap";
import Coordinates from "./model/Coordinates";

const boardMap = new BoardMap();

class App {
  private app: Application;
  private http: http.Server;
  private io: Server;

  constructor() {
    this.app = express();
    this.http = http.createServer(this.app);
    this.io = new Server(this.http);
    this.listenSocket();
    this.setupRoutes();
  }

  listenServer(): void {
    this.http.listen(3000, () => console.log("server running in port 3000"));
  }

  listenSocket(): void {
    this.io.on("connection", (socket) => {
      console.log("user connected", socket.id);

      socket.on("map", () => {
        const state = boardMap.currentMap;

        socket.emit("map", state);
      });

      socket.on("username", (arg: { username: string }) => {
        const { username } = arg;

        socket.data.username = username;

        socket.emit("created", { username });
      });

      socket.on(
        "shoot",
        (args: { username: string; position: Coordinates }) => {
          const { username, position } = args;

          boardMap.shoot(username, position);

          const state = boardMap.currentMap;

          socket.emit("map", state);
        }
      );
    });
  }

  setupRoutes() {
    this.app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });
    this.app.get("/login", (req, res) => {
      res.sendFile(__dirname + "/login.html");
    });
  }
}

const app = new App();

app.listenServer();
