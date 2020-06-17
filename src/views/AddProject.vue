<template>
  <v-container>
    <v-row>
      <v-col xs="12" sm="8" md="9">
        <v-card tile>
          <v-row no-gutters justify="center">
            <v-card-title class="mt-10" color="#696969" style="width: 80%;">
              {{ this.steps[this.currentStep - 1].title }}
              <v-divider
                class="ml-3"
                style="border-width: 1px; border-color: #696969"
              ></v-divider>
            </v-card-title>
          </v-row>
          <v-row no-gutters justify="center">
            <div v-if="currentStep === 1" style="width: 80%;">
              <AddTitle @next="nextStep" />
            </div>

            <div v-if="currentStep === 2" style="width: 80%">
              <AddImage @next="nextStep" @previous="previousStep" />
            </div>

            <div v-if="currentStep === 3" style="width: 80%;">
              <AddSmallDescription @next="nextStep" @previous="previousStep" />
            </div>

            <div v-if="currentStep === 4" style="width: 80%;">
              <AddTags @next="nextStep" @previous="previousStep" />
            </div>

            <div v-if="currentStep === 5" style="width: 80%;">
              <AddLinks @next="nextStep" @previous="previousStep" />
            </div>

            <div v-if="currentStep === 6" style="width: 80%;">
              <AddMarkdownDescription
                @next="nextStep"
                @previous="previousStep"
              />
            </div>

            <div v-if="currentStep === 7" style="width: 80%;">
              <AddCollapporators @next="nextStep" @previous="previousStep" />
            </div>

            <div v-if="currentStep === 8" style="width: 80%;">
              <AddOverview />
            </div>
          </v-row>
        </v-card>
      </v-col>

      <v-col sm="4" md="3" class="d-none d-sm-block">
        <v-card tile class="pb-3">
          <v-card-title color="#696969">
            {{ $t('addProject.createConcept') }}
            <v-divider
              class="ml-3"
              style="border-width: 1px; border-color: #696969"
            ></v-divider>
          </v-card-title>
          <v-row
            no-gutters
            v-for="step in steps"
            :key="step.number"
            @click="currentStep = step.number"
            class="ml-6 mb-3"
          >
            <div
              :style="[
                currentStep == step.number
                  ? { color: 'black', 'font-weight': 'bold' }
                  : { color: 'grey' },
                step.number < currentStep
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
import { mapGetters, mapActions } from 'vuex'

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
        { number: 1, title: '' },
        { number: 2, title: '' },
        {
          number: 3,
          title: ''
        },
        { number: 4, title: '' },
        { number: 5, title: '' },
        {
          number: 6,
          title: ''
        },
        {
          number: 7,
          title: ''
        },
        { number: 8, title: '' }
      ],
      currentStep: 1
    }
  },
  watch: {
    locale: function() {
      this.setLocaleText()
    }
  },
  computed: {
    ...mapGetters({
      project: 'project/getAddProject'
    }),

    locale: function() {
      return this.$i18n.locale
    }
  },
  created() {
    this.saveAddProject(null)
    this.setLocaleText()
  },
  methods: {
    ...mapActions('project', ['saveAddProject']),
    setLocaleText() {
      this.steps[0].title = this.$t('addProject.addTitle.title')
      this.steps[1].title = this.$t('addProject.addImage.image')
      this.steps[2].title = this.$t(
        'addProject.addSmallDescription.smallDescription'
      )
      this.steps[3].title = this.$t('addProject.addTags.tags')
      this.steps[4].title = this.$t('addProject.addLinks.links')
      this.steps[5].title = this.$t(
        'addProject.addMarkdownDescription.MarkdownDescription'
      )
      this.steps[6].title = this.$t(
        'addProject.addCollapporators.collaporatorsTitle'
      )
      this.steps[7].title = this.$t('addProject.addOverview.overview')
    },
    nextStep() {
      // this.currentStep = this.steps[this.currentStep.number]
      this.currentStep++
    },
    previousStep() {
      // this.currentStep = this.steps[this.currentStep.number - 2]
      this.currentStep--
    }
  }
}
</script>

<style scoped lang="scss"></style>
