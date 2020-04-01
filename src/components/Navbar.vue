<template>
  <v-app-bar app class="app-bar" flat>
    <v-container class="pa-0">
      <div class="d-flex flex-row white--text">
        <div
          class="headline mb-0 ml-4 .d-sm-none d-flex align-center"
          id="app-title"
        >
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="@/assets/Logo-v1.png"
            transition="scale-transition"
            width="50"
          />
        </div>
        <div class="white--text headline ml-3">
          <span class="font-weight-bold">Coll</span>
          <span class="font-italic" id="app-subtitle">app</span>
          <span class="font-weight-bold">oration</span>
        </div>
        <div class="d-flex ml-auto align-center">
          test
        </div>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#app-title {
  letter-spacing: 0.1em !important;
}

#app-subtitle {
  margin-right: 0.09em;
}

.app-bar {
  background: linear-gradient(
    90deg,
    #36d1dc 0%,
    #3bc8dd 21.04%,
    #47aee0 56.02%,
    #5b86e5 99.44%
  );
}
</style>
