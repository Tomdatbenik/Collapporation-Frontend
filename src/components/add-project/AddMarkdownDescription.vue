<template>
  <div>
    <v-row>
      <v-col
        ><p>
          {{ $t('addProject.addMarkdownDescription.markdownDescriptionInfo') }}
        </p>
        <v-row no-gutters
          ><span class="editPreviewText">{{$t('addProject.addMarkdownDescription.edit')}}</span
          ><v-switch
            class="mt-0 pt-0"
            dense
            hide-details
            v-model="togglePreview"
          ></v-switch
          ><span class="editPreviewText">{{$t('addProject.addMarkdownDescription.preview')}}</span></v-row
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="!togglePreview" cols="12">
        <v-textarea
          autofocus
          v-model="description"
          :label="$t('addProject.addMarkdownDescription.description')"
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
      <v-btn @click="previous" rounded width="15vw">{{
        $t('addProject.previous')
      }}</v-btn>
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
.editPreviewText {
  color: black;
  margin-right: 0.5em;
}
</style>
