// Packages
const bcrypt = require("bcryptjs");
const authRouter = require("express").Router();

// Data
const usersDb = require("../database/helpers/users-model.js");

// for endpoints beginning with /api/auth

// Register
authRouter.post("/register", (req, res) => {
    let user = req.body;
  
    if (!user.username || !user.password) {
      res.status(400).json({
        error: "You must include a username and password to register."
      });
    } else {
      // hash the password
      const hash = bcrypt.hashSync(user.password, 10); // 10 = salt (10 is default)
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
  authRouter.post("/login", (req, res) => {
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

  module.exports = authRouter;
