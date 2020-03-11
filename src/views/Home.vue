<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-btn @click="facebookLogin">Sign in with <b>Facebook</b></v-btn>
      <v-btn @click="googleLogin">Sign in with <b>Google</b></v-btn>
      <v-btn>Sign in with <b>Github</b></v-btn>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";

export default {
  name: "Home",
  mounted() {
    this.getGoogleInformation();
    this.getFacebookInformation();
    firebase.auth().useDeviceLanguage();
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },

    getGoogleInformation() {
      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          console.log(result);
          if (result.credential) {
            var token = result.credential.accessToken;
            console.log(token);
          }

          var user = result.user;
          console.log(user);
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + ": " + errorMessage);

          var email = error.email;

          var credential = error.credential;

          console.log(email + " " + credential);
        });
    },

    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },

    getFacebookInformation() {
      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            console.log(token);
            // ...
          }
          // The signed-in user info.
          var user = result.user;
          console.log(user);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + ": " + errorMessage);
          // The email of the user's account used.
          var email = error.email;
          console.log(email);
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(credential);
          // ...
        });
    }
  }
};
</script>

<style></style>
