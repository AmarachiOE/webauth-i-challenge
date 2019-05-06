// Packages
const express = require("express");
const helmet = require("helmet");

// Routers
const usersRouter = require("../routers/users-router");

// Server
const server = express();
server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("Welcome to Web Authorization I Challenge!");
});

server.use("/api/users", usersRouter);

module.exports = server;
