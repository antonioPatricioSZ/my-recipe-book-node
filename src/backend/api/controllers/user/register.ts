import { Request, Response, NextFunction } from "express";

export class Register {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}
