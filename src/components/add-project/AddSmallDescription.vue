<template>
  <div>
    <div>
      <p class="mx-10">
        This description will be shown in the feed. Describe your project in a
        few lines to enthuse other collapporators.
      </p>
      <v-form ref="form" v-model="valid">
        <v-textarea
          autofocus
          v-model="projectSmallDescription"
          label="Small description"
          filled
          clearable
          no-resize
          rows="5"
          class="mx-10"
          :rules="[rules.required, rules.counter]"
          @change="update"
        ></v-textarea>
      </v-form>
    </div>
    <v-row class="mt-10" no-gutters justify="center">
      <v-btn @click="previous" rounded width="20vw">PREVIOUS</v-btn>
      <v-btn
        :disabled="!valid"
        color="teal lighten-2"
        rounded
        width="20vw"
        class="ml-3"
        @click="next"
        >NEXT</v-btn
      >
    </v-row>
  </div>
</template>

<script>
export default {
  props: ["smallDescription"],
  data() {
    return {
      valid: false,
      projectSmallDescription: this.smallDescription || "",
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length <= 255 || "Max 255 characters.",
      },
    };
  },
  methods: {
    previous() {
      this.$emit("previous");
    },
    next() {
      this.$emit("next");
    },
    update() {
      this.$emit("updated", this.projectSmallDescription);
    },
  },
};
</script>

<style scoped lang="scss"></style>
