<template>
  <tema
    :titulo="info.pagina.titulo"
    :sub="info.pagina.sub"
    :textoTitulo="info.pagina.textoTitulo"
    :textoSub="info.pagina.textoSub"
    :rodape="info.pagina.rodape"
  >
    <template v-slot:texto>
      <div v-html="info.texto"></div>
    </template>

    <template v-slot:formulario>
      <formulario
        :titulo="info.formulario.titulo"
        :sub="info.formulario.sub"
        :botao="info.formulario.botao"
        :campos="formulario"
        :urlBotao="info.formulario.urlBotao"
        :urlRedirect="info.formulario.urlRedirect"
      />
    </template>

    <template v-slot:extra> </template>
  </tema>
</template>

<script>
import Tema from '@/components/Basico.vue'
import Formulario from '@/components/formularios/Orcamento.vue'

// Dinâmico
import FormularioInputs from '../../data/formulario.json'
import '../../data/style.css'
import Info from '../../data/site.json'

export default {
  title: Info.pagina.titulo + ' - ' + Info.pagina.sub,
  components: { Tema, Formulario },
  data() {
    return {
      formulario: FormularioInputs,
      info: Info,
    }
  },
}
</script>
