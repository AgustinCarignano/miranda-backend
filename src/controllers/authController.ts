import { IReq, IRes } from "@src/types/request";
import { IUser } from "@src/types/users";
import jwtUtils from "@src/utils/jwtUtils";
import typeGuardsUtils from "@src/utils/typeGuardsUtils";

class AuthController {
  async userLogin(req: IReq<IUser>, res: IRes<string>) {
    const user = req.user;
    if (typeGuardsUtils.isUserType(user)) {
      const token = await jwtUtils.generateToken({
        _id: user._id,
        email: user.email,
      });
      res.json({ message: "Logged in successfully", payload: token });
    } else {
      res.json({ message: "Error in recover the user", payload: "" });
    }
  }
}

export default new AuthController();
