<template>
  <div class="cabecalho">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-md-12 col-sm-12 cabecalho__informacoes">
          <template v-if="logo">
            <img
              v-bind:src="logo"
              class="cabecalho__logo"
              v-bind:alt="titulo + ' - ' + sub"
            />
          </template>
          <template v-else>
            <h1 v-html="titulo" class="cabecalho__titulo"></h1>
            <h2 v-html="sub" class="cabecalho__sub"></h2>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div class="conteudo">
    <div class="container">
      <div class="row justify-content-lg-center dobra">
        <div class="col-lg-7 col-md-12 col-sm-12 texto__bloco">
          <h2 v-html="textoTitulo" class="texto__titulo"></h2>
          <h3 v-html="textoSub" class="texto__sub"></h3>
          <div class="texto__separador"></div>
          <slot name="texto"> </slot>
        </div>

        <div class="col-lg-5 col-md-12 col-sm-12 formulario__bloco">
          <slot name="formulario"></slot>
        </div>
      </div>

      <div class="row justify-content-lg-center ">
        <div class="col-lg-12 componentes__extras">
          <slot name="extra"> </slot>
        </div>
      </div>
    </div>
  </div>
  <div class="rodape">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div v-html="rodape" class="rodape__texto"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    empresa: String,
    logo: String,
    titulo: String,
    sub: String,
    textoTitulo: String,
    textoSub: String,
    rodape: String,
  },

  components: {},
}
</script>

<style scoped>
@import '../assets/css/components/basico.css';
</style>
