import { MongoDB } from "./db";
import { AutenticadorJWT } from "./common/authentication/AutenticadorJWT";
import express from "express";
import * as bodyParser from "body-parser";
import RotasREST from "./rotas";
import cors from "cors";

if (process.env.ENV !== "production") {
  let dotenv = require("dotenv");
  const variaveisDeAmbiente = dotenv.config();
  if (variaveisDeAmbiente.error) {
    throw variaveisDeAmbiente.error;
  }

  console.log(variaveisDeAmbiente.parsed);
}

export class ServidorREST {
  public static start(
    aplicacao: express.Express,
    porta?: string | undefined,
    prefixoDeRotaRest: string = "/"
  ) {
    MongoDB.conectar();
    AutenticadorJWT.iniciarAutenticacaoJWT();
    ServidorREST.iniciarServidorExpress(aplicacao);
    ServidorREST.iniciarHeaders(aplicacao);
    ServidorREST.iniciarRotas(prefixoDeRotaRest, aplicacao);

    aplicacao.listen(porta, function () {
      console.log("API iniciada na porta " + porta + "!");
    });
  }

  private static iniciarServidorExpress(aplicacao: express.Express) {
    aplicacao.use(cors());
    aplicacao.use(require("morgan")("combined"));
    aplicacao.use(bodyParser.json({ limit: "50mb" })); // to support JSON-encoded bodies
    aplicacao.use(
      bodyParser.urlencoded({
        // to support URL-encoded bodies
        extended: true,
      })
    );
  }

  private static iniciarHeaders(aplicacao: express.Express) {
    aplicacao.use(function (req, res, next) {
      // Website you wish to allow to connect
      res.setHeader("Access-Control-Allow-Origin", "*");

      // Request methods you wish to allow
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );

      // Request headers you wish to allow
      res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type,Authorization"
      );

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader("Access-Control-Allow-Credentials", "true");

      // Pass to next layer of middleware
      next();
    });
  }

  private static iniciarRotas(
    prefixoDeRotaRest: string,
    aplicacao: express.Express
  ) {
    // IMPORTANT: Routes must be defined AFTER the initialization of the app
    // so that it can use the configured middleware!
    aplicacao.use(prefixoDeRotaRest, RotasREST);
  }
}

const servidorExpress = express();
ServidorREST.start(
  servidorExpress,
  process.env.PORT,
  process.env.SERVER_PREFIX
);
