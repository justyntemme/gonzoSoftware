
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

if (workbox) {
	console.log('Yay! Workbox is loaded 🎉');
	workbox.routing.registerRoute(
		new RegExp('.*\.css'),
		workbox.strategies.cacheFirst({
			cacheName: 'css-cache',
			plugins: [
				new workbox.expiration.Plugin({
					maxEntries: 20,
					maxageSeconds: 7 * 24 * 60 * 60,
				})
			],
		})

	);
	workbox.routing.registerRoute(
		new RegExp('.*\.png'),
		workbox.strategies.cacheFirst({
			cacheName: 'image-cache',
			plugins: [
				new workbox.expiration.Plugin({
					maxEntries: 20,
					maxageSeconds: 7 * 24 * 60 * 60,
				})
			],
		})

	);
} else {
  console.log('Boo! Workbox didnt load 😬');
}
