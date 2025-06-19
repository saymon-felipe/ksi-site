<template>
  <ThreeDScene />
  <section class="hero-container">
    <div class="glass">
      <img src="./assets/img/logo.png" class="logo" alt="KSI - Kinetic Solutions">
    </div>
  </section>
</template>

<script>
import ThreeDScene from './components/ThreeDScene.vue';

export default {
  name: 'App', // Nome do componente principal
  components: {
    ThreeDScene,
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
  }

  .logo {
    width: 90vw;
    max-width: 500px;
  }

  .glass {
    display: grid;
    place-items: center;
    padding: 3rem 4rem;

    /* --- O EFEITO GLASSMORPHISM --- */

    /* Cor de fundo com transparência */
    background: rgba(255, 255, 255, 0.05);

    /* O desfoque do fundo - esta é a propriedade principal! */
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(12px); /* Suporte para Safari */

    box-shadow: 0 0 10px rgba( 51, 51, 51, 0.3);
    
    /* Borda sutil para dar a impressão de profundidade */
    border: 2px solid rgba(255, 255, 255, 0.1);

    /* Cantos bem arredondados para a forma de pílula */
    border-radius: 50px;
  }
</style>