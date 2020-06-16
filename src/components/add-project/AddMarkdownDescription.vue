<template>
  <div>
    <v-row>
      <p class="mx-10">
        The markdown description is where you put an extensive description of
        what your project is about. You can provide additional information on
        the idea behind the concept, design choices, used techniques together
        with images.
      </p>
      <v-switch class="editPreviewSwitch" v-model="togglePreview"></v-switch>
    </v-row>
    <v-row>
      <v-col v-if="!togglePreview" cols="12">
        <v-textarea
          autofocus
          v-model="description"
          label="Description"
          filled
          clearable
          no-resize
          rows="10"
          class="mx-10"
          @change="update"
        ></v-textarea
      ></v-col>
      <v-col
        cols="12"
        v-else
        class="mt-3 mb-10"
        style="border-radius: 7.5px 7.5px 0 0; background-color: whitesmoke; height: 19em;"
        ><markdown-it-vue class="md-body" :content="this.description"
      /></v-col>
    </v-row>
    <v-row class="mt-10  mb-5" no-gutters justify="center">
      <v-btn @click="previous" rounded width="15vw">PREVIOUS</v-btn>
      <v-btn
        color="teal lighten-2"
        rounded
        width="15vw"
        class="ml-3"
        @click="next"
        >NEXT</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MarkdownItVue from 'markdown-it-vue'

export default {
  components: {
    MarkdownItVue
  },
  data() {
    return {
      togglePreview: false,
      description: ''
    }
  },
  computed: {
    ...mapGetters('project', { project: 'getAddProject' })
  },
  created() {
    this.description = this.project.description
  },
  methods: {
    ...mapActions('project', ['saveProjectDescription']),
    previous() {
      this.$emit('previous')
    },
    next() {
      this.$emit('next')
    },
    update() {
      this.saveProjectDescription(this.description)
    }
  }
}
</script>

<style scoped lang="scss">
.editPreviewSwitch::before {
  content: 'Edit';
  color: black;
  margin-right: 0.5em;
}

.editPreviewSwitch::after {
  content: 'Preview';
  color: black;
}
</style>
