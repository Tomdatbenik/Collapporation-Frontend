<template>
  <v-btn
    :width="width"
    tile
    color="white grey--text text--darken-2 text-capitalize pa-0"
  >
    <div class="d-flex flex-row justify-start" style="width: 100%">
      <v-img
        max-height="24px"
        max-width="24px"
        class="ma-2"
        contain
        :src="require('@/assets/logo_google.svg')"
      ></v-img>
      <div class="ma-2 d-flex align-center justify-start">
        Sign in with Google
      </div>
    </div>
  </v-btn>
</template>

<script>
export default {
  name: "GoogleLoginButton",
  props: {
    width: String
  }
};
</script>

<style lang="scss" scoped></style>
