import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { vScrollReveal } from './directives/scrollReveal';
import { vMaska } from 'maska/vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars, faAngleLeft, faAngleRight, faGlobe, faMobile, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

/* Adiciona os ícones à biblioteca para que possam ser usados em qualquer lugar */
library.add(faBars, faAngleLeft, faAngleRight, faGlobe, faMobile, faQuestion, faLinkedin);

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);

app.directive('scroll-reveal', vScrollReveal);
app.directive('maska', vMaska);

app.mount('#app');

