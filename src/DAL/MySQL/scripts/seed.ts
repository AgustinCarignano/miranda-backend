import process from "process";
import "../../../pre-start";
// import { DBQuery } from "../config";
// import { IRoomSQL } from "../../../../src/types/rooms";
import { populateBookings } from "./generateBookings";
import { populateRooms } from "./generateRooms";
import { populateUsers } from "./generateUsers";
import { populateContacts } from "./generateContacts";

async function main() {
  await populateRooms(20);
  //const rooms = await DBQuery<IRoomSQL[]>("SELECT * FROM rooms");
  await populateBookings(30);
  await populateUsers(19);
  await populateContacts(30);
}

main()
  .then(() => {
    console.log("Done!");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    process.exit();
  });
