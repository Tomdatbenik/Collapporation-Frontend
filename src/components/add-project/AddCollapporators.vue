<template>
  <div>
    <v-row no-gutters
      ><p class="mx-10">
        Collapporators are all the users that are working on the concept or
        project. By adding a collapporator you will send them an invite for you
        concept.
      </p></v-row
    >
    <v-row no-gutters
      ><v-chip @click="showAddDialog = true" color="secondary" class="ma-2"
        >+ ADD COLLAPPORATOR</v-chip
      >
      <AddToProjectDialog
        title="Add Collapporators"
        v-model="showAddDialog"
        v-on:add="addCollapporator"
      >
        <p slot="content" class="mx-10">
          TODO ADD A CLICKABLE LIST OF COLLAPPORATORS HERE
        </p>
      </AddToProjectDialog>
    </v-row>
    <v-row no-gutters>
      <v-chip
        v-for="collapporator in projectCollapporators"
        :key="collapporator.id"
        color="secondary"
        class="ma-2"
        >{{ collapporator.name }}
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
    collapporators: Array,
  },
  data() {
    return {
      collapporator: Object,
      projectCollapporators: this.collapporators,
      showAddDialog: false,
    };
  },
  methods: {
    addCollapporator() {
      this.projectCollapporators.push(this.collapporator);
      this.collapporator = undefined;
      this.update();
    },
    update() {
      this.$emit("updated", this.projectCollapporators);
    },
  },
};
</script>

<style scoped lang="scss"></style>
