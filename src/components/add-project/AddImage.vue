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
            accept="image/png, image/jpeg, image/bmp"
            v-model="image"
            class="mx-10"
            :rules="[rules.required]"
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
        required: value => !!value || 'Required.'
      }
    }
  },
  computed: {
    ...mapGetters('project', { project: 'getAddProject' })
  },
  created() {
    if (this.project.image) {
      this.image = this.project.image
      this.url = URL.createObjectURL(this.project.image)
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
        // await fetch(this.url)
        //   .then(function(response) {
        //     return response.blob()
        //   })
        //   .then(function(blob) {
        //     image = blob
        //   })
        // var file = new File([byteArrays], filename, {type: contentType, lastModified: Date.now()});
      } else {
        this.saveProjectImage(null)
        this.url = ''
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
