<template>
  <v-container>
    <v-row class="d-flex flex-wrap" v-if="project">
      <v-col class="d-flex">
        <v-avatar
          min-height="100"
          min-width="100"
          max-height="300"
          max-width="300"
          size="100%"
          tile
        >
          <v-img contain v-if="project.img" :src="project.img"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="d-flex flex-column">
        <h1>
          {{ project.title
          }}<v-divider
            style="border-width: 1px; border-color: #696969;"
          ></v-divider>
        </h1>
        <p>{{ project.smallDescription }}</p>
      </v-col>
      <v-col
        align="end"
        cols="12"
        v-if="project.tags.length > 0 || project.links.length > 0"
        ><div v-if="project.tags.length > 0">
          <h4>Tags</h4>
          <v-chip v-for="(tag, index) in project.tags" :key="index">{{
            tag
          }}</v-chip>
        </div>
        <div v-if="project.links.length > 0">
          <h4>Links</h4>
          <v-chip v-for="(link, index) in project.links" :key="index">{{
            link
          }}</v-chip>
        </div></v-col
      >
      <v-col
        cols="12"
        class="mt-3 mb-10"
        style="border-radius: 7.5px 7.5px 0 0; background-color: whitesmoke; max-height: 300px; overflow-y: auto;"
      >
        <markdown-it-vue
          class="md-body mx-2 my-2"
          :content="this.project.description"
        />
      </v-col>

      <v-col cols="6">
        <v-btn @click="previous" rounded width="15vw">PREVIOUS</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          color="teal lighten-2"
          rounded
          width="15vw"
          class="ml-3"
          @click="finish"
          >FINISH</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="d-flex flex-wrap" justify="center" v-else>
      <p>
        You have no concept yet! Follow all the steps to create your concept
        first.
      </p>
    </v-row>
  </v-container>
</template>

<script>
import API from '@/service/api.js'
import { mapGetters, mapActions } from 'vuex'
import MarkdownItVue from 'markdown-it-vue'

export default {
  components: {
    MarkdownItVue
  },
  data() {
    return {
      valid: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  computed: {
    ...mapGetters({
      project: 'project/getAddProject',
      user: 'user/user'
    })
  },
  methods: {
    ...mapActions('project', ['saveAddProject']),
    previous() {
      this.$emit('previous')
    },
    finish() {
      //TODO check of alles goed is ingevuld
      API.addProject(this.project)
        .then(result => {
          if (result && result.status) {
            if (result.status === 200) {
              const id = result.data.id
              this.$router.push({ name: 'project', params: id })
              this.saveAddProject(null)
            }
          } else {
            alert(
              `Exited with status code ${result.status}. Please try again...`
            )
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss"></style>
