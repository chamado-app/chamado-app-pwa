export class UnprocessableEntityException extends Error {
  constructor(
    message = 'Ocorreu algum erro ao salvar, verifique os dados e tente novamente.'
  ) {
    super(message)
    this.name = 'UnprocessableEntityException'
  }
}
