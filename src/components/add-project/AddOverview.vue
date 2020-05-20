<template>
  <div>
    {{ this.overiewProject }}
  </div>
</template>

<script>
export default {
  props: {
    project: Object,
  },
  data() {
    return {
      valid: false,
      overiewProject: this.project || null,
    };
  },
  methods: {
    previous() {
      this.$emit("previous");
    },
    finish() {
      this.$emit("save");
    },
  },
};
</script>

<style scoped lang="scss"></style>
