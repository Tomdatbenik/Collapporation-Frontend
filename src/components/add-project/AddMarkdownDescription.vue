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
      projectDescription:
        "# allo dit is een coole markdown" || this.description,
    };
  },
  methods: {
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
