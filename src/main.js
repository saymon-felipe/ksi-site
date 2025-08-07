import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { vScrollReveal } from './directives/scrollReveal';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

/* Adiciona os ícones à biblioteca para que possam ser usados em qualquer lugar */
library.add(faBars, faAngleLeft, faAngleRight);

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon);

app.directive('scroll-reveal', vScrollReveal);

app.mount('#app');

