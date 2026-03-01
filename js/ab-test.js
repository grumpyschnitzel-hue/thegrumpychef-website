/**
 * A/B Testing — The Grumpy Chef
 * Client-side headline/CTA testing on static HTML.
 * Cookie/localStorage-based variant assignment (persistent per user).
 * One test per page at a time.
 *
 * Usage:
 *   <script src="/js/ab-test.js"></script>
 *   <script>
 *     gcABTest({
 *       id: 'lp-calculator-headline-v1',
 *       selector: '.hero__title',
 *       variants: [
 *         'Your Kitchen Is Losing $50K\u2013$160K/Year. Here\u2019s Where.',
 *         'Find Where Your Restaurant Is Bleeding Money'
 *       ]
 *     });
 *   </script>
 */
(function () {
  'use strict';

  var STORAGE_PREFIX = 'gc_ab_';

  /**
   * Get or assign a variant index for this test.
   * Persists in localStorage so the same visitor always sees the same variant.
   */
  function getVariant(testId, numVariants) {
    var key = STORAGE_PREFIX + testId;
    try {
      var stored = localStorage.getItem(key);
      if (stored !== null) {
        var idx = parseInt(stored, 10);
        if (idx >= 0 && idx < numVariants) return idx;
      }
    } catch (e) { /* localStorage unavailable */ }

    // Assign randomly
    var variant = Math.floor(Math.random() * numVariants);
    try {
      localStorage.setItem(key, variant.toString());
    } catch (e) { /* silent */ }
    return variant;
  }

  /**
   * Fire GA4 event
   */
  function trackEvent(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params);
    }
  }

  /**
   * Run an A/B test.
   * @param {Object} config
   * @param {string} config.id - Unique test ID (e.g., 'lp-calculator-headline-v1')
   * @param {string} config.selector - CSS selector for the element to swap
   * @param {string[]} config.variants - Array of text strings. Index 0 = control.
   * @param {string} [config.attribute] - If set, modifies this attribute instead of textContent (e.g., 'href')
   */
  window.gcABTest = function (config) {
    if (!config || !config.id || !config.selector || !config.variants || config.variants.length < 2) {
      console.warn('[AB Test] Invalid config:', config);
      return;
    }

    var el = document.querySelector(config.selector);
    if (!el) {
      console.warn('[AB Test] Element not found:', config.selector);
      return;
    }

    var variant = getVariant(config.id, config.variants.length);
    var variantLabel = variant === 0 ? 'control' : 'variant_' + variant;

    // Apply variant
    if (config.attribute) {
      el.setAttribute(config.attribute, config.variants[variant]);
    } else {
      el.textContent = config.variants[variant];
    }

    // Track impression
    trackEvent('experiment_impression', {
      experiment_id: config.id,
      variant: variantLabel,
      variant_index: variant
    });

    // Expose for conversion tracking
    el.dataset.abTestId = config.id;
    el.dataset.abVariant = variantLabel;

    // Store active test info for conversion tracking
    try {
      sessionStorage.setItem('gc_ab_active', JSON.stringify({
        id: config.id,
        variant: variantLabel,
        variant_index: variant
      }));
    } catch (e) { /* silent */ }
  };

  /**
   * Track a conversion for the active A/B test on this page.
   * Call this when a desired action happens (form submit, CTA click, etc.)
   * @param {string} [action] - Optional action label (e.g., 'form_submit', 'cta_click')
   */
  window.gcABConvert = function (action) {
    try {
      var active = JSON.parse(sessionStorage.getItem('gc_ab_active'));
      if (active && active.id) {
        trackEvent('experiment_conversion', {
          experiment_id: active.id,
          variant: active.variant,
          variant_index: active.variant_index,
          action: action || 'conversion'
        });
      }
    } catch (e) { /* silent */ }
  };

  /**
   * List all assigned variants (for debugging).
   */
  window.gcABDebug = function () {
    var tests = {};
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key && key.indexOf(STORAGE_PREFIX) === 0) {
          tests[key.replace(STORAGE_PREFIX, '')] = parseInt(localStorage.getItem(key), 10);
        }
      }
    } catch (e) { /* silent */ }
    console.table(tests);
    return tests;
  };

  /**
   * Reset a specific test (force re-randomization on next page load).
   * @param {string} testId
   */
  window.gcABReset = function (testId) {
    try {
      localStorage.removeItem(STORAGE_PREFIX + testId);
      console.log('[AB Test] Reset:', testId);
    } catch (e) { /* silent */ }
  };
})();
