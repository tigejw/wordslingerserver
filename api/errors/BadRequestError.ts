import { CustomError } from "../utils/CustomError";

export class BadRequest extends CustomError {
  StatusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
  serialize(): { message: string } {
    return { message: "Bad Request" };
  }
}
