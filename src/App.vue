<template>
  <v-app>
    <Navbar />
    <v-content class="bg-color">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/navbar/Navbar.vue";

export default {
  name: "App",

  components: {
    Navbar
  },

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
#app {
  background: none;
}

body {
  background-color: #f9f9f9;
}

@media (min-width: 1904px) {
  .container {
    max-width: 65% !important;
  }
}
</style>
