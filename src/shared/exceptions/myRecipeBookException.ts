import { StatusCodes } from "http-status-codes";

export abstract class MyRecipeBookException extends Error {
  abstract getErrorMessages(): string[];
  abstract getStatusCode(): StatusCodes;
}
