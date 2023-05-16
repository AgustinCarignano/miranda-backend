import RoomsFS from "./roomsFS";
import RoomsSQL from "./roomsSQL";
import RoomsMongo from "./roomsMDB";

const RoomDAOs = {
  FS: RoomsFS,
  SQL: RoomsSQL,
  MONGO: RoomsMongo,
};

export default RoomDAOs;
