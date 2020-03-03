<template>
  <div>
    <!--<Dropdown trigger="click" @on-click="selectLang">-->
      <!--<a href="javascript:void(0)">-->
        <!--{{ title }}-->
        <!--<Icon :size="18" type="md-arrow-dropdown" />-->
      <!--</a>-->
      <!--&lt;!&ndash;<DropdownMenu slot="list">&ndash;&gt;-->
        <!--&lt;!&ndash;<DropdownItem v-for="(value, key) in localList" :name="key" :key="`lang-${key}`">{{ value }}</DropdownItem>&ndash;&gt;-->
      <!--&lt;!&ndash;</DropdownMenu>&ndash;&gt;-->
    <!--</Dropdown>-->
  </div>
</template>

<script>
export default {
  name: 'Language',
  props: {
    lang: String
  },
  data () {
    return {
      langList: {
        // 'zh-CN': '语言',
      },
      localList: {
        // 'zh-CN': '中文简体',
      }
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  },
  computed: {
    title () {
      return this.langList[this.lang]
    }
  },
  methods: {
    selectLang (name) {
      this.$emit('on-lang-change', name)
    }
  }
}
</script>
