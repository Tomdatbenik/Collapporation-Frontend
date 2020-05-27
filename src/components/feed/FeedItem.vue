<template>
  <v-card tile class="mt-4">
    <v-row no-gutters>
      <v-col cols="12" sm="3">
        <v-img
          height="100%"
          class="white--text"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <div class="status-label font-weight-medium">
            {{ status }}
          </div>
        </v-img>
      </v-col>
      <v-col cols="12" sm="9">
        <v-row no-gutters class="fill-height">
          <v-col cols="12">
            <v-card-title class="display-3 text-color-grey font-weight-medium">
              {{ title }}
            </v-card-title>
          </v-col>
          <v-col class="d-none d-sm-flex" sm="9">
            <v-card-text class="small-description font-weight-light">
              {{ smallDescription }}
            </v-card-text>
          </v-col>
          <v-col class="d-none d-sm-flex flex-column" sm="3">
            <v-card-actions>
              <v-icon large class="mr-1">
                mdi-account
              </v-icon>
              <div class=" flex-column text-color-grey">
                <div class="info-label">
                  Created by
                </div>
                <div>
                  {{ createdBy }}
                </div>
              </div>
            </v-card-actions>
            <v-card-actions>
              <v-icon large class="mr-1">
                mdi-calendar-blank-outline
              </v-icon>
              <div class=" flex-column text-color-grey">
                <div class="info-label">
                  Created at
                </div>
                <div>
                  {{ getDateString }}
                </div>
              </div>
            </v-card-actions>
          </v-col>
          <v-col cols="12" align-self="end">
            <v-card-text>
              <tag-chip
                v-for="(text, index) in tags"
                :key="index"
                :text="text"
              />
              <follow-button />
              <like-button :likes="likes" />
            </v-card-text>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import TagChip from '@/components/project/TagChip'
import LikeButton from '../buttons/LikeButton'
import FollowButton from '../buttons/FollowButton'
export default {
  name: 'FeedItem',
  components: { FollowButton, LikeButton, TagChip },
  props: {
    id: String,
    title: String,
    smallDescription: String,
    image: String,
    createdBy: String,
    createdAt: Date,
    tags: Array,
    likes: Number,
    status: String
  },
  computed: {
    getDateString() {
      return (
        this.createdAt.getDate() +
        '-' +
        (this.createdAt.getMonth() + 1) +
        '-' +
        this.createdAt.getFullYear()
      )
    }
  }
}
</script>

<style scoped>
.status-label {
  position: absolute;
  top: 0;
  width: 100%;
  height: 15%;
  background-color: #696969;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}

.small-description {
  font-size: 20px;
  color: #696969;
  min-width: 50%;
}

.text-color-grey {
  color: #696969;
}

.info-label {
  font-size: 11px;
}
</style>
