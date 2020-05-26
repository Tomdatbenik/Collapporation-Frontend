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
          v-model="title"
          label="Title"
          filled
          clearable
          :rules="[rules.required]"
          class="mx-10"
          @change="update"
          @click:clear="remove"
        ></v-text-field
      ></v-form>
    </div>
    <v-row class="mt-10" no-gutters justify="center">
      <v-btn rounded width="15vw">CANCEL</v-btn>
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
      title: "",
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    ...mapGetters("project", { project: "getAddProject" }),
  },
  created() {
    this.title = this.project.title;
  },
  methods: {
    ...mapActions("project", ["saveProjectTitle"]),
    next() {
      this.$emit("next");
    },
    update() {
      if (this.$refs.form.validate()) {
        this.saveProjectTitle(this.title);
      }
    },
    remove() {
      this.saveProjectTitle("");
    },
  },
};
</script>

<style scoped lang="scss"></style>
