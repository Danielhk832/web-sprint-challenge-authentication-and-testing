const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../api/server");
const User = require("./model/model");

const user1 = {
  id: 1,
  username: "daniel",
  password: "1234",
};
const user2 = {
  id: 2,
  username: "kish",
  password: "4321",
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBe(true);
});

describe("[POST] Register", () => {
  test("Register a new User", async () => {
    await request(server).post("/api/auth/register").send(user1);
    const user = await db("users").where("username", "daniel").first();
    expect(user).toMatchObject({ username: "daniel" });
  });
  test("Register responds with 'username taken'", async () => {
    await request(server).post("/api/auth/register").send(user1);
    const response = await request(server)
      .post("/api/auth/register")
      .send(user1);
    expect(response.body.message).toMatch("username taken");
  });
});

describe("[POST] Login", () => {
  test("Login responds with the correct message", async () => {
    await request(server).post("/api/auth/register").send(user1);
    const res = await request(server).post("/api/auth/login").send(user1);
    expect(res.body.message).toMatch("welcome, daniel");
  });
  test("Login responds with proper message on Invalid Credentials", async () => {
    await request(server).post("/api/auth/register").send(user2);
    const res = await request(server).post("/api/auth/login").send(user1);
    expect(res.body.message).toMatch("invalid credentials");
  });
});
