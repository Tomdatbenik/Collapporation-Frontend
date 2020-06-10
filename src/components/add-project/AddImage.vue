<template>
  <v-container>
    <v-row class="d-flex flex-wrap"
      ><v-col class="d-flex">
        <v-avatar min-height="100" min-width="100" size="100%" tile>
          <v-img contain v-if="project.img" :src="project.img"></v-img>
        </v-avatar> </v-col
      ><v-col class="d-flex">
        <div>
          <p>
            This image will be shown in the feed. Pick something attractive to
            lure as many collapporators as possible.
          </p>
          <v-form ref="form" v-model="valid">
            <v-file-input
              label="Image"
              autofocus
              prepend-icon="mdi-camera"
              accept="image/png, image/jpeg, image/bmp, image/jfif, image/jpg, image/gif"
              v-model="image"
              :rules="[rules.required, rules.size]"
              @change="update"
              @click:clear="clearImage"
            ></v-file-input
          ></v-form>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-10 mb-5" no-gutters justify="center">
      <v-btn @click="previous" rounded width="15vw">PREVIOUS</v-btn>
      <v-btn
        :disabled="!valid"
        color="teal lighten-2"
        rounded
        width="15vw"
        class="ml-3"
        @click="next"
        >NEXT</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      valid: false,
      image: null,
      url: '',
      rules: {
        required: value => !!value || 'Required.',
        size: value =>
          !value || value.size <= 2e6 || 'Image size should be less than 2 MB.'
      }
    }
  },
  computed: {
    ...mapGetters({
      project: 'project/getAddProject'
    })
  },
  created() {
    if (this.project.img) {
      this.getImage()
      this.url = this.project.img
    }
  },
  methods: {
    ...mapActions('project', ['saveProjectImage']),
    previous() {
      this.$emit('previous')
    },
    next() {
      this.$emit('next')
    },
    update() {
      if (this.$refs.form.validate()) {
        this.url = URL.createObjectURL(this.image)
        this.saveProjectImage(this.image)
      } else {
        this.saveProjectImage(null)
        this.url = ''
      }
    },
    clearImage() {
      this.saveProjectImage('')
      this.image = null
      this.url = ''
    },
    async getImage() {
      const extension = this.getFileType(this.project.img)
      await this.urlToFile(
        this.project.img,
        `projectImg.${extension}`,
        `image/${extension}`
      ).then(image => {
        this.image = image
      })
    },
    urlToFile(url, filename, mimeType) {
      return fetch(url)
        .then(function(res) {
          return res.arrayBuffer()
        })
        .then(function(buf) {
          return new File([buf], filename, { type: mimeType })
        })
    },
    getFileType(base64) {
      const strings = base64.split(',')
      let extension = ''
      switch (strings[0]) {
        case 'data:image/jpg;base64':
          extension = 'jpg'
          break
        case 'data:image/jpeg;base64':
          extension = 'jpeg'
          break
        case 'data:image/png;base64':
          extension = 'png'
          break
        case 'data:image/jfif;base64':
          extension = 'jfif'
          break
        case 'data:image/bmp;base64':
          extension = 'bmp'
          break
        case 'data:image/gif;base64':
          extension = 'gif'
          break
      }
      return extension
    }
  }
}
</script>

<style scoped lang="scss"></style>
