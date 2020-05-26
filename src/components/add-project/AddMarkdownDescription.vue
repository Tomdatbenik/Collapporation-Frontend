<template>
  <div>
    <v-row>
      <p class="mx-10">
        The markdown description is where you put an extensive description of
        what your project is about. You can provide additional information on
        the idea behind the concept, design choices, used techniques together
        with images.
      </p>
      <v-switch
        class="editPreviewSwitch"
        v-model="togglePreview"
        label="Preview"
      ></v-switch>
    </v-row>
    <v-row>
      <v-textarea
        v-if="!togglePreview"
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
      <markdown-it-vue
        v-else
        class="md-body"
        :content="this.projectDescription"
      />
    </v-row>
    <v-row class="mt-10" no-gutters justify="center">
      <v-btn @click="previous" rounded width="15vw">PREVIOUS</v-btn>
      <v-btn
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
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";

export default {
  components: {
    MarkdownItVue,
  },
  props: ["description"],
  data() {
    return {
      togglePreview: false,
      projectDescription: this.description || "",
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
      this.$emit("updated", this.projectDescription);
    },
  },
};
</script>

<style scoped lang="scss">
.editPreviewSwitch::before {
  content: "Edit";
  color: black;
}
</style>
