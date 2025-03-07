import { CustomError } from "../utils/CustomError";

export class DatabaseError extends CustomError {
  StatusCode = 500;
  constructor(public message: string) {
    super("Database crashed");
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
  serialize(): { message: string } {
    return { message: this.message };
  }
}
