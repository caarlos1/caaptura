import { defineComponent } from 'vue'

export default defineComponent({
  created() {
    const title = this.$_getTitleMixin()
    if (title) {
      document.title = title
    }
  },

  methods: {
    $_getTitleMixin() {
      const { title } = this.$options
      if (title) {
        return typeof title === 'function' ? title.call(this) : title
      }
    },
  },
})
