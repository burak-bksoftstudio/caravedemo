/* =========================================================
   CARAVE COFFEE · MENÜ VERİSİ
   ---------------------------------------------------------
   Yapı:  sekme (kinds)  →  bölüm (sections)  →  kategori (cats)  →  ürün (items)

   Ürün alanları:
   - name  : ürün adı
   - desc  : kısa açıklama
   - price : sayı (ör. 185). null ise fiyat gösterilmez.
   - img   : "assets/img/dosya.jpg"
   - tags  : "imza" | "populer" | "yeni"
   - fav   : true → sekmenin üstündeki favoriler kartlarında görünür
   - pair  : detay penceresindeki "Yanına yakışır" önerisi

   Fotoğraflar Unsplash'ten (ücretsiz lisans). İşletmenin kendi
   fotoğrafları çekildiğinde aynı isimle assets/img içine koymanız yeterli.
   ========================================================= */

const IMG = (n) => `assets/img/${n}.jpg`;

window.CARAVE_MENU = [
  {
    id: "tatli",
    title: "Tatlılar",
    sections: [
      {
        title: "Tatlılar",
        cats: [
          {
            name: "Cheesecake",
            cover: IMG("san-sebastian"),
            items: [
              { name: "San Sebastian", desc: "Dışı karamelize, içi akışkan Bask usulü yanık cheesecake.", price: null, img: IMG("san-sebastian"), tags: ["populer"], fav: true, pair: "Filtre Kahve" },
              { name: "San Sebastian Yaban Mersinli", desc: "Klasik San Sebastian, ekşi-tatlı yaban mersini sosuyla.", price: null, img: IMG("san-sebastian-yaban"), tags: ["yeni"], pair: "Flat White" },
              { name: "Lotuslu Cheesecake", desc: "Lotus bisküvi tabanı, cheesecake kreması ve karamelize Lotus sos.", price: null, img: IMG("lotus-cheesecake"), tags: ["populer"], fav: true, pair: "Latte" }
            ]
          },
          {
            name: "Pasta & Kek",
            cover: IMG("carave-kek"),
            items: [
              { name: "Espressolu Carave Kek", desc: "Evimizin imzası: taze espresso ile hazırlanan nemli, yumuşak kek.", price: null, img: IMG("carave-kek"), tags: ["imza"], fav: true, pair: "Cappuccino" },
              { name: "Kek Been", desc: "Kahve çekirdeği formunda, minik imza keklerimiz.", price: null, img: IMG("kek-been"), tags: ["imza"], pair: "Espresso" },
              { name: "Magnolia", desc: "Bisküvi katmanları arasında hafif vanilyalı krema.", price: null, img: IMG("magnolia"), tags: [], pair: "Americano" },
              { name: "Mozaik", desc: "Bisküvi ve yoğun kakaonun nostaljik buluşması. Soğuk servis edilir.", price: null, img: IMG("mozaik"), tags: [], pair: "Türk Kahvesi" }
            ]
          },
          {
            name: "Brownie",
            cover: IMG("brownie"),
            items: [
              { name: "Çikolatalı Brownie", desc: "Dışı çıtır, içi yumuşacık; bol çikolatalı klasik brownie.", price: null, img: IMG("brownie"), tags: ["populer"], fav: true, pair: "Sütlü Türk Kahvesi" },
              { name: "Vişneli Brownie", desc: "Yoğun çikolatalı brownie, ekşimsi vişneyle dengeleniyor.", price: null, img: IMG("visneli-brownie"), tags: [], pair: "Caffè Mocha" }
            ]
          },
          {
            name: "Sıcak Tatlılar",
            cover: IMG("krep"),
            items: [
              { name: "Krep Sarma", desc: "İnce taze krep, sıcak çikolata sosuyla sarılır.", price: null, img: IMG("krep"), tags: [], pair: "Sıcak Çikolata" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "kahve",
    title: "Kahveler",
    sections: [
      {
        title: "Sıcak Kahveler",
        cats: [
          {
            name: "Espresso",
            cover: IMG("espresso"),
            items: [
              { name: "Espresso", desc: "Tek shot, yoğun ve aromatik.", price: null, img: IMG("espresso"), tags: [] },
              { name: "Double Espresso", desc: "İki shot, iki kat karakter.", price: null, img: IMG("double-espresso"), tags: [] },
              { name: "Americano", desc: "Espresso ve sıcak su; sade, uzun içim.", price: null, img: IMG("americano"), tags: [] },
              { name: "Cortado", desc: "Espresso ve eşit miktarda sıcak süt.", price: null, img: IMG("cortado"), tags: [] }
            ]
          },
          {
            name: "Sütlü Kahveler",
            cover: IMG("latte"),
            items: [
              { name: "Latte", desc: "Bol sütlü, yumuşak içim; üstünde latte art.", price: null, img: IMG("latte"), tags: ["populer"], fav: true },
              { name: "Cappuccino", desc: "Espresso, sıcak süt ve yoğun süt köpüğü.", price: null, img: IMG("cappuccino"), tags: ["populer"], fav: true },
              { name: "Flat White", desc: "Double ristretto ve ince dokulu süt.", price: null, img: IMG("flat-white"), tags: [] },
              { name: "Caffè Mocha", desc: "Espresso, çikolata sosu ve sıcak süt.", price: null, img: IMG("mocha"), tags: [] },
              { name: "White Chocolate Mocha", desc: "Beyaz çikolata ve espresso, üzeri krema.", price: null, img: IMG("white-mocha"), tags: [] },
              { name: "Caramel Macchiato", desc: "Vanilyalı süt, espresso ve karamel sos.", price: null, img: IMG("caramel-macchiato"), tags: [] }
            ]
          },
          {
            name: "Türk Kahvesi & Filtre",
            cover: IMG("sutlu-turk"),
            items: [
              { name: "Türk Kahvesi", desc: "Bol köpüklü, yanında lokumuyla.", price: null, img: IMG("sutlu-turk"), tags: ["populer"], fav: true },
              { name: "Sütlü Türk Kahvesi", desc: "Sütle pişirilen, yumuşak içimli Türk kahvesi.", price: null, img: IMG("turk-kahvesi"), tags: [] },
              { name: "Filtre Kahve", desc: "Günün çekirdeğiyle taze demlenir.", price: null, img: IMG("filtre"), tags: [] }
            ]
          }
        ]
      },
      {
        title: "Soğuk Kahveler",
        cats: [
          {
            name: "Iced Kahveler",
            cover: IMG("iced-latte"),
            items: [
              { name: "Iced Latte", desc: "Soğuk süt, espresso ve buz.", price: null, img: IMG("iced-latte"), tags: ["populer"], fav: true },
              { name: "Iced Americano", desc: "Espresso, soğuk su ve bol buz.", price: null, img: IMG("iced-americano"), tags: [] },
              { name: "Iced Mocha", desc: "Çikolata, espresso ve soğuk süt.", price: null, img: IMG("iced-mocha"), tags: [] },
              { name: "Iced Caramel Macchiato", desc: "Vanilya, süt, espresso ve karamel katmanları.", price: null, img: IMG("iced-caramel"), tags: [] },
              { name: "Cold Brew", desc: "Uzun saatler soğuk demlenmiş, yumuşak içim.", price: null, img: IMG("cold-brew"), tags: [] }
            ]
          },
          {
            name: "Frappe",
            cover: IMG("caramel-frappe"),
            items: [
              { name: "Caramel Frappe", desc: "Buzla çırpılmış kahve, karamel ve krema.", price: null, img: IMG("caramel-frappe"), tags: [] },
              { name: "Mocha Frappe", desc: "Buzlu, çikolatalı, kremalı.", price: null, img: IMG("mocha-frappe"), tags: [] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "icecek",
    title: "İçecekler",
    sections: [
      {
        title: "Sıcak İçecekler",
        cats: [
          {
            name: "Çaylar",
            cover: IMG("cay"),
            items: [
              { name: "Çay", desc: "Taze demlenmiş Karadeniz çayı.", price: null, img: IMG("cay"), tags: [] },
              { name: "Bitki Çayları", desc: "Ihlamur, yeşil çay, adaçayı, kış çayı.", price: null, img: IMG("bitki-cayi"), tags: [] },
              { name: "Chai Tea Latte", desc: "Baharatlı çay ve köpüklü süt.", price: null, img: IMG("chai"), tags: [] }
            ]
          },
          {
            name: "Sıcak İçecekler",
            cover: IMG("sicak-cikolata"),
            items: [
              { name: "Sıcak Çikolata", desc: "Yoğun kakao ve sıcak süt.", price: null, img: IMG("sicak-cikolata"), tags: [] },
              { name: "Salep", desc: "Tarçınlı kış klasiği.", price: null, img: IMG("salep"), tags: [] }
            ]
          }
        ]
      },
      {
        title: "Soğuk İçecekler",
        cats: [
          {
            name: "Milkshake",
            cover: IMG("cikolata-shake"),
            items: [
              { name: "Lotus Milkshake", desc: "Lotus bisküvi ve dondurma.", price: null, img: IMG("lotus-shake"), tags: ["populer"], fav: true },
              { name: "Çikolatalı Milkshake", desc: "Bol çikolatalı klasik.", price: null, img: IMG("cikolata-shake"), tags: [] }
            ]
          },
          {
            name: "Limonatalar",
            cover: IMG("cilekli-limonata"),
            items: [
              { name: "Ev Yapımı Limonata", desc: "Taze sıkılmış limon ve nane.", price: null, img: IMG("limonata"), tags: [] },
              { name: "Çilekli Limonata", desc: "Limonata ve taze çilek.", price: null, img: IMG("cilekli-limonata"), tags: [] }
            ]
          },
          {
            name: "Su & Soda",
            cover: IMG("su"),
            items: [
              { name: "Su", desc: "33 cl.", price: null, img: IMG("su"), tags: [] },
              { name: "Maden Suyu", desc: "Sade veya meyveli.", price: null, img: IMG("soda"), tags: [] }
            ]
          }
        ]
      }
    ]
  }
];
