let passport = require("passport");
let passportJWT = require("passport-jwt");

let ExtractJwt = passportJWT.ExtractJwt;
let JWTStrategy = passportJWT.Strategy;

export class AutenticadorJWT {
  static AutenticacaoRequerida = passport.authenticate("jwt", {
    session: false,
  });
  static get SECRET(): string | undefined {
    return process.env.JWT_SECRET;
  }

  static SALT_WORK_FACTOR: number = 10;

  static iniciarAutenticacaoJWT() {
    const config = {
      secretOrKey: AutenticadorJWT.SECRET,
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    };

    const strategy = new JWTStrategy(config, function (token: any, done: any) {
      done(null, token);
    });
    passport.use(strategy);
  }
}
