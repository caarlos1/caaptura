<template>
  <tema
    :titulo="pagina.informacoes.titulo"
    :sub="pagina.informacoes.sub"
    :textoTitulo="pagina.informacoes.textoTitulo"
    :textoSub="pagina.informacoes.textoSub"
    :rodape="pagina.informacoes.rodape"
    :logo="pagina.informacoes.logo"
  >
    <template v-slot:texto>
      <div v-html="pagina.texto"></div>
    </template>

    <template v-slot:formulario>
      <formulario
        :titulo="pagina.formulario.titulo"
        :sub="pagina.formulario.sub"
        :botao="pagina.formulario.botao"
        :campos="pagina.formulario.inputsFormulario"
        :urlBotao="pagina.formulario.urlBotao"
        :urlRedirect="pagina.formulario.urlRedirect"
      />
    </template>

    <template v-slot:extra> </template>
  </tema>
</template>

<script>
import Tema from '@/components/Basico.vue'
import Formulario from '@/components/formularios/Orcamento.vue'
import axios from 'axios'

import { montarTituloPagina } from '../util'

// Dinâmico
import '../../data/style.css'

import INFO_JSON from '../../data/site.json'
let info = INFO_JSON.informacoes

export default {
  async mounted() {
    this.pagina = await this.obterConteudoPagina()
    this.atualizarTitulo()
    this.atualizarEtilo()
  },
  title: montarTituloPagina(info.titulo, ' - ', info.sub, info.creditos),
  components: { Tema, Formulario },
  data() {
    return {
      pagina: INFO_JSON,
    }
  },

  methods: {
    async obterConteudoPagina() {
      let dominio = window.location.hostname
      let informacoes
      try {
        const req = await axios.get(
          `${process.env.VUE_APP_URL_CONTEUDO_PAGINA}?url=${dominio}`
        )
        if (req.data.sucesso) informacoes = req.data.conteudo
        else informacoes = INFO_JSON
      } catch (err) {
        informacoes = INFO_JSON
        console.log(
          'Erro na importação do conteúdo da página. Informações: ' + err
        )
      }
      return informacoes
    },
    atualizarTitulo() {
      let info = this.pagina.informacoes
      document.title = montarTituloPagina(
        info.titulo + ' - ' + info.sub + info.creditos
      )
    },
    atualizarEtilo() {
      let root = document.documentElement
      let estilo = this.pagina.estilo
      estilo.forEach(variaveis => {
        root.style.setProperty(variaveis[0], variaveis[1])
      })
    },
  },
}
</script>
