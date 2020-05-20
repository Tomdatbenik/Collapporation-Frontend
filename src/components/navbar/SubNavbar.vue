<template>
  <div>
    <v-toolbar tile class="">
      <v-container class="pa-0" fill-height>
        <v-btn
          color="teal lighten-2"
          v-for="item in listItems"
          outlined
          rounded
          elevation="0"
          class="text-capitalize mr-2"
          :key="item.name"
          :to="item.link"
          style="border: 0px"
        >
          <v-icon color="teal lighten-2" class="mr-2">{{ item.icon }}</v-icon>
          {{ item.name }}
        </v-btn>
      </v-container>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "SubNavbar",
  data() {
    return {
      listItems: [
        {
          name: "Home",
          link: "/home",
          icon: "mdi-home-outline"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
