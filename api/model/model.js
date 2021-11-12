const db = require("../../data/dbConfig");

async function register(user) {
  const [id] = await db("users").insert(user);
  return db("users").where("id", id).first();
}

function findBy(username) {
  return db("users").where("username", username).first();
}

module.exports = {
  register,
  findBy,
};
