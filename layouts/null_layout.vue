<template>
<v-app>
    <div>

            <nuxt/>

        <v-footer
            dark
            height="auto"
        >
            <v-card
            class="flex"
            flat
            tile
            >


            <v-card-actions class="grey darken-3 justify-center">
                <v-spacer></v-spacer>
                &copy;2018-<strong>CV</strong>
            </v-card-actions>
            </v-card>
        </v-footer>
    </div>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      icons: [
       
      ]
    })
  }
</script>
