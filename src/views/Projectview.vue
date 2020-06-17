<template>
  <div v-if="loaded">
    <div>
      <div
        class="changeable-color"
        :style="{
          backgroundColor: this.averageColor
        }"
      >
        <v-container class="py-10">
          <v-row no-gutters>
            <v-col cols="3">
              <v-card
                id="img-box"
                tile
                elevation="0"
                width="100%"
                min-height="300px"
                class="d-flex align-center"
              >
                <v-card-actions class="pa-0">
                  <img id="image" class="image" :src="this.project.img" />
                  <div
                    v-if="editable"
                    class="upload-image d-flex justify-center align-center"
                  >
                    <v-btn
                      color="#D9E2EC"
                      rounded
                      class="text-capitalize"
                      :loading="isSelecting"
                      @click="onButtonClick"
                      ><v-icon class="mr-2">mdi-upload</v-icon
                      >{{ buttonText }}</v-btn
                    >
                    <input
                      ref="uploader"
                      class="d-none"
                      type="file"
                      accept="image/*"
                      @change="onFileChanged"
                    />
                  </div>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col class="my-6">
              <v-row
                no-gutters
                class="pl-3 d-flex flex-wrap"
                style="height: 100%"
              >
                <v-col v-if="editable" cols="12">
                  <v-text-field
                    class="ma-0 pa-0"
                    :color="textColor"
                    v-model="project.title"
                    label="Title"
                    filled
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col
                  v-else
                  cols="11"
                  class="display-4"
                  :style="{ color: textColor }"
                >
                  {{ this.project.title }}
                </v-col>
                <v-col class="d-flex justify-end" cols="1">
                  <v-btn v-if="!editable" @click="edit" icon
                    ><v-icon :style="{ color: textColor }"
                      >mdi-pencil</v-icon
                    ></v-btn
                  >
                </v-col>
                <v-col
                  v-if="editable"
                  cols="12"
                  class="mt-6 pl-1 smallDescription"
                >
                  <v-textarea
                    v-if="editable"
                    :color="textColor"
                    v-model="project.smallDescription"
                    label="Small Description"
                    filled
                    clearable
                  />
                </v-col>
                <v-col
                  v-else
                  cols="12"
                  class="mt-6 pl-1 smallDescription"
                  :style="{ color: textColor }"
                >
                  {{ this.project.smallDescription }}
                </v-col>
                <v-col
                  cols="12"
                  class="mt-6 d-flex  align-end"
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
              :likes="this.project.likes.count"
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
              v-model="project.description"
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
                v-for="(collapporator, index) in this.project.collaborators"
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
          Follow {{ this.project.title }} on:
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
          <v-btn
            @click="save"
            tile
            color="#2680C2"
            class="white--text"
            height="35px"
          >
            Save
          </v-btn>
          <v-btn
            tile
            color="#D64545"
            class="white--text"
            height="35px"
            @click="discard"
          >
            Discard
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
  <v-container v-else class="d-flex">
    <v-progress-circular
      class="d-flex justify-center align-center"
      style="margin: auto"
      indeterminate
      color="#3bc8dd"
      :size="100"
      :width="5"
    >
      Loading...
    </v-progress-circular>
  </v-container>
</template>

