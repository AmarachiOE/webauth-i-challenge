const usersRouter = require("express").Router();
const usersDb = require("../database/helpers/users-model.js");

// ======== GET ALL USERS
usersRouter.get("/", (req, res) => {
  usersDb
    .get()
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
