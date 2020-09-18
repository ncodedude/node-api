import { Document, Schema, Model, model } from "mongoose";
import { AutenticadorJWT } from "../common/authentication/AutenticadorJWT";
import * as bcrypt from "bcrypt";

const UsuarioSchema = new Schema(
  {
    nome: { type: String, required: [true, "O nome de usuário é obrigatório"] },
    cpf: { type: String, required: true },
    senha: { type: String, required: true },
    email: { type: String, required: true },
    celular: { type: String, required: true },
  },
  {
    strict: "throw",
    useNestedStrict: true,
  }
);

UsuarioSchema.pre("save", function (next) {
  const user = this.toObject();
  const password = user.senha;
  bcrypt.genSalt(AutenticadorJWT.SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return next(err);

      this.set("senha", hash);
      next();
    });
  });
});

export interface IMongoUsuario extends Document {
  nome: string;
  cpf: string;
  senha: string;
  email: string;
  celular: string;
}

export const Usuario = model<IMongoUsuario>("Users", UsuarioSchema);
