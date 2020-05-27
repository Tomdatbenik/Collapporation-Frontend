<template>
  <v-chip
    @click="followed = !followed"
    :color="color"
    class="ml-1 like-button"
    v-if="followed"
    :style="{ color: textColor }"
  >
    <v-icon :color="textColor" class="mr-2">mdi-heart</v-icon>
    Follow
  </v-chip>
  <v-chip
    @click="followed = !followed"
    :color="color"
    class="ml-1 like-button"
    v-else
    :style="{ color: textColor }"
  >
    <v-icon :color="textColor" class="mr-2">mdi-heart-outline</v-icon>
    Follow
  </v-chip>
</template>

<script>
export default {
  name: 'FollowButton',
  props: {
    color: String,
    textColor: String
  },
  data() {
    return {
      followed: false
    }
  }
}
</script>

<style scoped></style>
