import request from "supertest";
const app = require("../index");

describe("Server Test", () => {
  it("should return a 200 status code", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
