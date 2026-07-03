/**
 * The Grumpy Chef — Shared Analytics
 * GA4 + Microsoft Clarity + LinkedIn Insight Tag + UTM Capture + Custom Events
 *
 * Usage: Add <script src="/js/analytics.js"></script> before </head> on every page.
 *
 * SETUP:
 * 1. Replace GA4_MEASUREMENT_ID with your real GA4 Measurement ID (G-XXXXXXXXXX)
 * 2. Replace CLARITY_PROJECT_ID with your Clarity project ID (get one free at clarity.microsoft.com)
 * 3. Deploy — everything else is automatic.
 */

(function () {
  'use strict';

  // =============================================
  // CONFIGURATION — Replace these placeholders
  // =============================================
  var GA4_ID = 'G-F41KYXCEXL';
  var CLARITY_ID = 'vsdyoa3a71';
  var LINKEDIN_PARTNER_ID = '8833114';

  // =============================================
  // SELF-EXCLUSION (run in browser console: localStorage.setItem('ga4_exclude', 'true'))
  // =============================================
  if (localStorage.getItem('ga4_exclude') === 'true') {
    window['ga-disable-' + GA4_ID] = true;
  }

  // =============================================
  // BOT / NON-HUMAN GATE
  // Link-preview unfurlers (LinkedIn, Facebook, Slack), headless scrapers, and
  // crawlers fetch the page and run gtag — inflating GA4 "users" by ~78% (measured
  // 2026-07 on /leak: 229 raw vs 50 real renders). They never run the page body JS
  // and never interact. Two-part defence: (a) hard-block known bot UAs + automation
  // here, and (b) defer page_view until a real-human signal (below), so
  // fetch-and-discard clients are never counted. Quiet human readers still count via
  // a short visible dwell; anyone who interacts counts instantly.
  // =============================================
  var BOT_UA = /bot|crawl|spider|slurp|crawler|facebookexternalhit|linkedinbot|slackbot|slack-imgproxy|whatsapp|telegrambot|discordbot|embedly|quora link preview|bitlybot|skypeuripreview|pinterest|redditbot|applebot|bingpreview|vkshare|w3c_validator|baiduspider|yandex|duckduckbot|googlebot|petalbot|semrush|ahrefs|mj12bot|dotbot|headless|phantomjs|puppeteer|playwright|selenium|python-requests|python-urllib|axios|node-fetch|go-http-client|\bcurl\b|wget|okhttp|libwww|httpclient|scrapy/i;

  function isLikelyBot() {
    try {
      var ua = navigator.userAgent || '';
      if (!ua) return true;                          // no UA string = not a real browser
      if (BOT_UA.test(ua)) return true;              // named crawler / unfurler / HTTP lib
      if (navigator.webdriver === true) return true; // automation (Playwright/Selenium/etc.)
      return false;
    } catch (e) {
      return false;                                  // never block on our own error
    }
  }

  if (isLikelyBot()) {
    window['ga-disable-' + GA4_ID] = true;
    return; // skip GA4, Clarity, LinkedIn, and all event wiring for non-humans
  }

  // =============================================
  // GA4 INITIALIZATION
  // =============================================
  if (GA4_ID !== 'GA4_MEASUREMENT_ID') {
    var gs = document.createElement('script');
    gs.async = true;
    gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(gs);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    // send_page_view is deferred: fired manually by armPageView() once we have a
    // real-human signal, so unfurlers/scrapers that load gtag but tear down are
    // never counted. See BOT / NON-HUMAN GATE above.
    gtag('config', GA4_ID, { send_page_view: false });
  }

  // =============================================
  // DEFERRED, HUMAN-GATED PAGE_VIEW
  // =============================================
  var pageViewSent = false;
  function sendPageView(reason) {
    if (pageViewSent || typeof window.gtag !== 'function') return;
    pageViewSent = true;
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
      human_signal: reason || 'unknown'
    });
  }

  function armPageView() {
    var interactions = ['pointerdown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click'];
    function onInteract() { cleanup(); sendPageView('interaction'); }
    function cleanup() {
      interactions.forEach(function (evt) {
        window.removeEventListener(evt, onInteract, true);
      });
    }
    // Instant path: any genuine interaction (also protects a fast click-to-checkout).
    interactions.forEach(function (evt) {
      window.addEventListener(evt, onInteract, { capture: true, passive: true });
    });

    // Quiet-reader path: count once the page has been visibly on screen for a beat.
    // requestAnimationFrame guarantees at least one real paint — unfurlers that
    // render off-screen and tear down never reach it.
    var DWELL_MS = 1200;
    function armDwell() {
      if (document.visibilityState !== 'visible') return;
      var raf = window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); };
      raf(function () {
        setTimeout(function () {
          if (document.visibilityState === 'visible') { cleanup(); sendPageView('dwell'); }
        }, DWELL_MS);
      });
    }
    if (document.visibilityState === 'visible') {
      armDwell();
    } else {
      document.addEventListener('visibilitychange', function vc() {
        if (document.visibilityState === 'visible') {
          document.removeEventListener('visibilitychange', vc);
          armDwell();
        }
      });
    }
  }

  // =============================================
  // MICROSOFT CLARITY
  // =============================================
  if (CLARITY_ID !== 'CLARITY_PROJECT_ID') {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', CLARITY_ID);
  }

  // =============================================
  // LINKEDIN INSIGHT TAG
  // =============================================
  if (LINKEDIN_PARTNER_ID) {
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(LINKEDIN_PARTNER_ID);
    (function (l) {
      if (!l) {
        window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
        window.lintrk.q = [];
      }
      var s = document.getElementsByTagName('script')[0];
      var b = document.createElement('script');
      b.type = 'text/javascript';
      b.async = true;
      b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      s.parentNode.insertBefore(b, s);
    })(window.lintrk);
  }

  // =============================================
  // UTM PARAMETER CAPTURE
  // =============================================
  function captureUTM() {
    var params = new URLSearchParams(window.location.search);
    var utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
      var val = params.get(key);
      if (val) utm[key] = val;
    });
    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem('grumpychef_utm', JSON.stringify(utm));
    }
  }
  captureUTM();

  /**
   * Get stored UTM parameters. Call this from form submission functions.
   * Returns { utm_source, utm_medium, utm_campaign, utm_content, utm_term } or {}
   */
  window.getUTMParams = function () {
    try {
      return JSON.parse(sessionStorage.getItem('grumpychef_utm')) || {};
    } catch (e) {
      return {};
    }
  };

  // =============================================
  // GA4 EVENT HELPERS
  // =============================================
  function fireEvent(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
    // Also log to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('[Analytics]', name, params || {});
    }
  }

  /**
   * Track a custom event. Available globally.
   * Usage: window.gcTrack('tool_start', { tool: 'calculator' });
   */
  window.gcTrack = fireEvent;

  // =============================================
  // SCROLL DEPTH TRACKING (25%, 50%, 75%, 100%)
  // =============================================
  var scrollMarks = { 25: false, 50: false, 75: false, 100: false };

  function checkScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight <= 0) return;
    var pct = Math.round((scrollTop / docHeight) * 100);

    [25, 50, 75, 100].forEach(function (mark) {
      if (pct >= mark && !scrollMarks[mark]) {
        scrollMarks[mark] = true;
        fireEvent('scroll_depth', { percent: mark, page: window.location.pathname });
      }
    });
  }

  var scrollTimer = null;
  window.addEventListener('scroll', function () {
    if (scrollTimer) return;
    scrollTimer = setTimeout(function () {
      scrollTimer = null;
      checkScroll();
    }, 250);
  }, { passive: true });

  // =============================================
  // CTA CLICK TRACKING
  // =============================================
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('a[href], button, [role="button"], .btn, .cta');
    if (!btn) return;

    var label = btn.textContent.trim().substring(0, 60);
    var href = btn.getAttribute('href') || '';

    // Track CTA clicks (buttons with gold styling or explicit CTA classes)
    if (btn.classList.contains('btn--gold') || btn.classList.contains('cta') ||
      btn.tagName === 'BUTTON' || btn.closest('.hero') || btn.closest('.cta-section')) {
      fireEvent('cta_click', {
        label: label,
        href: href,
        page: window.location.pathname
      });
    }
  });

  // =============================================
  // FORM TRACKING (Auto-attach to all forms)
  // =============================================
  var formTrackingState = {};

  function setupFormTracking() {
    var forms = document.querySelectorAll('form');
    forms.forEach(function (form, idx) {
      var formId = form.id || 'form_' + idx;

      // Track form view via IntersectionObserver
      if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            fireEvent('form_view', { form_id: formId, page: window.location.pathname });
            obs.disconnect();
          }
        }, { threshold: 0.3 });
        obs.observe(form);
      }

      // Track first field interaction
      var inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(function (input) {
        input.addEventListener('focus', function () {
          if (!formTrackingState[formId]) {
            formTrackingState[formId] = { startTime: Date.now(), fields: [] };
            fireEvent('form_start', { form_id: formId, first_field: input.name || input.id });
          }
          // Track individual field focus
          var fieldName = input.name || input.id || input.type;
          if (formTrackingState[formId] && formTrackingState[formId].fields.indexOf(fieldName) === -1) {
            formTrackingState[formId].fields.push(fieldName);
            fireEvent('form_field_focus', { form_id: formId, field: fieldName });
          }
        });
      });

      // Track form submission
      form.addEventListener('submit', function () {
        var state = formTrackingState[formId];
        var duration = state ? Math.round((Date.now() - state.startTime) / 1000) : 0;
        fireEvent('form_submit', {
          form_id: formId,
          page: window.location.pathname,
          fields_touched: state ? state.fields.length : 0,
          duration_seconds: duration
        });
      });
    });
  }

  // =============================================
  // TOOL INTERACTION TRACKING
  // =============================================

  var toolStartTimes = {};

  /**
   * Track tool start. Call from tool JS when user begins interacting.
   * Usage: window.gcToolStart('calculator');
   */
  window.gcToolStart = function (toolName) {
    toolStartTimes[toolName] = Date.now();
    fireEvent('tool_start', { tool: toolName, page: window.location.pathname });
  };

  /**
   * Track tool completion (results displayed). Includes elapsed time if gcToolStart was called.
   * Usage: window.gcToolComplete('calculator', { score: 85, leaks: 5 });
   */
  window.gcToolComplete = function (toolName, resultData) {
    var elapsed = toolStartTimes[toolName] ? Math.round((Date.now() - toolStartTimes[toolName]) / 1000) : null;
    var params = Object.assign({ tool: toolName, page: window.location.pathname }, resultData || {});
    if (elapsed !== null) params.duration_seconds = elapsed;
    fireEvent('tool_complete', params);
  };

  /**
   * Track question answered in multi-step tools.
   * Usage: window.gcQuestionAnswered('calculator', 3, 'food-waste');
   */
  window.gcQuestionAnswered = function (toolName, questionIndex, category) {
    fireEvent('question_answered', { tool: toolName, question: questionIndex, category: category || '' });
  };

  /**
   * Track section completed in multi-step tools (e.g., "Food Cost" section done).
   * Usage: window.gcSectionCompleted('calculator', 'food-cost', 3);
   */
  window.gcSectionCompleted = function (toolName, sectionName, questionsInSection) {
    fireEvent('section_completed', {
      tool: toolName,
      section: sectionName,
      questions: questionsInSection || 0,
      page: window.location.pathname
    });
  };

  // =============================================
  // FORM ABANDONMENT DETECTION
  // =============================================
  var abandonTimer = null;

  function resetAbandonTimer() {
    if (abandonTimer) clearTimeout(abandonTimer);
    abandonTimer = setTimeout(function () {
      // Check if user was mid-form
      Object.keys(formTrackingState).forEach(function (formId) {
        var state = formTrackingState[formId];
        if (state && state.fields.length > 0) {
          fireEvent('form_abandon', {
            form_id: formId,
            fields_completed: state.fields.length,
            last_field: state.fields[state.fields.length - 1],
            idle_seconds: 60
          });
        }
      });
    }, 60000); // 60 seconds idle
  }

  ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(function (evt) {
    document.addEventListener(evt, resetAbandonTimer, { passive: true });
  });

  // Also track on page unload
  window.addEventListener('beforeunload', function () {
    Object.keys(formTrackingState).forEach(function (formId) {
      var state = formTrackingState[formId];
      if (state && state.fields.length > 0) {
        fireEvent('form_abandon', {
          form_id: formId,
          fields_completed: state.fields.length,
          last_field: state.fields[state.fields.length - 1],
          type: 'page_exit'
        });
      }
    });
  });

  // =============================================
  // CUSTOM GA4 EVENTS
  // =============================================

  // 1. calculator_submit — fires on calculator email capture form
  function setupCalculatorSubmit() {
    if (window.location.pathname !== '/calculator.html') return;
    var form = document.getElementById('cap-form');
    if (form) {
      form.addEventListener('submit', function () {
        fireEvent('calculator_submit', { page: window.location.pathname });
      });
    }
  }

  // 2. newsletter_signup — fires on any email form submission
  function setupNewsletterSignup() {
    var forms = document.querySelectorAll('form');
    forms.forEach(function (form) {
      var emailInput = form.querySelector('input[type="email"]');
      if (!emailInput) return;
      // Skip the calculator capture form — that gets its own event
      if (form.id === 'cap-form') return;
      form.addEventListener('submit', function () {
        fireEvent('newsletter_signup', {
          form_id: form.id || 'unnamed',
          page: window.location.pathname
        });
      });
    });
  }

  // 3. kit_page_view — fires on /kit.html load
  function setupKitPageView() {
    if (window.location.pathname === '/kit.html') {
      fireEvent('kit_page_view', { referrer: document.referrer });
    }
  }

  // 4. discovery_call_click — fires on any link to discovery call pages
  function setupDiscoveryCallClick() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href') || '';
      if (href.indexOf('discovery') !== -1 || href.indexOf('calendly.com') !== -1) {
        fireEvent('discovery_call_click', {
          label: link.textContent.trim().substring(0, 60),
          href: href,
          page: window.location.pathname
        });
      }
    });
  }

  // 5. toolkit_checkout_started — fires on toolkit funnel clicks
  //    funnel_stage="intent"   when user clicks any /kit.html link from a marketing page
  //    funnel_stage="checkout" when user clicks a Stripe checkout link (final step)
  //    Single delegated handler replaces 13 per-page inline snippets.
  function setupToolkitCheckoutStarted() {
    document.addEventListener('click', function (e) {
      if (!e.target || !e.target.closest) return;
      var link = e.target.closest('a[href]');
      if (!link) return;
      var href = link.getAttribute('href') || '';

      var stage = null;
      // Stripe checkout link (highest specificity — check first)
      if (href.indexOf('buy.stripe.com') !== -1) {
        stage = 'checkout';
      } else if (href.indexOf('/kit.html') === 0 ||
                 href.indexOf('https://thegrumpychef.ca/kit.html') === 0) {
        stage = 'intent';
      }
      if (!stage) return;

      fireEvent('toolkit_checkout_started', {
        funnel_stage: stage,
        label: link.textContent.trim().substring(0, 60),
        href: href,
        source_page: window.location.pathname
      });
    });
  }

  // 6. calendly_booked — fires when Calendly confirms a booking
  function setupCalendlyBooked() {
    window.addEventListener('message', function (e) {
      if (e.origin && e.origin.indexOf('calendly.com') !== -1 &&
          e.data && e.data.event === 'calendly.event_scheduled') {
        var payload = (e.data.payload || {});
        fireEvent('calendly_booked', {
          event_uri: payload.event && payload.event.uri || '',
          invitee_uri: payload.invitee && payload.invitee.uri || '',
          page: window.location.pathname
        });
      }
    });
  }

  // 7. Calendly popup — turn calendly.com CTA links into on-site popups so the
  //    booking's calendly.event_scheduled postMessage reaches setupCalendlyBooked()
  //    above. Without this, link-out CTAs navigate away to calendly.com and the
  //    booking is never attributed to our funnel. Lazy-loads the official widget;
  //    if it isn't ready (or fails to load), clicks fall back to normal navigation,
  //    so there is no regression. Inline-widget pages load the assets themselves and
  //    are already captured — this only touches <a href> links.
  function setupCalendlyPopup() {
    var calendlyLinks = document.querySelectorAll('a[href*="calendly.com"]');
    if (!calendlyLinks.length) return;

    var ASSET_CSS = 'https://assets.calendly.com/assets/external/widget.css';
    var ASSET_JS = 'https://assets.calendly.com/assets/external/widget.js';

    function ensureAssets() {
      if (!document.querySelector('link[href="' + ASSET_CSS + '"]')) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = ASSET_CSS;
        document.head.appendChild(l);
      }
      if (!document.querySelector('script[src="' + ASSET_JS + '"]')) {
        var s = document.createElement('script');
        s.src = ASSET_JS;
        s.async = true;
        document.head.appendChild(s);
      }
    }

    // Preload now so the first click opens the popup instantly.
    ensureAssets();

    document.addEventListener('click', function (e) {
      if (!e.target || !e.target.closest) return;
      var link = e.target.closest('a[href*="calendly.com"]');
      if (!link) return;
      // Let modified clicks (new tab/window, middle-click) behave normally.
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      // Only hijack when the widget is ready; otherwise fall back to navigation.
      if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
        e.preventDefault();
        window.Calendly.initPopupWidget({ url: link.getAttribute('href') });
      }
      // discovery_call_click still fires via its own delegated handler.
    });
  }

  // =============================================
  // INIT
  // =============================================
  function initCustomEvents() {
    setupCalculatorSubmit();
    setupNewsletterSignup();
    setupKitPageView();
    setupDiscoveryCallClick();
    setupToolkitCheckoutStarted();
    setupCalendlyBooked();
    setupCalendlyPopup();
  }

  // Arm the human-gated page_view immediately (not gated on DOMContentLoaded — we
  // want to catch an early interaction), then wire the rest once the DOM is ready.
  armPageView();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setupFormTracking();
      initCustomEvents();
    });
  } else {
    setupFormTracking();
    initCustomEvents();
  }

})();
