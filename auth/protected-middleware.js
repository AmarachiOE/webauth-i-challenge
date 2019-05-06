// Middleware
// import data and bcrypt

const bcrypt = require("bcryptjs");
const UsersDb = require("../database/helpers/users-model.js");

function protected(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    // from Login endpoint
    UsersDb.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res
            .status(401)
            .json({ message: "Invalid credentials. Access denied." });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: "Something went wrong. Unable to validate your credentials."
        });
      });
  } else {
    res.status(401).json({ error: "Invalid credentials. Access denied." });
  }
}

module.exports = protected;
