<template>
  <div>
    <v-row no-gutters
      ><p class="mx-10">
        {{ $t('addProject.addLinks.linksInfo') }}
      </p></v-row
    >
    <v-row no-gutters
      ><v-chip @click="showAddDialog = true" color="secondary" class="ma-2"
        >+ {{ $t('addProject.addLinks.addLinks') }}</v-chip
      >
      <AddToProjectDialog
        :title="$t('addProject.addLinks.addLinks')"
        v-model="showAddDialog"
      >
        <v-form slot="content" ref="form" v-model="valid">
          <v-text-field
            autofocus
            v-model="linkName"
            :label="$t('addProject.addLinks.link')"
            filled
            clearable
            :rules="[rules.url, rules.unique]"
            class="mx-10"
          ></v-text-field>
        </v-form>
        <div slot="buttons">
          <v-btn
            @click="addLink"
            :disabled="!valid"
            color="teal lighten-2"
            rounded
            class="ml-3"
            >{{ $t('addProject.add') }}</v-btn
          >
        </div>
      </AddToProjectDialog>
    </v-row>
    <v-row no-gutters>
      <v-chip
        v-for="link in links"
        :key="link"
        color="secondary"
        class="ma-2"
        close
        @click:close="removeLink(link)"
        >{{ link }}
      </v-chip>
    </v-row>
    <v-row class="mt-10 mb-5" no-gutters justify="center">
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
import AddToProjectDialog from '@/components/add-project/AddToProjectDialog.vue'
export default {
  components: {
    AddToProjectDialog
  },
  data() {
    return {
      valid: false,
      linkName: '',
      links: [],
      showAddDialog: false,
      rules: {
        url: value => {
          const pattern = /^(https:\/\/|http:\/\/)?[w]{3}[.]([0-9A-Za-z-\\@:%_\+~#=]+)+[.]+([0-9A-Za-z-\\.@/&:$%_\+~#=]+){2,}$/ //eslint-disable-line no-useless-escape
          return pattern.test(value) || this.urlText
        },
        unique: value => {
          let existing = false
          if (value) {
            this.links.forEach(link => {
              if (link.toLowerCase() === value.toLowerCase()) {
                existing = true
              }
            })
          }
          return !existing || this.uniqueText
        }
      }
    }
  },
  computed: {
    ...mapGetters('project', { project: 'getAddProject' }),
    urlText: function() {
      return this.$t('addProject.addLinks.invalidURL')
    },
    uniqueText: function() {
      return this.$t('addProject.addLinks.uniqueURL')
    }
  },
  created() {
    this.links = this.project.links
  },
  methods: {
    ...mapActions('project', ['saveProjectLinks']),
    addLink() {
      if (this.$refs.form.validate) {
        this.links.push(this.linkName.toLowerCase())
        this.saveProjectLinks(this.links)
      }
      this.linkName = ''
    },
    removeLink(link) {
      for (let i = 0; i < this.links.length; i++) {
        if (this.links[i] === link) {
          this.links.splice(i, 1)
        }
      }
      this.saveProjectLinks(this.links)
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
