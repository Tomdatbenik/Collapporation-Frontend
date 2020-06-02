<template>
  <v-app>
    <Navbar />

    <v-content class="bg-color">
      <router-view />
      <LoadingOverlay />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/navbar/Navbar.vue'
import LoadingOverlay from '@/components/shared/LoadingOverlay.vue'
import { mapActions, mapMutations } from 'vuex'
import firebase from 'firebase'
import { authComputed } from '@/store/helpers.js'

export default {
  name: 'App',

  components: {
    Navbar,
    LoadingOverlay
  },

  data: () => ({
    //
  }),

  created() {
    firebase.auth().useDeviceLanguage()
    this.fetchFirebaseInformation()
  },
  computed: {
    ...authComputed
  },
  methods: {
    ...mapActions('user', ['authenticate']),
    ...mapMutations('user', {
      loading: 'SET_LOADING'
    }),
    fetchFirebaseInformation() {
      if (!localStorage.getItem('user') && !this.isAuthenticated) {
        this.loading(true)
        firebase
          .auth()
          .getRedirectResult()
          .then(() => {
            firebase
              .auth()
              .currentUser.getIdToken(true)
              .then(idToken => {
                this.authenticateUser(idToken)
              })
          })
          .catch(error => {
            var errorCode = error.code
            var errorMessage = error.message
            console.log(errorCode + ': ' + errorMessage)
            this.loading(false)
          })
      }
    },
    authenticateUser(idToken) {
      this.authenticate(idToken)
        .then(() => {
          console.log('Succesfully logged in')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss">
#app {
  background: none;
}

body {
  background-color: #f9f9f9;
  color: #4d4d4d !important;
}

@media (min-width: 1904px) {
  .container {
    max-width: 65% !important;
  }
}
</style>
