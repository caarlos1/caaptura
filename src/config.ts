// Informações de Configuração
import CONFIG from '../data/tags.json'
import axios from 'axios'

export async function config() {
  try {
    const dominio = window.location.hostname
    const res = await axios.get(
      `${process.env.VUE_APP_URL_TAGS_PAGINA}?url=${dominio}`
    )
    if (res.data.sucesso) return res.data.conteudo.tags
    else return CONFIG.tags
  } catch (err) {
    console.log(
      'Erro na importação das tags da página. Informações: ' + err
    )
    return CONFIG.tags
  }
}
