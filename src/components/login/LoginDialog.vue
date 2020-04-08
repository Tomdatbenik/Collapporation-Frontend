<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title class="justify-center">
        Login
      </v-card-title>
      <v-card-actions>
        <v-row no-gutters>
          <v-col cols="12 pb-2" class="d-flex justify-center">
            <GoogleLoginButton width="50%"></GoogleLoginButton>
          </v-col>
          <v-col cols="12 pb-2" class="d-flex justify-center">
            <FacebookLoginButton width="50%"></FacebookLoginButton>
          </v-col>
          <v-col cols="12 pb-2" class="d-flex justify-center">
            <GithubLoginButton width="50%"></GithubLoginButton>
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
  }
};
</script>
