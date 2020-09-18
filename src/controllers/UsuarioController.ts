import * as express from "express";
import { Usuario } from "../schemas/UsuarioSchema";

class UsuarioController {
  obter = async (req: express.Request, res: express.Response) => {
    const users = await Usuario.find({}).exec();
    return res.json(users);
  };

  criar = async (req: express.Request, res: express.Response) => {
    const user = await Usuario.create({
      nome: req.body.nome,
      cpf: req.body.cpf,
      senha: req.body.senha,
      email: req.body.email,
      celular: req.body.telefone,
    });

    return res.json(user);
  };

  remover = async (req: express.Request, res: express.Response) => {
    await Usuario.deleteOne({ _id: req.params.id });
    return res.sendStatus(200);
  };
}

export default new UsuarioController();
