'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;

  return {
    getRandomInt: function (min, max) { // включая min, не включая max
      return Math.floor(Math.random() * (max - min)) + min;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    clearElement: function (elem) {
      while (elem.hasChildNodes()) {
        elem.removeChild(elem.firstChild);
      }
    },
    switchButton: function (btn) {
      if (!btn.classList.contains('img-filters__button--active')) {
        var prevBtn = document.querySelector('.img-filters__button--active');
        prevBtn.classList.remove('img-filters__button--active');
        btn.classList.add('img-filters__button--active');
      }
    }
  };
})();
