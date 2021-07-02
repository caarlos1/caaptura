<template>
  <div class="container-fluid cabecalho">
    <div class="">
      <div class="row">
        <div
          class="col-lg-6 col-md-6 col-sm-12 offset-lg-1 cabecalho__informacoes"
        >
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
  <div class="container-fluid">
    <div class="">
      <div class="row justify-content-lg-center dobra">
        <div class="col-lg-6 col-md-12 col-sm-12 texto__bloco">
          <h2 v-html="textoTitulo" class="texto__titulo"></h2>
          <h3 v-html="textoSub" class="texto__sub"></h3>
          <div class="texto__separador"></div>
          <slot name="texto"> </slot>
        </div>

        <div class="col-lg-4 col-md-12 col-sm-12 formulario__bloco">
          <slot name="formulario"></slot>
        </div>
      </div>

      <div class="row justify-content-lg-center ">
        <div class="col-lg-10 componentes__extras">
          <slot name="extra"> </slot>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid rodape">
    <div class="row">
      <div class="col-lg-12">
        <div v-html="rodape" class="rodape__texto"></div>
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
.cabecalho {
  background-color: var(--cor-destaque);
}

.cabecalho__informacoes {
  margin-top: 50px;
  margin-bottom: 50px;
  color: var(--cor-texto-inverso);
}

.cabecalho__titulo {
  font-weight: 700;
  font-size: var(--font-size-titulo);
  margin: 0;
  padding: 0;
}

.cabecalho__sub {
  font-size: var(--font-size-sub-titulo);
  text-indent: 3px;
}

.cabecalho__logo {
  max-height: 150px;
}

.dobra {
  margin-top: var(--espacamento-padrao);
  padding: 0 0 var(--espacamento-padrao) 0;
}

.texto__titulo {
  font-size: 2.25em;
  font-weight: bold;
}

.texto__sub {
  font-size: 1.5em;
}

.texto__separador {
  width: 60%;
  height: 6px;
  background-color: var(--cor-destaque);
  margin: 20px 0 30px;
}

  .formulario__bloco {
    margin-top: calc(var(--espacamento-padrao) * -2.5);
  }

@media (max-width: 991px) {
  .row {
    padding-left: 20px;
    padding-right: 20px;
  }
  .formulario__bloco {
    margin-top: var(--espacamento-padrao);
  }
}
</style>

<style>
.rodape {
  text-align: center;
  background-color: var(--cor-destaque);
  color: var(--cor-texto-inverso);
}
.rodape__texto {
  padding-top: 40px;
  padding-bottom: 40px;
}

.rodape__texto a {
  text-decoration: none;
  color: var(--cor-texto-inverso);
  font-weight: bold;
}
</style>
