// posso receber tanto uma lista de strings quanto uma string
// se for string coloco dentro do array, se for um array passo diretamente esse erray
export class ResponseError {
  errorMessages: string[];

  constructor(errors: string | string[]) {
    if (typeof errors === "string") {
      this.errorMessages = [errors];
    } else {
      this.errorMessages = errors;
    }
  }
}
