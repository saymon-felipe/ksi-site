<template>
  <main class="app-box">
    <headerComponent></headerComponent>
    
    <div class="app-box-content">
      <heroComponent></heroComponent>
      <div ref="lottieContainer" id="lottieContainer" v-scroll-reveal="{ delay: 500, origin: 'right', distance: '80px' }"></div>
    </div>

    <ThreeDScene :spherePosition="spherePosition" />
    <span class="primary-font signature" v-scroll-reveal="{ delay: 500, origin: 'bottom' }">© {{ year }} KSI. todos os direitos reservados.</span>
  </main>
</template>

<script>
import ThreeDScene from './components/ThreeDScene.vue';
import headerComponent from "./components/headerComponent.vue";
import heroComponent from "./components/heroComponent.vue";
import lottie from "lottie-web";
import animationData from "./assets/animations/sphere.json";

export default {
  name: 'App', // Nome do componente principal
  components: {
    ThreeDScene,
    headerComponent,
    heroComponent
  },
  data() {
    return {
      spherePosition: {},
      year: new Date().getFullYear()
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
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    max-width: 1600px;
    height: calc(100% - 80px);
    display: flex;
    justify-content: center;
    padding: var(--space-6);
  }  
}

#lottieContainer {
  width: calc(15vw + 2rem);
  position: absolute;
  bottom: 2rem;
  right: 2rem;
}

.signature {
  position: fixed;
  bottom: 1.5rem;
  left: 4rem;
  font-size: 14px;
  color: var(--blue);
  margin-right: var(--space-6);
}

@media (max-width: 541px) {
  .signature {
    margin: auto;
    left: 0;
    right: 0;
    padding: 0 2rem;
    text-align: center;
  }
}
</style>