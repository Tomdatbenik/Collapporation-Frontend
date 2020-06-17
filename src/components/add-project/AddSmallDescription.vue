<template>
  <div>
    <div>
      <p class="mx-10">
        {{ $t('addProject.addSmallDescription.smallDescriptionInfo') }}
      </p>
      <v-form ref="form" v-model="valid">
        <v-textarea
          autofocus
          v-model="smallDescription"
          :label="$t('addProject.addSmallDescription.smallDescription')"
          filled
          clearable
          no-resize
          rows="5"
          class="mx-10"
          :rules="[rules.required, rules.counter]"
          @change="update"
        ></v-textarea>
      </v-form>
    </div>
    <v-row class="mt-10  mb-5" no-gutters justify="center">
      <v-btn @click="previous" rounded width="15vw">{{
        $t('addProject.previous')
      }}</v-btn>
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
      maxText: '',
      requiredText: '',
      smallDescription: '',
      rules: {
        required: value => !!value || this.requiredText,
        counter: value => (value && value.length <= 255) || this.maxText
      }
    }
  },
  watch: {
    locale: function() {
      this.setLocaleText()
    }
  },
  computed: {
    ...mapGetters('project', { project: 'getAddProject' }),
    locale: function() {
      return this.$i18n.locale
    }
  },
  created() {
    this.smallDescription = this.project.smallDescription
    this.setLocaleText()
  },
  methods: {
    ...mapActions('project', ['saveProjectSmallDescription']),
    setLocaleText() {
      this.requiredText = this.$t('addProject.required')
      this.maxText = this.$t('addProject.addSmallDescription.maxChars')
    },
    previous() {
      this.$emit('previous')
    },
    next() {
      this.$emit('next')
    },
    update() {
      if (this.$refs.form.validate()) {
        this.saveProjectSmallDescription(this.smallDescription)
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
