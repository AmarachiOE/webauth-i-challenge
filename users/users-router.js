const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const usersDb = require("../database/helpers/users-model.js");
const protected = require("../auth/protected-middleware.js");

// for endpoints beginning with /api/users


// ======== GET ALL USERS
usersRouter.get("/", protected, (req, res) => {
  //res.send("One moment!")
  usersDb
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

module.exports = usersRouter;
