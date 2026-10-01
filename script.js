/* ==========================================================
   DATA
   ========================================================== */
const products = [
  { id: 1, name: "Ethiopian Yirgacheffe", desc: "Floral notes with bright citrus acidity and a tea-like body. Light roast.", price: 1499, rating: 4.5, badge: "Bestseller", art: "latte" },
  { id: 2, name: "Colombian Supremo",     desc: "Rich caramel sweetness with nutty undertones and balanced acidity. Medium roast.", price: 1299, rating: 4,   badge: null,         art: "art" },
  { id: 3, name: "Dark Roast Espresso",   desc: "Bold and intense with dark chocolate notes and a creamy mouthfeel. Dark roast.",   price: 1399, rating: 5,   badge: "New",        art: "beans" }
];

const locations = [
  { name: "Pearl District",  addr: "123 Coffee Lane, Portland, OR",  hours: "Mon-Sat: 7am - 8pm" },
  { name: "Hawthorne",       addr: "48 Roaster's Row, Portland, OR", hours: "Daily: 6:30am - 7pm" },
  { name: "Alberta Arts",    addr: "9 Bean Street, Portland, OR",    hours: "Tue-Sun: 8am - 9pm" }
];

/* Product illustrations (inline SVG, so the page needs no image files) */
const artwork = {
  latte: `
  <svg viewBox="0 0 300 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="a1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a1b14"/><stop offset="1" stop-color="#0d0806"/></linearGradient>
      <linearGradient id="g1" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".4" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity=".3"/></linearGradient>
    </defs>
    <rect width="300" height="230" fill="url(#a1)"/>
    <!-- chess pieces -->
    <g fill="#7b4a26" opacity=".85">
      <rect x="30" y="170" width="38" height="12" rx="3"/><path d="M36 170 L40 120 H58 L62 170Z"/><circle cx="49" cy="108" r="12"/>
      <rect x="82" y="182" width="26" height="8" rx="3" opacity=".7"/><path d="M86 182 L89 150 H101 L104 182Z" opacity=".7"/><circle cx="95" cy="142" r="8" opacity=".7"/>
    </g>
    <!-- glass -->
    <path d="M130 55 H214 L208 200 Q207 212 195 212 H149 Q137 212 136 200Z" fill="url(#g1)"/>
    <path d="M133 78 H211 L207 198 Q206 208 196 208 H148 Q138 208 137 198Z" fill="#e8c9a2"/>
    <path d="M133 78 H211 L210 108 H134Z" fill="#8a5632"/>
    <path d="M131 55 H213 L211 80 H133Z" fill="#f6ecdd"/>
    <path d="M142 62 C165 56 185 58 204 62" stroke="#c4875a" stroke-width="3" fill="none" opacity=".55"/>
    <path d="M214 90 C250 88 250 150 208 152" fill="none" stroke="#e8d6c1" stroke-width="9" stroke-linecap="round" opacity=".7"/>
    <ellipse cx="152" cy="130" rx="5" ry="40" fill="#fff" opacity=".25"/>
  </svg>`,

  art: `
  <svg viewBox="0 0 300 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="a2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f1713"/><stop offset="1" stop-color="#150a09"/></linearGradient>
      <radialGradient id="c2" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#e99b3c"/><stop offset="1" stop-color="#a8591b"/></radialGradient>
    </defs>
    <rect width="300" height="230" fill="url(#a2)"/>
    <!-- pitcher pouring -->
    <path d="M122 10 H200 L190 56 Q168 70 140 54Z" fill="#d7d7d7"/>
    <path d="M122 10 H200 L196 22 H126Z" fill="#fff" opacity=".6"/>
    <path d="M158 62 C156 84 158 96 160 112" stroke="#f9f1e5" stroke-width="8" stroke-linecap="round" fill="none"/>
    <!-- cup -->
    <ellipse cx="160" cy="170" rx="104" ry="20" fill="#000" opacity=".35"/>
    <path d="M70 118 H250 C250 175 214 206 160 206 C106 206 70 175 70 118Z" fill="#f1f1f1"/>
    <ellipse cx="160" cy="118" rx="90" ry="26" fill="#fff"/>
    <ellipse cx="160" cy="119" rx="78" ry="20" fill="url(#c2)"/>
    <!-- latte art -->
    <path d="M160 108 C140 108 128 120 150 130 C158 134 162 134 170 130 C192 120 180 108 160 108Z" fill="#fbf1e2"/>
    <path d="M160 112 C150 112 144 118 154 124 C158 126 162 126 166 124 C176 118 170 112 160 112Z" fill="#c4783a" opacity=".6"/>
    <!-- hand -->
    <path d="M232 190 C250 160 270 168 276 190 C282 215 262 230 236 230Z" fill="#e7b995"/>
  </svg>`,

  beans: `
  <svg viewBox="0 0 300 230" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <pattern id="bn" width="34" height="26" patternUnits="userSpaceOnUse" patternTransform="rotate(18)">
        <ellipse cx="9" cy="8" rx="9" ry="6" fill="#4a2615"/><path d="M1 8 C6 6 12 10 17 8" stroke="#2a130a" stroke-width="1.6" fill="none"/>
        <ellipse cx="26" cy="20" rx="8" ry="5.500" fill="#5a2f1a"/><path d="M19 20 C24 18 29 22 33 20" stroke="#2a130a" stroke-width="1.5" fill="none"/>
        <ellipse cx="26" cy="5" rx="7" ry="4.500" fill="#3c1e10"/>
      </pattern>
      <radialGradient id="c3" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#4a2411"/><stop offset="1" stop-color="#150803"/></radialGradient>
    </defs>
    <rect width="300" height="230" fill="#33190d"/>
    <rect width="300" height="230" fill="url(#bn)"/>
    <ellipse cx="150" cy="130" rx="108" ry="108" fill="#000" opacity=".3"/>
    <circle cx="150" cy="120" r="100" fill="#f4f4f4"/>
    <circle cx="150" cy="120" r="84" fill="#e1e1e1"/>
    <circle cx="150" cy="120" r="58" fill="#fff"/>
    <circle cx="150" cy="120" r="50" fill="url(#c3)"/>
    <ellipse cx="136" cy="104" rx="16" ry="7" fill="#fff" opacity=".18" transform="rotate(-30 136 104)"/>
    <path d="M245 78 C275 70 282 118 248 126" fill="none" stroke="#f4f4f4" stroke-width="10" stroke-linecap="round"/>
  </svg>`
};

