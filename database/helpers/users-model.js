const db = require("../dbConfig.js");

module.exports = {
  get

};

// =========== getAllProjects
function get() {
  return db("users");
}