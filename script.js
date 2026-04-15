'use strict';

const STORAGE_KEY = 'rosebud_age_verified';
const THEME_STORAGE_KEY = 'rosebud_theme';
const FALLBACK_IMAGE = './assets/product-placeholder.svg';
const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
const PRODUCTS_ENDPOINT = String(import.meta.env.VITE_PRODUCTS_ENDPOINT || '/products');

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* ============ TERPENE DATABASE ============ */
const TERPENE_DB = {
  limonene: {
    name: 'Limonene',
    aroma: 'Citrus, Lemon',
    intensity: 85,
    color: '#fbbf24',
    desc: 'Uplifting and stress-relieving. Elevates mood.',
  },
  myrcene: {
    name: 'Myrcene',
    aroma: 'Earthy, Musky',
    intensity: 92,
    color: '#34d399',
    desc: 'Promotes relaxation and sedation.',
  },
  caryophyllene: {
    name: 'Caryophyllene',
    aroma: 'Spicy, Peppery',
    intensity: 70,
    color: '#f87171',
    desc: 'Anti-inflammatory. Binds to CB2 receptors.',
  },
  linalool: {
    name: 'Linalool',
    aroma: 'Floral, Lavender',
    intensity: 65,
    color: '#c084fc',
    desc: 'Calming and sedating. Supports sleep.',
  },
  pinene: {
    name: 'Pinene',
    aroma: 'Pine, Fresh',
    intensity: 60,
    color: '#4ade80',
    desc: 'Promotes alertness and memory.',
  },
  terpinolene: {
    name: 'Terpinolene',
    aroma: 'Herbal, Floral',
    intensity: 50,
    color: '#67e8f9',
    desc: 'Complex. Mildly sedating with uplifting notes.',
  },
  humulene: {
    name: 'Humulene',
    aroma: 'Woody, Hoppy',
    intensity: 55,
    color: '#fcd34d',
    desc: 'Appetite suppressant. Anti-inflammatory.',
  },
  ocimene: {
    name: 'Ocimene',
    aroma: 'Sweet, Herbal',
    intensity: 45,
    color: '#a78bfa',
    desc: 'Decongestant. Antifungal properties.',
  },
};

