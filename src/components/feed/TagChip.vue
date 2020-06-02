<template>
  <v-chip class="ml-1" color="#EBE9E9">
    <div style="color: #696969">
      {{ text }}
    </div>
  </v-chip>
</template>

<script>
export default {
  name: 'TagChip',
  props: {
    text: String
  }
}
</script>

<style scoped></style>
