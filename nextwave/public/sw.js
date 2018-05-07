
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

if (workbox) {
	console.log('Yay! Workbox is loaded 🎉');
	workbox.routing.registerRoute(
		/\.(?:js|css)$/,
		workbox.strategies.staleWhileRevalidate(),
	);
	workbox.routing.registerRoute(
		/\.(?:png|gif|jpg|jpeg|svg)$/,
		workbox.strategies.cacheFirst({
		  cacheName: 'images',
		  plugins: [
			new workbox.expiration.Plugin({
			  maxEntries: 60,
			  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
			}),
		  ],
		}),
	);    
} else {
  console.log('Boo! Workbox didnt load 😬');
}
