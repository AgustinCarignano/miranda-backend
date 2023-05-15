import mysql from "mysql2/promise";
import { RowDataPacket, OkPacket } from "mysql2";
import envVars from "../../../src/envVars";

const config = {
  db: {
    host: envVars.sql.host,
    user: envVars.sql.user,
    password: envVars.sql.password,
    database: envVars.sql.name,
  },
};

export async function DBQuery<T extends RowDataPacket[] | OkPacket>(
  query: string,
  params?: (string | number)[]
): Promise<T> {
  const connection = await mysql.createConnection(config.db);
  const [resp] = await connection.execute<T>(query, params);
  await connection.end();
  return resp;
}

export default config;
