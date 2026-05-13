/* =====================================================
   JAWAK TV — TJAR PLATFORM REDESIGN
   jawaktv-tjar.js  |  v3.0  |  2026
   ===================================================== */

(function () {
  'use strict';

  /* Prevent white flash */
  document.documentElement.style.backgroundColor = '#1a1815';

  /* ── CONFIG ──────────────────────────────────────── */
  var HERO_VIDEO  = 'https://green-camel-228650.hostingersite.com/wp-content/uploads/2026/05/0227-copy5.mp4';
  var ABOUT_VIDEO = 'https://green-camel-228650.hostingersite.com/wp-content/uploads/2026/04/0203-copy-1-copy-copy-11.mp4';
  var IS_MOBILE   = window.innerWidth <= 767;
  var BAR_H       = IS_MOBILE ? 36 : 42; /* sync with CSS --bar-h */
  var NAV_H       = IS_MOBILE ? 56 : 65;
  /* Tjar's bottom navigation bar height on mobile */
  var BOTTOM_NAV_H = 64;

  /* ================================================================
     1. PROMO BAR — seamless marquee, fixed at z:100000
     ================================================================ */
  function buildPromoBar() {
    if (document.getElementById('jwk-bar')) return;

    var messages = [
      '🔴 بث مباشر الآن · مباريات اليوم على جواك تي في',
      '🎬 آلاف الأفلام والمسلسلات · بجودة 4K',
      '📺 أكثر من 5000 قناة عربية وعالمية',
      '⚡ اشتراك فوري · تفعيل لحظي · دعم 24 ساعة',
      '🏆 دوري أبطال أوروبا · الدوري السعودي · يورو · فورمولا 1',
      '🎮 بدون تقطع · بدون إعلانات · بدون تأخير'
    ];

    var bar   = document.createElement('div');
    bar.id    = 'jwk-bar';

    var mask  = document.createElement('div');
    mask.id   = 'jwk-mask';

    var track = document.createElement('div');
    track.id  = 'jwk-track';

    /* Build one set of messages as a DocumentFragment */
    function buildSet() {
      var frag = document.createDocumentFragment();
      messages.forEach(function (msg) {
        var item = document.createElement('span');
        item.className   = 'jwk-item';
        item.textContent = msg;
        frag.appendChild(item);

        var sep = document.createElement('span');
        sep.className   = 'jwk-sep';
        sep.textContent = '⬥';
        frag.appendChild(sep);
      });
      return frag;
    }

    /* 3 copies for a seamless infinite loop */
    track.appendChild(buildSet());
    track.appendChild(buildSet());
    track.appendChild(buildSet());

    mask.appendChild(track);

    /* Close button */
    var closeBtn = document.createElement('button');
    closeBtn.id  = 'jwk-close';
    closeBtn.setAttribute('aria-label', 'إغلاق الشريط');
    closeBtn.innerHTML = '&#10005;';

    closeBtn.addEventListener('click', function () {
      cancelAnimationFrame(rafId);
      bar.style.transition = 'height .28s ease, opacity .28s ease';
      bar.style.overflow   = 'hidden';
      bar.style.opacity    = '0';
      bar.style.height     = '0';

      setTimeout(function () {
        if (bar.parentNode) bar.parentNode.removeChild(bar);
        document.body.classList.add('jwk-bar-closed');

        /* Move navbar to top now that bar is gone */
        var nav = document.querySelector('nav.navbar.navbar3, .custom-navbar, .navbar.navbar3');
        if (nav) nav.style.setProperty('top', '0px', 'important');
      }, 300);
    });

    bar.appendChild(mask);
    bar.appendChild(closeBtn);

    /* Insert as very first element in body */
    document.body.insertBefore(bar, document.body.firstChild);

    /* ── Seamless RAF marquee ──
       We track offset in pixels. When offset >= 1/3 of total track width,
       reset to 0 — visually seamless because all 3 copies are identical. */
    var offset  = 0;
    var speed   = 0.55;
    var paused  = false;
    var rafId;
    var oneSetW = 0;

    mask.addEventListener('mouseenter', function () { paused = true; });
    mask.addEventListener('mouseleave', function () { paused = false; });

    function animate() {
      if (!paused) {
        offset += speed;
        /* oneSetW is measured after first paint */
        if (oneSetW > 0 && offset >= oneSetW) {
          offset = 0; /* seamless reset */
        }
        track.style.transform = 'translate3d(-' + offset + 'px,0,0)';
      }
      rafId = requestAnimationFrame(animate);
    }

    /* Measure + start after DOM paints */
    setTimeout(function () {
      oneSetW = track.scrollWidth / 3;
      animate();
    }, 120);
  }

  /* ================================================================
     2. NAVBAR — transparent base, glass on scroll
     ================================================================ */
  function initNavScroll() {
    var nav = document.querySelector('nav.navbar.navbar3, .custom-navbar, .navbar.navbar3');
    if (!nav) return;

    function update() {
      if (window.scrollY > 8) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ================================================================
     3. HERO — full-screen background video
        Selector: .hero.hero-area (from actual Tjar HTML)
     ================================================================ */
  function addVideoToSlide() {
    var hero = document.querySelector('.hero.hero-area')
            || document.querySelector('.hero-area');
    if (!hero) return;
    if (hero.querySelector('.jwk-hero-video')) return;

    /* Kill static background */
    hero.style.setProperty('background-image', 'none', 'important');
    hero.style.setProperty('background-color', '#000', 'important');

    /* Video element */
    var video = document.createElement('video');
    video.className   = 'jwk-hero-video';
    video.autoplay    = true;
    video.muted       = true;
    video.loop        = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('preload', 'auto');

    var src  = document.createElement('source');
    src.src  = HERO_VIDEO;
    src.type = 'video/mp4';
    video.appendChild(src);

    /* Overlay */
    var overlay = document.createElement('div');
    overlay.className = 'jwk-hero-overlay';

    /* Prepend both before existing hero content */
    hero.insertBefore(overlay, hero.firstChild);
    hero.insertBefore(video,   hero.firstChild);

    video.play().catch(function () {});

    /* Hide Tjar's static hero image wrapper */
    var imgWrap = hero.querySelector('.hero-img-wrap');
    if (imgWrap) imgWrap.style.setProperty('display', 'none', 'important');
  }

  /* ================================================================
     4. INTERACTIVE FEATURES BLOCK
        Replaces .about-box (hidden) by appending to .about-area
        Selector: .about-area, .about-box (from actual HTML)
     ================================================================ */
  var FEATURES = [
    {
      key:   'movies',
      label: 'أفلام',
      title: 'مكتبة أفلام ضخمة',
      desc:  'أكثر من 150,000 فيلم بجودة HD و4K، من أحدث الإصدارات إلى كلاسيكيات السينما العالمية — كل ما تريد مشاهدته في مكان واحد.',
      icon:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M10 9l6 3-6 3V9z"/></svg>'
    },
    {
      key:   'series',
      label: 'مسلسلات',
      title: 'آلاف المسلسلات بلا انقطاع',
      desc:  'تابع أشهر المسلسلات العربية والعالمية والتركية بمحتوى متجدد يومياً، مع دعم التشغيل المستمر بين الحلقات.',
      icon:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 7l-9.5 5.5L3 7"/><rect x="2" y="3" width="20" height="14" rx="2"/></svg>'
    },
    {
      key:   'sports',
      label: 'رياضة',
      title: 'تغطية رياضية مباشرة',
      desc:  'شاهد مباريات كرة القدم والدوريات العالمية بجودة عالية واستقرار ممتاز وقت الذروة — دون تقطع أو تأخير.',
      icon:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>'
    },
    {
      key:   'anime',
      label: 'أنمي',
      title: 'عالم الأنمي بلا حدود',
      desc:  'استمتع بمئات المسلسلات والأفلام الأنمي مدبلجة ومترجمة، من كلاسيكيات الثمانينات حتى أحدث إصدارات الموسم.',
      icon:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>'
    }
  ];

  function buildInteractiveFeaturesSection() {
    var area = document.querySelector('.about-area');
    if (!area) return;
    if (area.querySelector('.jawak-interactive-block')) return;

    /* Hide the original about-box */
    var box = area.querySelector('.about-box');
    if (box) box.style.setProperty('display', 'none', 'important');

    var block = document.createElement('div');
    block.className = 'jawak-interactive-block';
    block.setAttribute('dir', 'rtl');
    block.innerHTML =
      '<div class="container">' +
        '<div class="jawak-section-header">' +
          '<span class="jawak-pill">لماذا جواك تي في؟</span>' +
          '<h2 class="jawak-h2">كل ما تحتاجه في اشتراك واحد</h2>' +
          '<p class="jawak-lead">اختر القسم الذي يهمك لتتعرف على أبرز مميزات اشتراك Jawak TV، ثم انتقل مباشرة لصفحة الشراء.</p>' +
        '</div>' +
        '<div class="jawak-interactive-shell">' +
          '<div class="jawak-media-card">' +
            '<video autoplay muted loop playsinline preload="auto">' +
              '<source src="' + ABOUT_VIDEO + '" type="video/mp4">' +
            '</video>' +
          '</div>' +
          '<div class="jawak-content-side">' +
            '<span class="jawak-top-badge">تجربة أقوى · محتوى أكثر</span>' +
            '<h3 class="jawak-main-title">لماذا تختار جواك TV؟</h3>' +
            '<p class="jawak-subtitle">اختر القسم الذي يهمك لتتعرف على أبرز المميزات.</p>' +
            '<div class="jawak-tabs" role="tablist"></div>' +
            '<div class="jawak-feature-view">' +
              '<h4 class="jawak-feature-title"></h4>' +
              '<p class="jawak-feature-desc"></p>' +
              '<a class="jawak-buy-btn" href="/products">تسوق الآن ←</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    area.appendChild(block);

    /* Play about video */
    var vid = block.querySelector('video');
    if (vid) vid.play().catch(function () {});

    var tabsEl      = block.querySelector('.jawak-tabs');
    var titleEl     = block.querySelector('.jawak-feature-title');
    var descEl      = block.querySelector('.jawak-feature-desc');
    var featureView = block.querySelector('.jawak-feature-view');

    function renderFeature(index) {
      var f = FEATURES[index];
      if (!f) return;
      titleEl.textContent = f.title;
      descEl.textContent  = f.desc;
      featureView.classList.remove('is-animating');
      void featureView.offsetWidth; /* reflow to restart animation */
      featureView.classList.add('is-animating');
      tabsEl.querySelectorAll('.jawak-tab-btn').forEach(function (btn, i) {
        btn.classList.toggle('active', i === index);
        btn.setAttribute('aria-selected', String(i === index));
      });
    }

    FEATURES.forEach(function (f, i) {
      var btn      = document.createElement('button');
      btn.type     = 'button';
      btn.className = 'jawak-tab-btn' + (i === 0 ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.innerHTML =
        '<span class="jawak-tab-icon">' + f.icon + '</span>' +
        '<span class="jawak-tab-label">' + f.label + '</span>';
      btn.addEventListener('click', function () { renderFeature(i); });
      tabsEl.appendChild(btn);
    });

    renderFeature(0);
  }

  /* ================================================================
     5. FEATURE ICONS — inject SVG into .single-promo-icon
        Correct selector: .single-promo-icon > i.las
     ================================================================ */
  var PROMO_SVGS = [
    /* clock */
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    /* grid */
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="9" height="9"/><rect x="13" y="2" width="9" height="9"/><rect x="13" y="13" width="9" height="9"/><rect x="2" y="13" width="9" height="9"/></svg>',
    /* tv */
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    /* headset */
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>'
  ];

  function upgradeFeatureIcons() {
    var icons = document.querySelectorAll('.single-promo-icon');
    icons.forEach(function (iconBox, i) {
      if (iconBox.dataset.jwkIcon) return;
      iconBox.dataset.jwkIcon = '1';

      /* Remove FontAwesome <i> */
      var faIcon = iconBox.querySelector('i');
      if (faIcon) faIcon.style.setProperty('display', 'none', 'important');

      /* Inject SVG */
      var svgWrap = document.createElement('span');
      svgWrap.innerHTML = PROMO_SVGS[i % PROMO_SVGS.length];
      iconBox.appendChild(svgWrap);
    });
  }

  /* ================================================================
     6. HIDE RATINGS on product cards
        Correct selectors from actual HTML
     ================================================================ */
  function hideCardRatings() {
    document.querySelectorAll('.rating-wrap').forEach(function (el) {
      /* Only hide in product card context, not on product detail page */
      var card = el.closest('.product-item, .card2');
      if (card) el.style.setProperty('display', 'none', 'important');
    });

    /* Also hide the container div for the rating */
    document.querySelectorAll(
      '.product-item .d-flex.justify-content-center.align-items-center.m-0.p-0,' +
      '.card2 .d-flex.justify-content-center.align-items-center.m-0.p-0'
    ).forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
    });
  }

  /* ================================================================
     7. DARK MODE — bg-white / bg-light / text-dark overrides
        Uses background-COLOR (not background shorthand) to preserve
        any background-image properties on elements.
        IMPORTANT: NEVER touch product images.
     ================================================================ */
  function applyDarkOverrides() {
    /* background-color overrides — safe, won't affect background-image */
    document.querySelectorAll('.bg-white:not(.product-thumbnail-wrap):not(.product-item):not(.card2)').forEach(function (el) {
      el.style.setProperty('background-color', '#1f1c19', 'important');
    });
    document.querySelectorAll('.bg-light:not(.product-thumbnail-wrap):not(.product-item):not(.card2)').forEach(function (el) {
      el.style.setProperty('background-color', '#242018', 'important');
    });
    document.querySelectorAll('.text-dark').forEach(function (el) {
      el.style.setProperty('color', '#f0ead8', 'important');
    });
    document.querySelectorAll('.text-muted').forEach(function (el) {
      el.style.setProperty('color', '#908778', 'important');
    });

    /* Product details page */
    document.querySelectorAll('.product-details-wrapper').forEach(function (el) {
      el.style.setProperty('background-color', '#1f1c19', 'important');
      el.style.setProperty('border-color', 'rgba(218,174,73,.18)', 'important');
    });
    document.querySelectorAll('.product-image-slide .splide').forEach(function (el) {
      el.classList.remove('bg-white');
      el.style.setProperty('background-color', '#1f1c19', 'important');
    });
  }

  /* ================================================================
     8. PRODUCT CARD TITLES — ensure readable gold/light color
        h3.product-title > a.text-break
     ================================================================ */
  function fixProductTitles() {
    document.querySelectorAll('h3.product-title a, h3.product-title').forEach(function (el) {
      if (el.dataset.jwkTitle) return;
      el.dataset.jwkTitle = '1';
      el.style.setProperty('color', '#f0ead8', 'important');
    });
  }

  /* ================================================================
     9. BRAND IMAGES — style dark cards, bigger logos
        ONLY .brand-img img gets the filter — NOT any other widgetArea images
     ================================================================ */
  function styleBrandImages() {
    document.querySelectorAll('.brand-img').forEach(function (el) {
      if (el.dataset.jwkBrand) return;
      el.dataset.jwkBrand = '1';

      el.style.setProperty('background', 'linear-gradient(135deg,#1f1c19,#242018)', 'important');
      el.style.setProperty('border', '1px solid rgba(218,174,73,.15)', 'important');
      el.style.setProperty('border-radius', '14px', 'important');
      el.style.setProperty('padding', '14px 22px', 'important');
      el.style.setProperty('display', 'flex', 'important');
      el.style.setProperty('align-items', 'center', 'important');
      el.style.setProperty('justify-content', 'center', 'important');

      var img = el.querySelector('img');
      if (img) {
        /* Only brand logos get the filter */
        img.style.setProperty('filter', 'brightness(0) invert(1)', 'important');
        img.style.setProperty('opacity', '0.55', 'important');
        img.style.setProperty('max-height', '72px', 'important');
        img.style.setProperty('width', 'auto', 'important');
        img.style.setProperty('object-fit', 'contain', 'important');
        img.style.setProperty('transition', 'opacity .25s ease', 'important');

        el.addEventListener('mouseenter', function () { img.style.opacity = '0.9'; });
        el.addEventListener('mouseleave', function () { img.style.opacity = '0.55'; });
      }
    });
  }

  /* ================================================================
     10. WHATSAPP FLOATING BUTTON — gold instead of green
         On mobile: push above Tjar's bottom nav bar
     ================================================================ */
  function styleWhatsAppBtn() {
    var selectors = [
      '.whatsapp_float', '.whatsapp-float', '#whatsapp_float',
      '#whatsapp-float', '.wa-chat-btn', '[class*="whatsapp_float"]',
      '[class*="wa-float"]', '[class*="whatsapp-btn"]'
    ].join(',');

    document.querySelectorAll(selectors).forEach(function (el) {
      if (el.dataset.jwkWa) return;
      el.dataset.jwkWa = '1';

      /* Gold gradient */
      el.style.setProperty('background', 'linear-gradient(135deg,#b88b3c,#daae49,#f0d878)', 'important');
      el.style.setProperty('border-color', 'transparent', 'important');
      el.style.setProperty('box-shadow', '0 6px 22px rgba(218,174,73,.35)', 'important');
      el.style.setProperty('transition', 'transform .25s ease, box-shadow .25s ease', 'important');

      /* Mobile: push above Tjar bottom nav */
      if (IS_MOBILE) {
        el.style.setProperty('bottom', (BOTTOM_NAV_H + 14) + 'px', 'important');
        el.style.setProperty('right', '14px', 'important');
        el.style.setProperty('z-index', '9998', 'important');
      }

      /* Recolor inner icons to dark (for contrast on gold) */
      el.querySelectorAll('svg, i').forEach(function (icon) {
        icon.style.setProperty('color', '#0a0800', 'important');
        icon.style.setProperty('fill', '#0a0800', 'important');
        icon.style.setProperty('stroke', '#0a0800', 'important');
      });
    });
  }

  /* ================================================================
     11. FIX CATEGORY PAGE HEADER OVERLAP
         Category pages show a header under the fixed navbar.
         Add padding-top to prevent overlap.
     ================================================================ */
  function fixPageHeaderOffset() {
    var offset = BAR_H + 65 + 16; /* promobar + navbar + gap */

    ['.page-header', '.breadcrumb-area', '.inner-banner',
     '.page-title-area', '.category-page-banner'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el && !el.dataset.jwkOffset) {
        el.dataset.jwkOffset = '1';
        el.style.setProperty('background-color', '#1a1815', 'important');
        el.style.setProperty('padding-top', offset + 'px', 'important');
      }
    });
  }

  /* ================================================================
     INIT + MUTATION OBSERVER
     ================================================================ */
  function init() {
    buildPromoBar();
    initNavScroll();
    addVideoToSlide();
    buildInteractiveFeaturesSection();
    upgradeFeatureIcons();
    hideCardRatings();
    applyDarkOverrides();
    fixProductTitles();
    styleBrandImages();
    styleWhatsAppBtn();
    fixPageHeaderOffset();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* MutationObserver — re-run on Tjar's dynamic content additions */
  var moDebounce;
  var observer = new MutationObserver(function (mutations) {
    var hasNew = mutations.some(function (m) { return m.addedNodes.length > 0; });
    if (!hasNew) return;
    clearTimeout(moDebounce);
    moDebounce = setTimeout(function () {
      /* Only lightweight calls in observer — no heavy DOM rewrites */
      hideCardRatings();
      fixProductTitles();
      styleBrandImages();
      applyDarkOverrides();
      styleWhatsAppBtn();
      upgradeFeatureIcons();
    }, 200);
  });

  observer.observe(document.body, { childList: true, subtree: true });

})();
