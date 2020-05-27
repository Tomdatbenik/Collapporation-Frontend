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
              <AddTitle @next="nextStep" />
            </div>

            <div v-if="currentStep.number === 2" style="width: 80%">
              <AddImage @next="nextStep" @previous="previousStep" />
            </div>

            <div v-if="currentStep.number === 3" style="width: 80%;">
              <AddSmallDescription @next="nextStep" @previous="previousStep" />
            </div>

            <div v-if="currentStep.number === 4" style="width: 80%;">
              <AddTags @next="nextStep" @previous="previousStep" />
            </div>

            <div v-if="currentStep.number === 5" style="width: 80%;">
              <AddLinks @next="nextStep" @previous="previousStep" />
            </div>

            <div v-if="currentStep.number === 6" style="width: 80%;">
              <AddMarkdownDescription
                @next="nextStep"
                @previous="previousStep"
              />
            </div>

            <div v-if="currentStep.number === 7" style="width: 80%;">
              <AddCollapporators @next="nextStep" @previous="previousStep" />
            </div>

            <div v-if="currentStep.number === 8" style="width: 80%;">
              <AddOverview />
            </div>
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
                  : ''
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
import AddTitle from '@/components/add-project/AddTitle.vue'
import AddImage from '@/components/add-project/AddImage.vue'
import AddSmallDescription from '@/components/add-project/AddSmallDescription.vue'
import AddTags from '@/components/add-project/AddTags.vue'
import AddLinks from '@/components/add-project/AddLinks.vue'
import AddMarkdownDescription from '@/components/add-project/AddMarkdownDescription.vue'
import AddCollapporators from '@/components/add-project/AddCollapporators.vue'
import AddOverview from '@/components/add-project/AddOverview.vue'

export default {
  components: {
    AddTitle,
    AddImage,
    AddSmallDescription,
    AddTags,
    AddLinks,
    AddMarkdownDescription,
    AddCollapporators,
    AddOverview
  },
  data() {
    return {
      steps: [
        { number: 1, title: 'Title' },
        { number: 2, title: 'Image' },
        { number: 3, title: 'Small description' },
        { number: 4, title: 'Tags' },
        { number: 5, title: 'Links' },
        { number: 6, title: 'Markdown description' },
        { number: 7, title: 'Collapporators' },
        { number: 8, title: 'Overview' }
      ],
      currentStep: { number: 1, title: 'Title' }
    }
  },
  methods: {
    nextStep() {
      this.currentStep = this.steps[this.currentStep.number]
    },
    previousStep() {
      this.currentStep = this.steps[this.currentStep.number - 2]
    }
  }
}
</script>

<style scoped lang="scss"></style>
