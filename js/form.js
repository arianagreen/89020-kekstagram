'use strict';

(function () {
  // После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения
  var imgUploadInput = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCloseButton = imgUploadOverlay.querySelector('#upload-cancel');
  var ESC_KEYCODE = 27;

  // var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var previewImg = imgUploadOverlay.querySelector('.img-upload__preview img');
  var effects = imgUploadOverlay.querySelectorAll('.effects__radio');
  var effectLevel = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
  var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var pin = imgUploadOverlay.querySelector('.effect-level__pin');

  // Первоначальное значение переменной currentEffect устанавливается в момент открытия формы (из отмеченного в разметке checkbox'а)
  // Дальше значение обновляется при каждой смене эффекта
  var currentEffect = '';

  // Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта, CSS-стили элемента .img-upload__preview обновляются
  var setFilter = function (effect, depth) {
    var filterPresets = {
      chrome: 'filter: grayscale(' + depth + ')',
      sepia: 'filter: sepia(' + depth + ')',
      marvin: 'filter: invert(' + depth * 100 + '%)',
      phobos: 'filter: blur(' + depth * 3 + 'px)',
      heat: 'filter: brightness(' + depth * 3 + ')'
    };
    effectLevelValue.setAttribute('value', depth * 100);
    previewImg.classList = ('effects__preview--' + effect);
    effectLevelDepth.style.width = depth * 100 + '%';
    pin.style.left = depth * 100 + '%';
    previewImg.style = filterPresets[effect];

    // return filterPresets[effect];
  };

  var setEffect = function (effect) {
    effect.addEventListener('click', function () {
      currentEffect = effect.value;
      if (currentEffect === 'none') { // При выборе эффекта «Оригинал» слайдер скрывается
        effectLevel.classList.add('hidden');
        previewImg.style = '';
        previewImg.classList = '';
      } else {
        effectLevel.classList.remove('hidden');
        // При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.
        setFilter(currentEffect, 1);
      }
    });
  };

  var closeUploadOverlay = function () {
    imgUploadInput.value = '';
    imgUploadOverlay.classList.add('hidden');
  };

  imgUploadInput.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');

    for (var i = 0; i < effects.length; i++) {
      if (effects[i].checked) { // ищу установленный по умолчанию эффект
        currentEffect = effects[i].value;
        setFilter(currentEffect, effectLevelValue.value / 100);
      }
      setEffect(effects[i]); // навешиваю обработчик клика на фильтры
    }

    // закрытие окна загрузки изображения
    uploadCloseButton.addEventListener('click', closeUploadOverlay);
    window.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, closeUploadOverlay);
    });
  });

  // Перетаскивание пина

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;
    var pinWidth = pin.offsetWidth;
    // var pinCenter = pin.offsetLeft + pinWidth / 2;

    var dragged = false;

    var changeSlider = function () {
      effectLevelDepth.style.width = pin.offsetLeft + 'px';
      // pinCenter = pin.offsetLeft + pinWidth / 2;
      var effectDepth = (pin.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
      setFilter(currentEffect, effectDepth);
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      var newPinOffset = pin.offsetLeft - shift;

      if (newPinOffset > effectLevelLine.offsetWidth) {
        pin.style.left = effectLevelLine.offsetWidth + 'px';
      } else if (newPinOffset < 0) {
        pin.style.left = 0 + 'px';
      } else {
        pin.style.left = pin.offsetLeft - shift + 'px';
      }

      changeSlider();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (!dragged) {
        startX = pin.getBoundingClientRect().left;
        var shift = startX - upEvt.clientX;
        pin.style.left = pin.offsetLeft - shift - pinWidth / 2 + 'px';
        changeSlider();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  // Валидация хэш-тегов

  var hashtagInput = imgUploadOverlay.querySelector('.text__hashtags');

  var checkHashtagValidity = function (input, hashtags, hashtag) {
    if (!(hashtag.charAt(0) === '#')) {
      return 'Хэш-тег должен начинаться с символа #';
    } else if (hashtag.charAt(1) === undefined) {
      return 'Хэш-тег не может состоять только из одного символа #';
    } else if (hashtags.match(/hashtag + ' '/g) > 1) {
      return 'Один и тот же хэш-тег не может быть использован дважды';
    } else {
      return '';
    }
  };

  hashtagInput.addEventListener('input', function (evt) {
    var target = evt.target;
    var hashtags = target.value;
    var hashtagsArray = hashtags.toLowerCase().split(' ');
    var validationText;
    for (var hashtagItem = 0; hashtagItem < hashtagsArray.length; hashtagItem++) {
      var hashtag = hashtagsArray[hashtagItem];
      validationText = checkHashtagValidity(target, hashtags, hashtag);
    }
    if (hashtags.length < 2) {
      target.setCustomValidity('Хэш-тег должен состоять минимум из двух символов, включая #');
    } else if (validationText.length > 1) {
      target.setCustomValidity(validationText);
    } else if (hashtagsArray.length > 5) {
      target.setCustomValidity('Можно указать не более 5-ти хэш-тегов');
    } else {
      target.setCustomValidity('');
    }
  });


  hashtagInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });

  // Валидация комментария

  var descriptionInput = imgUploadOverlay.querySelector('.text__description');

  descriptionInput.addEventListener('invalid', function () {
    if (hashtagInput.validity.tooLong) {
      descriptionInput.setCustomValidity('Длина комментария не может составлять больше 140 символов');
    } else {
      descriptionInput.setCustomValidity('');
    }
  });

  descriptionInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });
}());
