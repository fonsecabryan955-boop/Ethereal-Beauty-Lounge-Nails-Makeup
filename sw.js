// Service worker: la app abre sin internet; los datos de Supabase siempre van en vivo.
const V = "ethereal-v3";
const SHELL = ["./", "index.html", "config.js", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "pagos.js", "img-modelo.jpg", "img-manos.jpg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname.endsWith("supabase.co")) return; // datos en vivo, sin caché

  // Archivos propios: primero red (siempre la última versión), caché si no hay internet.
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req)
        .then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(req, cp)); return res; })
        .catch(() => caches.match(req).then(hit => hit || caches.match("index.html")))
    );
    return;
  }

  // Fuentes y librerías externas: primero caché.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === "opaque") { const cp = res.clone(); caches.open(V).then(c => c.put(req, cp)); }
      return res;
    }))
  );
});

// Notificaciones push (nueva cita / recordatorios)
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) {}
  e.waitUntil(self.registration.showNotification(d.title || "Ethereal Beauty Lounge", {
    body: d.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png",
    tag: d.tag || "ethereal",
    renotify: true,
    vibrate: [120, 60, 120],
    data: { url: d.url || "./" }
  }));
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  const base = new URL("./", self.location.href);
  const url = new URL((e.notification.data && e.notification.data.url) || "./", base).href;
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) {
      if ("focus" in c) { if (c.navigate) c.navigate(url); return c.focus(); }
    }
    return clients.openWindow(url);
  }));
});
