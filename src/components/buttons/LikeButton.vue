<template>
  <v-chip
    @click="click"
    :color="color"
    class="ml-1 like-button"
    v-if="liked"
    :style="{ color: textColor }"
  >
    <v-icon :color="textColor" class="mr-2">mdi-thumb-up</v-icon>
    {{ likeCount }}
  </v-chip>
  <v-chip
    @click="click"
    :color="color"
    class="ml-1 like-button"
    v-else
    :style="{ color: textColor }"
  >
    <v-icon :color="textColor" class="mr-2">mdi-thumb-up-outline</v-icon>
    {{ likeCount }}
  </v-chip>
</template>

<script>
export default {
  name: 'LikeButton',
  props: {
    likes: Number,
    textColor: String,
    color: String
  },
  data() {
    return {
      liked: false,
      likeCount: 0
    }
  },
  created() {
    this.likeCount = this.likes
  },
  methods: {
    click() {
      this.liked = !this.liked
      if (this.liked) {
        this.likeCount++
      } else this.likeCount--
      this.$emit('clicked')
    }
  }
}
</script>

<style scoped>
.like-button {
  color: #696969;
}
</style>
