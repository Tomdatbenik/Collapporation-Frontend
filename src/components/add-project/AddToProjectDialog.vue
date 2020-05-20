<template>
  <v-dialog v-model="show" max-width="500px">
    <v-card>
      <v-card-title class="mb-5" color="#696969" style="width: 100%;">
        {{ title }}
        <v-divider
          class="ml-3"
          style="border-width: 1px; border-color: #696969"
        ></v-divider>
      </v-card-title>
      <v-row no-gutters>
        <v-col cols="12 pb-2">
          <slot name="content"></slot>
        </v-col>
      </v-row>

      <v-row class="pb-5" no-gutters justify="center">
        <v-btn rounded @click.stop="cancel()">CLOSE</v-btn>
        <v-btn @click="add()" color="teal lighten-2" rounded class="ml-3"
          >ADD</v-btn
        >
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddToProjectDialog",
  props: {
    title: String,
    value: Boolean,
  },
  data() {
    return {
      object: null,
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    cancel() {
      this.show = false;
    },
    add() {
      this.$emit("add");
    },
  },
};
</script>
