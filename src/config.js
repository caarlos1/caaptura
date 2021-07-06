// Informações de Configuração
import CONFIG from '../data/tags.json'
import axios from 'axios'

export async function config() {
  try {
    const dominio = window.location.hostname
    const res = await axios.get(
      `${process.env.VUE_APP_URL_TAGS_PAGINA}?url=${dominio}`
    )
    return res.data.conteudo
  } catch (err) {
    return CONFIG.tags
  }
}