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
          v-model="smallDescription"
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
      <v-btn @click="previous" rounded width="15vw">PREVIOUS</v-btn>
      <v-btn
        :disabled="!valid"
        color="teal lighten-2"
        rounded
        width="15vw"
        class="ml-3"
        @click="next"
        >NEXT</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      valid: false,
      smallDescription: "",
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) =>
          (value && value.length <= 255) || "Max 255 characters.",
      },
    };
  },
  computed: {
    ...mapGetters("project", { project: "getAddProject" }),
  },
  created() {
    this.smallDescription = this.project.smallDescription;
  },
  methods: {
    ...mapActions("project", ["saveProjectSmallDescription"]),
    previous() {
      this.$emit("previous");
    },
    next() {
      this.$emit("next");
    },
    update() {
      if (this.$refs.form.validate()) {
        this.saveProjectSmallDescription(this.smallDescription);
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
