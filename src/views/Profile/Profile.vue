<template>
  <div>
    <v-container class="mt-sm-6" v-if="user">
      <v-row class="d-flex justify-center justify-sm-start">
        <v-col sm="3" cols="12" class="order-2 order-sm-1 pa-3 pa-sm-0">
          <div class="user-attributes d-flex flex-column">
            <v-avatar
              color="black"
              size="225"
              class="elevation-1 mb-12 align-self-center d-none d-sm-flex"
            >
              <img :src="user.picture" />
            </v-avatar>
            <div class="user--skills mb-12">
              <div
                class="d-flex align-end justify-space-between mb-1"
                style="position: relative;"
              >
                <span
                  class="pr-2 font-weight-light text-uppercase"
                  style="letter-spacing: 0.025rem;"
                  >Skills</span
                >
                <div>
                  <a href="#" style="text-decoration: none;">
                    <v-icon color="blue-500" small>mdi-pencil</v-icon>
                  </a>
                </div>
              </div>
              <v-divider />
              <div class="user--skills_badges py-4">
                <v-chip
                  text-color="green-1000"
                  color="green-300"
                  class="mr-2 mb-2 text-uppercase body-2"
                  >CSS</v-chip
                >
                <v-chip
                  text-color="green-1000"
                  color="green-300"
                  class="mr-2 mb-2 text-uppercase body-2"
                  >HTML</v-chip
                >
                <v-chip
                  text-color="green-1000"
                  color="green-300"
                  class="mr-2 mb-2 text-uppercase body-2"
                  >Javascript</v-chip
                >
                <v-chip
                  text-color="green-1000"
                  color="green-300"
                  class="mr-2 mb-2 text-uppercase body-2"
                  >Java</v-chip
                >
              </div>
            </div>
            <div class="user-socials mb-12">
              <div
                class="d-flex align-end justify-space-between mb-1"
                style="position: relative;"
              >
                <span
                  class="pr-2 font-weight-light text-uppercase"
                  style="letter-spacing: 0.025rem;"
                  >Socials</span
                >
                <div>
                  <a href="#" style="text-decoration: none;">
                    <v-icon color="blue-500" small>mdi-pencil</v-icon>
                  </a>
                </div>
              </div>
              <v-divider />
              <div class="user-socials__items py-3">
                <div class="d-flex flex-column">
                  <div class="user-socials__item align-center">
                    <v-icon large class="mr-10">mdi-github</v-icon>
                    <a href="#" class="user-socials__item_link">Github</a>
                  </div>
                  <div class="user-socials__item align-center">
                    <v-icon large class="mr-10">mdi-facebook</v-icon>
                    <a href="#" class="user-socials__item_link">Facebook</a>
                  </div>
                  <div class="user-socials__item align-center">
                    <v-icon large class="mr-10">mdi-linkedin</v-icon>
                    <a href="#" class="user-socials__item_link">Linkedin</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="pl-sm-12 order-1 order-sm-2" sm="9" cols="12">
          <div class="user-information mb-12">
            <div class="user-information__details mb-12">
              <h1 class="display-4 user-information__details_title pb-2">
                {{ user.username }}
              </h1>
              <h2 class="headline font-weight-light blue-500--text">
                {{ user.functionTitle }}
              </h2>
            </div>
            <div class="user-information__bio">
              {{ user.bio }}
            </div>
          </div>

          <div class="user-projects mb-12">
            <v-tabs
              v-model="tab"
              :grow="$vuetify.breakpoint.xsOnly"
              background-color="transparent"
              color="blue-500"
              style="border-bottom: 1px solid rgba(0, 0, 0, .1)"
            >
              <v-tab v-for="item in items" :key="item.name">
                <v-icon left>{{ item.icon }}</v-icon
                >{{ item.name }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="transparent">
              <v-tab-item v-for="item in items" :key="item.name">
                <v-card
                  v-for="project in item.projects"
                  :key="project.name"
                  color="transparent"
                  flat
                >
                  <v-card-text class="pa-0">
                    <v-card-title
                      class="headline pa-0 pt-6 pb-4"
                      v-text="project.name"
                    ></v-card-title>

                    <v-card-subtitle
                      v-text="project.bio"
                      class="pa-0"
                    ></v-card-subtitle>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      user: null,
      tab: null,
      items: [
        {
          name: 'Own projects',
          icon: 'mdi-account',
          projects: [
            {
              name: 'Facebook',
              img: 'https://randomuser.me/api/portraits/lego/1.jpg',
              bio:
                'Extremely we promotion remainder eagerness enjoyment an. Ham her demands removal brought minuter raising invited gay. Contented consisted continual curiosity contained get sex. Forth child dried in in aware do. You had met they song how feel lain evil near. Small she avoid six yet table china. And bed make say been then dine mrs. To household rapturous fulfilled attempted on so. '
            }
          ]
        },
        {
          name: 'Collaporations',
          icon: 'mdi-account-group',
          projects: [
            {
              name: 'Facebook',
              img: 'https://randomuser.me/api/portraits/lego/1.jpg',
              bio:
                'Extremely we promotion remainder eagerness enjoyment an. Ham her demands removal brought minuter raising invited gay. Contented consisted continual curiosity contained get sex. Forth child dried in in aware do. You had met they song how feel lain evil near. Small she avoid six yet table china. And bed make say been then dine mrs. To household rapturous fulfilled attempted on so'
            },
            {
              name: 'Google',
              img: 'https://randomuser.me/api/portraits/lego/1.jpg',
              bio:
                'Stronger unpacked felicity to of mistaken. Fanny at wrong table ye in. Be on easily cannot innate in lasted months on. Differed and and felicity steepest mrs age outweigh. Opinions learning likewise daughter now age outweigh. Raptures stanhill my greatest mistaken or exercise he on although. Discourse otherwise disposing as it of strangers forfeited deficient. '
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getProfile(this.$route.params.id)
      .then(user => {
        this.user = user
      })
      .catch(err => {
        this.$router.push('/home')
        console.log(err)
      })
  },
  methods: {
    ...mapActions('user', ['getProfile'])
  }
}
</script>

<style lang="scss" scoped>
.user-socials__item {
  padding: 6px 0 6px 0;
}

a {
  color: black;

  &:hover {
    color: #4098d7;
  }
}
</style>
