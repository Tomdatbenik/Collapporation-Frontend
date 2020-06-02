<template>
  <v-btn
    :width="width"
    tile
    color="blue darken-4 white--text text-capitalize pa-0"
  >
    <div class="d-flex flex-row justify-start" style="width: 100%">
      <v-icon class="ma-2" color="white">mdi-facebook</v-icon>

      <div class="ma-2 d-flex align-center justify-start">
        Sign in with Facebook
      </div>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: 'FacebookLoginButton',
  props: {
    width: String
  }
}
</script>

<style lang="scss" scoped></style>
