<template>
  <v-col cols="3" class="mt-1 mb-1">
    <v-row no-gutters>
      <v-col cols="12">
        <v-hover v-slot:default="{ hover }">
          <div style="position: relative">
            <v-img
              v-if="image"
              class="image"
              width="200px"
              height="200px"
              :src="image"
            />
            <div v-else class="image placeholder d-flex">
              <v-icon color="#9AA5B1" class="d-flex align-center icon"
                >mdi-account</v-icon
              >
            </div>
            <div
              v-if="editable && hover"
              @click="clickCollapporator"
              class="image placeholder edit d-flex"
            >
              <v-icon color="#9AA5B1" class="d-flex align-center icon"
                >mdi-close</v-icon
              >
            </div>
            <div
              v-if="editable && add"
              @click="clickCollapporator"
              class="image placeholder edit d-flex"
            >
              <v-icon color="#9AA5B1" class="d-flex align-center icon"
                >mdi-plus</v-icon
              >
            </div>
          </div>
        </v-hover>
      </v-col>
      <v-col cols="12" class="d-flex justify-center name mt-2">
        {{ name }}
      </v-col>
      <v-col cols="12" class="d-flex justify-center role">
        {{ role }}
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'Collapporator',
  props: {
    editable: Boolean,
    name: String,
    role: String,
    image: String,
    add: Boolean
  },
  methods: {
    clickCollapporator: function() {
      this.$emit('clicked', this.name)
    }
  }
}
</script>

<style scoped>
.image {
  border-radius: 200px;
  margin: auto;
}

.name {
  color: #4d4d4d;
  font-size: 18px;
}

.role {
  color: #9f9f9f;
  font-size: 14px;
}

.icon {
  margin: auto;
  font-size: 10rem;
}

.placeholder {
  background-color: #cbd2d9;
  width: 200px;
  height: 200px;
}

.edit {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.edit:hover {
  cursor: pointer;
}
</style>
