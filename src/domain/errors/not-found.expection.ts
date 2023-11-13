export class NotFoundException extends Error {
  constructor(message = 'O recurso solicitado não foi encontrado.') {
    super(message)
    this.name = 'NotFoundException'
  }
}
