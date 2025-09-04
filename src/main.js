import './assets/main.css'

import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import { vScrollReveal } from './directives/scrollReveal';
import { vMaska } from 'maska/vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import globalMixin from './mixins/global';
import api from "./plugins/api.js";
import vue3GoogleLogin from 'vue3-google-login';

import { faBars, faAngleLeft, faAngleRight, faGlobe, faMobile, faQuestion, faMagnifyingGlass, faThumbsUp, faThumbsDown, faEye, faXmark, faPlay, faPause, faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark, faExpand, faCompress, faShare, faCircleArrowLeft, faCloudArrowUp, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

/* Adiciona os ícones à biblioteca para que possam ser usados em qualquer lugar */
library.add(faBars, faAngleLeft, faAngleRight, faGlobe, faMobile, faQuestion, faLinkedin, faMagnifyingGlass, faThumbsUp, faThumbsDown, faEye, faXmark, faPlay, faPause, faVolumeHigh, faVolumeLow, faVolumeOff, faVolumeXmark, faExpand, faCompress, faShare, faCircleArrowLeft, faCloudArrowUp, faUpload);

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);

app.directive('scroll-reveal', vScrollReveal);
app.directive('maska', vMaska);

app.mixin(globalMixin);

app.use(api);
app.use(router);

app.use(vue3GoogleLogin, {
    clientId: "12518031078-ahn0romctaqfjr4gogivjnfe944qhq5q.apps.googleusercontent.com"
});

app.config.globalProperties.$usuario = reactive({
  id: null,
  email: "",
  imagem: "",
  nome: ""
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Registro do Service Worker falhou:', error);
      });
  });
}

app.mount('#app');

