export class NotFoundException extends Error {
  constructor(
    message = 'O recurso solicitado não foi encontrado. Tente novamente mais tarde.'
  ) {
    super(message)
    this.name = 'NotFoundException'
  }
}
