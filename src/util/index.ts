import axios from 'axios'

export function isDevMode(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function montarTituloPagina(...trechos: string[]): string {
  let titulo = ''
  trechos.forEach(texto => {
    titulo += texto
  })
  return titulo
}

export function redirectErroURL(): void {
  if (!isDevMode()) window.location.href = process.env.VUE_APP_URL_REDIRECT_ERRO
}

export class Util {
  public static emailValido(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  public static obterUrlPagina(): string {
    return `${window.location.href}`
  }

  public static obterHostnamePagina(): string {
    return `${window.location.hostname}`
  }

  public static async obterIpUsuario(): Promise<string> {
    try {
      const { data } = await axios.get('https://api.ipify.org?format=json')
      return data.ip
    } catch (err) {
      return ''
    }
  }

  public static emitirErroConsole(erro: unknown): void {
    if (axios.isAxiosError(erro)) {
      const { response } = erro
      if (response) console.log('Error:', response.data.alertas.shift())
      else console.log(`${erro}`)
    } else console.log(`${erro}`)
  }
}
