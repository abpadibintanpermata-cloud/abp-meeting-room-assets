/* ABP Meeting Room - Firebase Cloud Messaging service worker */
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
importScripts('./firebase-config.js');

firebase.initializeApp(ABP_FIREBASE_CONFIG);
const abpMessaging = firebase.messaging();

abpMessaging.onBackgroundMessage(function(payload) {
  const data = payload && payload.data ? payload.data : {};
  const title = data.title || 'ABP Meeting Room';
  const options = {
    body: data.body || 'Ada informasi terbaru dari sistem booking ruang meeting.',
    icon: 'https://raw.githubusercontent.com/abpadibintanpermata-cloud/abp-meeting-room-assets/main/Favicon_ABP_Asli_64.png',
    badge: 'https://raw.githubusercontent.com/abpadibintanpermata-cloud/abp-meeting-room-assets/main/Favicon_ABP_Asli_64.png',
    tag: data.bookingId || ('abp-' + Date.now()),
    renotify: true,
    data: {url: data.url || ABP_MEETING_ROOM_URL, bookingId: data.bookingId || ''}
  };
  return self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const targetUrl = (event.notification && event.notification.data && event.notification.data.url) || ABP_MEETING_ROOM_URL;
  event.waitUntil(clients.matchAll({type:'window', includeUncontrolled:true}).then(function(clientList) {
    for (const client of clientList) {
      if (targetUrl && client.url.indexOf(targetUrl) === 0 && 'focus' in client) return client.focus();
    }
    if (targetUrl && clients.openWindow) return clients.openWindow(targetUrl);
    return undefined;
  }));
});
