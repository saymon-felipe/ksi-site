<template>
  <main class="app-box">
    <headerComponent></headerComponent>
    <ThreeDScene />
    <div ref="lottieContainer" id="lottieContainer"></div>
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
  mounted: function () {
        this.lottieAnimation = lottie.loadAnimation({
            container: this.$refs.lottieContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animationData
        });
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
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

#lottieContainer {
  width: calc(15vw + 2rem);
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}
</style>