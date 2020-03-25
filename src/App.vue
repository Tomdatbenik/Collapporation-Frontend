<template>
  <v-app
    style="background: linear-gradient(90deg, #36d1dc 0%, #3bc8dd 21.04%, #47aee0 56.02%, #5b86e5 99.44%)"
  >
    <v-app-bar app color="rgb(255, 0, 0, 0)" flat>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/Logo-v1.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <div class="headline mb-0 ml-4 .d-sm-none" id="app-title">
        <span class="font-weight-bold">Coll</span
        ><span class="font-italic" id="app-subtitle">app</span
        ><span class="font-weight-bold">oration</span>
      </div>
      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
#app-title {
  letter-spacing: 0.1em !important;
}

#app-subtitle {
  margin-right: 0.09em;
}
</style>
