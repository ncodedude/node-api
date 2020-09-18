import { AutenticadorJWT } from "../common/authentication/AutenticadorJWT";
import AutenticacaoController from "../controllers/AutenticacaoController";
import express from "express";

const app = express();

app.post("/auth", AutenticacaoController.autenticar);
app.get(
  "/auth",
  AutenticadorJWT.AutenticacaoRequerida,
  AutenticacaoController.verificar
);

export const AutenticacaoRotas: express.Router = app;
