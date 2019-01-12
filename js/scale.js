'use strict';

(function () {
  var scaleInput = document.querySelector('.scale__control--value');
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var scaleTarget = document.querySelector('.img-upload__preview');
  var STEP = 25;

  var currentScale;
  var newScale;

  var setScale = function (scale) {
    if (scale <= 25) {
      scale = 25;
      scaleSmaller.setAttribute('disabled', 'disabled');
    }

    if (scale >= 100) {
      scale = 100;
      scaleBigger.setAttribute('disabled', 'disabled');
    }

    scaleInput.value = scale + '%';
    scaleTarget.style = 'transform: scale(' + scale / 100 + ')';
  };

  scaleSmaller.addEventListener('click', function () {
    scaleBigger.removeAttribute('disabled', 'disabled');
    currentScale = parseInt(scaleInput.value, 10);
    newScale = currentScale - STEP;
    setScale(newScale);
  });

  scaleBigger.addEventListener('click', function () {
    scaleSmaller.removeAttribute('disabled', 'disabled');
    currentScale = parseInt(scaleInput.value, 10);
    newScale = currentScale + STEP;
    setScale(newScale);
  });
})();
