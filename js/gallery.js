'use strict';

// На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

(function () {
  var onLoad = function (photos) {
    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var photoFragment = document.createDocumentFragment();

    var renderPhoto = function (photo) {

      var photoElement = photoTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = photo.url;
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

      photoElement.addEventListener('click', function () {
        window.renderBigPhoto(photo);
      });

      return photoElement;
    };

    for (var i = 0; i < photos.length; i++) {
      photoFragment.appendChild(renderPhoto(photos[i]));
    }

    var photoContainer = document.querySelector('.pictures');
    photoContainer.appendChild(photoFragment);
  };

  window.load(onLoad);
}());
