import "./pre-start";
import { RowDataPacket } from "mysql2";
import envVars from "./envVars";
import server from "./server";
import { DBQuery } from "./DAL/MySQL/config";
import { CustomError } from "./utils/error/customError";
import { HttpCode } from "./utils/error/errorEnums";

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

const SERVER_START_MSG = `Express server started on port: ${envVars.Port.toString()}`;

server.listen(envVars.Port, () => console.log(SERVER_START_MSG));
