<template>
  <v-sheet tile class="transparent" max-width="120px">
    <v-menu>
      <template v-slot:activator="{ on }">
        <v-row no-gutters v-on="on" align="center" justify="end">
          <v-img
            :src="lan.img"
            height="1rem"
            max-width="1rem"
            class="mr-1"
            contain
          ></v-img>
          <span class="lan-text white--text">{{ lan.lan }}</span>
        </v-row>
      </template>
      <v-list>
        <v-list-item
          v-for="(loc, index) in lans"
          :key="'loc' + index"
          class="py-0 px-2 list-item"
          dense
          v-on:click="setLan(loc.lan)"
        >
          <v-row no-gutters align="center">
            <v-img
              :src="loc.img"
              height="1rem"
              max-width="1rem"
              class="mr-1"
              contain
            ></v-img>
            <span class="lan-text">{{ loc.lan }}</span>
          </v-row>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-sheet>
</template>

<script>
export default {
  name: 'LanguageSwitch',
  data() {
    return {
      lans: [
        { lan: 'en', img: '/img/united-kingdom.svg' },
        { lan: 'nl', img: '/img/netherlands.svg' }
      ],
      lan: {}
    }
  },
  methods: {
    setLan(lan) {
      this.$i18n.locale = lan
      this.lan = this.lans.find(x => {
        return x.lan === lan
      })
      localStorage.setItem('locale', lan)
    }
  },
  mounted() {
    this.lan = this.lans.find(x => {
      return x.lan === this.$i18n.locale
    })
  }
}
</script>

<style scoped>
.lan-text {
  text-transform: uppercase;
  padding: 0 4px 0 4px;
}

.list-item {
  min-height: 30px !important;
}
</style>
