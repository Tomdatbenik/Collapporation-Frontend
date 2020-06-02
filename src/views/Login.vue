<template>
  <v-container id="wave" fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12 above-background">
          <v-card-title class="justify-center">
            Member Login
          </v-card-title>

          <v-spacer />

          <v-card-text>
            <v-form ref="login">
              <v-text-field
                filled
                label="Email"
                name="email"
                append-icon="mdi-email"
                :rules="emailRules"
                type="text"
              ></v-text-field>
              <v-text-field
                filled
                label="Password"
                name="email"
                append-icon="mdi-lock"
                :rules="passwordRules"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn color="primary">Login</v-btn>
          </v-card-actions>

          <v-card-subtitle class="text-center">
            <v-spacer />
            Or connect with Social Media
          </v-card-subtitle>

          <v-card-actions class="justify-center">
            <div
              @click="facebookLogin"
              class="fb-login-button"
              data-width=""
              data-size="large"
              data-button-type="login_with"
              data-layout="default"
              data-auto-logout-link="false"
              data-use-continue-as="false"
            ></div>
          </v-card-actions>
          <v-card-actions class="justify-center">
            <button @click="googleLogin" class="loginBtn loginBtn--google">
              Sign in with <b>Google</b>
            </button>
          </v-card-actions>
          <v-card-actions class="justify-center">
            <button @click="githubLogin" class="loginBtn loginBtn--github">
              Sign in with <b>Github</b>
            </button>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'

export default {
  name: 'Home',
  data: function() {
    return {
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(.+)@(.+)+\.(.+)$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [v => !!v || 'Password is required']
    }
  },
  mounted() {
    firebase.auth().useDeviceLanguage()
    this.getGoogleInformation()
    this.getFacebookInformation()
    this.getGithubInformation()
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },

    getGoogleInformation() {
      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          console.log(result)
          if (result.credential) {
            var token = result.credential.accessToken
            console.log(token)
          }

          var user = result.user
          console.log(user)
        })
        .catch(function(error) {
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorCode + ': ' + errorMessage)

          var email = error.email

          var credential = error.credential

          console.log(email + ' ' + credential)
        })
    },

    facebookLogin() {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },

    getFacebookInformation() {
      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken
            console.log(token)
            // ...
          }
          // The signed-in user info.
          var user = result.user
          console.log(user)
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log(errorCode + ': ' + errorMessage)
          // The email of the user's account used.
          var email = error.email
          console.log(email)
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          console.log(credential)
          // ...
        })
    },

    githubLogin() {
      const provider = new firebase.auth.GithubAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },

    getGithubInformation() {
      firebase
        .auth()
        .getRedirectResult()
        .then(function(result) {
          if (result.credential) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            var token = result.credential.accessToken
            console.assert(token)
            // ...
          }
          // The signed-in user info.
          var user = result.user
          console.assert(user)
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.assert(errorCode, +': ' + errorMessage)
          // The email of the user's account used.
          var email = error.email
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential
          console.assert(email, +': ' + credential)
        })
    }
  }
}
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
  color: #fff;
  width: 223px;
}
.loginBtn:before {
  content: '';
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
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}

/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #dd4b39;
}
.loginBtn--google:before {
  border-right: #bb3f30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png')
    6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #e74b37;
}

/* Github */
.loginBtn--github {
  background-color: #333333;
  text-shadow: 0 -1px 0 #333333;
}
.loginBtn--github:before {
  border-right: dimgray 1px solid;
  background: url('../../public/img/LoginIcons/GitHub-Mark-Light-120px-plus.png');
  background-size: 25px;
  background-position: center;
  background-repeat: no-repeat;
}
.loginBtn--github:hover,
.loginBtn--github:focus {
  background-color: #333333;
}

/*.background-gradient {*/
/*  background: linear-gradient(to right, #36d1dc, #3bc8dd, #47aee0, #5b86e5);*/
/*}*/

#wave {
  position: relative;
  /*height: 70px;*/
  /*width: 600px;*/
  background: linear-gradient(to right, #36d1dc, #3bc8dd, #47aee0, #5b86e5);
}
#wave:before {
  content: '';
  display: block;
  position: absolute;
  border-radius: 100% 90%;
  width: 60%;
  height: 280px;
  background-color: white;
  right: -40px;
  bottom: -100px;
}
#wave:after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 100% 90%;
  width: 50%;
  height: 260px;
  background-color: white;
  left: -10px;
  bottom: -100px;
}

.above-background {
  z-index: 10;
}

.no-scroll {
  overflow: hidden;
}
</style>
