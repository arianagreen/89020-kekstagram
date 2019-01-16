'use strict';

(function () {
  var STEP = 25;
  var MAX_SCALE = 100;
  var scaleInput = document.querySelector('.scale__control--value');
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var scaleTarget = document.querySelector('.img-upload__preview');

  window.setScale = function (scale) {
    if (scale <= STEP) {
      scale = STEP;
      scaleSmaller.setAttribute('disabled', 'disabled');
    }

    if (scale >= MAX_SCALE) {
      scale = MAX_SCALE;
      scaleBigger.setAttribute('disabled', 'disabled');
    }

    scaleInput.value = scale + '%';
    scaleTarget.style = 'transform: scale(' + scale / 100 + ')';
  };

  scaleSmaller.addEventListener('click', function () {
    scaleBigger.removeAttribute('disabled', 'disabled');
    window.setScale(parseInt(scaleInput.value, 10) - STEP);
  });

  scaleBigger.addEventListener('click', function () {
    scaleSmaller.removeAttribute('disabled', 'disabled');
    window.setScale(parseInt(scaleInput.value, 10) + STEP);
  });
})();
