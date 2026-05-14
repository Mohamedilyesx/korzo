/* =====================================================
   JAWAK TV — TJAR PLATFORM REDESIGN
   jawaktv-tjar.js  |  v3.7  |  2026
   ===================================================== */

/* ================================================================
   1. PROMO BAR
   ================================================================ */
(function () {
  "use strict";

  if (window.__JWK_BAR_LOADED__) return;
  window.__JWK_BAR_LOADED__ = true;

  var MESSAGES = [
    "أكثر من 150,000 فيلم ومسلسل — كل شيء في اشتراك واحد",
    "جودة 4K و8K بثبات تام — شاهد بلا تقطيع",
    "مونديال 2026 — عيشه بأعلى جودة مع Jawak TV",
    "يعمل على جميع أجهزتك — تلفاز، جوال، Apple TV",
    "تفعيل فوري خلال دقيقة — دعم فني على مدار الساعة",
    "عروض حصرية على الاشتراكات السنوية — لا تفوّتها",
    "أكثر من 20,000 قناة عالمية — رياضة، أفلام، أنمي",
    "وداعاً للتقطيع — أهلاً بالثبات الذي تستحقه",
    "اشتراك واحد يكفي العائلة كلها — أجهزة غير محدودة",
    "صورة نقية وصوت احترافي — تجربة المشاهدة الحقيقية",
    "تحميل فوري بلا تأخير — لأن وقتك أغلى من الانتظار",
    "محتوى حصري لا تجده في أي منصة أخرى",
    "الخيار الأول لمحبي الرياضة في الوطن العربي",
    "الدوريات الأوروبية والعالمية والعربية — كلها في مكان واحد",
    "أفلام، مسلسلات، رياضة — منصة واحدة للجميع"
  ];

  var SEPARATOR = "◆";
  var SPEED = 0.6;

  function injectStyles() {
    if (document.getElementById("jwkBarStyles")) return;
    var style = document.createElement("style");
    style.id = "jwkBarStyles";
    style.textContent = [
      ".xc-header-two__top { display:none !important; }",
      /* ═══ FIX: position:fixed بدلاً من relative ═══ */
      "#jwkBar {",
      "  position: fixed !important;",
      "  top: 0 !important;",
      "  left: 0 !important;",
      "  right: 0 !important;",
      "  display: flex; align-items: center;",
      "  width: 100%; height: 42px; overflow: hidden;",
      "  background: linear-gradient(135deg,#0e0901 0%,#1a1000 35%,#221400 65%,#0e0901 100%);",
      "  border-bottom: 1px solid rgba(218,174,73,0.22);",
      "  box-shadow: 0 2px 12px rgba(0,0,0,0.55), inset 0 1px 0 rgba(218,174,73,0.08);",
      "  z-index: 100000 !important; box-sizing: border-box; direction: ltr;",
      "}",
      "#jwkBar::before {",
      "  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;",
      "  background: linear-gradient(90deg, transparent, rgba(218,174,73,0.55) 50%, transparent);",
      "  pointer-events: none;",
      "}",
      "#jwkMask {",
      "  flex: 1 1 auto; height: 100%; overflow: hidden; position: relative; direction: ltr;",
      "  -webkit-mask-image: linear-gradient(90deg, transparent 0%, #000 3.5%, #000 96.5%, transparent 100%);",
      "          mask-image: linear-gradient(90deg, transparent 0%, #000 3.5%, #000 96.5%, transparent 100%);",
      "}",
      "#jwkTrack {",
      "  display: inline-flex; flex-wrap: nowrap; width: max-content; height: 100%;",
      "  align-items: center; white-space: nowrap;",
      "  will-change: transform; transform: translate3d(0,0,0); direction: ltr;",
      "}",
      ".jwk-item {",
      "  display: inline-flex; align-items: center; height: 100%; padding: 0 28px;",
      "  color: #e8dfc0;",
      "  font-family: 'IBM Plex Sans Arabic','Tajawal','Cairo',Arial,sans-serif;",
      "  font-size: 13.5px; font-weight: 500; letter-spacing: 0.01em;",
      "  white-space: nowrap; direction: rtl; flex: 0 0 auto;",
      "  text-shadow: 0 1px 6px rgba(0,0,0,0.6);",
      "  transition: color 0.2s; cursor: default;",
      "}",
      ".jwk-item:hover { color: #f5e9aa; }",
      ".jwk-sep {",
      "  display: inline-flex; align-items: center; height: 100%; padding: 0 4px;",
      "  color: rgba(218,174,73,0.6); font-size: 8px;",
      "  white-space: nowrap; flex: 0 0 auto;",
      "}",
      "#jwkX {",
      "  flex: 0 0 auto; width: 34px; height: 100%;",
      "  display: flex; align-items: center; justify-content: center;",
      "  background: transparent; border: none; cursor: pointer;",
      "  padding: 0; margin: 0; opacity: 0.55;",
      "  transition: opacity 0.2s, color 0.2s; color: #c9a84c;",
      "}",
      "#jwkX:hover { opacity: 1; color: #f0d080; }",
      "@media (max-width: 767px) {",
      "  #jwkBar   { height: 38px; }",
      "  .jwk-item { font-size: 12.5px; padding: 0 18px; }",
      "}"
    ].join("\n");
    document.head.appendChild(style);
  }

  function buildOneCopy() {
    var html = "";
    for (var i = 0; i < MESSAGES.length; i++) {
      html += '<span class="jwk-item">' + MESSAGES[i] + "</span>";
      html += '<span class="jwk-sep">'  + SEPARATOR    + "</span>";
    }
    return html;
  }

  function buildBar() {
    if (document.getElementById("jwkBar")) return;

    var bar      = document.createElement("div"); bar.id = "jwkBar";
    var closeBtn = document.createElement("button");
    closeBtn.id  = "jwkX"; closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "إغلاق الشريط");
    closeBtn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"' +
      ' stroke-width="2.5" stroke-linecap="round" width="11" height="11">' +
      '<line x1="18" y1="6" x2="6" y2="18"/>' +
      '<line x1="6" y1="6" x2="18" y2="18"/></svg>';

    var mask  = document.createElement("div"); mask.id  = "jwkMask";
    var track = document.createElement("div"); track.id = "jwkTrack";
    mask.appendChild(track);
    bar.appendChild(closeBtn);
    bar.appendChild(mask);

    /* ═══ FIX: نضع الشريط مباشرة في body كأول عنصر ═══ */
    document.body.insertBefore(bar, document.body.firstChild);

    var pos = 0, paused = false, raf = null, singleW = 0;
    var oneCopy = buildOneCopy();

    function fillTrack() {
      track.innerHTML = oneCopy;
      singleW = track.scrollWidth;
      if (singleW === 0) return false;
      var vw     = mask.clientWidth || window.innerWidth;
      var copies = Math.max(3, Math.ceil(vw / singleW) + 2);
      var html   = "";
      for (var c = 0; c < copies; c++) html += oneCopy;
      track.innerHTML = html;
      return true;
    }

    function tick() {
      if (!paused && singleW > 0) {
        pos -= SPEED;
        if (pos <= -singleW) pos += singleW;
        track.style.transform = "translate3d(" + pos + "px,0,0)";
      }
      raf = requestAnimationFrame(tick);
    }

    function startWhenReady() {
      if (!fillTrack()) { setTimeout(startWhenReady, 50); return; }
      raf = requestAnimationFrame(tick);
    }

    bar.addEventListener("mouseenter", function () { paused = true;  });
    bar.addEventListener("mouseleave", function () { paused = false; });

    closeBtn.addEventListener("click", function () {
      if (raf) cancelAnimationFrame(raf);
      bar.style.transition = "height .25s ease, opacity .25s ease";
      bar.style.height = "0"; bar.style.opacity = "0";
      setTimeout(function () {
        if (bar.parentNode) bar.parentNode.removeChild(bar);
        document.body.classList.add('jwk-bar-closed');
        var IS_MOB = window.innerWidth <= 767;
        var navH   = IS_MOB ? 56 : 120;
        document.body.style.setProperty('padding-top', navH + 'px', 'important');
        var nav = document.querySelector('nav.navbar.navbar3, .custom-navbar, .navbar.navbar3');
        if (nav) nav.style.setProperty('top', '0px', 'important');
      }, 280);
    });

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        var old = singleW;
        if (fillTrack() && old > 0) {
          pos = pos % singleW;
          if (pos > 0) pos -= singleW;
        }
      }, 150);
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        var old = singleW;
        if (fillTrack() && old > 0) {
          pos = pos % singleW;
          if (pos > 0) pos -= singleW;
        }
      });
    }

    startWhenReady();
  }

  function initBar() { injectStyles(); buildBar(); }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBar);
  } else {
    initBar();
  }

})();


