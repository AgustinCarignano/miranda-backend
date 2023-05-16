import mysql from "mysql2/promise";
import { RowDataPacket, OkPacket } from "mysql2";
import envVars from "../../../src/envVars";
import { CustomError } from "@src/utils/error/customError";
import { HttpCode } from "@src/utils/error/errorEnums";

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

export function testDB() {
  DBQuery<RowDataPacket[]>("SELECT 1 + 1 AS solution")
    .then((rows) => {
      console.log(`The solution is: ${rows[0].solution}`);
    })
    .catch((error) => {
      throw new CustomError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: error.message,
      });
    });
}

export default config;
