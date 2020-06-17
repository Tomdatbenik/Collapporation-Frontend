<template>
  <div>
    <v-row no-gutters
      ><p class="mx-10">
        {{ $t('addProject.addCollapporators.collapporators') }}
      </p></v-row
    >
    <v-row no-gutters
      ><v-chip @click="showAddDialog = true" color="secondary" class="ma-2"
        >{{ $t('addProject.addCollapporators.addCollaporator') }}</v-chip
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
        v-for="collapporator in collapporators"
        :key="collapporator.id"
        color="secondary"
        class="ma-2"
        close
        @click:close="removeCollapporator(collapporator)"
        >{{ collapporator.name }}
      </v-chip>
    </v-row>
    <v-row class="mt-10 mb-5" no-gutters justify="center">
      <v-btn @click="previous" rounded width="15vw">{{ $t('addProject.previous') }}</v-btn>
      <v-btn
        color="teal lighten-2"
        rounded
        width="15vw"
        class="ml-3"
        @click="next"
        >{{ $t('addProject.next') }}</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AddToProjectDialog from '@/components/add-project/AddToProjectDialog.vue'

export default {
  components: {
    AddToProjectDialog
  },
  data() {
    return {
      collapporator: null,
      collapporators: [],
      showAddDialog: false
    }
  },
  computed: {
    ...mapGetters('project', { project: 'getAddProject' })
  },
  created() {
    this.collapporators = this.project.collapporator
  },
  methods: {
    ...mapActions('project', ['saveProjectCollapporators']),

    addCollapporator() {
      this.collapporators.push(this.collapporator)
      this.collapporator = undefined
      this.saveProjectCollapporators(this.collapporators)
    },
    removeCollapporator(collapporator) {
      for (let i = 0; i < this.collapporators.length; i++) {
        if (this.collapporators[i] === collapporator) {
          this.collapporators.splice(i, 1)
        }
      }
      this.saveProjectCollapporators(this.collapporators)
    },
    previous() {
      this.$emit('previous')
    },
    next() {
      this.$emit('next')
    }
  }
}
</script>

<style scoped lang="scss"></style>
