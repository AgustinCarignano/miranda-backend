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
} as const;
