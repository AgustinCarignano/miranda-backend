import { populateBookings } from "./generateBookings";
import { populateRooms } from "./generateRooms";
import { populateUsers } from "./generateUsers";
import { populateContacts } from "./generateContacts";

async function main() {
  await populateBookings(10);
  await populateRooms(10);
  await populateUsers(10);
  await populateContacts(10);
}

main();
