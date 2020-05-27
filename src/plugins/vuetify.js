import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: "#4D4D4D",
        "green-100": "#F0FCF9",
        "green-200": "#C6F7E9",
        "green-300": "#8EEDD1",
        "green-400": "#5FE3C0",
        "green-500": "#2DCCA7",
        "green-600": "#17B897",
        "green-700": "#079A82",
        "green-800": "#048271",
        "green-900": "#016457",
        "green-1000": "#004440",
        "blue-100": "#DCEEFB",
        "blue-200": "#B6E0FE",
        "blue-300": "#84C5F4",
        "blue-400": "#62B0E8",
        "blue-500": "#4098D7",
        "blue-600": "#2680C2",
        "blue-700": "#186FAF",
        "blue-800": "#0F609B",
        "blue-900": "#0A558C",
        "blue-1000": "#003E6B",
      },
    },
  },
});
