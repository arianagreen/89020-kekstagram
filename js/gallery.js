'use strict';

// На основе данных, созданных в предыдущем пункте и шаблона #picture создайте DOM-элементы, соответствующие фотографиям и заполните их данными из массива
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

(function () {
  var onLoad = function (photos) {

    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

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

    var receivedPhotos = photos;
    var receivedPhotosCopy;


    // Обработчики изменения фильтров

    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');

    var renderPreviews = function (photosArray) {
      var photoFragment = document.createDocumentFragment();
      var photoContainer = document.querySelector('.pictures');

      for (var i = 0; i < photosArray.length; i++) {
        photoFragment.appendChild(renderPhoto(photosArray[i]));
      }

      if (photoContainer.querySelector('.picture')) {
        clearPhotos(photoContainer);
      }

      photoContainer.appendChild(photoFragment);
    };

    renderPreviews(receivedPhotos);

    var filterActions = {
      'filter-popular': function () {
        return receivedPhotos;
      },
      'filter-new': function () {
        receivedPhotosCopy = receivedPhotos.slice();
        var newPhotos = [];

        receivedPhotosCopy.sort(function () {
          return 0.5 - Math.random();
        });

        for (var i = 0; i < 10; i++) {
          newPhotos.push(receivedPhotosCopy[i]);
        }
        return newPhotos;
      },
      'filter-discussed': function () {
        receivedPhotosCopy = receivedPhotos.slice();
        var discussedPhotos = receivedPhotosCopy.sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
        return discussedPhotos;
      }
    };

    var refresh = function (evt) {
      var action = evt.target.id;
      window.util.switchButton(evt.target);
      renderPreviews(filterActions[action]());
    };

    var filterButtons = document.querySelectorAll('.img-filters__button');

    filterButtons.forEach(function (button) {
      button.addEventListener('click', refresh);
    });

    var clearPhotos = function (node) {
      while (node.querySelector('.picture')) {
        node.removeChild(node.querySelector('.picture'));
      }
    };
  };

  window.load(onLoad);
}());
