import UsersFS from "./usersFS";
import UsersSQL from "./usersSQL";
import UsersMongo from "./usersMDB";

const UserDAOs = {
  FS: UsersFS,
  SQL: UsersSQL,
  MONGO: UsersMongo,
};

export default UserDAOs;
