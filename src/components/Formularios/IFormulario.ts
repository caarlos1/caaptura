interface IFormularioElementoInputOptions {
  value: string
  selected: boolean
}

export interface IFormularioDadosElementoInput {
  name: string
  value: string
}

export interface IFormularioElementoInput {
  tag: string
  tipo: string
  nome: string
  legenda?: string
  required?: boolean
  placeholder?: string
  rows?: string
  options?: IFormularioElementoInputOptions[]
  col: string
}

export interface IFormularioDadosInputs {
  email?: string
  captcha?: string
  dominio?: string
  horario?: Date
  ip?: string
}

export interface FormualarioNotificacoes {
  mensagem: string
  sucesso: boolean
}