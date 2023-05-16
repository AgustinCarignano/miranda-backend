import envVars from "../../envVars";
import mongoose from "mongoose";

mongoose
  .connect(envVars.mongo.uri)
  .then(() => console.log("Connected to Mongo database"))
  .catch((error) => console.log(error));
