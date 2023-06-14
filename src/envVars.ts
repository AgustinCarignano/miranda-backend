export default {
  Port: process.env.PORT ?? "",
  CookieProps: {
    Key: "CookieKey",
    Secret: process.env.COOKIE_SECRET ?? "",
  },
  jwt: {
    Secret: process.env.JWT_SECRET ?? "",
    Exp: process.env.COOKIE_EXP ?? "",
  },
  session: process.env.SESSION_SECRET ?? "",
  origin: process.env.ALLOW_ORIGIN ?? "",
  test: {
    user: process.env.TEST_USER ?? "",
    password: process.env.TEST_PASS ?? "",
  },
  mongo: {
    uri: process.env.MONGO_URI ?? "",
  },
} as const;