/* ============ PRODUCT DATA ============ */
const fallbackProducts = [
  {
    name: 'Velvet Citrus',
    brand: 'Northline',
    category: 'flower',
    thc: 28,
    price: 36.99,
    featured: true,
    description:
      'Bright citrus notes with a clean, smooth finish. Perfect for creative afternoons.',
    image: './assets/product-flower.svg',
    strain: 'Sativa',
    effects: ['Energize', 'Focus', 'Creative'],
    weight: '3.5g',
    terpenes: ['limonene', 'myrcene', 'caryophyllene'],
    ontarioGrown: true,
    pairings: ['Emerald Coast', 'Sunrise Haze Cart'],
  },
  {
    name: 'Pine Mist Multipack',
    brand: 'Rose Peak',
    category: 'pre-rolls',
    thc: 24,
    price: 29.49,
    featured: true,
    description: 'Convenient multipack pre-rolls for sharing with friends.',
    image: './assets/product-preroll.svg',
    strain: 'Hybrid',
    effects: ['Balance', 'Social'],
    weight: '5x0.5g',
    terpenes: ['pinene', 'myrcene'],
    ontarioGrown: true,
    pairings: ['Berry Calm Gummies', 'Grinder Pro'],
  },
  {
    name: 'Nightfall Cartridge',
    brand: 'Arc Labs',
    category: 'vapes',
    thc: 87,
    price: 44.99,
    featured: true,
    description: 'Consistent vapor production with rich flavor delivery for evening wind-down.',
    image: './assets/product-vape.svg',
    strain: 'Indica',
    effects: ['Relax', 'Sleep'],
    weight: '1g',
    terpenes: ['linalool', 'myrcene', 'caryophyllene'],
    ontarioGrown: false,
    pairings: ['Ceramic Battery Pro', 'Lavender Kush'],
  },
  {
    name: 'Berry Calm Gummies',
    brand: 'Green Park',
    category: 'edibles',
    thc: 10,
    price: 8.99,
    featured: false,
    description: 'Soft gummies with balanced sweetness and precise 2.5mg dosing per piece.',
    image: './assets/product-edible.svg',
    strain: 'Hybrid',
    effects: ['Relax', 'Recover'],
    weight: '4pc',
    terpenes: ['myrcene', 'linalool'],
    ontarioGrown: true,
    pairings: ['Focus Mint Drops', 'Mango Bliss Chews'],
  },
  {
    name: 'Ceramic Battery Pro',
    brand: 'Arc Labs',
    category: 'accessories',
    thc: 0,
    price: 21.99,
    featured: false,
    description: 'Reliable 510-thread battery with smooth draw and USB-C charging.',
    image: './assets/product-accessory.svg',
    strain: '',
    effects: [],
    weight: '',
    terpenes: [],
    ontarioGrown: false,
    pairings: ['Nightfall Cartridge', 'Sunrise Haze Cart'],
  },
  {
    name: 'Emerald Coast',
    brand: 'Top Flora',
    category: 'flower',
    thc: 26,
    price: 33.99,
    featured: false,
    description: 'Fresh craft flower with bold terpene profile and earthy undertones.',
    image: './assets/product-flower-2.svg',
    strain: 'Hybrid',
    effects: ['Balance', 'Creative'],
    weight: '3.5g',
    terpenes: ['caryophyllene', 'pinene', 'humulene'],
    ontarioGrown: true,
    pairings: ['Velvet Citrus', 'Pine Mist Multipack'],
  },
  {
    name: 'Midnight Garden',
    brand: 'Northline',
    category: 'flower',
    thc: 24,
    price: 42.99,
    featured: true,
    description: 'Rare small-batch hybrid with floral and earthy undertones. Limited availability.',
    image: './assets/product-flower.svg',
    strain: 'Hybrid',
    effects: ['Relax', 'Creative'],
    weight: '3.5g',
    terpenes: ['terpinolene', 'pinene', 'linalool'],
    ontarioGrown: true,
    pairings: ['Lavender Kush', 'Berry Calm Gummies'],
  },
  {
    name: 'Sunrise Haze Cart',
    brand: 'Arc Labs',
    category: 'vapes',
    thc: 82,
    price: 39.99,
    featured: false,
    description: 'Bright, uplifting vapor profile ideal for morning and daytime use.',
    image: './assets/product-vape.svg',
    strain: 'Sativa',
    effects: ['Energize', 'Focus'],
    weight: '0.5g',
    terpenes: ['limonene', 'pinene', 'terpinolene'],
    ontarioGrown: false,
    pairings: ['Ceramic Battery Pro', 'Velvet Citrus'],
  },
  {
    name: 'Lavender Kush',
    brand: 'Rose Peak',
    category: 'flower',
    thc: 22,
    price: 31.99,
    featured: false,
    description: 'Floral indica with deep relaxation properties and purple-tinted buds.',
    image: './assets/product-flower-2.svg',
    strain: 'Indica',
    effects: ['Relax', 'Sleep'],
    weight: '3.5g',
    terpenes: ['linalool', 'myrcene', 'caryophyllene'],
    ontarioGrown: true,
    pairings: ['Nightfall Cartridge', 'Midnight Garden'],
  },
  {
    name: 'Mango Bliss Chews',
    brand: 'Green Park',
    category: 'edibles',
    thc: 10,
    price: 12.99,
    featured: false,
    description: 'Tropical mango-flavored soft chews with consistent 5mg dosing.',
    image: './assets/product-edible.svg',
    strain: 'Sativa',
    effects: ['Energize', 'Social'],
    weight: '2pc',
    terpenes: ['limonene', 'ocimene'],
    ontarioGrown: false,
    pairings: ['Berry Calm Gummies', 'Focus Mint Drops'],
  },
  {
    name: 'OG Classic Pre-Roll',
    brand: 'Top Flora',
    category: 'pre-rolls',
    thc: 20,
    price: 9.99,
    featured: false,
    description: 'Single full-gram pre-roll with classic OG genetics. No-fuss, ready to go.',
    image: './assets/product-preroll.svg',
    strain: 'Indica',
    effects: ['Relax'],
    weight: '1g',
    terpenes: ['myrcene', 'caryophyllene', 'humulene'],
    ontarioGrown: true,
    pairings: ['Lavender Kush', 'Berry Calm Gummies'],
  },
  {
    name: 'Focus Mint Drops',
    brand: 'Green Park',
    category: 'edibles',
    thc: 5,
    price: 15.99,
    featured: false,
    description: 'Microdose peppermint drops for clear-headed daytime focus. 1mg per drop.',
    image: './assets/product-edible.svg',
    strain: 'Sativa',
    effects: ['Focus', 'Energize'],
    weight: '30ml',
    terpenes: ['pinene', 'limonene'],
    ontarioGrown: true,
    pairings: ['Velvet Citrus', 'Mango Bliss Chews'],
  },
  {
    name: 'Grinder Pro',
    brand: 'Arc Labs',
    category: 'accessories',
    thc: 0,
    price: 18.99,
    featured: false,
    description: 'Aerospace-grade aluminum 4-piece grinder with kief catcher.',
    image: './assets/product-accessory.svg',
    strain: '',
    effects: [],
    weight: '',
    terpenes: [],
    ontarioGrown: false,
    pairings: ['Velvet Citrus', 'Emerald Coast'],
  },
  {
    name: 'Cloud Nine Disposable',
    brand: 'Rose Peak',
    category: 'vapes',
    thc: 78,
    price: 34.99,
    featured: true,
    description: 'All-in-one disposable vape with 300 puffs. No charging required.',
    image: './assets/product-vape.svg',
    strain: 'Hybrid',
    effects: ['Balance', 'Relax'],
    weight: '0.3g',
    terpenes: ['myrcene', 'terpinolene', 'ocimene'],
    ontarioGrown: false,
    pairings: ['Nightfall Cartridge', 'Pine Mist Multipack'],
  },
  {
    name: 'CBD Relief Balm',
    brand: 'Green Park',
    category: 'accessories',
    thc: 0,
    price: 24.99,
    featured: false,
    description: 'Topical CBD balm for targeted relief. 500mg CBD per jar.',
    image: './assets/product-accessory.svg',
    strain: '',
    effects: ['Recover'],
    weight: '30g',
    terpenes: ['caryophyllene', 'linalool'],
    ontarioGrown: true,
    pairings: ['Berry Calm Gummies', 'Lavender Kush'],
  },
];

