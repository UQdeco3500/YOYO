<template>
  <div id="app" class="app">
    <transition name="Fade">
      <home-page v-if="currentPage === 'home'" />
      <heart-beat v-if="currentPage === 'heart-beat'" />
      <blood-pressure v-if="currentPage === 'blood-pressure'" />
      <blood-oxygen v-if="currentPage === 'blood-oxygen'" />
    </transition>
    <div class="arrow">
      <div class="left">
        <img :src="leftArrowSrc" @click="onPrev()" />
      </div>
      <div class="right" @click="onNext()">
        <img :src="rightArrowSrc" />
      </div>
    </div>
  </div>
</template>

<script>
import HomePage from "./components/HomePage.vue";
import HeartBeat from "./components/HeartBeat.vue";
import BloodPressure from "./components/BloodPressure.vue";
import BloodOxygen from "./components/BloodOxygen.vue";

export default {
  name: "App",
  components: {
    HomePage,
    HeartBeat,
    BloodPressure,
    BloodOxygen,
  },
  data() {
    return {
      leftArrowSrc: require("@/assets/left.png"),
      rightArrowSrc: require("@/assets/right.png"),
      currentPage: "home",
    };
  },
  methods: {
    onPrev() {
      if (this.currentPage === "home") {
        this.currentPage = "blood-oxygen";
      } else if (this.currentPage === "heart-beat") {
        this.currentPage = "home";
      } else if (this.currentPage === "blood-pressure") {
        this.currentPage = "heart-beat";
      } else if (this.currentPage === "blood-oxygen") {
        this.currentPage = "blood-pressure";
      }
    },
    onNext() {
      if (this.currentPage === "home") {
        this.currentPage = "heart-beat";
      } else if (this.currentPage === "heart-beat") {
        this.currentPage = "blood-pressure";
      } else if (this.currentPage === "blood-pressure") {
        this.currentPage = "blood-oxygen";
      } else if (this.currentPage === "blood-oxygen") {
        this.currentPage = "home";
      }
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  width: 184px;
  height: 224px;
  border-radius: 20px;
  margin: 60px auto;
  background: #f5f5f5;
  padding: 24px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.arrow {
  img {
    display: block;
    width: 10px;
    cursor: pointer;
  }
  .left {
    position: absolute;
    left: 10px;
    top: calc(50% - 5px);
  }

  .right {
    position: absolute;
    right: 10px;
    top: calc(50% - 5px);
  }
}

.Fade-enter,
.Fade-leave-to {
  opacity: 0;
}
.Fade-enter-to,
.Fade-leave {
  opacity: 1;
}

.Fade-enter-active {
  transition: all 0.4s;
}

.Fade-leave-active {
  transition: all 0.2s;
}
</style>
