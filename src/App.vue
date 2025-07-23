<template>
  <main class="app-box">
    <!--<headerComponent></headerComponent>-->
    <section class="hero-container">
      <div class="glass">
        <img src="./assets/img/logo.png" class="logo" alt="KSI - Kinetic Solutions">
      </div>
      <img src="./assets/img/caret.svg" class="float caret">
    </section>
    <ThreeDScene />
  </main>
</template>

<script>
import ThreeDScene from './components/ThreeDScene.vue';
import headerComponent from "./components/headerComponent.vue";

export default {
  name: 'App', // Nome do componente principal
  components: {
    ThreeDScene,
    headerComponent
  },
};
</script>

<style>
  .hero-container {
    width: 100%;
    margin: auto;
    height: 100%;
    display: grid;
    place-items: center;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }

  .logo {
    width: 90vw;
    max-width: 500px;
  }

  .glass {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    box-shadow: 
      inset 4px 4px 4px 0 rgba(255, 255, 255, 0.25), /* brilho interno */
      inset -4px -4px 4px 0 rgba(255, 255, 255, 0.40),
      4px 4px 22.6px 0 rgba(0, 0, 0, 0.1);
    padding: 4rem;
    border-radius: 18.354%;
    pointer-events: none;
    user-select: none;
    overflow: hidden;
    transition: all 0.7s ease-in-out;
    animation: float 5s ease-in-out infinite;
  }

  .glass.without-animation {
    animation: none !important;
    padding: 1rem;
  }

  .float {
    animation: float2 1.5s ease-in-out infinite;
  }

  .caret {
    width: 110px; 
    image-rendering: optimizeQuality;
    cursor: pointer;
    position: absolute;
    bottom: 10vh;
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }

    60% {
      transform: translateY(15px);
    }

    100% {
      transform: translateY(0);
    }
  }

  @keyframes float2 {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(5px);
    }

    100% {
      transform: translateY(0);
    }
  }


</style>
<style>
.app-box {
  width: calc(100vw - 2.4rem);
  height: calc(100vh - 2.4rem);
  overflow-y: auto;
  border-radius: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>