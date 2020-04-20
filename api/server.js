// Packages
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSession = require("connect-session-knex")(session); //currying, saves client info to db instead of memory so can login, stop server, start server, and won't have to login again to access /api/users

// Routers
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

// Session Configuration
const sessionConfig = {
  name: "mango",
  secret: "I like mangoes",
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 5, // 5 minutes
    secure: false
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSession({
    knex: require("../database/dbConfig.js"),
    createtable: true,
    clearInterval: 1000 * 60 * 15, // 15 minutes
  })
};

// Server
const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// Endpoints
server.get("/", (req, res) => {
  // if user is logged in, show username, if not, show new stranger
  const username = req.session.username || "new stranger";
  res.send(`What's up, ${username}?`);
});

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

module.exports = server;
