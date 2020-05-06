<template>
  <v-container>
    <FeedFilter></FeedFilter>
    <FeedItem/>
  </v-container>
</template>

<script>
import FeedFilter from "../components/feed/FeedFilter";
import FeedItem from "../components/feed/FeedItem";
export default {
  components: {FeedItem, FeedFilter}
};
</script>

<style lang="scss" scoped></style>
