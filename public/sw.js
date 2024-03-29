importScripts("/uv/uv.bundle.js");
importScripts("/uv.config.js");
importScripts(__uv$config.sw);

self.addEventListener("install", (event) => {
    self.skipWaiting();
  });
  
  const sw = new UVServiceWorker();
  
  self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));