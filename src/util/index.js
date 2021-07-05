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
