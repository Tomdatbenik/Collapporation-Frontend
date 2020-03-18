<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
<!--      <button @click="facebookLogin" class="loginBtn loginBtn&#45;&#45;facebook">Sign in with <b>Facebook</b></button>-->
      <div @click="facebookLogin" class="fb-login-button" data-width="" data-size="large" data-button-type="login_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false"></div>
      <button @click="googleLogin" class="loginBtn loginBtn--google">Sign in with <b>Google</b></button>
      <button @click="githubLogin" class="loginBtn loginBtn--github">Sign in with <b>Github</b></button>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";

export default {
  name: "Home",
  mounted() {
    firebase.auth().useDeviceLanguage();
    this.getGoogleInformation();
    this.getFacebookInformation();
    this.getGithubInformation();
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
    },

    githubLogin() {
      const provider = new firebase.auth.GithubAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },

    getGithubInformation() {
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken;
          console.assert(token)
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.assert(user)
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.assert(errorCode, + ": " + errorMessage)
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.assert(email, + ": " + credential)
      });
    }
  }
};
</script>

<style>
  .loginBtn {
    box-sizing: border-box;
    position: relative;
    /* width: 13em;  - apply for fixed size */
    margin: 0.2em;
    padding: 0 15px 0 46px;
    border: none;
    text-align: left;
    line-height: 34px;
    white-space: nowrap;
    border-radius: 0.2em;
    font-size: 16px;
    color: #FFF;
  }
  .loginBtn:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  .loginBtn:focus {
    outline: none;
  }
  .loginBtn:active {
    box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
  }


  /* Facebook */
  .loginBtn--facebook {
    background-color: #4C69BA;
    background-image: linear-gradient(#4C69BA, #3B55A0);
    /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
    text-shadow: 0 -1px 0 #354C8C;
  }
  .loginBtn--facebook:before {
    border-right: #364e92 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
  }
  .loginBtn--facebook:hover,
  .loginBtn--facebook:focus {
    background-color: #5B7BD5;
    background-image: linear-gradient(#5B7BD5, #4864B1);
  }


  /* Google */
  .loginBtn--google {
    /*font-family: "Roboto", Roboto, arial, sans-serif;*/
    background: #DD4B39;
  }
  .loginBtn--google:before {
    border-right: #BB3F30 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
  }
  .loginBtn--google:hover,
  .loginBtn--google:focus {
    background: #E74B37;
  }

  /* Github */
  .loginBtn--github {
    background-color: #333333;
    text-shadow: 0 -1px 0 #333333;
  }
  .loginBtn--github:before {
    border-right: dimgray 1px solid;
    background: url("../../public/img/LoginIcons/GitHub-Mark-Light-120px-plus.png");
    background-size: 25px;
    background-position: center;
    background-repeat: no-repeat;
  }
  .loginBtn--github:hover,
  .loginBtn--github:focus {
    background-color: #333333;
  }

</style>
