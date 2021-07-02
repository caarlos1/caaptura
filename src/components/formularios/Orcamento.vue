<template>
  <div class="formulario__area">
    <h3 v-html="titulo" class="formulario__titulo"></h3>
    <p v-html="sub" class="formulario__sub"></p>

    <div id="formulario__bloco">
      <template v-if="alertas">
        <div class="col-md-12">
          <ul class="formulario__alertas">
            <li
              v-for="alerta in alertas"
              :key="alerta"
              class="alert alert-dark formulario__alerta--sucesso"
              role="alert"
            >
              {{ alerta }}
            </li>
          </ul>
        </div>
      </template>
      <template v-if="erros">
        <div class="col-md-12">
          <ul class="formulario__erros">
            <li
              v-for="erro in erros"
              :key="erro"
              class="alert alert-dark formulario__alerta--erro"
              role="alert"
            >
              {{ erro }}
            </li>
          </ul>
        </div>
      </template>

      <form class="row g-3" id="formulario__form" @submit="enviarFormulario">
        <template v-for="input in campos" :key="input.nome">
          <div v-html="montarInput(input)" :class="colInput(input)"></div>
        </template>

        <div class="col-12">
          <p class="formulario__observacao">*Informação obrigatória.</p>
        </div>

        <div class="col-12">
          <button
            type="submit"
            id="formulario__enviar"
            class="btn btn-primary"
            data-cy="form_submit"
          >
            {{ botao }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      erros: [],
      alertas: [],
    }
  },

  props: {
    titulo: String,
    sub: String,
    botao: String,
    campos: Array,
    urlBotao: String,
    urlRedirect: String,
  },

  methods: {
    async enviarFormulario(e) {
      e.preventDefault()
      this.erros = []
      this.alertas = []

      let formularioArea = document.getElementById('formulario__bloco')
      let formularioOrcamento = document.getElementById('formulario__form')

      let botaoEnviar = document.getElementById('formulario__enviar')
      function botaoEnviarAtivo(status = true) {
        botaoEnviar.disabled = !status
      }

      if (this.isFormularioPreenchido && this.isEmailValido) {
        botaoEnviarAtivo(false)

        // reCaptcha
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')

        // Dados:
        let dados = { ...this.getInputsFormulario }

        // Dados Extras:
        dados.captcha = token
        dados.dominio = window.location.href
        dados.horario = new Date()
        let ipfy = await this.axios.get('https://api.ipify.org?format=json')
        dados.ip = ipfy.data.ip

        try {
          let resposta = await this.postFormulario(dados)
          if (resposta.data.sucesso) {
            this.alertas.push(`E-mail recebido com sucesso!`)
            formularioArea.removeChild(formularioOrcamento)
          } else {
            this.erros.push(resposta.data.alertas.shift())
            botaoEnviarAtivo(true)
          }
        } catch (err) {
          this.erros.push(err)
          botaoEnviarAtivo(true)
        }
      } else {
        this.erros.push('Preencha corretamente o formulário!')
        botaoEnviarAtivo(true)
      }
    },

    async postFormulario(dadosFormulario) {
      try {
        return await this.axios.post(this.urlBotao, dadosFormulario)
      } catch (err) {
        throw 'Não foi possível enviar seu e-mail.'
      }
    },

    montarInput(input) {
      let required = input.required ? 'required' : ''
      let tipo = input.tipo ? input.tipo : 'text'
      let tag = input.tag ? input.tag : 'input'
      let codigoInput = ''

      let labelInput = `
            <label
              for="form_${input.nome}"
              class="form-label">
                ${input.legenda} ${required ? '*' : ''}
            </label>`

      if (tag == 'input') {
        codigoInput = `
            <input
              type="${tipo}"
              id="form_${input.nome}"
              name="${input.nome}"
              class="form-control data-form-orc"
              placeholder="${input.placeholder}"
              ${required}
          />`
      }
      if (tag == 'textarea') {
        codigoInput = `
          <textarea
            class="form-control data-form-orc"
            id="form_${input.nome}"
            name="${input.nome}"
            rows="${input.rows}"
            ${required}
          ></textarea>
        `
      }
      if (tag == 'select') {
        const selectInicio = `
          <select
            id="form_${input.nome}"
            name="${input.nome}"
            class="form-select data-form-orc"
          >
        `
        const selectFim = `
          </select>
        `
        let optionsLista = ''
        input.options.forEach(dados => {
          optionsLista += `<option value="${dados.value}" ${
            dados.selected ? 'selected' : ''
          }>${dados.value}</option>`
        })
        codigoInput = selectInicio + optionsLista + selectFim
      }

      return labelInput + codigoInput
    },
    colInput(input) {
      const col = input.col ? input.col : 'col-md-12'
      return col
    },
  },

  computed: {
    getInputsFormulario() {
      let dadosFormulario = {}
      document.getElementsByClassName('data-form-orc').forEach(input => {
        dadosFormulario[input.name] = input.value
      })
      return dadosFormulario
    },

    isFormularioPreenchido() {
      const form = this.getInputsFormulario
      return form.nome.trim() &&
        form.email.trim() &&
        form.telefone.trim() &&
        form.orcamento &&
        form.mensagem.trim()
        ? true
        : false
    },

    isEmailValido() {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.getInputsFormulario.email)
    },
  },
}
</script>

<style scoped>
.formulario__area {
  padding: 50px;
  background-color: var(--cor-background);
  box-shadow: var(--sombra-padrao);
  border-radius: 20px;
}

.formulario__titulo {
  font-weight: bold;
}
.formulario__sub {
  padding-bottom: 10px;
}

.formulario__erros,
.formulario__alertas {
  padding-left: 0px;
  margin: 0;
  list-style: none;
}

.formulario__observacao {
  font-size: 0.9rem;
  padding: 0;
  margin: 0;
}

.formulario__alerta--sucesso,
.formulario__alerta--erro {
  background-color: transparent;
  color: var(--cor-texto-inverso);
  box-shadow: var(--sombra-pequena);
  border-radius: 10px;
  border-color: transparent;
  margin-bottom: 20px;
}

.formulario__alerta--sucesso {
  background-color: var(--cor-destaque);
}

.formulario__alerta--erro {
  background-color: var(--cor-perigo);
}

/* 
.estilo-inputs {
}

.estilo-inputs:active,
.estilo-inputs:focus {
} */

#formulario__enviar {
  margin-top: 15px;
  width: 100%;
}
</style>
