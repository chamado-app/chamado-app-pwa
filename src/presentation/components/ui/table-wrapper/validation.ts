export const tableSearchValidation = {
  search: [
    (value?: string): boolean | string => {
      if (!value || (value && value.length > 2)) return true
      return 'Digite 3 ou mais caracteres para realizar a pesquisa'
    }
  ]
}
