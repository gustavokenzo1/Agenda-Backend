import request from "supertest";
import database from "../config/database";
const app = require("../app");

beforeAll(async () => {
  await database();
});

describe("Server Test", () => {
  it("should return a 200 status code", async () => {
    const response = await request(app).get("/");

    expect(response.body).toHaveProperty("message");
  });
});
