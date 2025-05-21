import { Request, Response, NextFunction } from "express";
import { MyRecipeBookException } from "./myRecipeBookException";
import { ResponseError } from "../communication/responses/responseError";
import { StatusCodes } from "http-status-codes";
import ResourceMessagesException from "./resourMessagesException";
import { ZodError } from "zod";

export class ExceptionGlobalHandler {
  static onException(
    error: Error,
    request: Request,
    response: Response,
    _: NextFunction
  ) {
    if (error instanceof MyRecipeBookException) {
      this.handleProjectException(error, response);
    } else if (error instanceof ZodError) {
      this.zodErrors(error, response);
    } else {
      this.throwUnknownException(error, response);
    }
  }

  private static handleProjectException(
    error: MyRecipeBookException,
    response: Response
  ) {
    return response
      .status(error.getStatusCode())
      .json(new ResponseError(error.getErrorMessages()));
  }

  private static zodErrors(error: ZodError, response: Response) {
    // const zodErrors: string[] = []
    // error.issues.forEach((issue) => {
    //   zodErrors.push(issue.message)
    // })

    // console.log("ZodErrors: ")
    // console.log(zodErrors)
    // return response.status(400).json(new ResponseError(zodErrors))

    type Obj = {
      pathName: string;
      pathErrors: string[];
    };

    const zodErrorsMap = new Map<string, string[]>();

    // Agrupar erros pelo path
    error.issues.forEach((issue) => {
      const path = issue.path.toString();
      if (!zodErrorsMap.has(path)) {
        zodErrorsMap.set(path, []);
      }
      zodErrorsMap.get(path)?.push(issue.message);
    });

    // Converter o mapa em array de objetos
    const zodErrors: Obj[] = Array.from(
      zodErrorsMap,
      ([pathName, pathErrors]) => ({
        pathName,
        pathErrors,
      })
    );

    // Retornar a resposta com os erros formatados
    return response.status(400).json(zodErrors);
  }

  private static throwUnknownException(error: Error, response: Response) {
    return response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new ResponseError(ResourceMessagesException.UNKNOWN_ERROR));
  }
}
