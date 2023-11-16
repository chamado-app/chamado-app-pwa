export class ForbiddenException extends Error {
  constructor(message = 'Sem autorização para acessar este recurso.') {
    super(message)
    this.name = 'ForbiddenException'
  }
}
