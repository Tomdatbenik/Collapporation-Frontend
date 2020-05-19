<template>
  <div>
    <p class="mx-10">
      The title will be shown as header in the feed. Pick something that
      describes your project best in a few words. This title will also be used
      in filtering for keywords.
    </p>
    <v-text-field
      autofocus
      v-model="projectTitle"
      label="Title"
      filled
      clearable
      class="mx-10"
      @change="update"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      projectTitle: this.title,
    };
  },
  methods: {
    update() {
      this.$emit("updated", this.projectTitle);
    },
  },
};
</script>

<style scoped lang="scss"></style>
