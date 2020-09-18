import { AutenticadorJWT } from "../common/authentication/AutenticadorJWT";
import express from "express";
import UsuarioController from "../controllers/UsuarioController";

const app = express();

app.post(
  "/usuarios",
  AutenticadorJWT.AutenticacaoRequerida,
  UsuarioController.criar
);

app.get(
  "/usuarios",
  AutenticadorJWT.AutenticacaoRequerida,
  UsuarioController.obter
);

app.delete(
  "/usuarios/:id",
  AutenticadorJWT.AutenticacaoRequerida,
  UsuarioController.remover
);

export const UsuarioRotas: express.Router = app;
