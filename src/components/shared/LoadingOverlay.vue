<template>
  <div class="text-center">
    <v-overlay :value="loading" opacity="1" light color="#fff">
      <v-progress-circular
        indeterminate
        size="64"
        color="blue-400"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('user', ['loading'])
  }
}
</script>

<style lang="scss" scoped></style>
