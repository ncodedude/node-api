import mongoose from "mongoose";

export class MongoDB {
  private static _mongooseInstance: any;
  private static _mongooseConnection: mongoose.Connection;

  static get mongooseInstance(): any {
    if (!this._mongooseInstance) {
      this.conectar();
    }

    return this._mongooseInstance;
  }

  static get mongooseConnection(): mongoose.Connection {
    if (!this._mongooseConnection) {
      return this.conectar();
    }

    return this._mongooseConnection;
  }

  static connectionString(): string {
    const name = process.env.DB_NAME ? process.env.DB_NAME : "";
    const port = process.env.DB_PORT ? process.env.DB_PORT : "";
    const server = process.env.DB_SERVER ? process.env.DB_SERVER : "";

    return `mongodb://${server}:${port}/${name}`;
  }

  static conectar(): mongoose.Connection {
    if (this._mongooseInstance) {
      return this._mongooseInstance;
    }

    const connectionString = this.connectionString();

    this._mongooseInstance = mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this._mongooseConnection = mongoose.connection;
    this._mongooseConnection.once("open", () => {
      console.log("Connectado ao mongodb.");
    });

    return this._mongooseConnection;
  }
}
