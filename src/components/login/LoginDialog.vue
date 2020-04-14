<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title class="justify-center">
        Login
      </v-card-title>
      <v-card-actions>
        <v-row no-gutters>
          <v-col cols="12 pb-2" class="d-flex justify-center">
            <GoogleLoginButton
              width="50%"
              @click.native="googleLogin"
            ></GoogleLoginButton>
          </v-col>
          <v-col cols="12 pb-2" class="d-flex justify-center">
            <FacebookLoginButton
              width="50%"
              @click.native="facebookLogin"
            ></FacebookLoginButton>
          </v-col>
          <v-col cols="12 pb-2" class="d-flex justify-center">
            <GithubLoginButton
              width="50%"
              @click.native="githubLogin"
            ></GithubLoginButton>
          </v-col>
          <v-col cols="12" class="d-flex justify-center">
            <v-btn color="teal lighten-2" text @click.stop="show = false"
              >Close</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import GoogleLoginButton from "@/components/login/GoogleLoginButton.vue";
import FacebookLoginButton from "@/components/login/FacebookLoginButton.vue";
import GithubLoginButton from "@/components/login/GithubLoginButton.vue";
import firebase from "firebase";

export default {
  name: "LoginDialog",
  components: {
    GoogleLoginButton,
    FacebookLoginButton,
    GithubLoginButton
  },
  props: {
    value: Boolean
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  mounted() {
    firebase.auth().useDeviceLanguage();
    this.fetchInformation();
  },
  methods: {
    googleLogin() {
      console.log("clicked");
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },

    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },

    githubLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },

    fetchInformation() {
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
    }
  }
};
</script>
