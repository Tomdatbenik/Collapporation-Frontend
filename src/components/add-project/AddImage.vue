<template>
  <div>
    <v-row no-gutters
      ><v-col cols="7"
        ><p class="mx-10">
          This image will be shown in the feed. Pick something attractive to
          lure as many collapporators as possible.
        </p>
        <v-form ref="form" v-model="valid">
          <v-file-input
            label="Image"
            autofocus
            prepend-icon="mdi-camera"
            accept="image/png, image/jpeg, image/bmp, image/jfif, image/jpg"
            v-model="image"
            class="mx-10"
            :rules="[rules.required, rules.size]"
            @change="update"
          ></v-file-input></v-form
      ></v-col>
      <v-col cols="5">
        <div
          class="mr-10"
          style="width: 15vw; height: 20vh; border: 1px solid grey;"
        >
          <img v-if="url" :src="url" style="width: 100%; heigth: 100%;" />
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-10" no-gutters justify="center">
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
  </div>
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
    async getImage() {
      const extension = this.getFileType(this.project.img)
      await this.urlToFile(
        this.project.img,
        `projectImg.${extension}`,
        `image/${extension}`
      ).then(image => {
        console.log(image)
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
        case 'data:image/jpeg;base64':
          extension = 'jpeg'
          break
        case 'data:image/png;base64':
          extension = 'png'
          break
        case 'data:image/jpg;base64':
          extension = 'jpg'
          break
        case 'data:image/jfif;base64':
          extension = 'jfif'
          break
        case 'data:image/bmp;base64':
          extension = 'bmp'
          break
      }
      return extension
    }
  }
}
</script>

<style scoped lang="scss"></style>
