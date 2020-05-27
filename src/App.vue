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
    this.fetchInformation()
  },

  methods: {
    ...mapActions('user', ['authenticate']),
    ...mapMutations('user', {
      loading: 'SET_LOADING'
    }),
    fetchInformation() {
      this.loading(true)
      firebase
        .auth()
        .getRedirectResult()
        .then(result => {
          console.log(result)
          firebase
            .auth()
            .currentUser.getIdToken(true)
            .then(idToken => {
              console.log(idToken)
              this.authenticate(idToken)
            })
        })
        .catch(error => {
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorCode + ': ' + errorMessage)
          var email = error.email
          var credential = error.credential
          console.log(email + ' ' + credential)
          this.loading(false)
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
