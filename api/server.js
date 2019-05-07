// Packages
const express = require("express");
const helmet = require("helmet");
const session = require("express-session");

// Routers
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

// Data
const usersDb = require("../database/helpers/users-model.js");

// Server
const server = express();
server.use(helmet());
server.use(express.json());

// ========= Endpoints
server.get("/", (req, res) => {
  res.send("Welcome to Web Authorization I Challenge!");
});

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

module.exports = server;
