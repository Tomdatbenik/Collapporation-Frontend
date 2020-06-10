<template>
  <div
    class="d-flex ml-auto align-center font-weight-bold white--text flex-row"
  >
    <div class="d-flex align-center mx-2" style="position: relative">
      <v-icon color="white" class="icon" size="2rem">mdi-chat-outline</v-icon>
      <div
        class="notification-bubble-chat d-flex align-center justify-center"
        style="background-color: #EEFF41"
      >
        0
      </div>
    </div>
    <div class="d-flex align-center mx-2" style="position: relative">
      <v-icon color="white" class="icon" size="2rem">mdi-bell-outline</v-icon>
      <div
        class="notification-bubble-notifications d-flex align-center justify-center"
        style="background-color: #b2ff59"
      >
        0
      </div>
    </div>

    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on }">
        <div
          class="d-flex align-center mx-1 profile-box pa-sm-2 pl-4"
          v-on="on"
        >
          <div color="white" size="1.2rem" class="mr-1 d-none d-sm-flex">
            <span>Hi {{ user.userName }}!</span>
          </div>
          <v-icon color="grey lighten-2" x-large>mdi-account-circle</v-icon>
          <v-icon color="grey lighten-2" class="ml-n1">mdi-menu-down</v-icon>
        </div>
      </template>
      <v-list flat>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.link"
          class="d-flex flex-row"
        >
          <v-icon color="grey" class="d-flex justify-start mr-2">
            {{ item.icon }}
          </v-icon>
          <v-list-item-title class="d-flex justify-start flex-fill grey--text">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item :to="profileLink" class="d-flex flex-row">
          <v-icon color="grey" class="d-flex justify-start mr-2">
            mdi-account-outline
          </v-icon>
          <v-list-item-title class="d-flex justify-start flex-fill grey--text">
            {{ $t('subMenu.profile') }}
          </v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="d-flex flex-row" @click="handleLogout">
          <v-icon color="grey" class="d-flex justify-start mr-2">
            mdi-logout
          </v-icon>
          <v-list-item-title class="d-flex justify-start flex-fill grey--text">
            {{ $t('subMenu.logOut') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'StatusBar',
  data() {
    return {
      items: [
        {
          title: this.$t('subMenu.settings'),
          icon: 'mdi-cog-outline',
          link: '/home'
        },
        {
          title: this.$t('subMenu.myGroups'),
          icon: 'mdi-account-group-outline',
          link: '/home'
        }
      ]
    }
  },
  computed: {
    ...mapState('user', ['user']),
    profileLink() {
      return 'profile/' + this.user.uuid
    }
  },
  methods: {
    ...mapActions('user', ['logout']),
    ...mapMutations('user', {
      loading: 'SET_LOADING'
    }),
    handleLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.logout()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-bubble-notifications {
  position: absolute;
  top: -5px;
  right: 0;
  border-radius: 50px;
  padding: 2px;
  width: 15px;
  height: 15px;
  font-size: 10px;
  color: #5b86e5;
}

.notification-bubble-chat {
  position: absolute;
  top: -5px;
  right: -3px;
  border-radius: 50px;
  padding: 2px;
  width: 15px;
  height: 15px;
  font-size: 10px;
  color: #5b86e5;
}

.profile-box:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50px;
}

.status-bar:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50px;
}

.icon:hover {
  color: #b3e5fc !important;
}
</style>
