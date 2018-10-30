<template>
  <v-app dark>
    <app-navigation-drawer/>
    <app-toolbar/>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer app/>
  </v-app>
</template>
<script>
import AppNavigationDrawer from '~/components/app-navigation-drawer.vue'
import AppToolbar from '~/components/app-toolbar.vue'

export default {
  components: {
    AppNavigationDrawer,
    AppToolbar,
  },
}
</script>
