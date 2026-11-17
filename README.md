# caravedemo

Carave Coffee web sitesi + dijital QR menü — saf HTML/CSS/JS, derleme adımı yok.

- `/` → web sitesi (`index.html`, `site.css`, `site.js`)
- `/menu/` → QR menü (`menu/`) — QR kodu bu adrese yönlendirin
- `assets/` → logo ve ürün fotoğrafları (ikisi ortak kullanır)

## Yayınlama (Cloudflare Pages)
- Framework preset: **None**
- Build command: *(boş)*
- Build output directory: `/`

## Menüyü düzenleme
Tüm ürünler, fiyatlar ve görseller `menu/menu-data.js` içinde (web sitesi de buradan okur).
Adres, saat ve telefon için `site.js` başındaki `VISIT` alanlarını doldurun.
Fiyat girmek için `price: null` yerine rakam yazın (ör. `price: 185`).
Ürün fotoğrafları `assets/img/` klasöründe; aynı isimle değiştirmeniz yeterli.

Görseller: Unsplash (Unsplash License).
