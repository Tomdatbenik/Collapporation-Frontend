<template>
  <div class="landing-page fill-height wave-container d-flex flex-column">
    <v-container class="d-flex flex-fill">
      <div class="d-flex align-center">
        <div class="d-flex flex-row align-center">
          <div class="d-flex flex-column">
            <h1 class="display-2 font-weight-bold mb-4  pr-10">
              Getting Started
            </h1>
            <p class="font-weight-light headline">
              The platform to bring developers together with your application
              ideas.
            </p>
            <v-btn
              class="text-capitalize cyan--text text--lighten-1"
              width="50%"
              rounded
              >Start Now</v-btn
            >
          </div>
          <!-- <div class="pa-3 flex-fill hidden-sm-and-down">
            <v-img :src="require('@/assets/landingpage_image.svg')"></v-img>
          </div> -->
        </div>
      </div>
    </v-container>
    <svg viewBox="0 0 1440 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1440 73.7884L1392 84.6899C1344 95.5913 1248 130.692 1152 112.5C1056 94.5807 960 22.6879 864 15.6701C768 8.37977 660 84.6899 564 84.6899C468 84.6899 384 8.37977 288 1.08943C192 -5.92837 96 22.6879 48 37.473L0 51.9856V161H48C96 161 192 161 288 161C384 161 480 161 576 161C672 161 768 161 864 161C960 161 1056 161 1152 161C1248 161 1344 161 1392 161H1440V73.7884Z"
        fill="white"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';

.landing-page {
  background: linear-gradient(
    90deg,
    #36d1dc 0%,
    #3bc8dd 21.04%,
    #47aee0 56.02%,
    #5b86e5 99.44%
  );
}

.wave-container {
  position: relative;
  color: #fff;
  overflow: hidden;
}
.wave-container > svg {
  display: block;
}

@keyframes animateWave {
  0% {
    transform: scale(1, 0);
  }
  100% {
    transform: scale(1, 1);
  }
}
.wave-container > svg {
  display: block;
  transform-origin: bottom;
  animation: animateWave 1000ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
}
</style>
