import { CustomError } from "../utils/CustomError";

export class NotFoundError extends CustomError {
  StatusCode = 404;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serialize(): { message: string } {
    return { message: "Not Found" };
  }
}
