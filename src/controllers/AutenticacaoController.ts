import * as express from "express";
import AutenticacaoService from "../services/AutenticacaoService";

class AutenticacaoController {
  autenticar = async (req: express.Request, res: express.Response) => {
    const result = await AutenticacaoService.verificar(
      req.body.email,
      req.body.senha
    );

    if (result) {
      return res.json(result);
    } else {
      return res.sendStatus(401);
    }
  };

  verificar = (req: express.Request, res: express.Response) => {
    return res.json(req.user);
  };
}

export default new AutenticacaoController();
