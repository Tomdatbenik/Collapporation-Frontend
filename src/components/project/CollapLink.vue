<template>
  <div v-if="editable" @click="remove" class="remove">
    <v-icon color="#4D4D4D" class="ml-1">mdi-{{ name }}</v-icon>
    <v-icon color="#F29B9B">mdi-close</v-icon>
  </div>
  <v-icon v-else @click="relocate" color="#4D4D4D" class="ml-1"
    >mdi-{{ name }}</v-icon
  >
</template>
<script>
export default {
  name: 'CollapLink',
  props: {
    link: String,
    editable: Boolean,
    name: String
  },
  methods: {
    relocate: function() {
      window.open(this.link)
    },
    remove: function() {
      this.$emit('clicked', this.name)
    }
  }
}
</script>

<style scoped>
.remove:hover {
  cursor: pointer;
}
</style>
