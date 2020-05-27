<template>
  <div>
    <v-row no-gutters
      ><p class="mx-10">
        The tags will be shown in the feed. These tags describe the catagories
        or used techniques of the concept. Tags will also be used in filtering.
      </p></v-row
    >
    <v-row no-gutters
      ><v-chip @click="showAddDialog = true" color="secondary" class="ma-2"
        >+ ADD TAG</v-chip
      >
      <AddToProjectDialog
        title="Add Tags"
        v-model="showAddDialog"
        :add="addTag"
      >
        <v-form slot="content" ref="form" v-model="valid"
          ><v-text-field
            autofocus
            v-model="tagName"
            label="Tag name"
            filled
            :rules="[rules.required, rules.unique]"
            clearable
            class="mx-10"
          ></v-text-field
        ></v-form>
        <div slot="buttons">
          <v-btn
            @click="addTag"
            :disabled="!valid"
            color="teal lighten-2"
            rounded
            class="ml-3"
            >ADD</v-btn
          >
        </div>
      </AddToProjectDialog>
    </v-row>
    <v-row no-gutters>
      <v-chip
        v-for="tag in tags"
        :key="tag + '-key'"
        color="secondary"
        class="ma-2"
        close
        @click:close="removeTag(tag)"
        >{{ tag }}
      </v-chip>
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
import { mapGetters, mapActions } from "vuex";
import AddToProjectDialog from "@/components/add-project/AddToProjectDialog.vue";

export default {
  components: {
    AddToProjectDialog,
  },
  data() {
    return {
      valid: false,
      tagName: "",
      tags: [],
      showAddDialog: false,
      rules: {
        required: (value) => !!value || "Required.",
        unique: (value) => {
          let existing = false;
          if (value) {
            this.tags.forEach((tag) => {
              if (tag.toLowerCase() === value.toLowerCase()) {
                existing = true;
              }
            });
          }
          return !existing || "This tag already exists.";
        },
      },
    };
  },
  computed: {
    ...mapGetters("project", { project: "getAddProject" }),
  },
  created() {
    this.tags = this.project.tags;
  },
  methods: {
    ...mapActions("project", ["saveProjectTags"]),
    addTag() {
      if (this.$refs.form.validate()) {
        this.tags.push(this.tagName);
        this.saveProjectTags(this.tags);
      }
      this.tagName = "";
    },
    removeTag(tag) {
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i] === tag) {
          this.tags.splice(i, 1);
        }
      }
      this.saveProjectTags(this.tags);
    },
    previous() {
      this.$emit("previous");
    },
    next() {
      this.$emit("next");
    },
  },
};
</script>

<style scoped lang="scss"></style>
