import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import * as firebase from "firebase";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0oaQ94WOdbYp323AlQJuJQjfXt47JVqw",
  authDomain: "collapporation.firebaseapp.com",
  databaseURL: "https://collapporation.firebaseio.com",
  projectId: "collapporation",
  storageBucket: "collapporation.appspot.com",
  messagingSenderId: "756136153245",
  appId: "1:756136153245:web:abd0375d9d943eb0058474",
  measurementId: "G-N9TV5Y97ZJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
