<template>
  <v-app-bar app class="background">
    <v-toolbar-items class="align-center">
      <v-app-bar-nav-icon min-width="105">
        <v-img v-bind:src="require('../assets/Logo.png')"></v-img>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Coll<p class="font-italic d-inline">app</p>oration</v-toolbar-title>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn color="white" text>Login</v-btn>
      <v-btn color="white" text>Register</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
  export default {
    name: "Navbar"
  }
</script>

<style scoped>
.background {
  background: linear-gradient(to right, #36d1dc, #3bc8dd, #47aee0, #5b86e5);
}
</style>