<template>
  <div>
    <div style="position: relative">
      <v-img
        width="100%"
        height="250px"
        :src="require('@/assets/bg-profile.jpg')"
      />
      <div style="position: absolute; bottom: -100px; width: 100%;">
        <v-container class="py-0 d-flex align-start">
          <v-avatar color="black" size="200" class="elevation-5">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>

          <h1
            class="ml-10 display-2 white--text"
            style="text-shadow: 0 0 1px #696969, 0 0 5px #696969;"
          >
            Tim Freezer
          </h1>
        </v-container>
      </div>
    </div>
    <v-container style="margin-top: 120px;">
      <v-row>
        <v-col cols="3">
          <v-row no-gutters>
            <v-col cols="12">
              <v-card tile>
                <v-card-title color="#696969">
                  Skills
                  <v-divider
                    class="ml-3"
                    style="border-width: 1px; border-color: #696969"
                  ></v-divider>
                </v-card-title>
                <div class="pa-2">
                  <v-chip color="secondary" class="my-1 mx-1">CSS</v-chip>
                  <v-chip color="secondary" class="my-1 mx-1">HTML</v-chip>
                  <v-chip color="secondary" class="my-1 mx-1"
                    >Javascript</v-chip
                  >
                  <v-chip color="secondary" class="my-1 mx-1">Java</v-chip>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" class="pt-6">
              <v-card tile>
                <v-card-title color="#696969">
                  Links
                  <v-divider
                    class="ml-3"
                    style="border-width: 1px; border-color: #696969"
                  ></v-divider>
                </v-card-title>
                <div class="pa-2">
                  <v-chip color="secondary" class="ma-2">GitHub</v-chip>
                  <v-chip color="secondary" class="ma-2">Facebook</v-chip>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="9"
          ><v-card tile class="pa-0">
            <v-card-title color="#696969">
              Contributions
              <v-divider
                class="ml-3"
                style="border-width: 1px; border-color: #696969"
              ></v-divider>
            </v-card-title>
            <div class="d-flex flex-row align-start pa-2">
              <v-img
                max-width="25%"
                height="auto"
                :src="require('@/assets/bg-profile.jpg')"
                class="ma-2"
              ></v-img>
              <div class="flex-fill">
                <div
                  class="ml-3 display-4 font-weight-medium d-flex flex-column"
                  style="color: #696969"
                >
                  Collapporation
                </div>
                <div
                  class="ml-4 body-1 font-weight-light"
                  style="color: #696969"
                >
                  Collapporation is the platform to bring developers together
                  with your application ideas...
                </div>
              </div>
            </div>
          </v-card></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
