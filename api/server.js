// Packages
const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");

// Routers
const usersRouter = require("../routers/users-router");

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

// Register
server.post("/api/register", (req, res) => {
  let user = req.body;

  if (!user.username || !user.password) {
    res.status(400).json({
      error: "You must include a username and password to register."
    });
  } else {
    // hash the password
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    usersDb
      .add(user)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error registering this user to the database."
        });
      });
  }
});

// Login
server.post("/api/login", (req, res) => {
  let { username, password } = req.body;

  usersDb
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ error: "Please provide valid credentials." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error logging in user." });
    });
});

server.use("/api/users", usersRouter);

module.exports = server;
