/**
 * The Grumpy Chef — Shared Analytics
 * GA4 + Microsoft Clarity + UTM Capture + Custom Events
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
  var GA4_ID = 'GA4_MEASUREMENT_ID';       // e.g. 'G-ABC123XYZ'
  var CLARITY_ID = 'CLARITY_PROJECT_ID';   // e.g. 'abc123xyz'

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
    gtag('config', GA4_ID, { send_page_view: true });
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
  // INIT
  // =============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFormTracking);
  } else {
    setupFormTracking();
  }

})();