<script>
import TagChip from '@/components/project/TagChip'
import LikeButton from '@/components/buttons/LikeButton'
import FollowButton from '@/components/buttons/FollowButton'
import MarkdownItVue from 'markdown-it-vue'
import Collapporator from '@/components/project/Collapporator'
import CollapLink from '@/components/project/CollapLink'
import { mapActions } from 'vuex'

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
      loaded: false,
      tab: null,
      isSelecting: false,
      selectedFile: null,
      averageColor: null,
      editable: false,
      textColor: '#ffffff',
      project: null,
      tmpProject: {}
    }
  },
  created() {
    this.getProjectById(this.$route.params.id).then(project => {
      this.project = project
      this.loaded = true
    })
  },
  mounted() {
    let self = this
    setTimeout(function() {
      self.averageColor = self.getAverageRGB()
      self.textColor = self.getContrastYIQ(self.averageColor)
    }, 20)
  },
  computed: {
    buttonText() {
      return this.selectedFile ? this.selectedFile.name : 'Upload'
    }
  },
  methods: {
    ...mapActions('project', [
      'getProjectById',
      'updateProject',
      'likeProject'
    ]),
    getContrastYIQ: function(rgba) {
      let hexcolor = this.RGBAToHexA(rgba)
      hexcolor = hexcolor.replace('#', '')
      let r = parseInt(hexcolor.substr(0, 2), 16)
      let g = parseInt(hexcolor.substr(2, 2), 16)
      let b = parseInt(hexcolor.substr(4, 2), 16)
      let yiq = (r * 299 + g * 587 + b * 114) / 1000
      return yiq >= 128 ? '#4D4D4D' : '#FFFFFF'
    },
    RGBAToHexA: function(rgba) {
      let sep = rgba.indexOf(',') > -1 ? ',' : ' '
      rgba = rgba
        .substr(5)
        .split(')')[0]
        .split(sep)

      if (rgba.indexOf('/') > -1) rgba.splice(3, 1)

      for (let R in rgba) {
        let r = rgba[R]
        if (r.indexOf('%') > -1) {
          let p = r.substr(0, r.length - 1) / 100

          if (R < 3) {
            rgba[R] = Math.round(p * 255)
          } else {
            rgba[R] = p
          }
        }
      }
      let r = (+rgba[0]).toString(16),
        g = (+rgba[1]).toString(16),
        b = (+rgba[2]).toString(16),
        a = Math.round(+rgba[3] * 255).toString(16)

      if (r.length == 1) r = '0' + r
      if (g.length == 1) g = '0' + g
      if (b.length == 1) b = '0' + b
      if (a.length == 1) a = '0' + a

      return '#' + r + g + b + a
    },
    getAverageRGB() {
      let blockSize = 5,
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

      return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 0.7)'
    },
    updateLike() {
      this.likeProject(this.project.id).catch(error => {
        console.log(error)
      })
    },
    tagClicked(tagname) {
      if (this.editable) {
        let index = this.project.tags.indexOf(
          this.project.tags.filter(tag => tag === tagname)[0]
        )
        this.project.tags.splice(index, 1)
      }
    },
    removeCollapporator(name) {
      if (this.editable) {
        let index = this.project.collaborators.indexOf(
          this.project.collaborators.filter(collap => collap.name === name)[0]
        )
        this.project.collaborators.splice(index, 1)
      }
    },
    addCollapporator() {
      alert('A list should appear')
    },
    removeLink(name) {
      if (this.editable) {
        let index = this.project.links.indexOf(
          this.project.links.filter(link => link.name === name)[0]
        )
        this.project.links.splice(index, 1)
      }
    },
    edit() {
      this.editable = !this.editable
      this.tmpProject = JSON.parse(JSON.stringify(this.project))
    },
    discard() {
      this.project = JSON.parse(JSON.stringify(this.tmpProject))
      this.tmpProject = {}
      this.editable = !this.editable
    },
    save() {
      this.editable = !this.editable
      this.tmpProject = {}
      this.updateProject(JSON.parse(JSON.stringify(this.project)))
    },
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false
        },
        { once: true }
      )

      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      let self = this
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = function() {
        self.project.img = reader.result
      }
      reader.onerror = function(error) {
        console.log('Error: ', error)
      }
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    'project.img': function(newVal, oldVal) {
      let self = this
      setTimeout(function() {
        self.averageColor = self.getAverageRGB()
        self.textColor = self.getContrastYIQ(self.averageColor)
      }, 20)
    },
    // eslint-disable-next-line no-unused-vars
    loaded: function(newVal, oldVal) {
      if (newVal) {
        let self = this
        setTimeout(function() {
          self.averageColor = self.getAverageRGB()
          self.textColor = self.getContrastYIQ(self.averageColor)
        }, 20)
      }
    }
  }
}
</script>

<style scoped>
#img-box {
  padding-top: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: transparent;
}

.image {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  max-height: 100%;
  transform: translate(-50%, -50%);
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

.upload-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.35);
}

.changeable-color {
  -webkit-transition: background-color 0.5s ease-out;
  -moz-transition: background-color 0.5s ease-out;
  -o-transition: background-color 0.5s ease-out;
  transition: background-color 0.5s ease-out;
}

::v-deep textarea {
  color: inherit !important;
}

::v-deep input {
  color: inherit !important;
}

::v-deep .v-tabs-bar {
  background-color: #f9f9f9 !important;
  width: 100% !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
