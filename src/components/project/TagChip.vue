<template>
  <v-chip
    @click="click"
    class="ml-1"
    :color="color"
    :style="{ height: height }"
  >
    <div :style="{ color: textColor, fontSize: textSize }">
      {{ text }}
    </div>
    <v-icon :size="textSize" :color="textColor" v-if="editable" class="ml-1"
      >mdi-close</v-icon
    >
  </v-chip>
</template>

<script>
export default {
  name: 'TagChip',
  props: {
    text: String,
    height: String,
    color: String,
    textColor: String,
    editable: Boolean,
    textSize: String
  },
  methods: {
    click() {
      this.$emit('clicked', this.text)
    }
  }
}
</script>

<style scoped></style>
