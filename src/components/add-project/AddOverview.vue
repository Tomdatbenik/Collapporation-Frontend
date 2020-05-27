<template>
  <div>
    <v-card>
      <v-card-title>{{
        project.title ? project.title : "No title yet..."
      }}</v-card-title>
      <v-card-subtitle>{{
        project.smallDescription
          ? project.smallDescription
          : "No small description yet..."
      }}</v-card-subtitle>
      <v-row class="mx-1">
        <v-col cols="6" v-if="project.tags.length > 0"
          >Tags:<v-chip
            v-for="tag in project.tags"
            :key="tag + '-key'"
            color="secondary"
            class="ma-2"
            >{{ tag }}
          </v-chip></v-col
        >
        <v-col cols="6" v-else>
          No tags...
        </v-col>
        <v-col cols="6" v-if="project.links.length > 0">
          Links:<v-chip
            v-for="link in project.links"
            :key="link + '-key'"
            color="secondary"
            class="ma-2"
            >{{ link }}
          </v-chip></v-col
        >
        <v-col cols="6" v-else>
          No links...
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-card color="primary" class="ma-2">
          <v-card-title>Collapporatorname</v-card-title>
        </v-card>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          class="mt-3"
          style="border-radius: 7.5px 7.5px 0 0; background-color: whitesmoke; height: 19em;"
          ><markdown-it-vue
            class="md-body mx-2 my-2"
            :content="this.project.description"
        /></v-col>
      </v-row>
    </v-card>
    <v-row class="mt-10" no-gutters justify="center">
      <v-btn @click="previous" rounded width="15vw">PREVIOUS</v-btn>
      <v-btn
        color="teal lighten-2"
        rounded
        width="15vw"
        class="ml-3"
        @click="finish"
        >FINISH</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MarkdownItVue from "markdown-it-vue";
import "markdown-it-vue/dist/markdown-it-vue.css";

export default {
  components: {
    MarkdownItVue,
  },
  data() {
    return {
      valid: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  computed: {
    ...mapGetters("project", { project: "getAddProject" }),
  },
  methods: {
    previous() {
      this.$emit("previous");
    },
    finish() {
      console.log("yeet");
    },
  },
};
</script>

<style scoped lang="scss"></style>
