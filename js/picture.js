'use strict';


// Создайте массив, состоящий из 25 сгенерированных JS объектов, которые будут описывать фотографии, размещённые другими пользователями

var getRandomInt = function (min, max) { // включая min, не включая max
  return Math.floor(Math.random() * (max - min)) + min;
};

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var getRandomComments = function (commentsArray) {
  var photoComments = [];
  var commentsQuantity = getRandomInt(1, 200);
  for (var i = 0; i < commentsQuantity; i++) {
    var commentLength = getRandomInt(1, 3); // один комментарий должен состоять из 1-2 предложений из массива COMMENTS
    var comment = commentsArray[getRandomInt(0, commentsArray.length)];

    if (commentLength > 1) {
      for (var k = 1; k < commentLength; k++) { // т.к. "нулевой" комментарий уже есть, начинаю цикл с первого
        comment += commentsArray[getRandomInt(0, commentsArray.length)];
      }
    }

    photoComments.push(comment);
  }
  return photoComments;
};

// создаю прототип объекта фото
var PhotoContent = function (number) {
  this.url = 'photos/' + number + '.jpg';
  this.likes = getRandomInt(15, 201);
  this.comments = getRandomComments(COMMENTS);
  this.description = DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length)];
};

var photos = [];

for (var i = 1; i <= 25; i++) {
  var photoInfo = new PhotoContent(i);
  photos.push(photoInfo);
}

// На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
var photoFragment = document.createDocumentFragment();

var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  photoElement.addEventListener('click', function () {
    var bigPicture = document.querySelector('.big-picture');
    var bigPictureCloseButton = bigPicture.querySelector('#picture-cancel');

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photos.description;

    // Вставляем комментарии под большой фотографией
    var bigCommentsContainer = document.querySelector('.social__comments');
    var bigComment = document.querySelector('.social__comment');
    var bigCommentFragment = document.createDocumentFragment();

    var createBigComment = function (comment) {
      var bigCommentElement = bigComment.cloneNode(true);
      bigCommentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(1, 7) + '.svg';
      bigCommentElement.querySelector('.social__text').textContent = comment;
      return bigCommentElement;
    };

    for (var commentItem = 0; commentItem < photo.comments.length; commentItem++) {
      bigCommentFragment.appendChild(createBigComment(photo.comments[commentItem]));
    }

    bigCommentsContainer.appendChild(bigCommentFragment);

    // закрытие окна по клику и нажатию esc
    var closeBigPicture = function () {
      bigPicture.classList.add('hidden');
    };

    bigPictureCloseButton.addEventListener('click', closeBigPicture);

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        if (!bigPicture.classList.contains('hidden')) {
          closeBigPicture();
        }
      }
    });
  });

  return photoElement;
};

for (var photoItem = 0; photoItem < photos.length; photoItem++) {
  photoFragment.appendChild(renderPhoto(photos[photoItem]));
}

var photoContainer = document.querySelector('.pictures');
photoContainer.appendChild(photoFragment);


// Покажите элемент .big-picture, удалив у него класс .hidden и заполните его данными из первого элемента сгенерированного вами массива

// var bigPicture = document.querySelector('.big-picture');
// // bigPicture.classList.remove('hidden');
//
// bigPicture.querySelector('.big-picture__img').src = photos[0].url;
// bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
// bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
// bigPicture.querySelector('.social__caption').textContent = photos[0].description;
//
// // Вставляем комментарии под большой фотографией
// var bigCommentsContainer = document.querySelector('.social__comments');
// var bigComment = document.querySelector('.social__comment');
// var bigCommentFragment = document.createDocumentFragment();
//
// var createBigComment = function (comment) {
//   var bigCommentElement = bigComment.cloneNode(true);
//   bigCommentElement.querySelector('.social__picture').src = 'img/avatar-' + getRandomInt(1, 7) + '.svg';
//   bigCommentElement.querySelector('.social__text').textContent = comment;
//   return bigCommentElement;
// };
//
// for (var commentItem = 0; commentItem < photos[0].comments.length; commentItem++) {
//   bigCommentFragment.appendChild(createBigComment(photos[0].comments[commentItem]));
// }

