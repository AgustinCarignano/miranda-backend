import { IReq, IRes } from "@src/types/request";
import { IUser, UserIdType } from "@src/types/users";
import jwtUtils from "@src/utils/jwtUtils";
import typeGuardsUtils from "@src/utils/typeGuardsUtils";

class AuthController {
  async userLogin(
    req: IReq<IUser>,
    res: IRes<{ token: string; user: Partial<IUser> }>
  ) {
    const user = req.user;
    if (typeGuardsUtils.isUserType(user)) {
      const token = await jwtUtils.generateToken({
        _id: user._id,
        email: user.email,
      });
      const response = {
        token,
        user: { fullName: user.fullName, email: user.email, photo: user.photo },
      };
      res.json({ message: "Logged in successfully", payload: response });
    } else {
      res.json({ message: "Error in recover the user" });
    }
  }
  async refreshToken(req: IReq<IUser>, res: IRes<string>) {
    const user = req.user;
    if (typeGuardsUtils.isPartialUserType(user) && user._id && user.email) {
      const newToken = await jwtUtils.generateToken({
        _id: user._id,
        email: user.email,
      });
      return res.json({ message: "New token generated", payload: newToken });
    } else {
      return res.json({ message: "Error in recover the user" });
    }
  }
}

export default new AuthController();
