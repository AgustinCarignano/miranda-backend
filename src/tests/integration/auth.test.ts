import { request } from "@src/tests/helpers";

const user = {
  email: "agustinC",
  password: "12345",
};

describe("Private endpoints", () => {
  it("should return a 401 code status and a message if no token is passed in the request", async () => {
    const res = await request.get("/api/bookings/all");

    expect(res.statusCode).toBe(401);
    expect(res.body.description).toBe(
      "Missing or incorrect token. Unauthorized to access to this endpoint"
    );
  });
  it("Should return a json object and a 200 code status when made a get request to the public endpoint without a token", async () => {
    await request.get("/api/public").expect(200).expect("Content-Type", /json/);
  });
  it("Should return a token when a correct credentials is passed, that allows make a successful get request", async () => {
    const res = await request
      .post("/api/auth/login")
      .send(user)
      .expect(200)
      .expect("Content-Type", /json/);

    await request
      .get("/api/bookings/all")
      .set("Authorization", "bearer " + res.body.payload)
      .expect(200);
  });
});
