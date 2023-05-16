import { request } from "@src/tests/helpers";
import {
  user,
  token,
  bookingObjTest,
  newBookingTest,
} from "@src/tests/helpers";
import { IBookings } from "@src/types/bookings";

describe("Bookings endpoint", () => {
  const baseUrl = "/api/bookings";
  //let token: string;
  let newId: string;

  // beforeAll(async () => {
  //   token = (await request.post("/api/auth/login").send(user)).body.payload;
  // });

  it("Made a get to '.../' endpoint should return an array of objects of IBooking type", async () => {
    const res = await request
      .get(`${baseUrl}/`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload.length).toBeDefined();
    expect(res.body.payload[1]).toMatchObject<IBookings>;
  });

  it("Made a get to '.../:id' endpoint should return an especific object of IBooking type", async () => {
    const res = await request
      .get(`${baseUrl}/${bookingObjTest._id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload).toMatchObject<IBookings>;
    expect(res.body.payload).toMatchObject(bookingObjTest);
  });

  it("Made a post to '.../' create a new booking object", async () => {
    const res = await request
      .post(`${baseUrl}/`)
      .set("Authorization", `bearer ${token}`)
      .send(newBookingTest);

    newId = res.body.payload._id;

    const getRes = await request
      .get(`${baseUrl}/${res.body.payload._id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload).toMatchObject<IBookings>;
    expect(getRes.body.payload).toMatchObject<IBookings>;
    expect(getRes.body.payload).toMatchObject(newBookingTest);
    expect(res.body.payload).toMatchObject(newBookingTest);
  });

  it("Made a put to '.../:id' update a specific booking object", async () => {
    const res = await request
      .put(`${baseUrl}/${newId}`)
      .set("Authorization", `bearer ${token}`)
      .send({ ...newBookingTest, guest: "new guest name" });

    const getRes = await request
      .get(`${baseUrl}/${res.body.payload._id}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body.payload).toMatchObject<IBookings>;
    expect(getRes.body.payload).toMatchObject<IBookings>;
    expect(getRes.body.payload).toMatchObject({
      ...newBookingTest,
      guest: "new guest name",
    });
    expect(res.body.payload).toMatchObject({
      ...newBookingTest,
      guest: "new guest name",
    });
  });

  it("Made a delete to '.../:id' remove a specific booking object", async () => {
    const res = await request
      .get(`${baseUrl}/${newId}`)
      .set("Authorization", `bearer ${token}`);
    const DeleteRes = await request
      .delete(`${baseUrl}/${newId}`)
      .set("Authorization", `bearer ${token}`);
    const newRes = await request
      .get(`${baseUrl}/${newId}`)
      .set("Authorization", `bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(DeleteRes.statusCode).toEqual(200);
    expect(newRes.statusCode).toEqual(404);
    expect(newRes.body.description).toBe("Booking not found");
  });
});
