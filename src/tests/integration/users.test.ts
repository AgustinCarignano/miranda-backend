import { request } from "@src/tests/helpers";
import { testEnvVars, userObjTest, newUserTest } from "@src/tests/helpers";
import { IUser } from "@src/types/users";

describe("Users endpoint", () => {
  const baseUrl = "/api/users";
  const user = {
    email: testEnvVars.user,
    password: testEnvVars.password,
  };
  let token: string;
  beforeAll(async () => {
    token = (await request.post("/api/auth/login").send(user)).body.payload;
  });

  it("Made a get to '.../' endpoint should return an array of objects of IUser type", async () => {
    const res = await request
      .get(`${baseUrl}/`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload.length).toBeDefined();
    expect(res.body.payload[1]).toMatchObject<IUser>;
  });
  it("Made a get to '.../:id' endpoint should return an especific object of IUser type", async () => {
    const res = await request
      .get(`${baseUrl}/${userObjTest.id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload).toMatchObject<IUser>;
    expect(res.body.payload).toMatchObject(userObjTest);
  });
  it("Made a post to '.../' create a new user object", async () => {
    const res = await request
      .post(`${baseUrl}/`)
      .set("Authorization", `bearer ${token}`)
      .send(newUserTest);

    const getRes = await request
      .get(`${baseUrl}/${res.body.payload.id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload).toMatchObject<IUser>;
    expect(getRes.body.payload).toMatchObject<IUser>;
    expect(getRes.body.payload).toMatchObject(newUserTest);
    expect(res.body.payload).toMatchObject(newUserTest);
  });
  it("Made a put to '.../:id' update a specific user object", async () => {
    const res = await request
      .put(`${baseUrl}/${newUserTest.id}`)
      .set("Authorization", `bearer ${token}`)
      .send({ ...newUserTest, fullName: "Matias Olivera" });

    const getRes = await request
      .get(`${baseUrl}/${res.body.payload.id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload).toMatchObject<IUser>;
    expect(getRes.body.payload).toMatchObject<IUser>;
    expect(getRes.body.payload).toMatchObject({
      ...newUserTest,
      fullName: "Matias Olivera",
    });
    expect(res.body.payload).toMatchObject({
      ...newUserTest,
      fullName: "Matias Olivera",
    });
  });
  it("Made a delete to '.../:id' remove a specific user object", async () => {
    const res = await request
      .get(`${baseUrl}/${newUserTest.id}`)
      .set("Authorization", `bearer ${token}`);
    const DeleteRes = await request
      .delete(`${baseUrl}/${newUserTest.id}`)
      .set("Authorization", `bearer ${token}`);
    const newRes = await request
      .get(`${baseUrl}/${newUserTest.id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(DeleteRes.statusCode).toEqual(200);
    expect(newRes.statusCode).toEqual(404);
    expect(newRes.body.description).toBe("User not found");
  });
});
