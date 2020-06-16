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

          <status-bar></status-bar>
          <div class="d-flex align-center">
            <v-btn
              text
              @click.stop="showLoginDialog = true"
              v-if="!isAuthenticated"
              color="white"
            >
              {{ $t('navBar.login') }}
            </v-btn>
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
      showLoginDialog: false
    }
  },
  components: {
    LoginDialog,
    StatusBar
  },
  computed: {
    ...authComputed
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
