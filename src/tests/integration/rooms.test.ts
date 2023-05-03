import { request } from "@src/tests/helpers";
import { testEnvVars, roomObjTest, newRoomTest } from "@src/tests/helpers";
import { IRoom } from "@src/types/rooms";

describe("Rooms endpoint", () => {
  const baseUrl = "/api/rooms";
  const user = {
    email: testEnvVars.user,
    password: testEnvVars.password,
  };
  let token: string;
  beforeAll(async () => {
    token = (await request.post("/api/auth/login").send(user)).body.payload;
  });

  it("Made a get to '.../all' endpoint should return an array of objects of IRoom type", async () => {
    const res = await request
      .get(`${baseUrl}/all`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload.length).toBeDefined();
    expect(res.body.payload[1]).toMatchObject<IRoom>;
  });
  it("Made a get to '.../:id' endpoint should return an especific object of IRoom type", async () => {
    const res = await request
      .get(`${baseUrl}/${roomObjTest.id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload).toMatchObject<IRoom>;
    expect(res.body.payload).toMatchObject(roomObjTest);
  });
  it("Made a post to '.../add' create a new room object", async () => {
    const res = await request
      .post(`${baseUrl}/add`)
      .set("Authorization", `bearer ${token}`)
      .send(newRoomTest);

    const getRes = await request
      .get(`${baseUrl}/${res.body.payload.id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload).toMatchObject<IRoom>;
    expect(getRes.body.payload).toMatchObject<IRoom>;
    expect(getRes.body.payload).toMatchObject(newRoomTest);
    expect(res.body.payload).toMatchObject(newRoomTest);
  });
  it("Made a put to '.../:id' update a specific room object", async () => {
    const res = await request
      .put(`${baseUrl}/${newRoomTest.id}`)
      .set("Authorization", `bearer ${token}`)
      .send({ ...newRoomTest, roomNumber: 12345 });

    const getRes = await request
      .get(`${baseUrl}/${res.body.payload.id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload).toMatchObject<IRoom>;
    expect(getRes.body.payload).toMatchObject<IRoom>;
    expect(getRes.body.payload).toMatchObject({
      ...newRoomTest,
      roomNumber: 12345,
    });
    expect(res.body.payload).toMatchObject({
      ...newRoomTest,
      roomNumber: 12345,
    });
  });
  it("Made a delete to '.../:id' remove a specific room object", async () => {
    const res = await request
      .get(`${baseUrl}/${newRoomTest.id}`)
      .set("Authorization", `bearer ${token}`);
    const DeleteRes = await request
      .delete(`${baseUrl}/${newRoomTest.id}`)
      .set("Authorization", `bearer ${token}`);
    const newRes = await request
      .get(`${baseUrl}/${newRoomTest.id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(DeleteRes.statusCode).toEqual(200);
    expect(newRes.statusCode).toEqual(404);
    expect(newRes.body.description).toBe("Room not found");
  });
});
