<template>
  <div>
    <p class="mx-10">
      This description will be shown in the feed. Describe your project in a few
      lines to enthuse other collapporators.
    </p>
    <v-textarea
      autofocus
      v-model="projectSmallDescription"
      label="Small description"
      filled
      clearable
      no-resize
      rows="5"
      class="mx-10"
      @change="update"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: ["smallDescription"],
  data() {
    return {
      projectSmallDescription: this.smallDescription,
    };
  },
  methods: {
    update() {
      this.$emit("updated", this.projectSmallDescription);
    },
  },
};
</script>

<style scoped lang="scss"></style>
