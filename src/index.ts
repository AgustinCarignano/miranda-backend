import "./pre-start";
import envVars from "./envVars";
import server from "./server";
import awsServerLessExpress from "aws-serverless-express";

const SERVER_START_MSG = `Express server started on port: ${envVars.Port.toString()}`;
const serverLess = awsServerLessExpress.createServer(server);

exports.handler = (event: any, context: any) => {
  awsServerLessExpress.proxy(serverLess, event, context);
};
export default server;
//server.listen(envVars.Port, () => console.log(SERVER_START_MSG));
