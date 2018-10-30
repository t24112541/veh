<template>
  <v-navigation-drawer app v-model="drawer"/>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer
      },
      set(v) {
        this.$store.commit('setDrawer', v)
      },
    },
  },
}
</script>
