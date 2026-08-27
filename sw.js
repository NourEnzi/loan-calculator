const CACHE_NAME = 'loan-calculator-v1.0.0';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './favicon.png'
];

// تثبيت عامل الخدمة وتخزين الملفات
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// تفعيل عامل الخدمة وحذف النسخ القديمة
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// جلب الملفات من الكاش إذا لم يتوفر اتصال بالإنترنت
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // إرجاع النسخة المخزنة أو جلبها من الإنترنت
            return response || fetch(event.request);
        })
    );
});