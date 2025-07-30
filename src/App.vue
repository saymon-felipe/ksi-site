<template>
  <main class="app-box">
    <headerComponent></headerComponent>
    <ThreeDScene :spherePosition="spherePosition" />
    <div ref="lottieContainer" id="lottieContainer"></div>
    <div class="app-box-content">
      
    </div>
  </main>
</template>

<script>
import ThreeDScene from './components/ThreeDScene.vue';
import headerComponent from "./components/headerComponent.vue";
import lottie from "lottie-web";
import animationData from "./assets/animations/sphere.json";

export default {
  name: 'App', // Nome do componente principal
  components: {
    ThreeDScene,
    headerComponent
  },
  data() {
    return {
      spherePosition: {}
    }
  },
  mounted: function () {
    this.lottieAnimation = lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData
    });

    document.addEventListener("scroll", (e) => {
      console.log(e)
    })
  },
  destroyed() {
      this.lottieAnimation.destroy();
  }
};
</script>
<style>
.app-box {
  width: calc(100vw - 2.4rem);
  height: calc(100vh - 2.4rem);
  overflow: hidden;
  border-radius: 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  scroll-behavior: smooth;

  & .app-box-content {
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 3;
    height: 100%;
    width: 100%;
  }  
}

#lottieContainer {
  width: calc(15vw + 2rem);
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
</style>