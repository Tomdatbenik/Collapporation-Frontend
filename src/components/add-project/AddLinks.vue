<template>
  <div>
    <v-row no-gutters
      ><p class="mx-10">
        The links will be shown in your project page. Include links of your
        github page or additional resources.
      </p></v-row
    >
    <v-row no-gutters
      ><v-chip @click="showAddDialog = true" color="secondary" class="ma-2"
        >+ ADD LINK</v-chip
      >
      <AddToProjectDialog
        title="Add Links"
        v-model="showAddDialog"
        v-on:add="addLink"
      >
        <v-text-field
          autofocus
          slot="content"
          v-model="linkName"
          label="Link"
          filled
          clearable
          class="mx-10"
        ></v-text-field>
      </AddToProjectDialog>
    </v-row>
    <v-row no-gutters>
      <v-chip
        v-for="link in projectLinks"
        :key="link"
        color="secondary"
        class="ma-2"
        close
        @click:close="removeLink(link)"
        >{{ link }}
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
    links: Array,
  },
  data() {
    return {
      linkName: "",
      projectLinks: this.links,
      showAddDialog: false,
    };
  },
  methods: {
    addLink() {
      this.projectLinks.push(this.linkName);
      this.linkName = "";
      this.update();
    },
    removeLink(link) {
      for (let i = 0; i < this.projectLinks.length; i++) {
        if (this.projectLinks[i] === link) {
          this.projectLinks.splice(i, 1);
        }
      }
      this.update();
    },
    update() {
      this.$emit("updated", this.projectLinks);
    },
  },
};
</script>

<style scoped lang="scss"></style>
