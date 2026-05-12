/* =====================================================
   JAWAK TV — TJAR PLATFORM — HOME PAGE JS v5
   2026
   ===================================================== */

(function () {
  'use strict';

  /* instant dark bg before paint */
  document.documentElement.style.backgroundColor = '#1a1815';

  /* ------------------------------------------------
     CONFIG
  ------------------------------------------------ */
  const VIDEO_URL = 'https://player.vimeo.com/external/434045526.hd.mp4?s=ef5c999e5c7e68f7e7b3e73aa756f7d9d5bef9f6&profile_id=174';

  const BAR_MSGS = [
    '🔴 بث مباشر الآن · مباريات اليوم على جواك تي في',
    '🎬 آلاف الأفلام والمسلسلات · بجودة 4K',
    '📺 أكثر من 5000 قناة عربية وعالمية',
    '⚡ اشتراك فوري · تفعيل لحظي · دعم 24 ساعة',
    '🏆 دوري أبطال أوروبا · الدوري السعودي · يورو · فورمولا 1',
    '🎮 بدون تقطع · بدون إعلانات · بدون تأخير',
  ];

  const TABS = [
    {
      icon: '⚽',
      label: 'رياضة',
      title: 'كل الرياضة في مكان واحد',
      desc: 'الدوريات العالمية الكبرى، الدوري السعودي، كأس العالم، دوري أبطال أوروبا، يورو واليها وفورمولا 1 — كلها تحت اشتراك واحد.',
    },
    {
      icon: '🎬',
      label: 'أفلام',
      title: 'مكتبة أفلام ضخمة',
      desc: 'أكثر من 150,000 فيلم بجودة HD و4K، من أحدث الإصدارات إلى كلاسيكيات السينما العالمية — كل ما تريد مشاهدته في مكان واحد.',
    },
    {
      icon: '📺',
      label: 'مسلسلات',
      title: 'أحدث المسلسلات',
      desc: 'أحدث المسلسلات الخليجية والمصرية والتركية والكورية على منصة واحدة بجودة فائقة.',
    },
    {
      icon: '📡',
      label: 'قنوات',
      title: '5000+ قناة بث مباشر',
      desc: 'أكثر من 5000 قناة بث مباشر عربية وعالمية بدون انقطاع.',
    },
    {
      icon: '🔊',
      label: 'جودة 4K',
      title: 'صورة فائقة الوضوح',
      desc: 'جودة 4K و8K بدون تقطع على جميع الأجهزة: Smart TV، موبايل، تابلت، PC.',
    },
    {
      icon: '🎌',
      label: 'أنمي',
      title: 'مكتبة أنمي ضخمة',
      desc: 'مكتبة أنمي ضخمة بأحدث الحلقات والموسم الجديد، متزامنة مع البث الياباني.',
    },
  ];

  const FEATURES_SVG = [
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',   // all channels
    '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', // TV
    '<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>', // phone
  ];

  /* ------------------------------------------------
     PROMO BAR
  ------------------------------------------------ */
  function buildPromoBar() {
    if (document.getElementById('jwk-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'jwk-bar';

    const mask = document.createElement('div');
    mask.id = 'jwk-mask';
    const track = document.createElement('div');
    track.id = 'jwk-track';

    for (let c = 0; c < 3; c++) {
      BAR_MSGS.forEach(function (m, i) {
        const span = document.createElement('span');
        span.className = 'jwk-item'; span.textContent = m;
        track.appendChild(span);
        const sep = document.createElement('span');
        sep.className = 'jwk-sep'; sep.innerHTML = '&#9679;';
        track.appendChild(sep);
      });
    }

    const btn = document.createElement('button');
    btn.id = 'jwk-close';
    btn.setAttribute('aria-label', 'إغلاق');
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/></svg>';
    btn.onclick = function () { bar.remove(); };

    mask.appendChild(track);
    bar.appendChild(mask);
    bar.appendChild(btn);

    const ref = document.querySelector('.custom-navbar, nav.navbar, header, body');
    if (ref && ref !== document.body) ref.insertAdjacentElement('beforebegin', bar);
    else document.body.insertBefore(bar, document.body.firstChild);

    let off = 0, paused = false;
    bar.addEventListener('mouseenter', function () { paused = true; });
    bar.addEventListener('mouseleave', function () { paused = false; });
    const len = function () { return track.scrollWidth / 3; };
    (function tick() {
      if (!paused) {
        off += 0.55;
        if (off >= len()) off -= len();
        track.style.transform = 'translate3d(-' + off + 'px,0,0)';
      }
      requestAnimationFrame(tick);
    })();
  }

  /* ------------------------------------------------
     NAVBAR SCROLL EFFECT
  ------------------------------------------------ */
  function initNavScroll() {
    const nav = document.querySelector('.custom-navbar, nav.navbar.navbar3, .navbar');
    if (!nav) return;
    function check() {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    window.addEventListener('scroll', check, { passive: true });
    check();
  }

  /* ------------------------------------------------
     HERO VIDEO
  ------------------------------------------------ */
  function injectHeroVideo() {
    const hero = document.querySelector('.hero.hero-area');
    if (!hero || hero.querySelector('.jwk-hero-video')) return;

    const vid = document.createElement('video');
    vid.className = 'jwk-hero-video';
    vid.src = VIDEO_URL;
    vid.muted = true;
    vid.autoplay = true;
    vid.loop = true;
    vid.playsInline = true;
    vid.setAttribute('playsinline', '');
    vid.setAttribute('webkit-playsinline', '');
    vid.preload = 'auto';
    hero.insertBefore(vid, hero.firstChild);
    vid.play().catch(function () {});
  }

  /* ------------------------------------------------
     ABOUT BLOCK — interactive tabs + video
  ------------------------------------------------ */
  function buildAbout() {
    const area = document.querySelector('.about-area');
    if (!area || area.querySelector('.jwk-interactive-root')) return;

    const root = document.createElement('div');
    root.className = 'jwk-interactive-root';
    root.setAttribute('dir', 'rtl');

    root.innerHTML = [
      '<div class="jwk-wrap">',
        '<div class="jwk-top">',
          '<div class="jwk-sub">لماذا جواك تي في؟</div>',
          '<h2 class="jwk-h2">كل ما تحتاجه في اشتراك واحد</h2>',
          '<p class="jwk-desc">اختر القسم الذي يهمك لتتعرف على أبرز مميزات اشتراك Jawak TV، ثم انتقل مباشرة لصفحة الشراء.</p>',
        '</div>',
        '<div class="jwk-shell">',
          '<div class="jwk-media" id="jwkMedia">',
            '<video autoplay muted loop playsinline src="' + VIDEO_URL + '"></video>',
          '</div>',
          '<div class="jwk-content">',
            '<div class="jwk-badge">تجربة أقوى · محتوى أكثر</div>',
            '<h3 class="jwk-title" id="jwkTitle">' + TABS[0].title + '</h3>',
            '<p class="jwk-sub2" id="jwkDesc">' + TABS[0].desc + '</p>',
            '<div class="jwk-tabs" id="jwkTabs"></div>',
            '<div class="jwk-view" id="jwkView">',
              '<h4 class="jwk-feat-title" id="jwkFeatTitle">' + TABS[0].title + '</h4>',
              '<p class="jwk-feat-desc" id="jwkFeatDesc">' + TABS[0].desc + '</p>',
              '<a href="/shop" class="jwk-buy">اشترك الآن ←</a>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',
    ].join('');

    /* build tabs */
    const tabsCont = root.querySelector('#jwkTabs');
    const featTitle = root.querySelector('#jwkFeatTitle');
    const featDesc  = root.querySelector('#jwkFeatDesc');

    TABS.forEach(function (t, i) {
      const btn = document.createElement('button');
      btn.className = 'jwk-tab' + (i === 0 ? ' active' : '');
      btn.innerHTML = '<span class="jwk-tab-icon">' + t.icon + '</span><span class="jwk-tab-label">' + t.label + '</span>';
      btn.addEventListener('click', function () {
        tabsCont.querySelectorAll('.jwk-tab').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        featTitle.textContent = t.title;
        featDesc.textContent  = t.desc;
      });
      tabsCont.appendChild(btn);
    });

    area.appendChild(root);
  }

  /* ------------------------------------------------
     FEATURES ICONS — replace FA icons with SVG
  ------------------------------------------------ */
  const FEAT_ICONS = [
    /* all-inclusive */
    '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
    /* TV / screens */
    '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    /* support */
    '<svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  ];

  function upgradeFeatureIcons() {
    const boxes = document.querySelectorAll('.four-blocks-box .single-promo-icon');
    boxes.forEach(function (box, i) {
      if (box.querySelector('svg')) return; /* already done */
      const svg = FEAT_ICONS[i % FEAT_ICONS.length];
      box.insertAdjacentHTML('beforeend', svg);
    });
  }

  /* ------------------------------------------------
     CARD2 HOVER ENHANCEMENT (CSS handles most)
  ------------------------------------------------ */
  function enhanceCards() {
    document.querySelectorAll('.product-item.card2').forEach(function (c) {
      if (c.dataset.jwk) return;
      c.dataset.jwk = '1';
      c.addEventListener('mouseenter', function () {
        c.style.willChange = 'transform';
      });
      c.addEventListener('mouseleave', function () {
        c.style.willChange = '';
      });
    });
  }

  /* ------------------------------------------------
     INJECT CSS LINK
  ------------------------------------------------ */
  function injectCSS() {
    /* If the file is not already loaded via platform settings, inject it */
    if (document.querySelector('link[data-jwk-css]')) return;
    /* CSS is added via platform CSS editor — this JS just handles the JS parts */
  }

  /* ------------------------------------------------
     INIT
  ------------------------------------------------ */
  function init() {
    buildPromoBar();
    initNavScroll();
    injectHeroVideo();
    buildAbout();
    upgradeFeatureIcons();
    enhanceCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* re-run for lazy-loaded cards */
  if (window.MutationObserver) {
    new MutationObserver(function () { enhanceCards(); upgradeFeatureIcons(); })
      .observe(document.body, { childList: true, subtree: true });
  }

})();