// bigCommentsContainer.appendChild(bigCommentFragment);


// Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс .visually-hidden.

// document.querySelector('.social__comment-count').classList.add('visually-hidden');
// document.querySelector('.comments-loader').classList.add('visually-hidden');


// После выбора изображения (изменения значения поля #upload-file), показывается форма редактирования изображения
var imgUploadInput = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCloseButton = imgUploadOverlay.querySelector('#upload-cancel');
var ESC_KEYCODE = 27;

var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
var previewImg = imgUploadOverlay.querySelector('.img-upload__preview img');
var effects = imgUploadOverlay.querySelectorAll('.effects__radio');
var effectLevel = imgUploadOverlay.querySelector('.effect-level');
var effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');

var lineCoordinates;
var lineWidth;
var currentEffect = '';

var resetEffect = function () {
  previewImg.classList = ('effects__preview--' + currentEffect);
};

var getElementWidth = function (elem) {
  var elemCoordinates = elem.getBoundingClientRect();
  var elemWidth = elemCoordinates.right - elemCoordinates.left;
  return elemWidth;
};

// Интенсивность эффекта регулируется перемещением ползунка в слайдере .effect-level__pin. Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта, CSS-стили элемента .img-upload__preview обновляются следующим образом:
// Для эффекта «Хром» — filter: grayscale(0..1);
// Для эффекта «Сепия» — filter: sepia(0..1);
// Для эффекта «Марвин» — filter: invert(0..100%);
// Для эффекта «Фобос» — filter: blur(0..3px);
// Для эффекта «Зной» — filter: brightness(1..3).
var setFilter = function (effect, depth) {
  var filterPresets = {
    chrome: 'filter: grayscale(' + depth + ')',
    sepia: 'filter: sepia(' + depth + ')',
    marvin: 'filter: invert(' + depth * 100 + '%)',
    phobos: 'filter: blur(' + depth * 3 + 'px)',
    heat: 'filter: brightness(' + depth * 3 + ')'
  };
  effectLevelValue.setAttribute('value', depth * 100);
  return filterPresets[effect];
};

var setEffect = function (effect) {
  effect.addEventListener('click', function () {
    currentEffect = effect.value;
    if (currentEffect === 'none') { // При выборе эффекта «Оригинал» слайдер скрывается
      effectLevel.classList.add('hidden');
      imgUploadPreview.style = '';
    } else {
      effectLevel.classList.remove('hidden');
      imgUploadPreview.style = setFilter(currentEffect, 0.2);
    }
    // При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.
    resetEffect();
  });
};

var closeUploadOverlay = function () {
  imgUploadOverlay.classList.add('hidden');
  imgUploadInput.value = '';
};

imgUploadInput.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  lineCoordinates = effectLevelLine.getBoundingClientRect();
  lineWidth = lineCoordinates.right - lineCoordinates.left;

  for (var effectItem = 0; effectItem < effects.length; effectItem++) {
    if (effects[effectItem].checked) { // ищу установленный по умолчанию эффект
      currentEffect = effects[effectItem].value;
      resetEffect(); // применяю эффект, установленный по умолчинию в разметке
    }
    setEffect(effects[effectItem]); // навешиваю обработчик клика на фильтры
  }
  // При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome
  effectLevelPin.addEventListener('mouseup', function (evt) {
    var pinX = evt.clientX;
    var pinWidth = getElementWidth(effectLevelPin);
    var pinCenterPosition = pinX + pinWidth / 2 - lineCoordinates.left;
    var effectDepth = (pinCenterPosition / lineWidth).toFixed(2);
    imgUploadPreview.style = setFilter(currentEffect, effectDepth);
  });
  // закрытие окна загрузки изображения
  uploadCloseButton.addEventListener('click', closeUploadOverlay);
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (!imgUploadOverlay.classList.contains('hidden')) {
        closeUploadOverlay();
      }
    }
  });
});
