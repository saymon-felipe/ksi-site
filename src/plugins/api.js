import axios from 'axios';

let url_api;

const dev_environment = "http://localhost:3000/"; // Ambiente de desenvolvimento.
const prod_environment = "https://core-ksi-0965169e8f49.herokuapp.com/"; // Ambiente de teste.

// Detecta ambiente automaticamente
let ambient = (window.location.hostname.includes("localhost") || window.location.hostname.includes("192.168")) ? 0 : 1;

switch (ambient) {
  case 0:
    url_api = dev_environment;
    break;
  case 1:
    url_api = prod_environment;
    break;
}

const api = axios.create({
  baseURL: url_api,
  withCredentials: true
});

export default {
  install(app) {
    app.config.globalProperties.api = api;
  }
};
