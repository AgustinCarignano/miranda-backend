import { HttpCode } from "./errorEnums";

interface IErrorArgs {
  httpCode: HttpCode;
  description: string;
}

export class CustomError extends Error {
  httpCode: HttpCode;
  status?: number;

  constructor(args: IErrorArgs) {
    super(args.description);
    this.httpCode = args.httpCode;
  }
}
