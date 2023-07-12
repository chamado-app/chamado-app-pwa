export class UnexpectedException extends Error {
  constructor(
    message = 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
  ) {
    super(message)
    this.name = 'UnexpectedException'
  }
}
