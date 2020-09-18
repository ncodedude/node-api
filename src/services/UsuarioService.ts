import * as jwt from "jsonwebtoken";
import UserRepository from "../repository/UsuarioRepositorio";

class UsuarioService {
  constructor() {}

  async verifyUserExistance(email: string, password: string) {
    const user = await UserRepository.verifyUser(email, password);
    if (user) {
      const payload = user.toObject();
      delete payload.password;
      let JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
      var token = jwt.sign({ payload }, JWT_SECRET, {
        expiresIn: process.env.SESSION_TIME,
      });

      return token;
    } else {
      return null;
    }
  }
}

export default new UsuarioService();
