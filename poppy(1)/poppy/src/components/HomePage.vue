<template>
  <div class="home">
    <div class="title">Record your health status</div>
    <div
      :class="{ light: isVoice, content: true }"
      @mousedown="onVoiceStart"
      @mouseup="onVoiceEnd"
    >
      <img :src="microSrc" />
    </div>
    <div class="bottom">Hold to Record</div>

    <div class="mask" v-if="isClick" @click="isClick = false">
      I feel like I got a bad sleep qualification these days...
    </div>
  </div>
</template>

<script>
export default {
  name: "home-page",
  props: {},
  data() {
    return {
      microSrc: require("@/assets/micro.jpg"),
      isVoice: false,
      isClick: false,
      clickTime: 0,
    };
  },
  methods: {
    onVoiceStart() {
      this.isVoice = true;
      this.clickTime = new Date().getTime();
    },
    onVoiceEnd() {
      this.isVoice = false;
      const curTime = new Date().getTime();
      if (curTime - this.clickTime > 3 * 1000) {
        this.isClick = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .title {
    width: 70%;
    background: #70c92a;
    color: #fff;
    padding: 8px;
    border-radius: 20px;
    line-height: 1;
  }

  .content {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fff;
    margin: 24px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      cursor: pointer;
      display: block;
      width: 40px;
      border-radius: 50%;
    }
  }

  .bottom {
    font-size: 16px;
    cursor: pointer;
  }

  @keyframes light {
    from {
      box-shadow: 0px 0px 6px #fc6f6f;
    }
    to {
      box-shadow: 0px 0px 30px #fc6f6f;
    }
  }
  .light {
    border-radius: 50%;
    animation: light 1.5s ease-in-out infinite alternate;
  }

  .mask {
    z-index: 999;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    color: #fff;
    font-weight: bold;
    line-height: 1.2;
    padding: 4px;
    white-space: break-spaces;
    padding-top: 12px;
    padding-left: 12px;
    text-align: left;
  }
}
</style>
