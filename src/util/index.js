export function isDevMode() {
  return process.env.NODE_ENV === 'development'
}

export function montarTituloPagina(...textos) {
  let titulo = ''
  textos.forEach(texto => {
    titulo += texto
  })
  return titulo
}

export function redirectErroURL() {
  if (!isDevMode()) window.location.href = process.env.VUE_APP_URL_REDIRECT_ERRO
}
