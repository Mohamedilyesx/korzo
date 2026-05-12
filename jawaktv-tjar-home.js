/* =====================================================
   JAWAK TV — TJAR PLATFORM — HOME PAGE JS
   v4.0 | 2026
   ===================================================== */

(function () {
  'use strict';

  /* -------------------------------------------------- */
  /* 1. INSTANT DARK MODE                               */
  /* -------------------------------------------------- */
  document.documentElement.style.backgroundColor = '#1a1815';
  document.documentElement.style.color = '#f0ead8';

  /* -------------------------------------------------- */
  /* 2. PROMO BAR                                       */
  /* -------------------------------------------------- */
  const BAR_MESSAGES = [
    '🔴 بث مباشر الآن · مباريات اليوم على جوك تي في',
    '🎬 آلاف الأفلام والمسلسلات · بجودة 4K',
    '📺 أكثر من 5000 قناة عربية وعالمية',
    '⚡ اشتراك فوري · تفعيل لحظي · دعم 24 ساعة',
    '🏆 دوري أبطال أوروبا · الدوري السعودي · يورو كامل',
    '🎮 بدون تقطع · بدون إعلانات · بدون تأخير',
  ];

  function buildPromoBar() {
    const existing = document.getElementById('jwk-bar');
    if (existing) return;

    const bar = document.createElement('div');
    bar.id = 'jwk-bar';
    bar.setAttribute('role', 'marquee');
    bar.setAttribute('aria-label', 'إعلانات وعروض جوك تي في');

    const mask = document.createElement('div');
    mask.id = 'jwk-mask';

    const track = document.createElement('div');
    track.id = 'jwk-track';

    /* build 3 copies for seamless loop */
    for (let copy = 0; copy < 3; copy++) {
      BAR_MESSAGES.forEach(function (msg, i) {
        const item = document.createElement('span');
        item.className = 'jwk-item';
        item.textContent = msg;
        track.appendChild(item);

        if (i < BAR_MESSAGES.length - 1 || copy < 2) {
          const sep = document.createElement('span');
          sep.className = 'jwk-sep';
          sep.innerHTML = '&#9679;';
          track.appendChild(sep);
        }
      });
    }

    const close = document.createElement('button');
    close.id = 'jwk-close';
    close.setAttribute('aria-label', 'إغلاق الشريط');
    close.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/></svg>';
    close.onclick = function () { bar.remove(); };

    mask.appendChild(track);
    bar.appendChild(mask);
    bar.appendChild(close);

    /* insert before header */
    const target = document.querySelector(
      'xc-header, header.header, .header, .navbar, nav, body'
    );
    if (target && target !== document.body) {
      target.parentNode.insertBefore(bar, target);
    } else {
      document.body.insertBefore(bar, document.body.firstChild);
    }

    /* animation */
    let offset = 0;
    let paused = false;
    const speed = 0.55;

    function getTrackWidth() {
      return track.scrollWidth / 3;
    }

    bar.addEventListener('mouseenter', function () { paused = true; });
    bar.addEventListener('mouseleave', function () { paused = false; });

    function tick() {
      if (!paused) {
        offset += speed;
        const w = getTrackWidth();
        if (offset >= w) offset -= w;
        track.style.transform = 'translate3d(-' + offset + 'px,0,0)';
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* -------------------------------------------------- */
  /* 3. TRANSPARENT NAVBAR + SCROLL EFFECT              */
  /* -------------------------------------------------- */
  function initNavbar() {
    const navSelectors = [
      'xc-header',
      'header.header',
      '.header',
      '.navbar',
      'nav.navbar',
      '.main-nav',
      '.site-header',
    ];

    let nav = null;
    for (const sel of navSelectors) {
      const el = document.querySelector(sel);
      if (el) { nav = el; break; }
    }
    if (!nav) return;

    nav.classList.add('custom-navbar');

    function onScroll() {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* -------------------------------------------------- */
  /* 4. HERO VIDEO                                      */
  /* -------------------------------------------------- */
  const HERO_VIDEO_URL = 'https://player.vimeo.com/external/434045526.hd.mp4?s=ef5c999e5c7e68f7e7b3e73aa756f7d9d5bef9f6&profile_id=174&oauth2_token_id=57447761';
  /* fallback poster */
  const HERO_POSTER = 'https://i.vimeocdn.com/video/434045526.jpg';

  const HERO_SELECTORS = [
    '.hero-area',
    '.hero',
    '.main-slider',
    '.banner-area',
    'xc-hero',
    '.intro-section',
    '.slider-area',
  ];

  function injectHeroVideo() {
    let hero = null;
    for (const sel of HERO_SELECTORS) {
      const el = document.querySelector(sel);
      if (el) { hero = el; break; }
    }
    if (!hero) return;

    /* remove any existing background image/slider */
    hero.style.backgroundImage = 'none';
    const existingSliders = hero.querySelectorAll('.swiper, .slick-slider, img.hero-img');
    existingSliders.forEach(function (el) { el.style.opacity = '0'; });

    const vid = document.createElement('video');
    vid.className = 'jwk-hero-video';
    vid.src = HERO_VIDEO_URL;
    vid.poster = HERO_POSTER;
    vid.muted = true;
    vid.autoplay = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');
    vid.preload = 'auto';
    vid.style.cssText = [
      'position:absolute',
      'inset:0',
      'width:100%',
      'height:100%',
      'object-fit:cover',
      'z-index:0',
      'pointer-events:none',
    ].join(';');

    hero.style.position = 'relative';
    hero.style.overflow = 'hidden';
    hero.insertBefore(vid, hero.firstChild);
    vid.play().catch(function () {});
  }

  /* -------------------------------------------------- */
  /* 5. ABOUT SECTION — "كل ما تحتاجه في اشتراك واحد" */
  /* -------------------------------------------------- */
  const ABOUT_SELECTORS = [
    '.about-area',
    '.about-box',
    '.about-section',
    'xc-about-section',
    '.feature-area',
  ];

  const TABS = [
    {
      icon: '⚽',
      label: 'رياضة',
      desc: 'الدوريات العالمية الكبرى، الدوري السعودي، كأس العالم، دوري أبطال أوروبا، يورو ورالي وفورمولا 1 — كلها تحت اشتراك واحد.',
    },
    {
      icon: '🎬',
      label: 'أفلام',
      desc: 'آلاف الأفلام العربية والأجنبية بدقة FHD وحتى 4K، مع ترجمة وصوت عربي.',
    },
    {
      icon: '📺',
      label: 'مسلسلات',
      desc: 'أحدث المسلسلات الخليجية والمصرية والتركية والكورية على منصة واحدة.',
    },
    {
      icon: '📡',
      label: 'قنوات',
      desc: 'أكثر من 5000 قناة بث مباشر عربية وعالمية بدون انقطاع.',
    },
    {
      icon: '🔊',
      label: 'جودة 4K',
      desc: 'صورة فائقة الوضوح بدون تقطع على جميع الأجهزة: Smart TV، موبايل، تابلت، PC.',
    },
    {
      icon: '🎌',
      label: 'أنمي',
      desc: 'مكتبة أنمي ضخمة بأحدث الحلقات والموسم الجديد، متزامنة مع البث الياباني.',
    },
  ];

  function buildAboutBlock(container) {
    container.innerHTML = '';
    container.style.padding = '80px 0';

    const wrap = document.createElement('div');
    wrap.className = 'container';
    wrap.style.cssText = 'max-width:1220px;margin:0 auto;padding:0 20px';

    /* header */
    const hdr = document.createElement('div');
    hdr.style.cssText = 'text-align:center;margin-bottom:52px';
    hdr.innerHTML = [
      '<span class="sub-title" style="margin:0 auto 14px;display:block;width:fit-content">لماذا جوك تي في؟</span>',
      '<h2 style="color:#fff3cf;font-size:clamp(1.6rem,3.5vw,2.8rem);font-weight:800;margin-bottom:14px">كل ما تحتاجه في اشتراك واحد</h2>',
      '<p style="color:#c8bfa8;font-size:16px;max-width:540px;margin:0 auto;line-height:1.9">بثّ فوري بلا انقطاع · جودة 4K · تفعيل فوري · دعم على مدار الساعة</p>',
    ].join('');

    /* grid */
    const grid = document.createElement('div');
    grid.style.cssText = [
      'display:grid',
      'grid-template-columns:repeat(auto-fit,minmax(300px,1fr))',
      'gap:24px',
      'align-items:start',
    ].join(';');

    /* left: tabs */
    const tabsWrap = document.createElement('div');
    tabsWrap.style.cssText = 'display:flex;flex-direction:column;gap:10px';

    TABS.forEach(function (tab, i) {
      const btn = document.createElement('button');
      btn.className = 'jwk-tab-btn' + (i === 0 ? ' active' : '');
      btn.setAttribute('data-idx', i);
      btn.style.cssText = [
        'display:flex',
        'align-items:center',
        'gap:14px',
        'padding:16px 20px',
        'border-radius:16px',
        'border:1px solid rgba(218,174,73,.18)',
        'background:' + (i === 0 ? 'rgba(218,174,73,.10)' : 'rgba(31,28,25,.7)'),
        'color:' + (i === 0 ? '#daae49' : '#c8bfa8'),
        'cursor:pointer',
        'text-align:right',
        'direction:rtl',
        'transition:all .25s ease',
        'font-family:inherit',
        'width:100%',
      ].join(';');

      btn.innerHTML = [
        '<span style="font-size:22px;flex-shrink:0">' + tab.icon + '</span>',
        '<span style="font-weight:700;font-size:15px">' + tab.label + '</span>',
      ].join('');
      tabsWrap.appendChild(btn);
    });

    /* right: description */
    const descBox = document.createElement('div');
    descBox.id = 'jwk-tab-desc';
    descBox.style.cssText = [
      'padding:28px 24px',
      'border-radius:18px',
      'background:rgba(31,28,25,.80)',
      'border:1px solid rgba(218,174,73,.18)',
      'min-height:180px',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'text-align:center',
      'direction:rtl',
      'backdrop-filter:blur(8px)',
    ].join(';');

    function updateDesc(idx) {
      const t = TABS[idx];
      descBox.innerHTML = [
        '<div>',
        '<div style="font-size:3rem;margin-bottom:16px">' + t.icon + '</div>',
        '<h3 style="color:#fff3cf;font-size:1.3rem;font-weight:700;margin-bottom:10px">' + t.label + '</h3>',
        '<p style="color:#c8bfa8;font-size:15px;line-height:1.9;max-width:380px;margin:0 auto">' + t.desc + '</p>',
        '</div>',
      ].join('');
    }

    updateDesc(0);

    tabsWrap.addEventListener('click', function (e) {
      const btn = e.target.closest('.jwk-tab-btn');
      if (!btn) return;
      const idx = parseInt(btn.getAttribute('data-idx'));
      tabsWrap.querySelectorAll('.jwk-tab-btn').forEach(function (b, i) {
        const active = i === idx;
        b.style.background = active ? 'rgba(218,174,73,.10)' : 'rgba(31,28,25,.7)';
        b.style.color = active ? '#daae49' : '#c8bfa8';
        b.style.borderColor = active ? 'rgba(218,174,73,.40)' : 'rgba(218,174,73,.18)';
        b.classList.toggle('active', active);
      });
      updateDesc(idx);
    });

    grid.appendChild(tabsWrap);
    grid.appendChild(descBox);

    wrap.appendChild(hdr);
    wrap.appendChild(grid);
    container.appendChild(wrap);
  }

  function injectAboutBlock() {
    let about = null;
    for (const sel of ABOUT_SELECTORS) {
      const el = document.querySelector(sel);
      if (el) { about = el; break; }
    }
    if (!about) return;
    buildAboutBlock(about);
  }

  /* -------------------------------------------------- */
  /* 6. PRODUCT CARD HOVER                              */
  /* -------------------------------------------------- */
  function enhanceProductCards() {
    const cards = document.querySelectorAll('.product-item.card2');
    cards.forEach(function (card) {
      if (card.dataset.jwkEnhanced) return;
      card.dataset.jwkEnhanced = '1';
      card.addEventListener('mouseenter', function () {
        card.style.transform = 'translateY(-5px)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  }

  /* observe for lazy-loaded products */
  function observeProducts() {
    if (!window.MutationObserver) return;
    const mo = new MutationObserver(function () { enhanceProductCards(); });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  /* -------------------------------------------------- */
  /* 7. INIT                                            */
  /* -------------------------------------------------- */
  function init() {
    buildPromoBar();
    initNavbar();
    injectHeroVideo();
    injectAboutBlock();
    enhanceProductCards();
    observeProducts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* re-run after SPA navigation */
  window.addEventListener('popstate', function () {
    setTimeout(init, 400);
  });

})();