/* ================================================================
   MAIN JAWAK SCRIPT
   ================================================================ */
(function () {
  'use strict';

  document.documentElement.style.backgroundColor = '#1a1815';

  var HERO_VIDEO  = 'https://green-camel-228650.hostingersite.com/wp-content/uploads/2026/05/0227-copy.mp4';
  var ABOUT_VIDEO = 'https://green-camel-228650.hostingersite.com/wp-content/uploads/2026/04/0203-copy-1-copy-copy-11.mp4';
  var IS_MOBILE   = window.innerWidth <= 767;
  var BAR_H       = IS_MOBILE ? 38 : 42;
  var NAV_H       = IS_MOBILE ? 56 : 120;
  var BOTTOM_NAV_H = 64;

  /* ══════════════════════════════════════════════════════════════
     FIX: body padding — فقط ارتفاع الهيدر بدون ضرب الشريط
     لأن الشريط الآن fixed فلا يحتاج padding إضافي
     ══════════════════════════════════════════════════════════════ */
  function applyBodyPadding() {
    /* الـ padding = ارتفاع الشريط + ارتفاع الهيدر */
    document.body.style.setProperty('padding-top', (BAR_H + NAV_H) + 'px', 'important');
  }
  applyBodyPadding();
  document.addEventListener('DOMContentLoaded', applyBodyPadding);

  /* ── Hero mobile styles ── */
  (function injectHeroMobileStyles() {
    if (document.getElementById('jwkHeroMobileStyles')) return;
    var s = document.createElement('style');
    s.id = 'jwkHeroMobileStyles';
    s.textContent = [
      '@media (max-width: 767px) {',
      '  .hero.hero-area, .hero-area {',
      '    min-height: 70vh !important;',
      '    max-height: 70vh !important;',
      '  }',
      '  #jwk-mute-btn { display: none !important; }',
      '  .hero.hero-area .hero-content,',
      '  .hero-area .hero-content,',
      '  .hero.hero-area [class*="hero-text"],',
      '  .hero-area [class*="hero-text"],',
      '  .hero.hero-area .hero__content,',
      '  .hero-area .hero__content {',
      '    position: absolute !important;',
      '    top: 50% !important;',
      '    right: 5% !important;',
      '    transform: translateY(-50%) !important;',
      '    text-align: right !important;',
      '    width: 90% !important;',
      '    max-width: 90% !important;',
      '  }',
      '  .hero.hero-area h1, .hero-area h1,',
      '  .hero.hero-area h2, .hero-area h2 {',
      '    font-size: clamp(1.6rem, 6vw, 2.4rem) !important;',
      '    line-height: 1.3 !important;',
      '    text-shadow: 0 2px 16px rgba(0,0,0,0.85) !important;',
      '  }',
      '  .hero.hero-area p, .hero-area p {',
      '    font-size: clamp(0.85rem, 3.5vw, 1rem) !important;',
      '    text-shadow: 0 1px 8px rgba(0,0,0,0.75) !important;',
      '  }',
      '}'
    ].join('\n');
    document.head.appendChild(s);
  })();

  /* ══════════════════════════════════════════════════════════════
     FIX: Navbar — يبدأ دائماً بعد الشريط (top: BAR_H)
     وعند scroll يصبح شفافاً تماماً → dark glass
     ══════════════════════════════════════════════════════════════ */
  function initNavScroll() {
    var nav = document.querySelector('nav.navbar.navbar3, .custom-navbar, .navbar.navbar3');
    if (!nav) return;
    nav.style.setProperty('position', 'fixed', 'important');
    nav.style.setProperty('top', BAR_H + 'px', 'important');
    nav.style.setProperty('left', '0', 'important');
    nav.style.setProperty('right', '0', 'important');
    nav.style.setProperty('z-index', '9999', 'important');
    /* إزالة أي فراغ أبيض/شفاف فوق الهيدر */
    nav.style.setProperty('margin-top', '0', 'important');
    nav.style.setProperty('padding-top', '0', 'important');
    function update() { nav.classList.toggle('scrolled', window.scrollY > 8); }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ================================================================
     FIX A — HERO VIDEO + ظل علوي وسفلي
     ================================================================ */
  var _videoInjected = false;

  function addVideoToSlide() {
    var hero = document.querySelector('.hero.hero-area') || document.querySelector('.hero-area');
    if (!hero || hero.querySelector('.jwk-hero-video')) return;

    _videoInjected = true;

    hero.style.setProperty('background-image', 'none', 'important');
    hero.style.setProperty('background-color', '#000', 'important');
    hero.style.setProperty('position', 'relative', 'important');
    hero.style.setProperty('overflow', 'hidden', 'important');

    /* ── الفيديو ── */
    var video = document.createElement('video');
    video.className   = 'jwk-hero-video';
    video.autoplay    = true;
    video.muted       = true;
    video.loop        = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('preload', 'auto');
    video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;pointer-events:none;opacity:0;transition:opacity 1.2s ease';
    video.addEventListener('canplay', function () {
      setTimeout(function () { video.style.opacity = '1'; }, 100);
    });
    var src = document.createElement('source');
    src.src  = HERO_VIDEO;
    src.type = 'video/mp4';
    video.appendChild(src);

    var overlay = document.createElement('div');
    overlay.className = 'jwk-hero-overlay';
    overlay.style.cssText = [
      'position:absolute',
      'inset:0',
      'z-index:1',
      'pointer-events:none',
      'background:linear-gradient(' +
        'to bottom,' +
        'rgba(0,0,0,0.45) 0%,' +
        'rgba(0,0,0,0.10) 20%,' +
        'rgba(0,0,0,0.00) 40%,' +
        'rgba(0,0,0,0.00) 60%,' +
        'rgba(0,0,0,0.18) 80%,' +
        'rgba(0,0,0,0.72) 100%' +
      ')'
    ].join(';');

    /* ── نص Hero ── */
    if (!document.getElementById('jwkHeroTextStyles')) {
      var ks = document.createElement('style');
      ks.id = 'jwkHeroTextStyles';
      ks.textContent =
        '@keyframes jwkHeroFadeUp{from{opacity:0;transform:translateX(-50%) translateY(30px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}' +
        '@media(max-width:767px){#jwk-hero-text{bottom:8%!important}#jwk-hero-text a{padding:12px 32px!important;font-size:14px!important}}';
      document.head.appendChild(ks);
    }
    if (!document.getElementById('jwk-hero-text')) {
      var heroText = document.createElement('div');
      heroText.id = 'jwk-hero-text';
      heroText.setAttribute('dir', 'rtl');
      heroText.style.cssText = 'position:absolute;bottom:12%;left:50%;transform:translateX(-50%);z-index:10;text-align:center;width:90%;max-width:720px;animation:jwkHeroFadeUp 1s cubic-bezier(0.16,1,0.3,1) both;pointer-events:none';
      heroText.innerHTML =
        '<p style="font-size:13px;font-weight:700;color:rgba(218,174,73,0.9);letter-spacing:0.18em;text-transform:uppercase;margin:0 0 8px;text-shadow:0 2px 10px rgba(0,0,0,0.5)">كل الترفيه في مكان واحد</p>' +
        '<h1 style="font-size:clamp(2rem,6vw,4.2rem);font-weight:900;color:#fff;line-height:1.1;margin:0 0 12px;text-shadow:0 4px 24px rgba(0,0,0,0.4)">' +
          'جـــوك <span style="background:linear-gradient(135deg,#c9922a,#daae49,#f0d878);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">TV</span>' +
        '</h1>' +
        '<p style="font-size:clamp(1rem,2.5vw,1.3rem);color:rgba(240,234,216,0.92);margin:0 0 28px;text-shadow:0 2px 12px rgba(0,0,0,0.5);font-weight:500">أفلام · مسلسلات · مباريات بلا حدود</p>' +
        '<a href="/products" style="pointer-events:auto;display:inline-flex;align-items:center;padding:14px 48px;background:linear-gradient(135deg,#b88b3c,#daae49,#f0d878);color:#0a0800!important;font-weight:900;font-size:15px;border-radius:999px;text-decoration:none;box-shadow:0 10px 30px rgba(218,174,73,0.4),0 4px 12px rgba(0,0,0,0.4);letter-spacing:0.02em;transition:transform .25s ease,box-shadow .25s ease" onmouseover="this.style.transform=\'translateY(-3px) scale(1.03)\';this.style.boxShadow=\'0 18px 40px rgba(218,174,73,0.55)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'0 10px 30px rgba(218,174,73,0.4),0 4px 12px rgba(0,0,0,0.4)\'">تسوق الآن</a>';
      hero.appendChild(heroText);
    }

    /* ── Mute button ── */
    var muteBtn = document.createElement('button');
    muteBtn.id  = 'jwk-mute-btn';
    muteBtn.setAttribute('aria-label', 'كتم/تشغيل الصوت');
    muteBtn.innerHTML = getMuteIcon(true);
    muteBtn.style.cssText = 'position:absolute;bottom:28px;left:28px;z-index:10;width:42px;height:42px;border-radius:50%;border:1px solid rgba(218,174,73,.4);background:rgba(10,7,0,.55);backdrop-filter:blur(8px);color:#daae49;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s,border-color .2s';
    var isMuted = true;
    muteBtn.addEventListener('click', function () {
      isMuted = !isMuted;
      video.muted = isMuted;
      muteBtn.innerHTML = getMuteIcon(isMuted);
    });
    function getMuteIcon(muted) {
      return muted
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
    }

    hero.insertBefore(muteBtn,  hero.firstChild);
    hero.insertBefore(overlay,  hero.firstChild);
    hero.insertBefore(video,    hero.firstChild);

    var playAttempts = 0;
    function tryPlay() {
      video.play().catch(function () {
        if (++playAttempts < 5) setTimeout(tryPlay, 500);
      });
    }
    tryPlay();

    var imgWrap = hero.querySelector('.hero-img-wrap');
    if (imgWrap) imgWrap.style.setProperty('display', 'none', 'important');
  }

  function tryAddVideo() {
    var hero = document.querySelector('.hero.hero-area') || document.querySelector('.hero-area');
    if (hero) { addVideoToSlide(); }
    else { document.addEventListener('DOMContentLoaded', addVideoToSlide); }
  }

  /* ── Interactive Features ── */
  var FEATURES = [
    { key:'movies', label:'أفلام',    title:'مكتبة أفلام ضخمة',         desc:'أكثر من 150,000 فيلم بجودة HD و4K، من أحدث الإصدارات إلى كلاسيكيات السينما العالمية — كل ما تريد مشاهدته في مكان واحد.', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M10 9l6 3-6 3V9z"/></svg>' },
    { key:'series', label:'مسلسلات', title:'آلاف المسلسلات بلا انقطاع', desc:'تابع أشهر المسلسلات العربية والعالمية والتركية بمحتوى متجدد يومياً، مع دعم التشغيل المستمر بين الحلقات.',               icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 7l-9.5 5.5L3 7"/><rect x="2" y="3" width="20" height="14" rx="2"/></svg>' },
    { key:'sports', label:'رياضة',   title:'تغطية رياضية مباشرة',       desc:'شاهد مباريات كرة القدم والدوريات العالمية بجودة عالية واستقرار ممتاز وقت الذروة — دون تقطع أو تأخير.',               icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>' },
    { key:'anime',  label:'أنمي',    title:'عالم الأنمي بلا حدود',      desc:'استمتع بمئات المسلسلات والأفلام الأنمي مدبلجة ومترجمة، من كلاسيكيات الثمانينات حتى أحدث إصدارات الموسم.',             icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>' }
  ];

  function buildInteractiveFeaturesSection() {
    var area = document.querySelector('.about-area');
    if (!area || area.querySelector('.jawak-interactive-block')) return;
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
          '<div class="jawak-media-card"><video autoplay muted loop playsinline preload="auto"><source src="' + ABOUT_VIDEO + '" type="video/mp4"></video></div>' +
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
    var vid = block.querySelector('video');
    if (vid) vid.play().catch(function () {});
    var tabsEl      = block.querySelector('.jawak-tabs');
    var titleEl     = block.querySelector('.jawak-feature-title');
    var descEl      = block.querySelector('.jawak-feature-desc');
    var featureView = block.querySelector('.jawak-feature-view');
    function renderFeature(index) {
      var f = FEATURES[index]; if (!f) return;
      titleEl.textContent = f.title;
      descEl.textContent  = f.desc;
      featureView.classList.remove('is-animating');
      void featureView.offsetWidth;
      featureView.classList.add('is-animating');
      tabsEl.querySelectorAll('.jawak-tab-btn').forEach(function (btn, i) {
        btn.classList.toggle('active', i === index);
        btn.setAttribute('aria-selected', String(i === index));
      });
    }
    FEATURES.forEach(function (f, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'jawak-tab-btn' + (i === 0 ? ' active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.innerHTML = '<span class="jawak-tab-icon">' + f.icon + '</span><span class="jawak-tab-label">' + f.label + '</span>';
      btn.addEventListener('click', function () { renderFeature(i); });
      tabsEl.appendChild(btn);
    });
    renderFeature(0);
  }

  /* ── Feature Icons ── */
  var PROMO_SVGS = [
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="9" height="9"/><rect x="13" y="2" width="9" height="9"/><rect x="13" y="13" width="9" height="9"/><rect x="2" y="13" width="9" height="9"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>'
  ];
  function upgradeFeatureIcons() {
    document.querySelectorAll('.single-promo-icon').forEach(function (iconBox, i) {
      if (iconBox.dataset.jwkIcon) return;
      iconBox.dataset.jwkIcon = '1';
      var fa = iconBox.querySelector('i');
      if (fa) fa.style.setProperty('display', 'none', 'important');
      var w = document.createElement('span');
      w.innerHTML = PROMO_SVGS[i % PROMO_SVGS.length];
      iconBox.appendChild(w);
    });
  }

  /* ── Hide Ratings ── */
  function hideCardRatings() {
    document.querySelectorAll('.rating-wrap').forEach(function (el) {
      if (el.closest('.product-item, .card2')) el.style.setProperty('display', 'none', 'important');
    });
    document.querySelectorAll(
      '.product-item .d-flex.justify-content-center.align-items-center.m-0.p-0,' +
      '.card2 .d-flex.justify-content-center.align-items-center.m-0.p-0'
    ).forEach(function (el) { el.style.setProperty('display', 'none', 'important'); });
  }

  /* ── Dark Mode ── */
  function applyDarkOverrides() {
    document.querySelectorAll('.bg-white:not(.product-thumbnail-wrap):not(.product-item):not(.card2)').forEach(function (el) {
      el.style.setProperty('background-color', '#1f1c19', 'important');
    });
    document.querySelectorAll('.bg-light:not(.product-thumbnail-wrap):not(.product-item):not(.card2)').forEach(function (el) {
      el.style.setProperty('background-color', '#242018', 'important');
    });
    document.querySelectorAll('.text-dark').forEach(function (el) { el.style.setProperty('color', '#f0ead8', 'important'); });
    document.querySelectorAll('.text-muted').forEach(function (el) { el.style.setProperty('color', '#908778', 'important'); });
    document.querySelectorAll('.product-details-wrapper').forEach(function (el) {
      el.style.setProperty('background-color', '#1f1c19', 'important');
      el.style.setProperty('border-color', 'rgba(218,174,73,.18)', 'important');
    });
    document.querySelectorAll('.product-image-slide .splide').forEach(function (el) {
      el.classList.remove('bg-white');
      el.style.setProperty('background-color', '#1f1c19', 'important');
    });
  }

  /* ── Product Titles ── */
  function fixProductTitles() {
    document.querySelectorAll('h3.product-title a, h3.product-title').forEach(function (el) {
      if (el.dataset.jwkTitle) return;
      el.dataset.jwkTitle = '1';
      el.style.setProperty('color', '#f0ead8', 'important');
    });
  }

  /* ── Brand Images ── */
  function styleBrandImages() {
    document.querySelectorAll('.brand-img').forEach(function (el) {
      if (el.dataset.jwkBrand) return;
      el.dataset.jwkBrand = '1';
      el.style.setProperty('background', 'linear-gradient(135deg,#1f1c19,#242018)', 'important');
      el.style.setProperty('border', '1px solid rgba(218,174,73,.15)', 'important');
      el.style.setProperty('border-radius', '14px', 'important');
      el.style.setProperty('padding', '18px 28px', 'important');
      el.style.setProperty('display', 'flex', 'important');
      el.style.setProperty('align-items', 'center', 'important');
      el.style.setProperty('justify-content', 'center', 'important');
      var img = el.querySelector('img');
      if (img) {
        img.style.setProperty('filter', 'brightness(0) invert(1)', 'important');
        img.style.setProperty('opacity', '0.6', 'important');
        img.style.setProperty('max-height', '100px', 'important');
        img.style.setProperty('min-width', '80px', 'important');
        img.style.setProperty('width', 'auto', 'important');
        img.style.setProperty('object-fit', 'contain', 'important');
        img.style.setProperty('transition', 'opacity .25s ease, transform .25s ease', 'important');
        el.addEventListener('mouseenter', function () {
          img.style.opacity   = '0.95';
          img.style.transform = 'scale(1.06)';
        });
        el.addEventListener('mouseleave', function () {
          img.style.opacity   = '0.6';
          img.style.transform = 'scale(1)';
        });
      }
    });
  }

  /* ── WhatsApp ── */
  function styleWhatsAppBtn() {
    var sel = '.whatsapp_float,.whatsapp-float,#whatsapp_float,#whatsapp-float,.wa-chat-btn,[class*="whatsapp_float"],[class*="wa-float"],[class*="whatsapp-btn"]';
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.dataset.jwkWa) return;
      el.dataset.jwkWa = '1';
      el.style.setProperty('background', 'linear-gradient(135deg,#b88b3c,#daae49,#f0d878)', 'important');
      el.style.setProperty('border-color', 'transparent', 'important');
      el.style.setProperty('box-shadow', '0 6px 22px rgba(218,174,73,.35)', 'important');
      if (IS_MOBILE) {
        el.style.setProperty('bottom', (BOTTOM_NAV_H + 14) + 'px', 'important');
        el.style.setProperty('right', '14px', 'important');
        el.style.setProperty('z-index', '9998', 'important');
      }
      el.querySelectorAll('svg, i').forEach(function (icon) {
        icon.style.setProperty('color', '#0a0800', 'important');
        icon.style.setProperty('fill', '#0a0800', 'important');
        icon.style.setProperty('stroke', '#0a0800', 'important');
      });
    });
  }

  /* ── Page Header Offset ── */
  function fixPageHeaderOffset() {
    var offset = BAR_H + 120 + 16;
    ['.page-header','.breadcrumb-area','.inner-banner','.page-title-area','.category-page-banner'].forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el && !el.dataset.jwkOffset) {
        el.dataset.jwkOffset = '1';
        el.style.setProperty('background-color', '#1a1815', 'important');
        el.style.setProperty('padding-top', offset + 'px', 'important');
      }
    });
  }

  /* ── Tamara Widget ── */
  function fixTamaraWidget() {
    var box = document.querySelector('.tamara-summary-widget--inline-outlined');
    if (!box) return;
    function applyStyles() {
      box.style.setProperty('background-color', '#1f1c19', 'important');
      box.style.setProperty('border', '1px solid #daae49', 'important');
      box.style.setProperty('box-shadow', 'none', 'important');
      box.querySelectorAll('*').forEach(function (el) {
        el.style.setProperty('color', '#daae49', 'important');
        el.style.setProperty('background-color', 'transparent', 'important');
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('filter', 'none', 'important');
        el.style.setProperty('mix-blend-mode', 'normal', 'important');
        el.style.setProperty('-webkit-text-fill-color', '#daae49', 'important');
      });
    }
    applyStyles();
    box.addEventListener('mouseenter', applyStyles);
    box.addEventListener('mouseleave', applyStyles);
    new MutationObserver(applyStyles).observe(box, { childList: true, subtree: true, attributes: true });
  }
  setTimeout(fixTamaraWidget, 1500);

  /* ── Hide Category Images ── */
  document.addEventListener('DOMContentLoaded', function () {
    var hiddenCategories = ['1537771','1534130','1534129','1537773','1534131'];
    var path = window.location.pathname;
    var shouldHide = hiddenCategories.some(function (id) { return path.indexOf(id) !== -1; });
    if (shouldHide) {
      document.querySelectorAll('.xc-category-one__img').forEach(function (el) { el.remove(); });
      document.querySelectorAll('img[alt="breadcrumb"]').forEach(function (el) { el.remove(); });
      document.querySelectorAll('.breadcrumb-img').forEach(function (el) { el.remove(); });
    }
  });

  /* ================================================================
     INIT
     ================================================================ */
  function init() {
    applyBodyPadding();
    initNavScroll();
    tryAddVideo();
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

  /* ── MutationObserver ── */
  var moDebounce;
  var _mo = new MutationObserver(function (mutations) {
    if (!mutations.some(function (m) { return m.addedNodes.length > 0; })) return;
    clearTimeout(moDebounce);
    moDebounce = setTimeout(function () {
      hideCardRatings();
      fixProductTitles();
      styleBrandImages();
      applyDarkOverrides();
      styleWhatsAppBtn();
      upgradeFeatureIcons();
      if (!_videoInjected) tryAddVideo();
    }, 200);
  });
  _mo.observe(document.body, { childList: true, subtree: true });

})();
