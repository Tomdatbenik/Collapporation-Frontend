<template>
  <div>
    <v-stepper v-model="currentStep">
      <v-row>
        <v-col>
          <template v-for="step in steps">
            <v-stepper-content
              :key="`${step.number}-content`"
              :step="step.number"
            >
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              ></v-card>

              <v-btn color="primary" @click="nextStep(step.number)">
                Continue
              </v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
          </template>
        </v-col>
        <v-col>
          <template v-for="step in steps">
            <v-stepper-step
              :key="`${step.number}-step`"
              :complete="currentStep > step.number"
              :step="step.number"
              :editable="true"
            >
              {{ step.title }}
            </v-stepper-step>
          </template>
        </v-col>
      </v-row>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
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
    nextStep(step) {
      if (step === this.steps) {
        this.saveProject();
      } else {
        this.currentStep = step + 1;
      }
    },
    saveProject() {
      console.log(this.project);
    },
  },
};
</script>

<style scoped lang="scss"></style>
