<template>
  <main class="app-box">
    <router-view></router-view>
  </main>
</template>
<script>
export default {
  name: 'App',
  
};
</script>
<style scoped>
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
}
</style>
