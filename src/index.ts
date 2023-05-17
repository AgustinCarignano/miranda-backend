import "./pre-start";
import envVars from "./envVars";
import server from "./server";
//import "@src/DAL/Mongo/config";

const SERVER_START_MSG = `Express server started on port: ${envVars.Port.toString()}`;

server.listen(envVars.Port, () => console.log(SERVER_START_MSG));
