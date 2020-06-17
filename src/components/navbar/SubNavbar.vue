<template>
  <div>
    <v-toolbar flat class="shadow">
      <v-container class="pa-0" fill-height>
        <v-btn
          color="teal lighten-2"
          v-for="item in listItems"
          outlined
          rounded
          elevation="0"
          class="text-capitalize mr-2"
          :key="item.name"
          :to="item.link"
          style="border: 0px"
        >
          <v-icon color="teal lighten-2" class="mr-2">{{ item.icon }}</v-icon>
          {{ item.value }}
        </v-btn>
      </v-container>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'SubNavbar',
  watch: {
    locale: function() {
      this.setLocaleText()
    }
  },
  computed: {
    locale: function() {
      return this.$i18n.locale
    }
  },
  data() {
    return {
      listItems: [
        {
          name: 'Home',
          link: '/home',
          icon: 'mdi-home-outline',
          value: ''
        },
        {
          name: 'Add Concept',
          link: '/add-project',
          icon: 'mdi-text-box-plus-outline',
          value: ''
        }
      ]
    }
  },
  created() {
    this.setLocaleText()
  },
  methods: {
    setLocaleText() {
      this.listItems[0].value = this.$t('subNavBar.home')
      this.listItems[1].value = this.$t('subNavBar.addConcept')
    }
  }
}
</script>

<style lang="scss" scoped>
.shadow {
  box-shadow: 0 0px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
