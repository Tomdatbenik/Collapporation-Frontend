<template>
  <v-chip
    @click="followed = !followed"
    color="#EBE9E9"
    class="ml-1 like-button"
    v-if="followed"
  >
    <v-icon color="#696969" class="mr-2">mdi-heart</v-icon> Follow
  </v-chip>
  <v-chip
    @click="followed = !followed"
    color="#EBE9E9"
    class="ml-1 like-button"
    v-else
  >
    <v-icon color="#696969" class="mr-2">mdi-heart-outline</v-icon> Follow
  </v-chip>
</template>

<script>
export default {
  name: "FollowButton",
  data() {
    return {
      followed: false
    };
  }
};
</script>

<style scoped></style>
