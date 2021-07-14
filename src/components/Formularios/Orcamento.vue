<template>
  <div class="formulario__area">
    <h3 v-html="formulario.titulo" class="formulario__titulo"></h3>
    <p v-html="formulario.sub" class="formulario__sub"></p>

    <div id="formulario__bloco">
      <notificacoes :notificacoes="notificacoes" />

      <form class="row g-3" id="formulario__form" @submit="enviarFormulario">
        <template
          v-for="inputConfig in formulario.inputsFormulario"
          :key="inputConfig.nome"
        >
          <div
            v-html="montarHtmlInput(inputConfig)"
            :class="definirColunasInput(inputConfig)"
          ></div>
        </template>

        <div class="col-12">
          <p class="formulario__observacao">*Informação obrigatória.</p>
        </div>

        <div class="col-12">
          <button type="submit" id="formulario__enviar" class="btn btn-primary">
            {{ formulario.botao }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Notificacoes from './Notificacoes.vue'
import { ResultadoRequisicao } from '@/util/IRequisicoes'

import {
  IFormularioElementoInput,
  IFormularioDadosInputs,
  FormualarioNotificacoes,
} from './IFormulario'

import { defineComponent } from 'vue'
import { Formulario } from './Formulario'
import { notificacaoFormularioFactory, Util } from '@/util'

export default defineComponent({
  data() {
    return {
      notificacoes: [] as FormualarioNotificacoes[],
    }
  },

  components: {
    Notificacoes,
  },

  props: {
    formulario: Object,
    titulo: String,
    sub: String,
    botao: String,
    campos: Array,
    urlBotao: String,
    urlRedirect: String,
  },

  methods: {
    async enviarFormulario(e: Event) {
      e.preventDefault()

      this.notificacoes = []
      let dados: IFormularioDadosInputs = { ...this.obterDadosInputs }

      if (Util.emailValido(dados.email as string)) {
        this.ativarBotaoFormulario(false)

        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')

        dados.captcha = token
        dados.dominio = Util.obterUrlPagina()
        dados.horario = new Date()
        dados.ip = await Util.obterIpUsuario()

        try {
          this.notificarResultadoEnvio(
            await this.enviarFormularioServidor(dados)
          )
        } catch (err) {
          this.notificacoes.push(notificacaoFormularioFactory(err, false))
          this.ativarBotaoFormulario(true)
        }
        //...
      } else {
        this.notificacoes.push(
          notificacaoFormularioFactory(
            'Preencha corretamente o formulário!',
            false
          )
        )
        this.ativarBotaoFormulario(true)
      }
    },

    notificarResultadoEnvio(resultado: ResultadoRequisicao) {
      if (resultado.sucesso) {
        this.notificacoes.push(
          notificacaoFormularioFactory('E-mail recebido com sucesso!', true)
        )
        this.desativarFormulario()
      } else {
        this.notificacoes.push(
          notificacaoFormularioFactory(
            resultado.alertas.shift() as string,
            false
          )
        )
        this.ativarBotaoFormulario(true)
      }
    },

    async enviarFormularioServidor(
      informacoes: IFormularioDadosInputs
    ): Promise<ResultadoRequisicao> {
      try {
        const { data } = await this.axios.post(
          this.formulario?.urlBotao as string,
          informacoes
        )
        return data as ResultadoRequisicao
      } catch (err) {
        throw 'Não foi possível enviar seu e-mail.'
      }
    },

    // Utilitarios do Formulário

    ativarBotaoFormulario(status = true): void {
      ;(<HTMLInputElement>(
        document.getElementById('formulario__enviar')
      )).disabled = !status
    },

    desativarFormulario(): void {
      let formulario = document.getElementById('formulario__form')
      let areaFormulario = document.getElementById('formulario__bloco')
      areaFormulario?.removeChild(formulario as Node)
    },

    montarHtmlInput(input: IFormularioElementoInput) {
      return Formulario.gerarHtmlInput(input)
    },

    definirColunasInput(input: IFormularioElementoInput) {
      return input.col ? input.col : 'col-md-12'
    },
  },

  computed: {
    obterDadosInputs(): IFormularioDadosInputs {
      return Formulario.obterDadosInputs()
    },
  },
})
</script>

<style>
@import '../../assets/css/components/orcamento.css';
</style>
