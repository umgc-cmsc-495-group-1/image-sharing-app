export class UserSignupValidationError implements Error {
  constructor(public name: string, public message: string) {
    this.name = name;
    this.message = message;
  }
}
