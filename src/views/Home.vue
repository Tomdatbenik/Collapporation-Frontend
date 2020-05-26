<template>
  <v-container>
    <v-card tile width="100%">
      <v-tabs @change="resetFeed" v-model="tab" color="#696969" centered>
        <v-tab style="color: #696969">
          <v-icon class="pr-1">mdi-fire</v-icon>
          HOT
        </v-tab>
        <v-tab style="color: #696969">
          <v-icon class="pr-1">mdi-trending-up</v-icon>
          TRENDING
        </v-tab>
        <v-tab style="color: #696969">
          <v-icon class="pr-1">mdi-clock-outline</v-icon>
          FRESH
        </v-tab>
      </v-tabs>
    </v-card>

    <v-tabs-items class="transparent" v-model="tab">
      <v-tab-item v-for="index in 3" :key="index">
        <div>
          <feed-item v-for="(item, index) in feedItems" :key="index" :id="item.id" :title="item.title" :small-description="item.smallDescription" :image="item.image" :created-by="item.owner.username" :created-at="new Date(item.created)" :tags="item.tags" :likes="item.likes" :status="item.status" @like-clicked="updateLike" />
          <infinite-loading :identifier="infiniteId" @infinite="updateFeed">
            <div slot="error" slot-scope="{ trigger }">
              <p class="mb-2">
                Oops, something went wrong.
              </p>
              <a class="btn-try-infinite" @click="trigger">Retry</a>
            </div>
          </infinite-loading>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import FeedItem from '../components/feed/FeedItem'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'

export default {
  components: { FeedItem, InfiniteLoading },
  data() {
    return {
      tab: null,
      feedItems: [],
      page: 0,
      size: 12,
      infiniteId: +new Date()
    }
  },
  methods: {
    updateFeed: function($state) {
      let self = this
      let apicall = axios.create()
      apicall
        .get('http://localhost:8102/project-service/projectfeed/all', {
          params: {
            size: self.size,
            page: self.page
          }
        })
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            self.feedItems.push(response.data[i])
          }
          $state.loaded()
          self.page++
          if (response.data.length < self.size) {
            $state.complete()
          }
        })
        .catch(error => {
          window.console.log(error)
          $state.error()
        })
    },
    resetFeed: function() {
      this.page = 0
      this.feedItems = []
      this.infiniteId += 1
    },
    updateLike: function(id) {
      console.log(id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
