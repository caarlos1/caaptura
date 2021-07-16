<template>
  <tema :informacoes="informacoes">
    <template v-slot:texto>
      <div v-html="texto"></div>
    </template>

    <template v-slot:formulario>
      <formulario :formulario="formulario" />
    </template>

    <template v-slot:extra> </template>
  </tema>
</template>

<script>
import Tema from '@/components/Basico.vue'
import Formulario from '@/components/Formularios/Orcamento.vue'
import axios from 'axios'

import { isDevMode, montarTituloPagina, redirectErroURL, Util } from '../util'

export default {
  async created() {
    this.efeitoCarregarON()
    await this.atualizarConteudoPagina()
    this.atualizarTitulo()
    this.atualizarEtilo()
    this.efeitoCarregarOFF()
  },
  components: { Tema, Formulario },
  data() {
    return {
      loader: {},
      informacoes: {
        titulo: 'Página de Captura',
        sub: 'Desenvolvida por caarlos.com',
        textoTitulo: 'Não fica trista tá?',
        textoSub: 'Aqui é so um ambiente de teste.',
        rodape: 'Eu sou um incrível rodapé.',
        logo: '',
      },
      texto:
        '<p> Eu sou um pequeno texto padrão... Ninguém quer me ver! :(</p>',
      estilo: [],
      formulario: {
        titulo: 'Formulário Exemplo',
        sub: 'Um texto que convença a audiência...',
        botao: 'Enviar Formulário!',
        urlBotao: '',
        urlDestino: '',
        inputsFormulario: [
          {
            tag: 'input',
            tipo: 'email',
            nome: 'email',
            legenda: 'E-mail',
            required: true,
            placeholder: 'seu@email.com.br',
          },
          {
            tag: 'textarea',
            nome: 'mensagem',
            legenda: 'Fale qualquer coisa!',
            required: true,
            rows: 3,
          },
        ],
      },
    }
  },

  methods: {
    async atualizarConteudoPagina() {
      try {
        const { data } = await axios.get(
          `${
            process.env.VUE_APP_URL_CONTEUDO_PAGINA
          }?url=${Util.obterHostnamePagina()}`
        )

        const conteudo = data.conteudo
        this.informacoes = conteudo.informacoes
        this.texto = conteudo.texto
        this.estilo = conteudo.estilo
        this.formulario = conteudo.formulario
        //...
      } catch (err) {
        Util.emitirErroConsole(err)
        redirectErroURL()
      }
    },
    atualizarTitulo() {
      const info = this.informacoes
      document.title = montarTituloPagina(info.titulo + ' - ' + info.sub)
    },
    atualizarEtilo() {
      const root = document.documentElement
      const estilo = this.estilo
      if (estilo) {
        estilo.forEach(variaveis => {
          root.style.setProperty(variaveis[0], variaveis[1])
        })
      }
    },

    efeitoCarregarON() {
      this.loader = this.$loading.show()
    },

    efeitoCarregarOFF() {
      setTimeout(() => {
        this.loader.hide()
      }, 2000)
    },
  },
}
</script>
