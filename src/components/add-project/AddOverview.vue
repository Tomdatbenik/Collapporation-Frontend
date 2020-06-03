<template>
  <v-container>
    <v-row class="d-flex flex-wrap">
      <v-col class="d-flex" cols="6">
        <v-card elevation="0" tile width="100%">
          <v-card-actions class="pa-0"
            ><img v-if="project.img" :src="project.img" style="width: 100%;"
          /></v-card-actions>
        </v-card>
      </v-col>
      <v-col class="d-flex flex-column" cols="6">
        <h1>{{ project.title }}</h1>
        <p>{{ project.smallDescription }}</p>
      </v-col>
      <v-col align="end" cols="12">
        <h4>Tags</h4>
        <v-chip v-for="(tag, index) in project.tags" :key="index">{{
          tag
        }}</v-chip>
        <h4>Links</h4>
        <v-chip v-for="(link, index) in project.links" :key="index">{{
          link
        }}</v-chip>
      </v-col>
      <v-col cols="12">
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

    <!-- <v-card>
      <v-card-title>{{
        project.title ? project.title : 'No title yet...'
      }}</v-card-title>
      <v-card-subtitle>{{
        project.smallDescription
          ? project.smallDescription
          : 'No small description yet...'
      }}</v-card-subtitle>
      <v-row class="mx-1">
        <v-col cols="6" v-if="project.tags.length > 0"
          >Tags:<v-chip
            v-for="tag in project.tags"
            :key="tag + '-key'"
            color="secondary"
            class="ma-2"
            >{{ tag }}
          </v-chip></v-col
        >
        <v-col cols="6" v-else>
          No tags...
        </v-col>
        <v-col cols="6" v-if="project.links.length > 0">
          Links:<v-chip
            v-for="link in project.links"
            :key="link + '-key'"
            color="secondary"
            class="ma-2"
            >{{ link }}
          </v-chip></v-col
        >
        <v-col cols="6" v-else>
          No links...
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-card color="primary" class="ma-2">
          <v-card-title>Collapporatorname</v-card-title>
        </v-card>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="12"
          class="mt-3"
          style="border-radius: 7.5px 7.5px 0 0; background-color: whitesmoke; height: 19em;"
          ><markdown-it-vue
            class="md-body mx-2 my-2"
            :content="this.project.description"
        /></v-col>
      </v-row>
    </v-card> -->
  </v-container>
</template>

<script>
import API from '@/service/api.js'
import { mapGetters } from 'vuex'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

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
    previous() {
      this.$emit('previous')
    },
    finish() {
      //TODO check of alles goed is ingevuld
      API.addProject(this.project)
        .then(result => {
          if (result && result.status) {
            if (result.status === 200) {
              alert('route to show project page')
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
