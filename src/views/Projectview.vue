<template>
  <div>
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
                  <img id="image" class="image" :src="this.project.image" />
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
                v-for="(collapporator, index) in this.project.collapporators"
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
      isSelecting: false,
      selectedFile: null,
      averageColor: null,
      editable: false,
      textColor: false,
      project: {
        id: this.$route.params.id,
        title: 'Tropical Island',
        image:
          'data:image/jpeg;base64,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',
        smallDescription:
          'A brand new tropical information app, which will provide a lot of information like weather, customs, and even more about a lot of different tropical islands.',
        description:
          '# Tropical Island' +
          '\n' +
          'A brand new tropical information app, which will provide a lot of information like weather, customs, and even more about a lot of different tropical islands.',
        tags: ['Javascript', 'HTML', 'CSS'],
        collapporators: [
          {
            name: 'Roy Appeldoorn',
            role: 'Frontend',
            image: null
          },
          {
            name: 'Vincent Muijtjens',
            role: 'Frontend',
            image: null
          },
          {
            name: 'Beau Taapken',
            role: 'Frontend',
            image: null
          }
        ],
        links: [
          { link: 'https://github.com', name: 'github' },
          { link: 'https://facebook.com', name: 'facebook' }
        ],
        likes: 20
      },
      tmpProject: {}
    }
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
      console.log('Liked')
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
        let index = this.project.collapporators.indexOf(
          this.project.collapporators.filter(collap => collap.name === name)[0]
        )
        this.project.collapporators.splice(index, 1)
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
        self.project.image = reader.result
      }
      reader.onerror = function(error) {
        console.log('Error: ', error)
      }
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    'project.image': function(newVal, oldVal) {
      let self = this
      setTimeout(function() {
        self.averageColor = self.getAverageRGB()
        self.textColor = self.getContrastYIQ(self.averageColor)
      }, 20)
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

.text-difference * {
  color: '#4D4D4D' !important;
  mix-blend-mode: difference !important;
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
