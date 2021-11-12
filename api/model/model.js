const db = require("../../data/dbConfig");

async function register(user) {
  const [id] = await db("users").insert(user);
  return db("users").where("id", id);
}

function findBy(filter) {
  return db("users").where(filter).first();
}

module.exports = {
  register,
  findBy,
};
