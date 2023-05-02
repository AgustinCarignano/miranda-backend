import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    message: "Public route to Miranda Hotel API",
    "Available endpoints": {
      Auth: {
        baseURL: "/api/auth",
        Methods: {
          Login:
            "POST ---> /login ---> returns an authorization token to get accesss to the rest of endpoints",
        },
      },
      Bookings: {
        baseURL: "/api/bookings",
        Methods: {
          GetAll: "GET ---> /all ---> returns all bookings",
          GetOne: "GET ---> /:id ---> returns one booking",
          AddOne: "POST ---> /add ---> create a new booking",
          UpdateOne: "PUT ---> /:id ---> update one booking",
          DelteOne: "DELETE ---> /:id ---> delete one booking",
        },
      },
      Rooms: {
        baseURL: "/api/rooms",
        Methods: {
          GetAll: "GET ---> /all ---> returns all rooms",
          GetOne: "GET ---> /:id ---> returns one room",
          AddOne: "POST ---> /add ---> create a new room",
          UpdateOne: "PUT ---> /:id ---> update one room",
          DelteOne: "DELETE ---> /:id ---> delete one room",
        },
      },
      Users: {
        baseURL: "/api/users",
        Methods: {
          GetAll: "GET ---> /all ---> returns all users",
          GetOne: "GET ---> /:id ---> returns one user",
          AddOne: "POST ---> /add ---> create a new user",
          UpdateOne: "PUT ---> /:id ---> update one user",
          DelteOne: "DELETE ---> /:id ---> delete one user",
        },
      },
      Contact: {
        baseURL: "/api/contacts",
        Methods: {
          GetAll: "GET ---> /all ---> returns all contacts",
          UpdateOne: "PUT ---> /:id ---> update one contact",
        },
      },
    },
  });
});
export default router;