let products = [...fallbackProducts];

/* ============ DOM REFS ============ */
const ageGate = $('#age-gate');
const confirmAgeButton = $('#confirm-age-btn');
const declineAgeButton = $('#decline-age-btn');
const currentYear = $('#current-year');
const navToggle = $('#nav-toggle');
const navLinks = $('#site-navigation');
const searchInput = $('#search-input');
const categorySelect = $('#category-select');
const sortSelect = $('#sort-select');
const quickFilterButtons = $$('.quick-filter-btn');
const productGrid = $('#product-grid');
const resultsCount = $('#results-count');
const emptyState = $('#empty-state');
const contactForm = $('#contact-form');
const formStatus = $('#form-status');
const themeToggle = $('#theme-toggle');
const backToTop = $('#back-to-top');
const mobileCta = $('#mobile-cta');
const newsletterForm = $('#newsletter-form');
const newsletterStatus = $('#newsletter-status');
const header = $('.header');
// Modal refs
const productModal = $('#product-modal');
const modalBackdrop = $('#modal-backdrop');
const modalClose = $('#modal-close');
const modalImage = $('#modal-image');
const modalCategory = $('#modal-category');
const modalProductName = $('#modal-product-name');
const modalStrain = $('#modal-strain');
const modalBadges = $('#modal-badges');
const modalDesc = $('#modal-desc');
const modalStats = $('#modal-stats');
const modalTerps = $('#modal-terps');
const modalEffects = $('#modal-effects');
const modalPairings = $('#modal-pairings');
const modalPairingSection = $('#modal-pairing-section');
const modalPrice = $('#modal-price');

/* ============ THEME ============ */
function setTheme(theme) {
  const safeTheme = theme === 'light' ? 'light' : 'dark';
  document.body.dataset.theme = safeTheme;
  window.localStorage.setItem(THEME_STORAGE_KEY, safeTheme);
  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      safeTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
    );
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta instanceof HTMLMetaElement) {
    meta.setAttribute('content', safeTheme === 'dark' ? '#0a0c14' : '#f7f8fc');
  }
}

function initializeTheme() {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') {
    setTheme(stored);
    return;
  }
  setTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

