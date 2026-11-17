(() => {
  /* =========================================================
     İŞLETME BİLGİLERİ — doldurulan alanlar sitenin altında görünür.
     Boş bırakılanlar gizlenir.
     ========================================================= */
  const VISIT = {
    address: "",      // ör. "Hacı Hüseyin Mah. Gazi Cad. No: 12, Giresun"
    hours: "",        // ör. "Her gün 08:00 – 23:00"
    phone: "",        // ör. "0 (454) 000 00 00"
    maps: ""          // Google Maps paylaşım linki
  };

  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const MENU = window.CARAVE_MENU || [];
  const kind = (id) => MENU.find((k) => k.id === id);
  const cats = (k) => (k ? k.sections.flatMap((s) => s.cats) : []);
  const TAG = { imza: "İmza", populer: "Popüler", yeni: "Yeni" };

  $("#year").textContent = new Date().getFullYear();

  /* Footer ziyaret bilgisi */
  const v = [];
  if (VISIT.address) v.push(`<b>Adres:</b> ${VISIT.maps ? `<a href="${esc(VISIT.maps)}" target="_blank" rel="noopener">${esc(VISIT.address)}</a>` : esc(VISIT.address)}`);
  if (VISIT.hours) v.push(`<b>Saatler:</b> ${esc(VISIT.hours)}`);
  if (VISIT.phone) v.push(`<b>Telefon:</b> <a href="tel:${esc(VISIT.phone.replace(/\s/g, ""))}">${esc(VISIT.phone)}</a>`);
  $("#visit").innerHTML = v.length ? v.join("<br>") : `<b>Şehrin en tatlı kahve kaçamağı 🤎</b><br>Carave Coffee ile günün daha keyifli.`;

  /* Kayan şerit */
  const tatli = kind("tatli");
  const names = [...cats(tatli).flatMap((c) => c.items.map((i) => i.name)), "Latte", "Türk Kahvesi", "Iced Latte"];
  const strip = names.map((n) => `<span>${esc(n)}</span>`).join("");
  $("#marquee").innerHTML = strip + strip;

  /* Tatlı vitrini */
  $("#dessertRail").innerHTML = cats(tatli).flatMap((c) => c.items.map((it) => {
    const t = (it.tags || [])[0];
    return `<a class="d-card reveal" href="menu/?menu=tatli&cat=${encodeURIComponent(c.name)}">
      <figure><img src="${esc(it.img)}" alt="${esc(it.name)}" loading="lazy">${t ? `<span class="tag ${t}">${TAG[t]}</span>` : ""}</figure>
      <div class="body"><h3>${esc(it.name)}</h3><p>${esc(it.desc)}</p></div>
    </a>`;
  })).join("");

  /* Kahve kategorileri */
  $("#coffeeTiles").innerHTML = cats(kind("kahve")).map((c) => `
    <a class="tile" href="menu/?menu=kahve&cat=${encodeURIComponent(c.name)}">
      <img src="${esc(c.cover)}" alt="" loading="lazy">
      <span><b>${esc(c.name)}</b><small>${c.items.length} çeşit</small></span>
    </a>`).join("");

  /* Kahve kartı damgaları */
  const BEAN = `<svg viewBox="0 0 100 100"><path d="M47 6c8 0 14 4 18 10 5 7 7 16 5 23-3 10-15 13-21 24-4 7-5 16-3 24 1 4-3 7-7 5C22 83 12 67 12 49 12 33 20 19 32 11c4-3 9-5 15-5z"/><path d="M60 9c-3-2-7 1-6 4 2 9 1 18-2 25-6 13-19 15-22 26-2 7 0 16 5 23 4 6 10 10 18 10 6 0 11-2 15-5 12-9 20-23 20-38 0-19-11-36-28-45z"/></svg>`;
  $("#stamps").innerHTML = Array.from({ length: 8 }, () => `<span class="stamp">${BEAN}</span>`).join("") + `<span class="stamp gift">1 kahve<br>bizden</span>`;
  // 5'li ızgarada 9 hücre: son satırı ortala
  $("#stamps").style.gridTemplateColumns = "repeat(5, 1fr)";
  let stamped = false;
  function stampAll() {
    if (stamped) return; stamped = true;
    const s = [...document.querySelectorAll(".stamp")];
    s.forEach((el, i) => setTimeout(() => el.classList.add("on"), 250 + i * 220));
  }

  /* Nav */
  const nav = $("#nav");
  const fab = $("#fab");
  addEventListener("scroll", () => {
    nav.classList.toggle("stuck", scrollY > 10);
    // Hero geçilince menü butonu belirsin; en alttaki "Menüyü Aç" alanına gelince gizlensin
    const nearEnd = innerHeight + scrollY > document.body.scrollHeight - 420;
    fab.classList.toggle("show", scrollY > innerHeight * 0.7 && !nearEnd);
  }, { passive: true });
  $("#burger").addEventListener("click", () => nav.classList.toggle("open"));
  $("#links").addEventListener("click", (e) => e.target.closest("a") && nav.classList.remove("open"));

  /* Tanıtım videosu: hareket azaltma tercihinde durdur, ekrandan çıkınca duraklat */
  const vid = document.querySelector(".hero-video");
  if (vid) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) vid.removeAttribute("autoplay"), vid.pause();
    else if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => { e.isIntersecting ? vid.play().catch(() => {}) : vid.pause(); }).observe(vid);
    }
  }

  /* Görününce belir */
  const reveal = document.querySelectorAll(".reveal, .d-card, .tile, .split-img, .event, .final, .card-band");
  reveal.forEach((el) => el.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      if (en.target.classList.contains("card-band")) stampAll();
      io.unobserve(en.target);
    }), { rootMargin: "0px 0px -8% 0px" });
    reveal.forEach((el, i) => { el.style.transitionDelay = `${(i % 5) * 60}ms`; io.observe(el); });
  } else {
    reveal.forEach((el) => el.classList.add("in"));
    stampAll();
  }
})();
