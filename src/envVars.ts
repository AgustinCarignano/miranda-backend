export default {
  Port: process.env.PORT ?? "",
  Dao: process.env.DAO ?? "FileSystem",
  CookieProps: {
    Key: "CookieKey",
    Secret: process.env.COOKIE_SECRET ?? "",
  },
  jwt: {
    Secret: process.env.JWT_SECRET ?? "",
    Exp: process.env.COOKIE_EXP ?? "",
  },
  session: process.env.SESSION_SECRET ?? "",
  test: {
    user: process.env.TEST_USER ?? "",
    password: process.env.TEST_PASS ?? "",
  },
  sql: {
    user: process.env.DB_USER ?? "",
    host: process.env.DB_HOST ?? "",
    name: process.env.DB_NAME ?? "",
    password: process.env.DB_PASSWORD ?? "",
  },
  mongo: {
    uri: process.env.MONGO_URI ?? "",
  },
} as const;
