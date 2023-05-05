import { request } from "@src/tests/helpers";
import { testEnvVars, contactObjTest } from "@src/tests/helpers";
import { IContact } from "@src/types/contacts";

describe("Contacts endpoint", () => {
  const baseUrl = "/api/contacts";
  const user = {
    email: testEnvVars.user,
    password: testEnvVars.password,
  };
  let token: string;
  beforeAll(async () => {
    token = (await request.post("/api/auth/login").send(user)).body.payload;
  });

  it("Made a get to '.../' endpoint should return an array of objects of IContact type", async () => {
    const res = await request
      .get(`${baseUrl}/`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload.length).toBeDefined();
    expect(res.body.payload[1]).toMatchObject<IContact>;
  });
  it("Made a put to '.../:id' update a specific contact object", async () => {
    const res = await request
      .put(`${baseUrl}/${contactObjTest.id}`)
      .set("Authorization", `bearer ${token}`)
      .send({ ...contactObjTest, read: true });

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload).toMatchObject<IContact>;
    expect(res.body.payload).toMatchObject({ ...contactObjTest, read: true });
  });
});
