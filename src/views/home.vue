<template>
    <heroComponent></heroComponent>
    <customersComponent></customersComponent>
    <servicesComponent></servicesComponent>
    <ksiTubeComponent></ksiTubeComponent>
</template>
<script>
import heroComponent from "../components/heroComponent.vue";
import customersComponent from "../components/customersComponent.vue";
import servicesComponent from "../components/servicesComponent.vue";
import ksiTubeComponent from "../components/ksiTubeComponent.vue";

export default {
  components: {
    heroComponent,
    customersComponent,
    servicesComponent,
    ksiTubeComponent
  }
}
</script>