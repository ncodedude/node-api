import express from "express";
import { AutenticacaoRotas } from "./routes/Autenticacao.rotas";
import { UsuarioRotas } from "./routes/Usuario.rotas";

const app = express();

app.use("/", AutenticacaoRotas);
app.use("/", UsuarioRotas);

app.get("/", function (req, res) {
  res.send("API RULEZ");
});

var RotasREST: any = app;

export default RotasREST;
