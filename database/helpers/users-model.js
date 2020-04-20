const db = require("../dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};
// =========== FIND ALL USERS
function find() {
  return db("users");
}

// =========== FIND BY (for login)
function findBy(username) {
  return db("users").where(username);
}

// =========== FIND BY ID
function findById(id) {
  return db("users")
    .where({ id: Number(id) })
    .first();
}

// =========== ADD USERS (register)
async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}
