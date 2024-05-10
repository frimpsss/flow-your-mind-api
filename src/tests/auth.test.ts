import request from "supertest";
import { restrictedNames } from "../auth/auth.utils";
import { generateUsername } from "../utils";
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;
const randomName1 = generateUsername();
const randomName2 = generateUsername();


describe("auth test", () => {
  describe("register tests", () => {
    test("no username and password", async () => {
      const response = await request(BASE_URL).post("/api/register").send();
      expect(response.statusCode).toBe(400);
    });
    test("username and password supplied", async () => {
      const response = await request(BASE_URL).post("/api/register").send({
        username: randomName1,
        password: "frimps@2020T",
      });
      expect(response.statusCode).toBe(201);
    });
    test("strong password not supplied", async () => {
      const response = await request(BASE_URL).post("/api/register").send({
        username: randomName2,
        password: "test",
      });
      expect(response.statusCode).toBe(400);
    });
    test("conflicting usernames", async () => {
      const response = await request(BASE_URL).post("/api/register").send({
        username: randomName1,
        password: "frimps@2020T",
      });

      expect(response.statusCode).toBe(409);
    });
  });

  describe("name validations tests", () => {
    test("restricted name throws validation error", () => {
      restrictedNames.forEach(async (name) => {
        const response = await request(BASE_URL).post("/api/register").send({
          username: name,
          password: "frimps@2020T",
        });
        expect(response.statusCode).toBe(400);
      });
    });

    test("name cannot contain whitespace", async () => {
      const response = await request(BASE_URL)
        .post("/api/register")
        .send({
          username: `${generateUsername()} ${generateUsername()}`,
          password: "frimps@2020T",
        });
      expect(response.statusCode).toBe(400);
    });
    test("name can contain underscore", async () => {
      const response = await request(BASE_URL)
        .post("/api/register")
        .send({
          username: `${generateUsername().slice(
            0,
            10
          )}_${generateUsername().slice(11, 14)}`,
          password: "frimps@2020T",
        });
      expect(response.statusCode).toBe(201);
    });

    test("name cannot caontain any special characters", async () => {
      const response = await request(BASE_URL).post("/api/register").send({
        username: "white space?id=234",
        password: "frimps@2020T",
      });
      expect(response.statusCode).toBe(400);
    });
  });
});
