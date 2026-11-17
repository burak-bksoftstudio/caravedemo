(() => {
  const MENU = window.CARAVE_MENU || [];
  const $ = (s) => document.querySelector(s);
  const view = $("#view");
  const TAG = { imza: "İmza", populer: "Popüler", yeni: "Yeni" };
  const lower = (s) => s.toLocaleLowerCase("tr");
  const upper = (s) => s.toLocaleUpperCase("tr");
  const price = (p) => (p == null || p === "" ? "" : Number(p).toLocaleString("tr-TR") + " ₺");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ARROW = `<svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></svg>`;
  const PLUS = `<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`;

  /* Ürünleri düzleştir, sekme içi sıra numarası ver */
  const all = [];
  MENU.forEach((kind) => {
    let n = 0;
    kind.sections.forEach((sec) => sec.cats.forEach((cat) => {
      cat._kind = kind;
      cat.items.forEach((it) => {
        Object.assign(it, { _kind: kind, _cat: cat, _num: String(++n).padStart(3, "0"), _id: `${kind.id}-${n}` });
        all.push(it);
      });
    }));
  });
  const byId = Object.fromEntries(all.map((i) => [i._id, i]));
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Durum & URL ---------- */
  const state = { kind: MENU[0].id, cat: null, q: "" };
  const kindOf = () => MENU.find((k) => k.id === state.kind);
  const catsOf = (k) => k.sections.flatMap((s) => s.cats);

  function readURL() {
    const p = new URLSearchParams(location.search);
    state.kind = MENU.some((k) => k.id === p.get("menu")) ? p.get("menu") : MENU[0].id;
    const c = p.get("cat");
    state.cat = c && (c === "*" || catsOf(kindOf()).some((x) => x.name === c)) ? c : null;
  }
  function writeURL(push) {
    const u = new URL(location.href);
    u.searchParams.set("menu", state.kind);
    state.cat ? u.searchParams.set("cat", state.cat) : u.searchParams.delete("cat");
    history[push ? "pushState" : "replaceState"](null, "", u);
  }

  /* ---------- Parçalar ---------- */
  const productCard = (it, showKind) => `
    <button class="product reveal" data-id="${it._id}">
      <figure>
        <img src="${esc(it.img)}" alt="${esc(it.name)}" loading="lazy">
        <span class="num">${it._num}</span>
        <i class="plus">${PLUS}</i>
      </figure>
      <div class="info">
        <small>${esc(upper(showKind ? it._kind.title + " · " + it._cat.name : it._cat.name))}</small>
        <h3>${esc(it.name)}</h3>
        <p>${esc(it.desc)}</p>
        <div class="meta">
          <span>${(it.tags || []).slice(0, 1).map((t) => `<span class="chip ${t}">${TAG[t] || esc(t)}</span>`).join("")}</span>
          <strong>${price(it.price)}</strong>
        </div>
      </div>
    </button>`;

  function renderCategories() {
    const k = kindOf();
    const favs = all.filter((i) => i._kind === k && i.fav);
    const total = all.filter((i) => i._kind === k).length;
    let h = "";
    if (favs.length) {
      h += `<div class="row-head"><span class="label">Carave Favorileri</span><small>${favs.length} öneri</small></div>
        <div class="grid">${favs.map((it, i) => `
          <button class="fav reveal" data-id="${it._id}">
            <figure>
              <img src="${esc(it.img)}" alt="${esc(it.name)}" loading="lazy">
              <span class="badge">FAV ${i + 1}</span>
              ${it.price != null ? `<span class="price-badge">${price(it.price)}</span>` : ""}
            </figure>
            <div class="body">
              <h3>${esc(it.name)}</h3>
              <p>${esc(it.desc)}</p>
              <span class="more">İncele ${ARROW}</span>
            </div>
          </button>`).join("")}</div>`;
    }
    h += `<div class="kicker"><span class="label">${esc(k.title)} bölümleri</span></div>
      <div class="row-head" style="margin-top:2px;align-items:flex-end">
        <div><h2 class="big">Kategoriler</h2><p class="lead">Göz atmak istediğin lezzet grubunu seç.</p></div>
        <button class="more" data-cat="*" style="padding:0 0 4px">Tümü (${total}) ${ARROW}</button>
      </div>`;
    k.sections.forEach((sec) => {
      h += `<div class="group">${esc(sec.title)}</div><div class="grid">`;
      sec.cats.forEach((c) => {
        h += `<button class="cat reveal" data-cat="${esc(c.name)}">
          <img src="${esc(c.cover)}" alt="" loading="lazy">
          <span class="count">${c.items.length} ürün</span>
          <span class="txt"><h3>${esc(c.name)}</h3><span class="more">Menüyü Gör ${ARROW}</span></span>
        </button>`;
      });
      h += `</div>`;
    });
    view.innerHTML = h;
  }

  function renderProducts() {
    const k = kindOf();
    const list = state.cat === "*" ? all.filter((i) => i._kind === k) : all.filter((i) => i._kind === k && i._cat.name === state.cat);
    const title = state.cat === "*" ? "Tümü" : state.cat;
    view.innerHTML = `
      <div class="row-head"><span class="label">${esc(k.title)} / ${esc(title)}</span><small>${list.length} ürün</small></div>
      <div class="grid products">${list.map((it) => productCard(it)).join("")}</div>`;
  }

  function renderSearch() {
    const q = lower(state.q);
    const list = all.filter((i) => lower(`${i.name} ${i.desc} ${i._cat.name} ${i._kind.title}`).includes(q));
    view.innerHTML = list.length
      ? `<div class="row-head"><span class="label">“${esc(state.q)}” için sonuçlar</span><small>${list.length} ürün</small></div>
         <div class="grid products">${list.map((it) => productCard(it, true)).join("")}</div>`
      : `<div class="empty"><img src="../assets/logo.jpg" alt=""><p>Bu aramaya göre bir lezzet bulamadık.</p><button data-clear>Kategorilere Dön</button></div>`;
  }

  function render() {
    const k = kindOf();
    $("#kinds").querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.dataset.kind === state.kind));
    $("#q").placeholder = `${k.title} menüsünde ara…`;
    const inner = !!(state.q || state.cat);
    $("#back").hidden = !inner;
    $("#menu").dataset.view = state.q ? "search" : state.cat ? "products" : "categories";
    if (state.q) renderSearch();
    else if (state.cat) renderProducts();
    else renderCategories();
    observe();
  }

  function toTop() {
    const y = $("#menu").offsetTop;
    if (scrollY > y) scrollTo({ top: y, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
  }

  /* ---------- Olaylar ---------- */
  $("#kinds").innerHTML = MENU.map((k) => `<button data-kind="${k.id}">${esc(k.title)}</button>`).join("");
  $("#kinds").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    state.kind = b.dataset.kind; state.cat = null; state.q = ""; $("#q").value = "";
    writeURL(false); render(); toTop();
  });

  view.addEventListener("click", (e) => {
    const c = e.target.closest("[data-cat]");
    if (c) { state.cat = c.dataset.cat; writeURL(true); render(); toTop(); return; }
    const p = e.target.closest("[data-id]");
    if (p) return openModal(byId[p.dataset.id]);
    if (e.target.closest("[data-clear]")) goBack();
  });

  function goBack() {
    if (state.q) { state.q = ""; $("#q").value = ""; render(); return; }
    if (state.cat) { history.state === null && history.length > 1 ? history.back() : (state.cat = null, writeURL(false), render()); }
  }
  $("#back").addEventListener("click", () => { if (state.q) goBack(); else { state.cat = null; writeURL(false); render(); toTop(); } });
  addEventListener("popstate", () => { readURL(); state.q = ""; $("#q").value = ""; render(); closeModal(); });

  let t;
  $("#q").addEventListener("input", (e) => {
    clearTimeout(t);
    t = setTimeout(() => { state.q = e.target.value.trim(); render(); }, 150);
  });

  /* ---------- Detay ---------- */
  const modal = $("#modal"), bg = $("#modalBg");
  function openModal(it) {
    if (!it) return;
    $("#mImg").src = it.img; $("#mImg").alt = it.name;
    $("#mCat").textContent = `${it._kind.title} · ${it._cat.name}`;
    $("#mName").textContent = it.name;
    $("#mDesc").textContent = it.desc;
    $("#mPrice").textContent = price(it.price);
    $("#mPair").innerHTML = it.pair ? `Yanına yakışır: <b>${esc(it.pair)}</b>` : "";
    modal.classList.add("open"); bg.classList.add("open");
    document.body.style.overflow = "hidden"; modal.scrollTop = 0;
  }
  function closeModal() { modal.classList.remove("open"); bg.classList.remove("open"); document.body.style.overflow = ""; }
  bg.addEventListener("click", closeModal);
  $("#modalX").addEventListener("click", closeModal);
  addEventListener("keydown", (e) => e.key === "Escape" && closeModal());

  let y0 = null;
  modal.addEventListener("touchstart", (e) => { y0 = modal.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
  modal.addEventListener("touchmove", (e) => {
    if (y0 == null || innerWidth >= 640) return;
    const dy = e.touches[0].clientY - y0;
    if (dy > 0) { modal.style.transition = "none"; modal.style.transform = `translateY(${dy}px)`; }
  }, { passive: true });
  modal.addEventListener("touchend", (e) => {
    if (y0 == null) return;
    const dy = e.changedTouches[0].clientY - y0;
    modal.style.transition = ""; modal.style.transform = "";
    if (dy > 100 && innerWidth < 640) closeModal();
    y0 = null;
  });

  /* ---------- Promo ---------- */
  const promo = $("#promo");
  try { if (sessionStorage.getItem("promoX")) promo.classList.add("hide"); } catch (_) {}
  $("#promoX").addEventListener("click", () => {
    promo.classList.add("hide");
    try { sessionStorage.setItem("promoX", "1"); } catch (_) {}
  });

  /* ---------- Reveal & sticky ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -5% 0px" })
    : null;
  function observe() {
    view.querySelectorAll(".reveal").forEach((el, i) => {
      if (!io) return el.classList.add("in");
      el.style.transitionDelay = `${(i % 6) * 35}ms`;
      io.observe(el);
    });
  }
  const tb = document.querySelector(".toolbar");
  addEventListener("scroll", () => tb.classList.toggle("stuck", tb.getBoundingClientRect().top <= 0 && scrollY > 60), { passive: true });

  /* ---------- Başlat ---------- */
  readURL();
  render();
  $("#loaderCount").textContent = `${all.length} LEZZET · BOL KEYİF`;
  // Açılış animasyonu (~2.4 sn) bitene kadar bekle, sonra kapat
  const hide = () => setTimeout(() => $("#loader").classList.add("done"), Math.max(300, 2700 - performance.now()));
  document.readyState === "complete" ? hide() : addEventListener("load", hide);
})();
