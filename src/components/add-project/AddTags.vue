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
        v-on:add="addTag"
      >
        <v-text-field
          autofocus
          slot="content"
          v-model="tagName"
          label="Tag name"
          filled
          clearable
          class="mx-10"
        ></v-text-field>
      </AddToProjectDialog>
    </v-row>
    <v-row no-gutters>
      <v-chip
        v-for="tag in projectTags"
        :key="tag"
        color="secondary"
        class="ma-2"
        close
        @click:close="removeTag(tag)"
        >{{ tag }}
      </v-chip>
    </v-row>
  </div>
</template>

<script>
import AddToProjectDialog from "@/components/add-project/AddToProjectDialog.vue";
export default {
  components: {
    AddToProjectDialog,
  },
  props: {
    tags: Array,
  },
  data() {
    return {
      tagName: "",
      projectTags: this.tags,
      showAddDialog: false,
    };
  },
  methods: {
    addTag() {
      this.projectTags.push(this.tagName);
      this.tagName = "";
      this.update();
    },
    removeTag(tag) {
      for (let i = 0; i < this.projectTags.length; i++) {
        if (this.projectTags[i] === tag) {
          this.projectTags.splice(i, 1);
        }
      }
      this.update();
    },
    update() {
      this.$emit("updated", this.projectTags);
    },
  },
};
</script>

<style scoped lang="scss"></style>
