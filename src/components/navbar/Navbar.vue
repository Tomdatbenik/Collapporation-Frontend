<template>
  <div>
    <v-app-bar app class="app-bar" flat>
      <v-container class="pa-0">
        <div
          class="d-flex flex-row white--text align-center justify-space-between"
        >
          <router-link to="/home" class="d-flex" style="text-decoration: none">
            <div
              class="headline mb-0 .d-sm-none d-flex align-center"
              id="app-title"
            >
              <v-img
                alt="Vuetify Logo"
                class="shrink mr-2"
                contain
                src="@/assets/Logo-v1.png"
                transition="scale-transition"
                width="50"
              />
            </div>
            <div class="white--text headline ml-3 d-none d-sm-flex">
              <span class="font-weight-bold">Coll</span>
              <span class="font-italic" id="app-subtitle">app</span>
              <span class="font-weight-bold">oration</span>
            </div>
          </router-link>

          <v-spacer></v-spacer>

          <v-sheet tile class="transparent" max-width="120px">
            <v-menu>
              <template v-slot:activator="{ on }">
                <v-row no-gutters v-on="on" align="center" justify="end">
                  <v-img
                    :src="lan.img"
                    height="1rem"
                    max-width="1rem"
                    contain
                  ></v-img>
                  <span class="lan-text white--text">{{ lan.lan }}</span>
                </v-row>
              </template>
              <v-list>
                <v-list-item
                  v-for="(loc, index) in lans"
                  :key="'loc' + index"
                  class="py-0 list-item"
                  dense
                  v-on:click="setLan(loc.lan)"
                >
                  <v-row no-gutters v-on="on" align="center" justify="end">
                    <v-img
                      :src="loc.img"
                      height="1rem"
                      max-width="1rem"
                      contain
                    ></v-img>
                    <span class="lan-text">{{ loc.lan }}</span>
                  </v-row>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-sheet>

          <div class="d-flex align-center">
            <v-btn
              text
              @click.stop="showLoginDialog = true"
              v-if="!isAuthenticated"
              color="white"
            >
              {{ $t('navBar.login') }}
            </v-btn>
            <status-bar v-if="isAuthenticated"></status-bar>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <LoginDialog v-model="showLoginDialog" />
  </div>
</template>

<script>
import LoginDialog from '@/components/login/LoginDialog.vue'
import StatusBar from '@/components/navbar/StatusBar.vue'
import { authComputed } from '@/store/helpers.js'

export default {
  name: 'NavBar',
  data() {
    return {
      showLoginDialog: false,
      lans: [
        { lan: 'en', img: '/img/united-kingdom.svg' },
        { lan: 'nl', img: '/img/netherlands.svg' }
      ],
      lan: {}
    }
  },
  components: {
    LoginDialog,
    StatusBar
  },
  mounted() {
    this.lan = this.lans.find(x => {
      return x.lan === this.$i18n.locale
    })
  },
  computed: {
    ...authComputed
  },
  methods: {
    setLan(lan) {
      this.$i18n.locale = lan
      this.lan = this.lans.find(x => {
        return x.lan === lan
      })
      localStorage.setItem('locale', lan)
    }
  }
}
</script>

<style lang="scss" scoped>
#app-title {
  letter-spacing: 0.1em !important;
}

#app-subtitle {
  margin-right: 0.09em;
}

.list-item {
  min-height: 30px !important;
}

.lan-text {
  text-transform: uppercase;
  padding: 0 4px 0 4px;
}

.app-bar {
  background: linear-gradient(
    90deg,
    #36d1dc 0%,
    #3bc8dd 21.04%,
    #47aee0 56.02%,
    #5b86e5 99.44%
  );
  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
}

.nav-item {
  font-size: 1rem;
}

.nav-item:hover {
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}
</style>
