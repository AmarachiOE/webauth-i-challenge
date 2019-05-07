// Middleware

// don't need to import bcrypt and usersDb since using sessions

function protected(req, res, next) {
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ message: "Please login to access resources" });
  }
}

module.exports = protected;
