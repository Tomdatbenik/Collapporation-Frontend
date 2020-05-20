<template>
  <div>
    <div>
      <p class="mx-10">
        The title will be shown as header in the feed. Pick something that
        describes your project best in a few words. This title will also be used
        in filtering for keywords.
      </p>
      <v-form ref="form" v-model="valid">
        <v-text-field
          autofocus
          v-model="projectTitle"
          label="Title"
          filled
          clearable
          :rules="[rules.required]"
          class="mx-10"
          @change="update"
        ></v-text-field
      ></v-form>
    </div>
    <v-row class="mt-10" no-gutters justify="center">
      <v-btn rounded width="20vw">CANCEL</v-btn>
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
  props: ["title"],
  data() {
    return {
      valid: false,
      projectTitle: this.title || "",
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    next() {
      this.$emit("next");
    },
    update() {
      if (this.$refs.form.validate()) {
        this.$emit("updated", this.projectTitle);
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
