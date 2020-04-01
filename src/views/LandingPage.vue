<template>
  <div class="landing-page fill-height wave-container">
    <v-container fill-height>
      <v-layout row wrap align-center>
        <div class="d-flex flex-column">
          <h1>Getting Started</h1>
          <p>
            The platform to bring developers together with your application
            ideas.
          </p>
          <v-btn rounded>test</v-btn>
        </div>
      </v-layout>
    </v-container>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 240">
      <path
        fill="#FFF"
        fill-opacity="1"
        d="M0,128L60,122.7C120,117,240,107,360,106.7C480,107,600,117,720,144C840,171,960,213,1080,213.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: "LandingPage"
};
</script>

<style scoped>
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
  position: absolute;
  bottom: 0;
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
