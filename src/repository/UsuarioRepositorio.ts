import { Usuario } from "../schemas/UsuarioSchema";
import * as bcrypt from "bcrypt";

class UsuarioRepositorio {
  constructor() {}

  async verifyUser(email: string, password: string) {
    let user = await Usuario.findOne({ email: email }).exec();
    let senha = user ? user.get("senha") : "";
    let validated = bcrypt.compareSync(password, senha);

    if (validated) {
      return user;
    } else {
      return null;
    }
  }
}

export default new UsuarioRepositorio();
