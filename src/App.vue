<template>
  <main class="app-box">
    <headerComponent></headerComponent>
    
    <div class="app-box-content">
      <heroComponent></heroComponent>
      <customersComponent></customersComponent>
      <servicesComponent></servicesComponent>
      <ksiTubeComponent></ksiTubeComponent>
    </div>

    <ThreeDScene :spherePosition="spherePosition" :text="text" />
    <span class="primary-font signature" v-scroll-reveal="{ delay: 500, origin: 'bottom' }">
      <span>© {{ year }} KSI. todos os direitos reservados.</span>

      <a href="https://www.linkedin.com/company/ksikineticsolutions" target="_blank">
        <font-awesome-icon title="Linkedin: KSI - Kinetic Solutions" :icon="['fab', 'linkedin']" />
      </a>
    </span>
  </main>
</template>

<script>
import ThreeDScene from './components/ThreeDScene.vue';
import headerComponent from "./components/headerComponent.vue";
import heroComponent from "./components/heroComponent.vue";
import customersComponent from "./components/customersComponent.vue";
import servicesComponent from "./components/servicesComponent.vue";
import ksiTubeComponent from "./components/ksiTubeComponent.vue";

export default {
  name: 'App', // Nome do componente principal
  components: {
    ThreeDScene,
    headerComponent,
    heroComponent,
    customersComponent,
    servicesComponent,
    ksiTubeComponent
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
      let containerHeight = Math.floor(document.querySelector("#hero").getBoundingClientRect().height) + 21;
      let scrollTop = Math.floor(e.target.scrollTop);
      
      if (scrollTop < (containerHeight / 2)) { //primeira sessão
        this.text = { refresh: true };
        this.spherePosition = { x: 0, y: -1, z: 1, scale: 1 };
      } else if (scrollTop < (containerHeight + (containerHeight / 2))) { //segunda sessão
        this.text = { refresh: true };
        this.spherePosition = { x: 2, y: 1, z: 1, scale: 0.5 };
      } else if (scrollTop >= (containerHeight + (containerHeight / 2)) && scrollTop < (containerHeight + (containerHeight * 2))) {
        this.text = { refresh: true };
        this.spherePosition = { x: -2, y: 0, z: 1, scale: 1 };
      } else if (scrollTop >= (containerHeight * 2)) {
        this.text = { refresh: true };
        this.spherePosition = { x: 0, y: -2.7, z: 1, scale: 1 };
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
    z-index: 12;
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
      margin: 2rem auto;
      background-color: transparent;
      scroll-snap-align: start;
      padding: var(--space-10) 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }
  }  
}

.signature {
  position: fixed;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  margin: auto;
  padding: 0 2.4rem .4rem 2.4rem;
  font-size: 14px;
  color: var(--blue);
  margin-right: var(--space-6);
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  width: calc(100vw - 2.4rem);
  z-index: 10;

  & svg {
    font-size: 1.3rem;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    color: #0077B5;

    &:hover {
      transform: translateY(-5px);
      color: #005e91;
    }
  }
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
    font-size: 12px;
    flex-direction: column;
    align-items: center;
  }
}
</style>
