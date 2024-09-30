const express = require("express");
const connectToDb = require("./DB/dbService");
const { handleError } = require("./utils/handleErrors");
const router = require("./router/router");
const { corsMiddleware, socketCorsMiddleware } = require("./middlewares/cors");
const chalk = require("chalk");
const loggerMiddleware = require("./logger/loggerService");
const ioAuth = require("./auth/socketAuthService");
const socketConnection = require("./chat/services/chatConnection");
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const PORT = 8181;
const server = http.createServer(app);


app.use(
    corsMiddleware
);
app.use(express.json());
app.use(loggerMiddleware());

app.use(router);

app.use((err, req, res, next) => {  //error handling
    console.log(err);
    handleError(res, 500, "internal error of the server");
});

server.listen(PORT, () => {
    console.log(chalk.yellow("server is listening to port " + PORT));
    connectToDb();
});

const io = socketIo(server, socketCorsMiddleware);

io.use(ioAuth);

io.on("connection", (socket) => socketConnection(socket, io));
