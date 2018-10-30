<template>
  <v-toolbar
    color="red"
    dense
    fixed
    clipped-left
    app
  >
    <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
    <!-- <v-icon class="mx-3">fab fa-youtube</v-icon> -->
    <v-toolbar-title class="mr-5 align-center">
      <span class="title">RFID Reader WebConfig</span>
    </v-toolbar-title>
  </v-toolbar>
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
