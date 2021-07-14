<template>
  <div v-if="temNotificacoes" class="col-md-12 formulario__notificacoes">
    <ul>
      <li
        v-for="notificacao in notificacoes"
        :key="notificacao"
        v-bind:class="{
          'formulario__notificacao--sucesso': notificacao.sucesso,
          'formulario__notificacao--erro': !notificacao.sucesso,
        }"
        class="alert alert-dark"
        role="alert"
      >
        {{ notificacao.mensagem }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FormualarioNotificacoes } from './IFormulario'

export default defineComponent({
  props: {
    notificacoes: Array,
  },

  methods: {
    temNotificacoes(): boolean {
      return this.notificacoes?.length != 0
    },
  },

  computed: {
    foiSucesso(notificacao: FormualarioNotificacoes): boolean {
      return notificacao.sucesso
    },
  },
})
</script>
