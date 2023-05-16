import process from "process";
import "../../pre-start";
import "./config";
import { seedBookings } from "./seeders/bookings.seed";
import { seedRooms } from "./seeders/rooms.seed";
import { seedUsers } from "./seeders/users.seed";
import { seedContacts } from "./seeders/contacts.seed";

async function main() {
  const rooms = await seedRooms(10);
  await seedBookings(20, rooms);
  await seedUsers(10);
  await seedContacts(20);
}

main()
  .then(() => {
    console.log("Done!");
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    process.exit();
  });
