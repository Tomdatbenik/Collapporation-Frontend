<template>
  <div>
    <p class="mx-10">
      The markdown description is where you put an extensive description of what
      your project is about. You can provide additional information on the idea
      behind the concept, design choices, used techniques together with images.
    </p>
    <v-textarea
      autofocus
      v-model="projectDescription"
      label="Description"
      filled
      clearable
      no-resize
      rows="10"
      class="mx-10"
      @change="update"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  props: ["description"],
  data() {
    return {
      projectDescription: this.description,
    };
  },
  methods: {
    update() {
      this.$emit("updated", this.projectDescription);
    },
  },
};
</script>

<style scoped lang="scss"></style>
