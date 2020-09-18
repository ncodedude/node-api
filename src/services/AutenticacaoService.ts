import * as jwt from "jsonwebtoken";
import UsuarioRepositorio from "../repository/UsuarioRepositorio";

class AutenticacaoService {
  constructor() {}

  async verificar(email: string, password: string) {
    const user = await UsuarioRepositorio.verifyUser(email, password);
    if (user) {
      const payload = user.toObject();
      delete payload.password;
      let JWT_SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
      var token = jwt.sign({ payload }, JWT_SECRET, {
        expiresIn: process.env.SESSION_TIME, // expires in 5min
      });

      return { token: token };
    } else {
      return null;
    }
  }
}

export default new AutenticacaoService();
