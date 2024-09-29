const express = require("express");
const connectToDb = require("./DB/dbService");
const { handleError } = require("./utils/handleErrors");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const chalk = require("chalk");
const loggerMiddleware = require("./logger/loggerService");
const ioAuth = require("./auth/socketAuthService");
const Chat = require("./chat/models/Chat");
const socketConnection = require("./chat/controllers/chatController");
const socketIo = require('socket.io');

const app = express();
const PORT = 8181;

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

const server = app.listen(PORT, () => {
    console.log(chalk.yellow("server is listening to port " + PORT));
    connectToDb();
});

const io = socketIo(server);
io.use(ioAuth);

io.on("connection", socketConnection);

