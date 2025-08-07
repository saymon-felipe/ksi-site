<template>
  <main class="app-box">
    <headerComponent></headerComponent>
    
    <div class="app-box-content">
      <heroComponent></heroComponent>
      <customersComponent></customersComponent>
    </div>

    <ThreeDScene :spherePosition="spherePosition" :text="text" />
    <span class="primary-font signature" v-scroll-reveal="{ delay: 500, origin: 'bottom' }">© {{ year }} KSI. todos os direitos reservados.</span>
  </main>
</template>

<script>
import ThreeDScene from './components/ThreeDScene.vue';
import headerComponent from "./components/headerComponent.vue";
import heroComponent from "./components/heroComponent.vue";
import customersComponent from "./components/customersComponent.vue";

export default {
  name: 'App', // Nome do componente principal
  components: {
    ThreeDScene,
    headerComponent,
    heroComponent,
    customersComponent
  },
  data() {
    return {
      spherePosition: {},
      text: {},
      year: new Date().getFullYear()
    }
  },
  mounted: function () {
    

    document.querySelector(".app-box-content").addEventListener("scroll", (e) => {
      let containerHeight = Math.floor(document.querySelector("#hero").getBoundingClientRect().height);
      let scrollTop = Math.floor(e.target.scrollTop);

      if (scrollTop < containerHeight) { //primeira sessão
        this.text = { refresh: true };
        this.spherePosition = { x: 0, y: -1, z: 1, scale: 1 };
      } else if (scrollTop == containerHeight) { //segunda sessão
        this.text = { refresh: true };
        this.spherePosition = { x: 2, y: 1, z: 1, scale: 0.5 };
        console.log("2: ", this.spherePosition)
      }
    })
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
    flex-direction: column;
    padding: var(--space-6);
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;

    & section {
      min-height: 100%;
      width: 95vw;
      max-width: 100%;
      text-align: center;
      margin: auto;
      background-color: transparent;
      scroll-snap-align: start;
      padding: var(--space-10) 0;
    }
  }  
}

.signature {
  position: fixed;
  bottom: 1.5rem;
  left: 4rem;
  font-size: 14px;
  color: var(--blue);
  margin-right: var(--space-6);
}

@media (max-width: 768px) {
  .app-box {
    & .app-box-content {
      & section {
        width: 100%;
      }
    }  
  }
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