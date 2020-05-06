<template>
  <div>
    <v-container class="mt-sm-6 ">
      <v-row class="d-flex justify-center justify-sm-start">
        <v-col sm="3" cols="12" class="order-2 order-sm-1 pa-3 pa-sm-0">
          <div class="user-attributes d-flex flex-column">
            <v-avatar
              color="black"
              size="300"
              class="elevation-1 mb-12 align-self-center d-none d-sm-flex"
            >
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
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
                Roy Appeldoorn
              </h1>
              <h2 class="headline font-weight-light blue-500--text">
                Software Engineer
              </h2>
            </div>
            <div class="user-information__bio">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores magni, nisi eum ratione quae odit ducimus iusto
              doloremque veritatis voluptatem eveniet officia ipsum. Qui quidem
              rem amet dolorum error facilis temporibus tenetur? Reiciendis
              voluptates porro aliquid voluptas nesciunt sint assumenda numquam
              quos deleniti laboriosam excepturi eum sunt magnam facere dolorum
              amet laudantium, fugit quis distinctio minima libero tenetur
              pariatur. Odio quasi delectus voluptatum rerum nostrum
              perspiciatis molestias quia vel laboriosam! Iusto aspernatur,
              voluptas impedit corrupti ab dolorum commodi recusandae voluptate
              eveniet quidem nobis distinctio repellendus quos corporis pariatur
              possimus voluptatem animi fuga tenetur harum eum, ea ad id qui?
              Dolor, dolores possimus nisi suscipit modi sint harum quidem
              facere obcaecati quisquam itaque quos rem!
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

            <v-tabs-items v-model="tab" class="transparent-body">
              <v-tab-item
                v-for="item in items"
                :key="item.name"
                class="transparent-body"
              >
                <v-card
                  v-for="project in item.projects"
                  :key="project.name"
                  class="my-6 transparent-body"
                  flat
                >
                  <div class="d-flex flex-no-wrap justify-start">
                    <v-avatar size="50" class="mr-10">
                      <img :src="project.img" />
                    </v-avatar>
                    <div class="d-flex flex-column justify-center">
                      <div>
                        <a href="">{{ project.name }}</a>
                      </div>
                      <div>{{ project.bio }}</div>
                    </div>
                  </div>
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
export default {
  data() {
    return {
      tab: null,
      items: [
        {
          name: "Own projects",
          icon: "mdi-account",
          projects: [
            {
              name: "Facebook",
              img: "https://randomuser.me/api/portraits/lego/1.jpg",
              bio: "lorem ipsum babyyyyyyyyyyyyyyyyyyyyiiiiiiiiiiiiisssy"
            }
          ]
        },
        {
          name: "Collaporations",
          icon: "mdi-account-group",
          projects: [
            {
              name: "Facebook",
              img: "https://randomuser.me/api/portraits/lego/1.jpg",
              bio: "lorem ipsum babyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            },
            {
              name: "Google",
              img: "https://randomuser.me/api/portraits/lego/1.jpg",
              bio: "lorem ipsum2 babyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
            }
          ]
        }
      ]
    };
  }
};
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

.transparent-body {
  background: #f9f9f9;
}
</style>
