import { StatusCodes } from "http-status-codes";
import { MyRecipeBookException } from "./myRecipeBookException";
import ResourceMessagesException from "./resourMessagesException";

export class InvalidLoginException extends MyRecipeBookException {
  constructor() {
    super(ResourceMessagesException.EMAIL_OR_PASSWORD_INVALID);
  }

  getErrorMessages(): string[] {
    return [this.message];
  }
  getStatusCode(): StatusCodes {
    return StatusCodes.UNAUTHORIZED;
  }
}
