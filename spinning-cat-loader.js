/* ============================================================
   Spinning Cat Loader — JavaScript
   Extracted from hexo-theme-shoka
   Source: https://github.com/amehime/hexo-theme-shoka

   Dependencies (optional, for smooth transitions):
     - anime.js  (https://animejs.com/)
       If anime.js is not loaded, the loader will still work
       (hide/show without fade animation).

   Usage:
     // Show the loader
     CatLoader.show();

     // Hide the loader (defaults to 3000ms delay)
     CatLoader.hide();

     // Hide immediately
     CatLoader.hide(0);

     // Click on the cat to dismiss it immediately.
   ============================================================ */

;(function (global) {
  'use strict';

  // ---- Configuration ----
  var CONFIG = global.CatLoaderConfig || {};
  var START_ON_LOAD = CONFIG.start !== false;   // show on page enter
  var SWITCH_ON_VISIBILITY = CONFIG.switch !== false; // show on tab switch

  var loadCat = document.getElementById('loading');
  if (!loadCat) return; // no loader element on this page

  var isLocked = false;
  var timer = null;

  // ---- Simple transition helper (no-op if anime.js is absent) ----
  function transition(target, type, complete) {
    // If anime.js isn't available, just toggle display
    if (typeof anime === 'undefined') {
      if (type === 0 || (typeof type === 'object' && type.opacity === 0)) {
        target.style.opacity = '0';
        target.style.display = 'none';
      } else {
        target.style.display = 'block';
        target.style.opacity = '1';
      }
      if (complete) complete();
      return;
    }

    var anim;
    switch (type) {
      case 0: // fade out
        anim = { opacity: [1, 0] };
        break;
      case 1: // fade in
        anim = { opacity: [0, 1] };
        break;
      default:
        anim = type; // custom object
        break;
    }

    anime(Object.assign({
      targets: target,
      duration: 200,
      easing: 'linear'
    }, anim)).finished.then(function () {
      if (type === 0 || (typeof type === 'object' && type.opacity === 0)) {
        target.style.display = 'none';
      }
      if (complete) complete();
    });
  }

  // ---- Public API ----
  var CatLoader = {
    /**
     * Show the loading cat.
     */
    show: function () {
      clearTimeout(timer);
      document.body.classList.remove('loaded');
      loadCat.style.display = 'block';
      loadCat.style.opacity = '1';
      isLocked = false;
    },

    /**
     * Hide the loading cat after a delay.
     * @param {number} [sec=3000]  Delay in ms. 0 = immediate, -1 = do not auto-hide.
     */
    hide: function (sec) {
      if (!START_ON_LOAD) {
        sec = -1;
      }
      timer = setTimeout(CatLoader.vanish, sec != null ? sec : 3000);
    },

    /**
     * Immediately remove the loader (called by setTimeout or by clicking the cat).
     */
    vanish: function () {
      if (isLocked) return;

      if (START_ON_LOAD) {
        transition(loadCat, 0);
      }
      document.body.classList.add('loaded');
      isLocked = true;
    }
  };

  // ---- Attach click handler to cat — click to dismiss ----
  loadCat.addEventListener('click', CatLoader.vanish);

  // ---- Tab visibility: show cat when user switches away, hide when back ----
  if (SWITCH_ON_VISIBILITY) {
    var originTitle;
    var titleTime;
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') {
        // Switch to "away" favicon / title if available
        if (CONFIG.faviconHidden) {
          var icon = document.querySelector('[rel="icon"]');
          if (icon) icon.href = CONFIG.faviconHidden;
        }
        if (CONFIG.titleHide) {
          originTitle = document.title;
          document.title = CONFIG.titleHide;
        }
        clearTimeout(titleTime);
        CatLoader.show();
      } else if (document.visibilityState === 'visible') {
        if (CONFIG.faviconNormal) {
          var icon = document.querySelector('[rel="icon"]');
          if (icon) icon.href = CONFIG.faviconNormal;
        }
        if (CONFIG.titleShow && originTitle) {
          document.title = CONFIG.titleShow;
        }
        CatLoader.hide(1000);
        titleTime = setTimeout(function () {
          if (originTitle) document.title = originTitle;
        }, 2000);
      }
    });
  }

  // ---- Auto-start on DOM ready ----
  function init() {
    if (START_ON_LOAD) {
      // Hide after a short delay so the cat is visible on first load
      CatLoader.hide();
    } else {
      // If start is false, hide immediately
      CatLoader.vanish();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose globally
  global.CatLoader = CatLoader;

})(typeof window !== 'undefined' ? window : this);
