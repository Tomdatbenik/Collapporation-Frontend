<template>
  <v-container>
    <v-card tile width="100%" color="white">
      <v-tabs @change="resetFeed" v-model="tab" color="#696969" centered>
        <v-tab style="color: #696969">
          <v-icon class="pr-1">mdi-fire</v-icon>
          {{ $t('feed.hot') }}
        </v-tab>
        <v-tab style="color: #696969">
          <v-icon class="pr-1">mdi-trending-up</v-icon>
          {{ $t('feed.trending') }}
        </v-tab>
        <v-tab style="color: #696969">
          <v-icon class="pr-1">mdi-clock-outline</v-icon>
          {{ $t('feed.fresh') }}
        </v-tab>
      </v-tabs>
    </v-card>

    <v-tabs-items class="transparent" v-model="tab">
      <v-tab-item v-for="index in 3" :key="index">
        <div>
          <feed-item
            v-for="(item, index) in feedItems"
            :key="index"
            :id="item.id"
            :title="item.title"
            :small-description="item.smallDescription"
            :image="item.image"
            :created-by="item.owner.username"
            :created-at="new Date(item.created)"
            :tags="item.tags"
            :likes="item.likes"
            :status="item.status"
            @clicked="updateLike"
          />
          <infinite-loading :identifier="infiniteId" @infinite="updateFeed">
            <div slot="error" slot-scope="{ trigger }">
              <p class="mb-2">
                {{ $t('feed.wrong') }}
              </p>
              <a class="btn-try-infinite" @click="trigger">{{
                $t('feed.retry')
              }}</a>
            </div>
            <div slot="no-results">
              <p class="mb-2">
                {{ $t('feed.noMore') }}
              </p>
            </div>
            <div slot="no-more">
              <p class="mb-2">
                {{ $t('feed.noMore') }}
              </p>
            </div>
          </infinite-loading>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import FeedItem from '@/components/feed/FeedItem'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions } from 'vuex'

export default {
  components: { FeedItem, InfiniteLoading },
  data() {
    return {
      tab: null,
      feedItems: [],
      page: 0,
      size: 12,
      infiniteId: +new Date(),
      hasLoaded: false
    }
  },
  methods: {
    ...mapActions('project', ['getProjectFeed', 'likeProject']),
    updateFeed($state) {
      this.getProjectFeed({ page: this.page, size: this.size })
        .then(response => {
          this.page++
          if (this.hasLoaded === false) {
            for (let i = 0; i < response.length; i++) {
              this.feedItems.push(response[i])
            }
            $state.loaded()
            if (response.length < this.size) {
              $state.complete()
              this.hasLoaded = true
            }
          } else {
            $state.complete()
          }
        })
        .catch(error => {
          window.console.log(error)
          $state.error()
        })
    },
    resetFeed() {
      this.page = 0
      this.feedItems = []
      this.infiniteId += 1
      this.hasLoaded = false
    },
    updateLike(id) {
      this.likeProject(id).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
::v-deep .v-tabs-bar {
  background-color: white !important;
}
</style>