/* ==========================================================
   HELPERS
   ========================================================== */
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function starsHTML(rating) {
  let out = "";
  for (let i = 1; i <= 5; i++) {
    const cls = rating >= i ? "full" : rating >= i - 0.5 ? "half" : "";
    out += `<span class="star ${cls}">★</span>`;
  }
  return `<div class="stars" role="img" aria-label="${rating} out of 5 stars">${out}</div>`;
}

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* ==========================================================
   RENDER PRODUCTS + LOCATIONS
   ========================================================== */
$("#productsGrid").innerHTML = products.map(p => `
  <article class="card reveal" tabindex="0" data-id="${p.id}" aria-label="Add ${p.name} to order">
    <div class="card-img">
      ${artwork[p.art]}
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
    </div>
    <div class="card-body">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="card-foot">
        <span class="price">₹${p.price.toLocaleString("en-IN")}</span>
        ${starsHTML(p.rating)}
      </div>
    </div>
  </article>`).join("");

$("#locGrid").innerHTML = locations.map(l => `
  <div class="loc reveal">
    <h3>${l.name}</h3>
    <p>${l.addr}</p>
    <span class="open">${l.hours}</span>
  </div>`).join("");

/* ==========================================================
   CART (card click / Enter adds the item)
   ========================================================== */
let cart = 0;
function addToCart(id) {
  const p = products.find(x => x.id === Number(id));
  cart++;
  const badge = $("#cartBadge");
  badge.textContent = cart;
  badge.classList.remove("show"); void badge.offsetWidth; badge.classList.add("show");
  toast(`${p.name} added to your order ☕`);
}
$("#productsGrid").addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) addToCart(card.dataset.id);
});
$("#productsGrid").addEventListener("keydown", e => {
  if (e.key === "Enter" || e.key === " ") {
    const card = e.target.closest(".card");
    if (card) { e.preventDefault(); addToCart(card.dataset.id); }
  }
});

$("#orderBtn").addEventListener("click", e => {
  e.preventDefault();
  toast(cart ? `You have ${cart} item${cart > 1 ? "s" : ""} in your order` : "Pick a blend below to start your order");
});
$("#signIn").addEventListener("click", e => { e.preventDefault(); toast("Sign-in is coming soon"); });
$$("[data-toast]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); toast(a.dataset.toast); }));

/* ==========================================================
   NAVBAR: mobile menu, scrolled state, active link
   ========================================================== */
const menuToggle = $("#menuToggle"), navLinks = $("#navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open);
});
$$("#navLinks a").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open"); menuToggle.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false");
}));

const header = $("#header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

const sections = ["home", "products", "locations", "contact"].map(id => document.getElementById(id));
const links = $$("#navLinks a");
function setActive() {
  const y = window.scrollY + window.innerHeight * 0.35;
  let current = "home";
  sections.forEach(s => { if (s.offsetTop <= y) current = s.id; });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = "contact";
  links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
}
window.addEventListener("scroll", setActive, { passive: true }); setActive();

/* ==========================================================
   SCROLL REVEAL
   ========================================================== */
const io = new IntersectionObserver((entries) => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      en.target.style.transitionDelay = (en.target.classList.contains("card") || en.target.classList.contains("loc"))
        ? `${(Number(en.target.dataset.id || i) % 3) * 0.12}s` : "0s";
      en.target.classList.add("in");
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });
$$(".reveal").forEach(el => io.observe(el));

$("#year").textContent = new Date().getFullYear();
