<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <v-card tile height="70vh">
          <v-card-title color="#696969">
            {{ this.currentStep.title }}
            <v-divider
              class="ml-3"
              style="border-width: 1px; border-color: #696969"
            ></v-divider>
          </v-card-title>
          <v-row no-gutters>
            <div
              v-if="currentStep.number === 1"
              style="width: 100%; heigth: 100%;"
            >
              <v-text-field
                label="Title"
                filled
                clearable
                class="ml-10 mr-10"
              ></v-text-field>
            </div>
            <div v-if="currentStep.number === 2">
              <v-file-input></v-file-input>
            </div>
            <div
              v-if="currentStep.number === 3"
              style="width: 100%; heigth: 100%;"
            >
              <v-textarea
                label="Small description"
                filled
                clearable
                no-resize
                rows="5"
                class="ml-10 mr-10"
              ></v-textarea>
            </div>
            <div v-if="currentStep.number === 4">
              Tags stuf enzo
            </div>
            <div v-if="currentStep.number === 5">
              Links stuf enzo
            </div>
            <div v-if="currentStep.number === 6">
              Markdown description stuf enzo
            </div>
            <div v-if="currentStep.number === 7">
              Collapporators stuf enzo
            </div>
            <div v-if="currentStep.number === 8">
              Overview stuf enzo
            </div></v-row
          >
          <v-row no-gutters class="justify-center">
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
        <v-card tile>
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
export default {
  data() {
    return {
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
        title: { type: String },
        image: { type: String },
        smallDescription: { type: String },
        tags: { type: Array },
        links: { type: Array },
        description: { type: String },
        collapporators: { type: Array },
      },
    };
  },
  methods: {
    saveProject() {
      console.log(this.project);
    },
  },
};
</script>

<style scoped lang="scss"></style>
