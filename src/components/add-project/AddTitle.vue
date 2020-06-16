<template>
  <div>
    <div>
      <p class="mx-10">
        {{ $t('addProject.addTitle.titleInfo') }}
      </p>
      <v-form ref="form" v-model="valid">
        <v-text-field
          autofocus
          v-model="title"
          :label="$t('addProject.addTitle.title')"
          filled
          clearable
          :rules="[rules.required]"
          class="mx-10"
          @change="update"
          @click:clear="remove"
        ></v-text-field
      ></v-form>
    </div>
    <v-row class="mt-10 mb-5" no-gutters justify="center">
      <v-btn rounded width="15vw">{{ $t('addProject.cancel') }}</v-btn>
      <v-btn
        :disabled="!valid"
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

export default {
  data() {
    return {
      valid: false,
      title: '',
      rules: {
        required: value => !!value || this.requiredText
      }
    }
  },
  computed: {
    ...mapGetters('project', { project: 'getAddProject' }),
    requiredText: function() {
      return this.$t('addProject.required')
    }
  },
  created() {
    this.title = this.project.title
  },
  methods: {
    ...mapActions('project', ['saveProjectTitle']),
    next() {
      this.$emit('next')
    },
    update() {
      if (this.$refs.form.validate()) {
        this.saveProjectTitle(this.title)
      }
    },
    remove() {
      this.saveProjectTitle('')
    }
  }
}
</script>

<style scoped lang="scss"></style>
