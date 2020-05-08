<template>
  <v-container>
    <v-card tile>
      <v-tabs v-model="tab" color="#696969" centered >
        <v-tab style="color: #696969"><v-icon class="pr-1">mdi-fire</v-icon>HOT</v-tab>
        <v-tab style="color: #696969"><v-icon class="pr-1">mdi-trending-up</v-icon>TRENDING</v-tab>
        <v-tab style="color: #696969"><v-icon class="pr-1">mdi-clock-outline</v-icon>FRESH</v-tab>
      </v-tabs>
    </v-card>

    <v-tabs-items class="transparent" v-model="tab">
      <v-tab-item v-for="index in 3" :key="index">
        <FeedItem v-for="(item, index) in feedItems"
                  :key="index"
                  :title="item.title"
                  :small-description="item.smallDescription"
                  :image="item.image"
                  :created-by="item.createdBy"
                  :created-at="item.createdAt"
                  :tags="item.tags"
                  :likes="item.likes"
                  :status="item.status"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import FeedItem from "../components/feed/FeedItem";
export default {
  components: {FeedItem},
  data() {
    return {
      tab: null,
      feedItems: [
        {
          image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          title: "Tropical Island",
          smallDescription: "Tropical Island is the next level weather app for all tropical islands in the entire world.",
          createdBy: "Vincent",
          createdAt: new Date(),
          tags: ["Javascript", "CSS", "HTML"],
          likes: 20,
          status: "Concept"
        },
        {
          image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
          title: "Tropical Island",
          smallDescription: "Tropical Island is the next level weather app for all tropical islands in the entire world.",
          createdBy: "Vincent",
          createdAt: new Date(),
          tags: ["Javascript", "CSS", "HTML"],
          likes: 20,
          status: "Project"
        }
      ]
    }
  }
};
</script>

<style lang="scss" scoped></style>
