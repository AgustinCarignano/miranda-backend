import mysql from "mysql2/promise";
import { RowDataPacket, OkPacket } from "mysql2";
import envVars from "@src/envVars";

const config = {
  db: {
    host: "localhost",
    user: "root",
    password: "Graferun.1991",
    database: "mirandahoteldb",
  },
};

export async function DBQuery<T extends RowDataPacket[] | OkPacket>(
  query: string,
  params?: (string | number)[]
): Promise<T> {
  const connection = await mysql.createConnection(config.db);
  const [resp] = await connection.execute<T>(query, params);
  return resp;
}

export default config;

// host: envVars.sql.host,
// user: envVars.sql.user,
// password: envVars.sql.password,
// database: envVars.sql.name,

// host: "localhost",
// user: "root",
// password: "Graferun.1991",
// database: "mirandahoteldb",
