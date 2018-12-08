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
    }
  };
})();
