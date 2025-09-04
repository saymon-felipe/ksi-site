// O plugin injetará a lista de arquivos para cache automaticamente aqui
// import {precacheAndRoute} from 'workbox-sw';
// precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});