/* ============ AGE GATE ============ */
function hideAgeGate() {
  if (ageGate) {
    ageGate.classList.add('age-gate--hidden');
    ageGate.setAttribute('aria-hidden', 'true');
  }
}
function showAgeGate() {
  if (ageGate) {
    ageGate.classList.remove('age-gate--hidden');
    ageGate.removeAttribute('aria-hidden');
  }
}

/* ============ HELPERS ============ */
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}
function formatThc(thc) {
  return thc <= 0 ? 'N/A' : `${thc}% THC`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeCategory(rawCategory) {
  const value = String(rawCategory || '')
    .trim()
    .toLowerCase();
  if (['flower', 'pre-rolls', 'vapes', 'edibles', 'accessories'].includes(value)) return value;
  return 'flower';
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeProduct(rawItem) {
  const imageFromList = Array.isArray(rawItem?.images) ? rawItem.images[0] : undefined;
  const imageFromObject =
    imageFromList && typeof imageFromList === 'object' ? imageFromList.url : '';
  const image =
    rawItem?.image ||
    rawItem?.imageUrl ||
    rawItem?.primaryImage ||
    imageFromObject ||
    FALLBACK_IMAGE;
  return {
    name: String(rawItem?.name || rawItem?.productName || 'Unknown Product'),
    brand: String(rawItem?.brand || rawItem?.brandName || 'Unknown Brand'),
    category: normalizeCategory(rawItem?.category || rawItem?.productCategory),
    thc: toNumber(rawItem?.thc ?? rawItem?.thcPercent ?? rawItem?.potency?.thc, 0),
    price: toNumber(rawItem?.price ?? rawItem?.menuPrice ?? rawItem?.currentPrice, 0),
    featured: Boolean(rawItem?.featured || rawItem?.isFeatured),
    description: String(rawItem?.description || 'No product description available.'),
    image: String(image || FALLBACK_IMAGE),
    strain: String(rawItem?.strain || rawItem?.strainType || ''),
    effects: Array.isArray(rawItem?.effects) ? rawItem.effects.map(String) : [],
    weight: String(rawItem?.weight || rawItem?.size || ''),
    terpenes: Array.isArray(rawItem?.terpenes) ? rawItem.terpenes.map(String) : [],
    ontarioGrown: Boolean(rawItem?.ontarioGrown),
    pairings: Array.isArray(rawItem?.pairings) ? rawItem.pairings.map(String) : [],
  };
}

/* ============ PRODUCT CARDS ============ */
function getTerpPillClass(terpKey) {
  return `terp-pill--${terpKey}`;
}

function getProductCardHtml(product, index) {
  const badgeHtml = product.featured ? '<span class="card__badge">Featured</span>' : '';
  const ontarioBadgeHtml = product.ontarioGrown
    ? '<span class="card__badge ontario-badge" style="top:auto;bottom:1.25rem;right:1.25rem;left:auto">Ontario Grown</span>'
    : '';
  const strainHtml = product.strain
    ? `<span class="card__tag">${escapeHtml(product.strain)}</span>`
    : '';
  const weightHtml = product.weight
    ? `<span class="card__tag">${escapeHtml(product.weight)}</span>`
    : '';

  const terpsHtml = (product.terpenes || [])
    .slice(0, 3)
    .map((key) => {
      const terp = TERPENE_DB[key];
      return terp
        ? `<span class="terp-pill ${getTerpPillClass(key)}" title="${escapeHtml(terp.desc)}">${escapeHtml(terp.name)}</span>`
        : '';
    })
    .join('');

  const effectsHtml = (product.effects || [])
    .map((e) => `<span class="card__tag">${escapeHtml(e)}</span>`)
    .join('');
  return `
    <article class="card" data-product-index="${index}" tabindex="0" aria-label="View details for ${escapeHtml(product.name)}">
      ${badgeHtml}
      ${ontarioBadgeHtml}
      <div class="card__image-wrap">
        <img class="card__image" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'" />
      </div>
      <p class="card__category">${escapeHtml(product.category)}</p>
      <h3>${escapeHtml(product.name)}</h3>
      <p class="card__desc">${escapeHtml(product.description)}</p>
      <div class="card__tags">${strainHtml}${weightHtml}${effectsHtml}</div>
      ${terpsHtml ? `<div class="card__tags" style="margin-top:0.25rem">${terpsHtml}</div>` : ''}
      <div class="card__footer">
        <span class="card__price">${formatPrice(product.price)}</span>
        <span class="card__brand">${escapeHtml(product.brand)} ${product.thc > 0 ? '· ' + formatThc(product.thc) : ''}</span>
      </div>
    </article>
  `;
}

function sortProducts(items, sortBy) {
  const copy = [...items];
  if (sortBy === 'price-asc') return copy.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') return copy.sort((a, b) => b.price - a.price);
  if (sortBy === 'thc-desc') return copy.sort((a, b) => b.thc - a.thc);
  return copy.sort((a, b) => Number(b.featured) - Number(a.featured));
}

function setActiveQuickFilter(category) {
  quickFilterButtons.forEach((btn) => {
    const isActive = btn.dataset.category === category;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

function applyFilters() {
  if (
    !searchInput ||
    !categorySelect ||
    !sortSelect ||
    !productGrid ||
    !resultsCount ||
    !emptyState
  )
    return;
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categorySelect.value;
  const selectedSort = sortSelect.value;

  const filtered = products.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchTerm.length === 0 ||
      item.name.toLowerCase().includes(searchTerm) ||
      item.brand.toLowerCase().includes(searchTerm) ||
      (item.effects || []).some((e) => e.toLowerCase().includes(searchTerm)) ||
      (item.terpenes || []).some((t) => {
        const terp = TERPENE_DB[t];
        return terp && terp.name.toLowerCase().includes(searchTerm);
      });
    return matchesCategory && matchesSearch;
  });

  const sorted = sortProducts(filtered, selectedSort);
  const indexMap = new Map(products.map((p, i) => [p, i]));
  productGrid.innerHTML = sorted
    .map((item) => {
      const origIndex = indexMap.get(item) ?? 0;
      return getProductCardHtml(item, origIndex);
    })
    .join('');

  resultsCount.textContent = `${sorted.length} product${sorted.length === 1 ? '' : 's'}`;
  emptyState.hidden = sorted.length !== 0;
  setActiveQuickFilter(selectedCategory);
}

/* ============ PRODUCT MODAL ============ */
function openProductModal(index) {
  const product = products[index];
  if (!product || !productModal) return;

  if (modalImage) {
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = FALLBACK_IMAGE;
    };
  }
  if (modalCategory) modalCategory.textContent = product.category.toUpperCase();
  if (modalProductName) modalProductName.textContent = product.name;
  if (modalStrain) modalStrain.textContent = product.strain || '';
  if (modalDesc) modalDesc.textContent = product.description;
  if (modalPrice) modalPrice.textContent = formatPrice(product.price);

  // Badges
  if (modalBadges) {
    let badgesHtml = '';
    if (product.ontarioGrown) badgesHtml += '<span class="ontario-badge">Ontario Grown</span>';
    if (product.featured)
      badgesHtml +=
        '<span class="card__tag" style="background:var(--accent);color:#0a0c14;border-color:var(--accent);font-weight:700">Featured</span>';
    modalBadges.innerHTML = badgesHtml;
  }

  // Stats
  if (modalStats) {
    let statsHtml = '';
    if (product.thc > 0)
      statsHtml += `<div class="modal__stat"><span class="modal__stat-value">${product.thc}%</span><span class="modal__stat-label">THC</span></div>`;
    if (product.weight)
      statsHtml += `<div class="modal__stat"><span class="modal__stat-value">${escapeHtml(product.weight)}</span><span class="modal__stat-label">Weight</span></div>`;
    statsHtml += `<div class="modal__stat"><span class="modal__stat-value">${formatPrice(product.price)}</span><span class="modal__stat-label">Price</span></div>`;
    modalStats.innerHTML = statsHtml;
  }

  // Terpenes
  if (modalTerps) {
    if (product.terpenes && product.terpenes.length > 0) {
      modalTerps.parentElement.hidden = false;
      modalTerps.innerHTML = product.terpenes
        .map((key) => {
          const terp = TERPENE_DB[key];
          if (!terp) return '';
          return `
          <div class="modal__terp-row">
            <span class="terp-pill terp-pill--${key}">${terp.name}</span>
            <div>
              <div class="modal__terp-bar"><div class="modal__terp-fill" style="width:${terp.intensity}%"></div></div>
              <span style="font-size:0.75rem;color:var(--text-muted)">${terp.aroma} — ${terp.desc}</span>
            </div>
          </div>
        `;
        })
        .join('');
    } else {
      modalTerps.parentElement.hidden = true;
    }
  }

  // Effects
  if (modalEffects) {
    if (product.effects && product.effects.length > 0) {
      modalEffects.parentElement.hidden = false;
      modalEffects.innerHTML = product.effects
        .map((e) => `<span class="modal__effect">${escapeHtml(e)}</span>`)
        .join('');
    } else {
      modalEffects.parentElement.hidden = true;
    }
  }

  // Pairings
  if (modalPairings && modalPairingSection) {
    if (product.pairings && product.pairings.length > 0) {
      modalPairingSection.hidden = false;
      modalPairings.innerHTML = product.pairings
        .map((pName) => {
          const paired = products.find((p) => p.name === pName);
          if (!paired) return '';
          const reason = getSimilarity(product, paired);
          return `
          <div class="modal__pairing" data-pairing-name="${escapeHtml(pName)}">
            <div>
              <div class="modal__pairing-name">${escapeHtml(paired.name)}</div>
              <div class="modal__pairing-reason">${escapeHtml(paired.brand)} · ${formatPrice(paired.price)} · ${reason}</div>
            </div>
          </div>
        `;
        })
        .join('');

      // Click pairing to open that product
      modalPairings.querySelectorAll('.modal__pairing').forEach((el) => {
        el.addEventListener('click', () => {
          const name = el.dataset.pairingName;
          const idx = products.findIndex((p) => p.name === name);
          if (idx >= 0) openProductModal(idx);
        });
      });
    } else {
      modalPairingSection.hidden = true;
    }
  }

  productModal.hidden = false;
  requestAnimationFrame(() => {
    productModal.classList.add('modal--open');
  });
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  if (!productModal) return;
  productModal.classList.remove('modal--open');
  setTimeout(() => {
    productModal.hidden = true;
    document.body.style.overflow = '';
  }, 250);
}

function getSimilarity(a, b) {
  if (a.category === b.category && a.strain === b.strain) return 'Similar strain & category';
  if (a.effects?.some((e) => b.effects?.includes(e))) return 'Complementary effects';
  if (a.category === 'vapes' && b.category === 'accessories') return 'Perfect hardware match';
  if (a.category === 'accessories' && b.category === 'vapes') return 'Perfect hardware match';
  if (a.category === b.category) return 'Same category, different profile';
  return 'Great pairing';
}

/* ============ PRODUCT LOADING ============ */
function getProductsUrl() {
  if (!API_BASE_URL) return './data/products.json';
  const path = PRODUCTS_ENDPOINT.startsWith('/') ? PRODUCTS_ENDPOINT : `/${PRODUCTS_ENDPOINT}`;
  return `${API_BASE_URL}${path}`;
}

async function loadProducts() {
  try {
    const response = await window.fetch(getProductsUrl(), { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch product data.');
    const data = await response.json();
    const rawProducts = Array.isArray(data) ? data : data?.products;
    if (!Array.isArray(rawProducts)) throw new TypeError('Product data format is invalid.');
    products = rawProducts
      .map((item) => normalizeProduct(item))
      .filter((item) => item.name.trim().length > 0);
  } catch {
    products = [...fallbackProducts];
  } finally {
    applyFilters();
  }
}

/* ============ TOPBAR ROTATION ============ */
function initTopbarRotation() {
  const messages = $$('.topbar__message');
  if (messages.length <= 1) return;
  let current = 0;
  setInterval(() => {
    messages[current].classList.remove('topbar__message--active');
    current = (current + 1) % messages.length;
    messages[current].classList.add('topbar__message--active');
  }, 4000);
}

/* ============ HERO PARTICLES ============ */
function initParticles() {
  const container = $('#hero-particles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('hero__particle');
    const size = Math.random() * 4 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${60 + Math.random() * 40}%`;
    p.style.animationDuration = `${6 + Math.random() * 10}s`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    p.style.background = Math.random() > 0.5 ? 'var(--primary)' : 'var(--accent)';
    container.appendChild(p);
  }
}

/* ============ SCROLL REVEAL ============ */
function initScrollReveal() {
  const reveals = $$('.reveal');
  if (!reveals.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
  );
  reveals.forEach((el) => observer.observe(el));
}

/* ============ COUNTER ANIMATION ============ */
function initCounters() {
  const counters = $$('.stats-banner__number[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (Number.isNaN(target)) return;
        let current = 0;
        const step = target / (1500 / 16);
        const update = () => {
          current += step;
          if (current >= target) {
            el.textContent = target + '+';
            return;
          }
          el.textContent = Math.floor(current) + '+';
          requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    },
    { threshold: 0.3 },
  );
  counters.forEach((el) => observer.observe(el));
}

/* ============ SCROLL-DRIVEN UI ============ */
function initScrollUI() {
  if (!header && !backToTop && !mobileCta) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (header) header.classList.toggle('header--scrolled', y > 50);
      if (backToTop) backToTop.classList.toggle('back-to-top--visible', y > 600);
      if (mobileCta) mobileCta.classList.toggle('mobile-cta--visible', y > 400);
      ticking = false;
    });
  });
  if (backToTop)
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============ SMOOTH NAV ============ */
function initSmoothNav() {
  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (navLinks && navLinks.classList.contains('nav__links--open')) {
        navLinks.classList.remove('nav__links--open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* ============ LEARN GUIDES TOGGLE ============ */
function initLearnGuides() {
  $$('.learn-card__link[data-guide]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const guideId = btn.dataset.guide;
      const content = $(`#guide-${guideId}-content`);
      if (!content) return;

      const isHidden = content.hidden;
      // Close all other guides
      $$('.learn-card__expand').forEach((el) => {
        el.hidden = true;
      });
      $$('.learn-card__link[data-guide]').forEach((b) => {
        b.textContent = 'Read the guide →';
      });

      if (isHidden) {
        content.hidden = false;
        btn.textContent = 'Close guide ×';
        content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

/* ============ MODAL EVENTS ============ */
function initModal() {
  if (modalClose) modalClose.addEventListener('click', closeProductModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProductModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal && !productModal.hidden) closeProductModal();
  });
}

/* ============ INIT ============ */
if (currentYear instanceof HTMLSpanElement) {
  currentYear.textContent = String(new Date().getFullYear());
}

initializeTheme();

const hasAgeVerification = window.localStorage.getItem(STORAGE_KEY) === 'true';
if (hasAgeVerification) hideAgeGate();
else showAgeGate();

if (confirmAgeButton) {
  confirmAgeButton.addEventListener('click', () => {
    window.localStorage.setItem(STORAGE_KEY, 'true');
    hideAgeGate();
  });
}

if (declineAgeButton) {
  declineAgeButton.addEventListener('click', () => {
    window.location.href = 'https://www.ontario.ca/page/cannabis-laws';
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('nav__links--open');
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(document.body.dataset.theme === 'light' ? 'dark' : 'light');
  });
}

if (searchInput && categorySelect && sortSelect) {
  searchInput.addEventListener('input', applyFilters);
  categorySelect.addEventListener('change', applyFilters);
  sortSelect.addEventListener('change', applyFilters);
  loadProducts();
}

if (categorySelect && quickFilterButtons.length > 0) {
  quickFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      categorySelect.value = button.dataset.category || 'all';
      applyFilters();
    });
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const fd = new FormData(contactForm);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();
    if (!name || !email || !message) {
      formStatus.textContent = 'Please complete all fields.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      return;
    }
    formStatus.textContent = "Thanks! Your message has been received. We'll be in touch soon.";
    contactForm.reset();
  });
}

if (newsletterForm && newsletterStatus) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    const email = input ? input.value.trim() : '';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newsletterStatus.textContent = 'Please enter a valid email.';
      return;
    }
    newsletterStatus.textContent = "You're in! Welcome to the Rosebud list.";
    newsletterForm.reset();
  });
}

// Initialize everything
initTopbarRotation();
initParticles();
initScrollReveal();
initCounters();
initScrollUI();
initSmoothNav();
initLearnGuides();
initModal();

// Event delegation for product cards (avoids re-attaching listeners on every filter)
if (productGrid) {
  productGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.card[data-product-index]');
    if (card) openProductModal(parseInt(card.dataset.productIndex, 10));
  });
  productGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const card = e.target.closest('.card[data-product-index]');
      if (card) openProductModal(parseInt(card.dataset.productIndex, 10));
    }
  });
}
