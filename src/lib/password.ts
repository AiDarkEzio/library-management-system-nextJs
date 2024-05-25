import { pbkdf2Sync, randomBytes } from "crypto";

type PData = {
  iterations?: number;
  digest?: "sha512";
  keylen?: number;
};

export default class Password {
  
  private iterations: number;
  private digest: "sha512";
  private keylen: number;

  constructor(data?:PData) {
    this.digest = data?.digest ? data.digest : "sha512";
    this.keylen = data?.keylen ? data.keylen : 64;
    this.iterations = data?.iterations ? data.iterations : 65462;
  }

  private generateSalt() {
    return randomBytes(16).toString("hex");
  }

  public hashPassword(password: string) {
    const salt = this.generateSalt();
    const hashedPassword = pbkdf2Sync(password, salt, this.iterations, this.keylen, this.digest).toString("hex");
    return { salt, hashedPassword };
  }

  public verifyPassword(password: string, salt: string, storedHashedPassword: string) {
    const hashedPassword = pbkdf2Sync(password, salt, this.iterations, this.keylen, this.digest).toString("hex");
    return hashedPassword === storedHashedPassword;
  }
}
