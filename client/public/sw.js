// SW mínimo: atualização imediata e claim dos clients
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Sem fetch handler -> o navegador cuida de tudo (sem overhead/avisos)
