/**
 * The Grumpy Chef - Mobile Fixes
 *
 * Consolidated mobile guard, extracted from per-page inline blocks added
 * during the 2026-04-23 site-wide audit. Promotes Slice D's stricter
 * pattern (13px floor / 767px breakpoint / MutationObserver) over Slice A's
 * lighter version (12px floor / 480px / no observer).
 *
 * Usage: <script src="/js/mobile-fixes.js" defer></script> near bottom of <head>.
 *
 * Behaviour:
 *   1. On viewports <= 767px: prevent horizontal scroll, cap media at 100%,
 *      bump tap-area on .nav-cta to 44px min-height.
 *   2. On viewports <= 767px: walk the DOM; any element with computed
 *      font-size < 12px gets bumped to 13px via inline !important.
 *   3. MutationObserver re-runs the font-floor walker on dynamic content.
 */
(function () {
  'use strict';

  // ----- 1. Inject CSS guard (overflow + tap target + responsive media) -----
  var css = [
    '@media (max-width:767px){',
    '  html,body{overflow-x:hidden;max-width:100vw}',
    '  body img,body table,body iframe,body video{max-width:100%;height:auto}',
    '  body pre,body code{max-width:100%;overflow-x:auto;white-space:pre-wrap;word-break:break-word}',
    '}',
    '@media (max-width:480px){',
    '  .nav-cta{min-height:44px !important;display:inline-flex !important;align-items:center !important;justify-content:center !important;padding:10px 20px !important}',
    '  a[href="/kit.html"].nav-cta,a[href="https://thegrumpychef.ca/newsletter.html"]{min-height:44px}',
    '}'
  ].join('');
  var styleEl = document.createElement('style');
  styleEl.id = 'mobile-fixes-css';
  styleEl.appendChild(document.createTextNode(css));
  // Append to <head> if available; otherwise queue for later.
  if (document.head) {
    document.head.appendChild(styleEl);
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.head.appendChild(styleEl);
    });
  }

  // ----- 2. Font-floor walker -----
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEMPLATE: 1 };

  function bumpFontFloor() {
    if (window.innerWidth > 767) return;
    if (!document.body) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    var node;
    while ((node = walker.nextNode())) {
      if (SKIP_TAGS[node.tagName]) continue;
      var fs = parseFloat(getComputedStyle(node).fontSize);
      if (fs && fs < 12) {
        node.style.setProperty('font-size', '13px', 'important');
      }
    }
  }

  // ----- 3. Run on ready + observe DOM changes -----
  function init() {
    bumpFontFloor();
    if (typeof MutationObserver === 'function' && document.body) {
      new MutationObserver(bumpFontFloor).observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
