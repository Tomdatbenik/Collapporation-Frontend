<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <v-card tile height="70vh">
          <v-row no-gutters justify="center">
            <v-card-title class="mt-10" color="#696969" style="width: 80%;">
              {{ this.currentStep.title }}
              <v-divider
                class="ml-3"
                style="border-width: 1px; border-color: #696969"
              ></v-divider>
            </v-card-title>
          </v-row>
          <v-row no-gutters justify="center">
            <div v-if="currentStep.number === 1" style="width: 80%;">
              <p class="mx-10">
                The title will be shown as header in the feed. Pick something
                that describes your project best in a few words. This title will
                also be used in filtering for keywords.
              </p>
              <v-text-field
                v-model="project.title"
                label="Title"
                filled
                clearable
                class="mx-10"
              ></v-text-field>
            </div>

            <div v-if="currentStep.number === 2" style="width: 80%">
              <v-row no-gutters
                ><v-col cols="7"
                  ><p class="mx-10">
                    This image will be shown in the feed. Pick something
                    attractive to lure as many collapporators as possible.
                  </p>
                  <v-file-input
                    v-model="project.image"
                    class="mx-10"
                  ></v-file-input
                ></v-col>
                <v-col cols="5">
                  <div
                    class="mr-10"
                    style="width: 20vw; height: 20vh; background-color: grey;"
                  ></div> </v-col
              ></v-row>
            </div>

            <div v-if="currentStep.number === 3" style="width: 80%;">
              <p class="mx-10">
                This description will be shown in the feed. Describe your
                project in a few lines to enthuse other collapporators.
              </p>
              <v-textarea
                v-model="project.smallDescription"
                label="Small description"
                filled
                clearable
                no-resize
                rows="5"
                class="mx-10"
              ></v-textarea>
            </div>

            <div v-if="currentStep.number === 4" style="width: 80%;">
              <v-row no-gutters
                ><p class="mx-10">
                  The tags will be shown in the feed. These tags describe the
                  catagories or used techniques of the concept. Tags will also
                  be used in filtering.
                </p></v-row
              >
              <v-row no-gutters
                ><v-chip
                  @click="showAddDialog = true"
                  color="secondary"
                  class="ma-2"
                  >+ ADD TAG</v-chip
                >
                <AddToProjectDialog
                  title="Add Tags"
                  v-model="showAddDialog"
                  v-on:add="addTag"
                >
                  <v-text-field
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
                  v-for="tag in project.tags"
                  :key="tag"
                  color="secondary"
                  class="ma-2"
                  >{{ tag }}
                </v-chip>
              </v-row>
            </div>

            <div v-if="currentStep.number === 5" style="width: 80%;">
              <v-row no-gutters
                ><p class="mx-10">
                  The links will be shown in your project page. Include links of
                  your github page or additional resources.
                </p></v-row
              >
              <v-row no-gutters
                ><v-chip
                  @click="showAddDialog = true"
                  color="secondary"
                  class="ma-2"
                  >+ ADD LINK</v-chip
                >
                <AddToProjectDialog
                  title="Add Links"
                  v-model="showAddDialog"
                  v-on:add="addLink"
                >
                  <v-text-field
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
                  v-for="link in project.links"
                  :key="link"
                  color="secondary"
                  class="ma-2"
                  >{{ link }}
                </v-chip>
              </v-row>
            </div>

            <div v-if="currentStep.number === 6" style="width: 80%;">
              <p class="mx-10">
                The markdown description is where you put an extensive
                description of what your project is about. You can provide
                additional information on the idea behind the concept, design
                choices, used techniques together with images.
              </p>
              <v-textarea
                v-model="project.description"
                label="Description"
                filled
                clearable
                no-resize
                rows="10"
                class="mx-10"
              ></v-textarea>
            </div>

            <div v-if="currentStep.number === 7">
              Collapporators stuf enzo
            </div>

            <div v-if="currentStep.number === 8">
              Overview stuf enzo
            </div>
          </v-row>
          <v-row class="mt-10" no-gutters justify="center">
            <v-btn v-if="currentStep.number === 1" rounded width="20vw"
              >CANCEL</v-btn
            >
            <v-btn
              v-else
              @click="currentStep = steps[currentStep.number - 2]"
              rounded
              width="20vw"
              >PREVIOUS</v-btn
            >
            <v-btn
              v-if="currentStep.number !== 8"
              color="teal lighten-2"
              rounded
              width="20vw"
              class="ml-3"
              @click="currentStep = steps[currentStep.number]"
              >NEXT</v-btn
            >
            <v-btn
              v-else
              color="teal lighten-2"
              rounded
              width="20vw"
              class="ml-3"
              @click="saveProject()"
            >
              FINISH
            </v-btn>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card tile class="pb-3">
          <v-card-title color="#696969">
            Create Concept
            <v-divider
              class="ml-3"
              style="border-width: 1px; border-color: #696969"
            ></v-divider>
          </v-card-title>
          <v-row
            no-gutters
            v-for="step in steps"
            :key="step.number"
            @click="currentStep = step"
            class="ml-6 mb-3"
          >
            <div
              :style="[
                currentStep.number == step.number
                  ? { color: 'black', 'font-weight': 'bold' }
                  : { color: 'grey' },
                step.number < currentStep.number
                  ? { 'text-decoration': 'line-through' }
                  : '',
              ]"
            >
              {{ step.number }}. {{ step.title }}
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import AddTagsDialog from "@/components/add-project/AddTagsDialog.vue";
import AddToProjectDialog from "@/components/add-project/AddToProjectDialog.vue";
export default {
  components: {
    // AddTagsDialog,
    AddToProjectDialog,
  },
  data() {
    return {
      tagName: "",
      linkName: "",
      showAddDialog: false,
      steps: [
        { number: 1, title: "Title" },
        { number: 2, title: "Image" },
        { number: 3, title: "Small description" },
        { number: 4, title: "Tags" },
        { number: 5, title: "Links" },
        { number: 6, title: "Markdown description" },
        { number: 7, title: "Collapporators" },
        { number: 8, title: "Overview" },
      ],
      currentStep: { number: 1, title: "Title" },
      project: {
        title: { type: String, value: "" },
        image: { type: String },
        smallDescription: { type: String },
        tags: { type: Array },
        links: { type: Array },
        description: { type: String },
        collapporators: { type: Array },
      },
    };
  },
  created() {
    this.project.title = "";
    this.project.image = "";
    this.project.smallDescription = "";
    this.project.tags = [];
    this.project.links = [];
    this.project.description = [];
    this.project.collapporators = [];
  },
  methods: {
    addTag() {
      this.project.tags.push(this.tagName);
      this.tagName = "";
    },
    addLink() {
      this.project.links.push(this.linkName);
      this.linkName = "";
    },
    saveProject() {
      console.log(this.project);
    },
  },
};
</script>

<style scoped lang="scss"></style>
