<template>
  <div>
    <div>
      <div :style="{ backgroundColor: this.averageColor }">
        <v-container class="py-10">
          <v-row no-gutters>
            <v-col cols="3">
              <v-card tile width="100%">
                <v-card-actions class="pa-0">
                  <img id="image" class="image" src="" />
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col class="mt-6">
              <v-row no-gutters class="pl-3">
                <v-col cols="11" class="display-4">
                  {{ this.project.title }}
                </v-col>
                <v-col class="d-flex justify-end" cols="1">
                  <v-btn v-if="!editable" @click="editable = !editable" icon
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                </v-col>
                <v-col cols="12" class="mt-6 pl-1 smallDescription">
                  {{ this.project.smallDescription }}
                </v-col>
                <v-col
                  cols="12"
                  class="mt-6 d-flex fill-height"
                  align-self="end"
                >
                  <tag-chip
                    v-for="(tag, index) in this.project.tags"
                    :key="index"
                    color="rgba(255,255,255,0.9)"
                    :editable="editable"
                    :text="tag"
                    text-size="10px"
                    text-color="#285E61"
                    height="20px"
                    @clicked="tagClicked"
                  />
                  <tag-chip
                    color="rgba(255,255,255,0.9)"
                    v-if="editable"
                    :editable="false"
                    text="+"
                    text-size="10px"
                    text-color="#285E61"
                    height="20px"
                    @clicked="tagClicked"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <v-container fill-height>
        <v-tabs color="#2680C2" class="d-flex" v-model="tab">
          <v-row class="d-flex" no-gutters>
            <v-tab class="text-capitalize"
              ><v-icon class="mr-2">mdi-crop-square</v-icon>Overview</v-tab
            >
            <v-tab class="text-capitalize"
              ><v-icon class="mr-2">mdi-account-multiple-outline</v-icon
              >Collapporators</v-tab
            >
          </v-row>
          <v-row class="d-flex align-center justify-end" no-gutters>
            <follow-button color="#DCEEFB" text-color="#2680C2" />
            <like-button
              @clicked="updateLike()"
              color="#DCEEFB"
              text-color="#2680C2"
              :likes="this.project.likes"
            />
          </v-row>
        </v-tabs>

        <v-tabs-items
          class="transparent mt-4"
          style="width: 100%"
          v-model="tab"
        >
          <v-tab-item>
            <v-textarea
              v-if="editable"
              v-model="this.project.description"
              label="Description"
              filled
              clearable
            />
            <markdown-it-vue
              v-else
              class="md-body"
              :content="this.project.description"
            />
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <collapporator
                v-for="(collapporator, index) in this.project.collaporators"
                :key="index"
                :name="collapporator.name"
                :role="collapporator.role"
                :image="collapporator.image"
                :editable="editable"
                @clicked="removeCollapporator"
              />
              <collapporator
                v-if="editable"
                :add="true"
                :name="'Add new collapporator'"
                :editable="editable"
                @clicked="addCollapporator"
              />
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
      <v-footer color="#f0f4f8" absolute padless class="footer">
        <v-container class="d-flex flex-row">
          Follow Tropical Island on:
          <collap-link
            v-for="(item, index) in this.project.links"
            :key="index"
            :link="item.link"
            :name="item.name"
            :editable="editable"
            @clicked="removeLink"
          />
        </v-container>
      </v-footer>
    </div>
    <div class="save-popup" v-if="editable">
      <v-card color="#F0F4F8" tile>
        <v-card-title>
          <v-icon class="mr-2" color="#003E6B">mdi-information-outline</v-icon>
          <div class="popup-title">You have unsaved changes</div>
        </v-card-title>
        <v-card-actions class="popup-body">
          Do you wish to save the changes or discard them?
        </v-card-actions>
        <v-card-actions class="d-flex justify-end">
          <v-btn tile color="#2680C2" class="white--text" height="35px">
            Save
          </v-btn>
          <v-btn
            tile
            color="#D64545"
            class="white--text"
            height="35px"
            @click="editable = !editable"
          >
            Discard
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import TagChip from '@/components/project/TagChip'
import LikeButton from '@/components/buttons/LikeButton'
import FollowButton from '@/components/buttons/FollowButton'
import MarkdownItVue from '../../node_modules/markdown-it-vue/src/index'
import Collapporator from '@/components/project/Collapporator'
import CollapLink from '@/components/project/CollapLink'
export default {
  name: 'Projectview',
  components: {
    TagChip,
    LikeButton,
    FollowButton,
    MarkdownItVue,
    Collapporator,
    CollapLink
  },
  data() {
    return {
      tab: null,
      averageColor: null,
      editable: false,
      project: {
        id: this.$route.params.id,
        title: 'Tropical Island',
        image: 'empty',
        smallDescription:
          'A brand new tropical information app, which will provide a lot of information like weather, customs, and even more about a lot of different tropical islands.',
        description:
          '# Tropical Island' +
          '\n' +
          'A brand new tropical information app, which will provide a lot of information like weather, customs, and even more about a lot of different tropical islands.',
        tags: ['Javascript', 'HTML', 'CSS'],
        collaporators: [
          {
            name: 'Roy Appeldoorn',
            role: 'Frontend',
            image: null
          },
          {
            name: 'Vincent Muijtjens',
            role: 'Frontend',
            image: null
          }
        ],
        links: [
          { link: 'https://github.com', name: 'github' },
          { link: 'https://facebook.com', name: 'facebook' }
        ],
        likes: 20
      }
    }
  },
  mounted() {
    this.averageColor = this.getAverageRGB()
  },
  methods: {
    getAverageRGB: function() {
      var blockSize = 5,
        imgEl = document.getElementById('image'),
        defaultRGB = { r: 0, g: 0, b: 0 },
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data,
        width,
        height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0
      if (!context || imgEl === null) {
        return defaultRGB
      }

      height = canvas.height =
        imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height
      width = canvas.width =
        imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width

      context.drawImage(imgEl, 0, 0)

      try {
        data = context.getImageData(0, 0, width, height)
      } catch (e) {
        return defaultRGB
      }

      length = data.data.length

      while ((i += blockSize * 4) < length) {
        ++count
        rgb.r += data.data[i]
        rgb.g += data.data[i + 1]
        rgb.b += data.data[i + 2]
      }

      rgb.r = ~~(rgb.r / count)
      rgb.g = ~~(rgb.g / count)
      rgb.b = ~~(rgb.b / count)

      return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 0.5)'
    },
    updateLike() {
      console.log('Liked')
    },
    tagClicked(tagname) {
      alert(tagname)
    },
    removeCollapporator(name) {
      alert(name)
    },
    addCollapporator() {
      alert('Select')
    },
    removeLink(name) {
      alert(name)
    }
  }
}
</script>

<style scoped>
.image {
  width: 100%;
}

.smallDescription {
  font-size: 20px;
}

.footer {
  left: 0;
  bottom: 0;
  right: 0;
}

.save-popup {
  position: absolute;
  right: 25px;
  bottom: 75px;
}

.popup-title {
  color: #003e6b;
  font-weight: bold;
}

.popup-body {
  padding: 16px;
  padding-top: 0px;
}

::v-deep .v-tabs-bar {
  background-color: #f9f9f9 !important;
  width: 100% !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
